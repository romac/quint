import { QuintError } from '../../quintError'
import { RuntimeValue, rv } from '../impl/runtimeValue'
import { StubbornSets } from './stubborn'
import { Event, WorkLimit, sameEvent } from './choices'
import { EvaluationFailure, ExplorationSpec, Machine, Transition } from './machine'

export type Strategy = 'exhaustive' | 'por' | 'dpor'
export interface SearchOptions {
  strategy: Strategy
  maxSteps: number
  maxWork?: number
  mbt?: boolean
  replay?: Event[]
}

export interface SearchStats {
  prefixes: number
  schedules: number
  slept: number
  stubbornPruned: number
  diamonds: number
  evaluations: number
}

export interface SearchResult {
  status: 'ok' | 'violation' | 'error' | 'incomplete'
  stats: SearchStats
  trace: RuntimeValue[]
  schedule: Event[]
  witnessed: boolean[]
  violated: number[]
  error?: QuintError
}

interface Frame {
  state: RuntimeValue
  successors: Generator<Transition>
  sleeping: Event[]
  earlier: Transition[]
  enabled: boolean
}

// A sleeping event has an earlier representative. Keep it asleep across this
// step only if it can move to the left across it. Otherwise it must wake up,
// including when a guard/domain changed or the event ceased to exist.
function childSleep(
  machine: Machine,
  frame: Frame,
  chosen: Transition,
  strategy: Strategy,
  stats: SearchStats
): Event[] {
  const sleep: Event[] = []
  const consider = (other: Transition) => {
    if (other.accesses.independent(chosen.accesses)) {
      sleep.push(other.event)
    } else if (strategy === 'dpor') {
      stats.diamonds++
      const ab = machine.replay(chosen.state, machine.step, other.event)
      const ba = machine.replay(other.state, machine.step, chosen.event)
      if (ab && ba && ab.state.equals(ba.state)) sleep.push(other.event)
    }
  }
  // Speculative errors are dependencies. If reachable, normal exploration
  // reports the error with the actual schedule, including the failing step.
  const probe = (fn: () => void) => {
    try {
      fn()
    } catch (e) {
      if (!(e instanceof EvaluationFailure)) throw e
    }
  }
  for (const event of frame.sleeping)
    probe(() => {
      const other = machine.replay(frame.state, machine.step, event)
      if (other) consider(other)
    })
  for (const other of frame.earlier) probe(() => consider(other))
  return sleep
}

export function explore(spec: ExplorationSpec, options: SearchOptions): SearchResult {
  const { maxSteps, strategy } = options
  const stats: SearchStats = { prefixes: 0, schedules: 0, slept: 0, stubbornPruned: 0, diamonds: 0, evaluations: 0 }
  const result: SearchResult = {
    status: 'ok',
    stats,
    trace: [],
    schedule: [],
    witnessed: spec.witnesses.map(() => false),
    violated: [],
  }
  const maxWork = options.maxWork ?? Infinity
  if (
    !Number.isSafeInteger(maxSteps) ||
    maxSteps < 0 ||
    (maxWork !== Infinity && (!Number.isSafeInteger(maxWork) || maxWork < 0))
  ) {
    throw new Error('Exploration bounds must be nonnegative safe integers')
  }
  const machine = new Machine(spec, options.mbt ?? false, maxWork)
  const stubborn = strategy === 'por' ? StubbornSets.forSpec(spec) : undefined
  function* successors(state: RuntimeValue): Generator<Transition> {
    const candidates = machine.successors(state, machine.step)
    if (!stubborn) {
      yield* candidates
      return
    }
    const enabled = [...candidates]
    const selected = stubborn.select(state, enabled)
    stats.stubbornPruned += enabled.length - selected.length
    yield* selected
  }
  const empty = rv.mkRecord([])
  const path: Transition[] = []
  const save = () => {
    result.trace = path.map(step => step.state)
    result.schedule = path.map(step => step.event)
  }
  const visit = (step: Transition) => {
    path.push(step)
    stats.prefixes++
    const { witnessed, violated } = machine.observe(step.state)
    witnessed.forEach(i => {
      result.witnessed[i] = true
    })
    if (violated.length) {
      result.status = 'violation'
      result.violated = violated
      save()
    }
  }
  const keepExample = () => {
    if (path.length > result.trace.length) save()
  }

  try {
    if (options.replay) {
      if (!options.replay.length) throw new Error('A schedule must include the initializer')
      for (const [i, event] of options.replay.entries()) {
        let step
        try {
          step = machine.replay(path.at(-1)?.state ?? empty, i === 0 ? machine.init : machine.step, event)
        } catch (e) {
          if (e instanceof EvaluationFailure) e.event = event
          throw e
        }
        if (!step) throw new Error('Replay diverged at ' + (i === 0 ? 'init' : 'step ' + i))
        visit(step)
        if (result.status === 'violation') break
      }
      keepExample()
      stats.schedules++
    } else {
      // The virtual root enumerates all initial states. Siblings of init
      // are alternative initial conditions and can never commute as steps.
      const stack: Frame[] = [
        {
          state: empty,
          successors: machine.successors(empty, machine.init),
          sleeping: [],
          earlier: [],
          enabled: false,
        },
      ]
      while (stack.length) {
        const frame = stack[stack.length - 1]
        const next = frame.successors.next()
        if (next.done) {
          keepExample()
          if (!frame.enabled && path.length) stats.schedules++
          stack.pop()
          path.pop()
          continue
        }
        const child = next.value
        frame.enabled = true
        if (frame.sleeping.some(event => sameEvent(event, child.event))) {
          stats.slept++
          continue
        }
        const init = path.length === 0
        visit(child)
        if (result.status === 'violation') break
        if (path.length - 1 === maxSteps) {
          keepExample()
          stats.schedules++
          path.pop()
          continue
        }
        let sleeping: Event[] = []
        if (!init && !stubborn && strategy !== 'exhaustive') {
          sleeping = childSleep(machine, frame, child, strategy, stats)
          frame.earlier.push(child)
        }
        stack.push({ state: child.state, successors: successors(child.state), sleeping, earlier: [], enabled: false })
      }
      if (!stats.prefixes) throw new Error('No enabled initial state')
    }
  } catch (e) {
    if (path.length || !(e instanceof WorkLimit)) save()
    if (e instanceof WorkLimit) result.status = 'incomplete'
    else {
      result.status = 'error'
      result.error =
        e instanceof EvaluationFailure
          ? e.error
          : { code: 'QNT501', message: e instanceof Error ? e.message : String(e) }
      if (e instanceof EvaluationFailure && e.event) result.schedule.push(e.event)
    }
  }
  stats.evaluations = machine.evaluations
  return result
}
