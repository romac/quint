// Concrete reads include guards, choice domains and reads inside called operators.
// A missing key denotes the entire variable. Overlapping accesses are dependent
// unless both updates are blind inserts or assign the same literal.
import { QuintApp, QuintEx } from '../../ir/quintIr'
import { walkExpression } from '../../ir/IRVisitor'
import { LookupTable } from '../../names/base'
import { RuntimeValue } from '../impl/runtimeValue'
import type { EvalFunction } from '../impl/builder'
import type { builtinLambda } from '../impl/builtins'

interface Location {
  name: string
  key?: RuntimeValue
  members?: RuntimeValue
}

interface Update extends Location {
  insert?: boolean
  literal?: RuntimeValue
}

function overlaps(a: Location, b: Location): boolean {
  if (a.name !== b.name) return false
  if (a.members && b.key !== undefined) return a.members.contains(b.key)
  if (b.members && a.key !== undefined) return b.members.contains(a.key)
  return a.key === undefined || b.key === undefined || a.key.equals(b.key)
}

// m.setBy(k, old => old.union(delta)) preserves the bucket and only inserts
// elements if delta is independent of old. Reads used to compute delta are
// still recorded when the lambda runs.
function isBucketInsertion(expr: QuintApp, table: LookupTable): boolean {
  const lambda = expr.args[2]
  if (expr.opcode !== 'setBy' || lambda?.kind !== 'lambda' || lambda.params.length !== 1) return false
  const body = lambda.expr
  const param = lambda.params[0].id
  if (
    body.kind !== 'app' ||
    body.opcode !== 'union' ||
    table.has(body.id) ||
    body.args[0].kind !== 'name' ||
    table.get(body.args[0].id)?.id !== param
  )
    return false
  let dependsOnOld = false
  walkExpression(
    {
      enterExpr: e => {
        if (table.get(e.id)?.id === param) dependsOnOld = true
      },
    },
    body.args[1]
  )
  return !dependsOnOld
}

/** Instrument direct collection operations while keeping the normal evaluator's
 * eager application loop free of per-argument tracing. */
export function trackedBuiltin(
  expr: QuintApp,
  table: LookupTable,
  [collection, ...args]: EvalFunction[],
  apply: ReturnType<typeof builtinLambda>
): EvalFunction {
  const bucketInsertion = isBucketInsertion(expr, table)
  return ctx => {
    const accesses = ctx.accesses
    const start = accesses?.reads.length
    return collection(ctx).chain(value => {
      const base =
        accesses && start !== undefined && accesses.reads.length === start + 1 ? accesses.reads[start] : undefined
      const values = [value]
      for (const arg of args) {
        const result = arg(ctx)
        if (result.isLeft()) return result
        values.push(result.value)
      }
      const result = apply(ctx, values)
      if (base && result.isRight()) accesses!.builtin(expr.id, expr.opcode, base, values[1], bucketInsertion)
      return result
    })
  }
}

export class Accesses {
  readonly reads: Location[] = []
  readonly writes: Update[] = []
  readonly frames = new Set<string>()
  readonly unset = new Set<string>()
  // Describes the outermost collection operation just evaluated. An update
  // of a collection is local only if assigned back to the very same variable.
  private collection?: { expr: bigint; base: Location; key?: RuntimeValue; insert?: boolean; members?: RuntimeValue }

  builtin(expr: bigint, op: string, base: Location, arg: RuntimeValue, bucketInsertion: boolean) {
    switch (op) {
      case 'get':
      case 'field':
      case 'contains':
        base.key = arg
        break
      case 'set':
      case 'setBy':
      case 'put':
        this.collection = { expr, base, key: arg, insert: bucketInsertion }
        break
      case 'union':
        this.collection = { expr, base, insert: true, members: arg }
        break
    }
  }

  assignment(name: string, rhs: QuintEx, firstRead: number, value: RuntimeValue) {
    const base = this.reads[firstRead]
    if (rhs.kind === 'name' && this.reads.length === firstRead + 1 && base.name === name && base.key === undefined) {
      // Only a syntactic variable reference may be recognized as a frame.
      // The caller checks that the name resolves to a variable.
      this.frames.add(name)
      this.reads.pop()
      return
    }
    if (
      this.collection?.expr === rhs.id &&
      this.collection.base.name === name &&
      this.reads.indexOf(this.collection.base) >= firstRead
    ) {
      const collection = this.collection
      this.collection = undefined
      if (collection.insert) {
        // s' = s.union(t). Reads used to compute t stay in the footprint.
        this.reads.splice(this.reads.indexOf(collection.base), 1)
        this.writes.push({ name, key: collection.key, insert: true, members: collection.members })
      } else {
        // Both membership and the old value for setBy are local to this key.
        collection.base.key = collection.key
        this.writes.push({ name, key: collection.key })
      }
      return
    }
    const literal = rhs.kind === 'int' || rhs.kind === 'str' || rhs.kind === 'bool' ? value : undefined
    this.writes.push({ name, literal })
  }

  independent(other: Accesses): boolean {
    // An explicit frame reads an initialized register; an omitted assignment
    // clears it. Moving a frame past a clear could turn success into an error.
    for (const name of this.unset) if (other.frames.has(name)) return false
    for (const name of other.unset) if (this.frames.has(name)) return false
    return (
      !this.writes.some(a => other.reads.some(b => overlaps(a, b))) &&
      !other.writes.some(a => this.reads.some(b => overlaps(a, b))) &&
      !this.writes.some(a =>
        other.writes.some(
          b => overlaps(a, b) && !(a.insert && b.insert) && !(a.literal && b.literal && a.literal.equals(b.literal))
        )
      )
    )
  }
}
