// Adapter from the existing evaluator to a finite, replayable transition system.
import { QuintEx } from '../../ir/quintIr'
import { LookupTable } from '../../names/base'
import { QuintError } from '../../quintError'
import { newRng } from '../../rng'
import { newTraceRecorder } from '../trace'
import { Context } from '../impl/Context'
import { Builder, EvalFunction, buildExpr } from '../impl/builder'
import { RuntimeValue } from '../impl/runtimeValue'
import { Accesses } from './access'
import { ChoiceSource, EnumerateChoices, Event, ReplayChoices, WorkLimit } from './choices'

export interface Transition {
  state: RuntimeValue
  event: Event
  accesses: Accesses
}

export interface ExplorationSpec {
  table: LookupTable
  init: QuintEx
  step: QuintEx
  invariants: QuintEx[]
  witnesses: QuintEx[]
}

export class EvaluationFailure extends Error {
  event?: Event
  constructor(readonly error: QuintError) {
    super(error.message)
  }
}

const predicateChoices: ChoiceSource = {
  select() {
    throw new Error('A state predicate cannot make nondeterministic choices')
  },
}

export class Machine {
  readonly ctx: Context
  readonly init: EvalFunction
  readonly step: EvalFunction
  readonly invariants: EvalFunction[]
  readonly witnesses: EvalFunction[]
  evaluations = 0

  constructor(spec: ExplorationSpec, mbt: boolean, private readonly maxWork: number) {
    const builder = new Builder(spec.table, mbt, true)
    const deterministic = () => {
      throw new Error('Uncontrolled random choice during systematic exploration')
    }
    this.ctx = new Context(newTraceRecorder(0, newRng(1n)), deterministic, builder.varStorage)
    this.ctx.chargeChoice = () => this.charge()
    this.init = buildExpr(builder, spec.init)
    this.step = buildExpr(builder, spec.step)
    this.invariants = spec.invariants.map(expr => buildExpr(builder, expr))
    this.witnesses = spec.witnesses.map(expr => buildExpr(builder, expr))
  }

  private charge() {
    if (this.evaluations >= this.maxWork) throw new WorkLimit('Action evaluation limit reached')
    this.evaluations++
  }

  private execute(state: RuntimeValue, action: EvalFunction, choices: ChoiceSource): RuntimeValue | undefined {
    this.charge()
    this.ctx.readOnly = false
    const store = this.ctx.varStorage
    store.fromRecord(state)
    store.clearMetadata()
    this.ctx.choices = choices
    this.ctx.accesses = new Accesses()
    const result = action(this.ctx)
    if (result.isLeft()) throw new EvaluationFailure(result.value)
    if (!result.value.toBool()) return undefined
    // Quint clears unassigned registers on shift. This is a write even if the
    // register was already unset when this particular step ran.
    store.nextVars.forEach(reg => {
      if (reg.value.isLeft()) {
        this.ctx.accesses!.writes.push({ name: reg.name })
        this.ctx.accesses!.unset.add(reg.name)
      }
    })
    store.shiftVars()
    return store.asRecord()
  }

  *successors(state: RuntimeValue, action: EvalFunction): Generator<Transition> {
    const choices = new EnumerateChoices()
    do {
      try {
        const next = this.execute(state, action, choices)
        if (next !== undefined) yield { state: next, event: choices.event(), accesses: this.ctx.accesses! }
      } catch (err) {
        if (err instanceof EvaluationFailure) err.event = choices.event()
        throw err
      }
    } while (choices.advance())
  }

  replay(state: RuntimeValue, action: EvalFunction, event: Event): Transition | undefined {
    const choices = new ReplayChoices(event)
    try {
      const next = this.execute(state, action, choices)
      return next !== undefined && choices.complete ? { state: next, event, accesses: this.ctx.accesses! } : undefined
    } catch (e) {
      if (e instanceof EvaluationFailure && !choices.complete) return undefined
      throw e
    }
  }

  observe(state: RuntimeValue): { violated: number[]; witnessed: number[] } {
    this.ctx.varStorage.fromRecord(state)
    this.ctx.readOnly = true
    this.ctx.choices = predicateChoices
    this.ctx.accesses = undefined
    const matching = (predicates: EvalFunction[], wanted: boolean) => {
      const indices: number[] = []
      predicates.forEach((predicate, i) => {
        const r = predicate(this.ctx)
        if (r.isLeft()) throw new EvaluationFailure(r.value)
        if (r.value.toBool() === wanted) indices.push(i)
      })
      return indices
    }
    return { violated: matching(this.invariants, false), witnessed: matching(this.witnesses, true) }
  }
}
