import { RuntimeValue, StateValueInterner, rv } from '../impl/runtimeValue'
import { EvaluationFailure, ExplorationSpec, Machine, Transition } from './machine'
import { Event, WorkLimit } from './choices'
import type { SearchOptions, SearchResult } from './search'

export interface BfsStats {
  distinctStates: number
  duplicates: number
  expandedStates: number
  peakFrontier: number
  completedDepth: number | null
  witnessDepths: (number | null)[]
}

interface Node {
  id: number
  state: RuntimeValue
}

// A queued state is first reached by a shortest path. Only the frontier holds
// live model records. Rebuild the selected trace from parent edges after search.
export function breadthFirst(
  spec: ExplorationSpec,
  options: SearchOptions,
  machine: Machine,
  result: SearchResult
): SearchResult {
  const stats: BfsStats = {
    distinctStates: 0,
    duplicates: 0,
    expandedStates: 0,
    peakFrontier: 0,
    completedDepth: null,
    witnessDepths: spec.witnesses.map(() => null),
  }
  result.stats.bfs = stats
  const values = new StateValueInterner()
  const registers = machine.ctx.varStorage.vars
    .valueSeq()
    .map(reg => reg.name)
    .toArray()
  const seen = new Set<string>()
  const parents: { parent: number; event: Event }[] = []
  let current: Node[] = []
  let next: Node[] = []
  let depth = 0
  let parent = -1
  let example = -1
  let witness = -1
  let pending = 0
  let failedEvent: Event | undefined

  function admit(t: Transition) {
    const fields = t.state.toOrderedMap()
    const key = registers
      .map(name => {
        const value = fields.get(name)
        return value === undefined ? 0 : values.id(value)
      })
      .join(',')
    if (seen.has(key)) {
      stats.duplicates++
      return
    }
    if (seen.size >= (options.maxStates ?? Infinity)) {
      result.limit = 'max-states'
      throw new WorkLimit('State limit reached')
    }
    seen.add(key)
    const id = parents.length
    parents.push({ parent, event: t.event })
    example = id
    stats.distinctStates++
    result.stats.prefixes++
    options.onState?.(t.state)
    const observation = machine.observe(t.state)
    for (const i of observation.witnessed) {
      if (stats.witnessDepths[i] === null) stats.witnessDepths[i] = depth
      if (witness === -1) witness = id
      result.witnessed[i] = true
    }
    if (observation.violated.length) {
      result.status = 'violation'
      result.violated = observation.violated
    } else if (depth < options.maxSteps) {
      next.push({ id, state: t.state })
      stats.peakFrontier = Math.max(stats.peakFrontier, pending + next.length)
    }
  }

  try {
    const empty = rv.mkRecord([])
    for (const t of machine.successors(empty, machine.init)) {
      admit(t)
      if (result.violated.length) break
    }
    if (!parents.length) throw new Error('No enabled initial state')
    while (result.status === 'ok') {
      stats.completedDepth = depth
      if (next.length === 0) break
      current = next.reverse()
      next = []
      depth++
      const before = seen.size
      while (current.length && result.status === 'ok') {
        const node = current.pop()!
        parent = node.id
        pending = current.length
        for (const t of machine.successors(node.state, machine.step)) {
          admit(t)
          if (result.violated.length) break
        }
        if (result.status === 'ok') stats.expandedStates++
      }
      if (seen.size === before) break // fixed point; there is no deeper layer
    }
  } catch (e) {
    if (e instanceof WorkLimit) {
      result.status = 'incomplete'
      result.limit ??= 'max-work'
    } else {
      result.status = 'error'
      result.error =
        e instanceof EvaluationFailure
          ? e.error
          : { code: 'QNT501', message: String(e instanceof Error ? e.message : e) }
      if (e instanceof EvaluationFailure && e.event) {
        example = parent
        failedEvent = e.event
      }
    }
  }
  result.stats.evaluations = machine.evaluations
  let id = result.status === 'ok' && witness !== -1 ? witness : example
  while (id !== -1) {
    const edge = parents[id]
    result.schedule.push(edge.event)
    id = edge.parent
  }
  result.schedule.reverse()
  if (result.schedule.length) {
    const replay = new Machine(spec, options.mbt ?? false, Infinity, false)
    let state = rv.mkRecord([])
    result.schedule.forEach((event, i) => {
      const transition = replay.replay(state, i === 0 ? replay.init : replay.step, event)
      if (!transition) throw new Error('BFS predecessor schedule diverged')
      state = transition.state
      result.trace.push(state)
    })
  }
  if (failedEvent) result.schedule.push(failedEvent)
  return result
}
