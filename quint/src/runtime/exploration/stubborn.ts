// Goal-directed strong stubborn sets for a top-level choice of deterministic
// guarded commands. Other Quint transition relations use sleep sets instead.
import { QuintEx } from '../../ir/quintIr'
import { LookupTable } from '../../names/base'
import { ExplorationSpec, Transition } from './machine'
import { RuntimeValue } from '../impl/runtimeValue'

interface Group {
  reads: Set<string>
  guards: Set<string>
  writes: Set<string>
  assigned: Set<string>
  mayFail: boolean
}

const intersects = (a: Set<string>, b: Set<string>) => [...a].some(v => b.has(v))

// These operations are total on well-typed, initialized scalar arguments.
// A potentially partial operation is an additional search goal: preserve
// paths to evaluator errors, even when checking an unrelated invariant.
const totalOps = new Set([
  'eq',
  'neq',
  'iadd',
  'isub',
  'imul',
  'iuminus',
  'igt',
  'igte',
  'ilt',
  'ilte',
  'and',
  'or',
  'not',
  'iff',
  'implies',
  'ite',
])
const partialOps = new Set(['idiv', 'imod', 'ipow', 'get', 'set', 'put', 'field', 'head', 'nth', 'assert'])

function group(): Group {
  return { reads: new Set(), guards: new Set(), writes: new Set(), assigned: new Set(), mayFail: false }
}

// Work with resolved local names. Higher-order operators, instances and
// state-dependent event families are handled by the general evaluator.
function valueReads(table: LookupTable, ex: QuintEx, g: Group, guard: boolean): boolean {
  switch (ex.kind) {
    case 'int':
    case 'str':
    case 'bool':
      return true
    case 'name': {
      const def = table.get(ex.id)
      if (!def || def.importedFrom || def.namespaces?.length) return false
      if (def.kind === 'var') {
        if (!def.typeAnnotation || !['int', 'str', 'bool'].includes(def.typeAnnotation.kind)) return false
        g.reads.add(def.name)
        if (guard) g.guards.add(def.name)
        return true
      }
      return (
        def.kind === 'def' &&
        (def.qualifier === 'val' || def.qualifier === 'pureval') &&
        valueReads(table, def.expr, g, guard)
      )
    }
    case 'app':
      if (table.has(ex.id) || !(totalOps.has(ex.opcode) || partialOps.has(ex.opcode))) return false
      if (partialOps.has(ex.opcode)) g.mayFail = true
      return ex.args.every(e => valueReads(table, e, g, guard))
    default:
      return false
  }
}

function actionBody(table: LookupTable, ex: QuintEx): QuintEx {
  while (ex.kind === 'name') {
    const def = table.get(ex.id)
    if (def?.kind !== 'def' || def.qualifier !== 'action' || def.importedFrom || def.namespaces?.length) break
    ex = def.expr
  }
  return ex
}

function summarize(table: LookupTable, ex: QuintEx, g: Group): boolean {
  const body = actionBody(table, ex)
  if (body.kind === 'app' && body.opcode === 'actionAll') return body.args.every(e => summarize(table, e, g))
  if (body.kind === 'app' && body.opcode === 'assign') {
    const [lhs, rhs] = body.args
    const target = table.get(lhs.id)
    if (target?.kind !== 'var' || target.importedFrom || target.namespaces?.length || g.assigned.has(target.name))
      return false
    g.assigned.add(target.name)
    if (rhs.kind === 'name' && table.get(rhs.id)?.id === target.id && !table.get(rhs.id)?.importedFrom) return true
    g.writes.add(target.name)
    return valueReads(table, rhs, g, false)
  }
  return valueReads(table, body, g, true)
}

// This analysis depends only on the resolved model. Both evaluators consume
// the same dependency and enabler relation; enabledness is decided at runtime.
export interface StubbornPlan {
  site: bigint
  variables: string[]
  goals: number[]
  conflicts: number[][]
  enablers: number[][]
}

export class StubbornSets {
  private constructor(readonly plan: StubbornPlan) {}

  static forSpec(spec: ExplorationSpec): StubbornSets | undefined {
    const body = actionBody(spec.table, spec.step)
    if (body.kind !== 'app' || body.opcode !== 'actionAny') return undefined
    const observations = group()
    if (![...spec.invariants, ...spec.witnesses].every(ex => valueReads(spec.table, ex, observations, true)))
      return undefined
    const groups = body.args.map(() => group())
    if (!body.args.every((ex, i) => summarize(spec.table, ex, groups[i]))) return undefined
    const variables = new Set([...observations.reads, ...groups.flatMap(g => [...g.reads, ...g.assigned])])
    if (!groups.every(g => [...variables].every(v => g.assigned.has(v)))) return undefined

    // Every path to a new observation or a runtime error contains a goal
    // transition. This landmark makes moving the first selected transition
    // to the front length-preserving, also at a finite depth bound.
    const goals = groups.flatMap((g, i) => (g.mayFail || intersects(g.writes, observations.reads) ? [i] : []))
    if (!goals.length || goals.length === groups.length) return undefined
    return new StubbornSets({
      site: body.id,
      goals,
      variables: [...variables],
      conflicts: groups.map(g =>
        groups.flatMap((h, j) =>
          intersects(g.writes, h.reads) || intersects(h.writes, g.reads) || intersects(g.writes, h.writes) ? [j] : []
        )
      ),
      enablers: groups.map(g =>
        groups.flatMap((h, j) => (intersects(h.writes, g.mayFail ? g.reads : g.guards) ? [j] : []))
      ),
    })
  }

  select(state: RuntimeValue, transitions: Transition[]): Transition[] {
    if (!this.plan.variables.every(v => state.toOrderedMap().has(v))) return transitions
    if (!transitions.every(t => t.event.length === 1 && t.event[0].site === this.plan.site)) return transitions
    const groupOf = (t: Transition) => Number(t.event[0].value.toInt())
    const enabled = new Set(transitions.map(groupOf))
    const selected = new Set(this.plan.goals)
    for (const i of selected) {
      const needed = enabled.has(i) ? this.plan.conflicts[i] : this.plan.enablers[i]
      for (const j of needed) selected.add(j)
    }
    const ample = transitions.filter(t => selected.has(groupOf(t)))
    // Preserve a genuine terminal execution for trace output.
    return ample.length ? ample : transitions
  }
}
