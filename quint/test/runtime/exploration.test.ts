import { assert } from 'chai'
import { describe, it } from 'mocha'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { parse, stage, typecheck } from '../../src/cliCommands'
import { toExpr } from '../../src/cliHelpers'
import { Strategy, explore } from '../../src/runtime/exploration/search'
import { readSchedule, writeSchedule } from '../../src/runtime/exploration/schedule'

const strategies: Strategy[] = ['exhaustive', 'por', 'dpor']

async function model(body: string, file?: string) {
  const path = file ?? resolve('Model.qnt')
  const source = file ? readFileSync(path, 'utf8') : 'module Model {\n' + body + '\n}'
  const parsed = await parse({
    args: { input: path },
    path,
    sourceCode: new Map([[path, source]]),
    stage: 'loading' as stage,
  })
  const checked = await parsed.asyncChain(typecheck)
  if (checked.isLeft()) assert.fail(JSON.stringify(checked.value.stage.errors))
  const tc = checked.unwrap()
  const ex = (text: string) => toExpr(tc, text).unwrap()
  return (invariant = 'true', witnesses: string[] = [], step = 'step', init = 'init') => ({
    table: tc.resolver.table,
    init: ex(init),
    step: ex(step),
    invariants: [ex(invariant)],
    witnesses: witnesses.map(ex),
  })
}

describe('systematic exploration', () => {
  it('enumerates data-dependent nested picks and all initial states, skipping disabled choices', async () => {
    const make = await model(`
      var x: int
      action init = { nondet a = Set(0, 10).oneOf() x' = a }
      action step = any {
        { nondet a = 1.to(3).oneOf() nondet b = 0.to(a).oneOf() all { a != 2, x' = x + 10*a + b } },
        { nondet e = Set().oneOf() x' = e },
      }`)
    const spec = make('true', ['x == 10', 'x == 43', 'x == 25'])
    for (const strategy of strategies) {
      const r = explore(spec, { strategy, maxSteps: 1 })
      assert.equal(r.status, 'ok', r.error?.message)
      assert.deepEqual(r.witnessed, [true, true, false])
      assert.equal(r.stats.schedules, 12)
    }
  })

  it('lazily explores huge powersets and reports a finite work budget as incomplete', async () => {
    const make = await model(`
      var s: Set[int]
      action init = { nondet pick = 1.to(2^70).powerset().oneOf() s' = pick }
      action step = s' = s`)
    for (const strategy of strategies) {
      assert.equal(explore(make(), { strategy, maxSteps: 0, maxWork: 2 }).status, 'incomplete')
      const r = explore(make('s == Set()'), { strategy, maxSteps: 0, maxWork: 2 })
      assert.equal(r.status, 'violation')
    }
  })

  it('round-trips concrete data picks with composite domains and large integers', async () => {
    const make = await model(`
      var x: int
      action init = x' = 0
      action step = {
        nondet pair = tuples(Set(2^70), Set("k").setOfMaps(Set(1, 2))).oneOf()
        x' = pair._1 + pair._2.get("k")
      }`)
    const spec = make('x != 2^70 + 2')
    const r = explore(spec, { strategy: 'dpor', maxSteps: 1 })
    assert.equal(r.status, 'violation', r.error?.message)
    const serialized = writeSchedule(r.schedule)
    const replay = explore(spec, { strategy: 'dpor', maxSteps: 1, replay: readSchedule(serialized) })
    assert.equal(replay.status, 'violation', replay.error?.message)
    assert.isTrue(r.trace[1].equals(replay.trace[1]))
    const malformed = JSON.parse(serialized)
    malformed.events[1][0].value = { kind: 'bool', value: 'false' }
    assert.throws(() => readSchedule(JSON.stringify(malformed)), 'Invalid Quint value')
    const wrongConstructor = JSON.parse(serialized)
    wrongConstructor.events[1][0].value.opcode = 'List'
    const tampered = explore(spec, {
      strategy: 'dpor',
      maxSteps: 1,
      replay: readSchedule(JSON.stringify(wrongConstructor)),
    })
    assert.include(tampered.error!.message, 'diverged')
    const wrong = explore(spec, { strategy: 'dpor', maxSteps: 1, replay: [[], []] })
    assert.equal(wrong.status, 'error')
    assert.include(wrong.error!.message, 'diverged')
  })

  it('constructs a stubborn set containing the enabler of a disabled goal', async () => {
    const make = await model(`
      var gate: int
      var done: int
      var noise: int
      action init = all { gate' = 0, done' = 0, noise' = 0 }
      action distract = all { noise < 3, noise' = noise + 1, gate' = gate, done' = done }
      action finish = all { gate == 1, done' = 1, gate' = gate, noise' = noise }
      action enable = all { gate == 0, gate' = 1, done' = done, noise' = noise }
      action step = any { distract, finish, enable }`)
    const spec = make('done == 0')
    for (const strategy of strategies) {
      assert.equal(explore(spec, { strategy, maxSteps: 1 }).status, 'ok')
      const r = explore(spec, { strategy, maxSteps: 2 })
      assert.equal(r.status, 'violation')
      if (strategy === 'por') assert.isAbove(r.stats.stubbornPruned, 0)
    }
  })

  it('preserves each bounded observation across guards, cycles and growing or shrinking choice domains', async () => {
    const make = await model(`
      var bag: Set[int]
      var last: int
      action init = all { bag' = Set(), last' = 0 }
      action step = any {
        { nondet i = Set(1, 2).oneOf() all { bag' = bag.union(Set(i)), last' = last } },
        { nondet i = bag.oneOf() all { bag' = bag.exclude(Set(i)), last' = i } },
        all { bag == Set(1), bag' = bag, last' = 3 },
      }`)
    const witnesses = ['Set()', 'Set(1)', 'Set(2)', 'Set(1, 2)'].flatMap(bag =>
      [0, 1, 2, 3].map(last => `bag == ${bag} and last == ${last}`)
    )
    const spec = make('true', witnesses)
    for (let depth = 0; depth <= 4; depth++) {
      const oracle = explore(spec, { strategy: 'exhaustive', maxSteps: depth })
      for (const strategy of ['por', 'dpor'] as const) {
        const r = explore(spec, { strategy, maxSteps: depth })
        assert.equal(r.status, oracle.status)
        assert.deepEqual(r.witnessed, oracle.witnessed)
      }
    }
  })

  it('discovers concrete diamonds beyond disjoint read and write sets', async () => {
    const make = await model(`var x: int
      action init = x' = 0
      action step = { nondet i = Set(1, 2).oneOf() x' = x + i }`)
    const spec = make('true', ['x == 1', 'x == 2', 'x == 3', 'x == 4'])
    const oracle = explore(spec, { strategy: 'exhaustive', maxSteps: 2 })
    const reduced = explore(spec, { strategy: 'dpor', maxSteps: 2 })
    assert.deepEqual(reduced.witnessed, oracle.witnessed)
    assert.equal(oracle.stats.schedules, 4)
    assert.equal(reduced.stats.schedules, 3)
    assert.isAbove(reduced.stats.diamonds, 0)
  })

  it('detects infinite domains, evaluator failures, invalid replay, and history-dependent actions', async () => {
    const make = await model(`
      var x: int
      action init = x' = 0
      action step = { nondet i = Nat.oneOf() x' = i }
      action faulty = { nondet i = Set(0, 1).oneOf() all { assert(i == 0), x' = i } }
      action history = x' = q::lastTrace.length()`)
    const infinity = explore(make(), { strategy: 'dpor', maxSteps: 1 })
    assert.equal(infinity.status, 'error')
    assert.include(infinity.error!.message, 'finite')
    const spec = make('true', [], 'faulty')
    const r = explore(spec, { strategy: 'dpor', maxSteps: 1 })
    assert.equal(r.status, 'error')
    const replay = explore(spec, { strategy: 'dpor', maxSteps: 1, replay: readSchedule(writeSchedule(r.schedule)) })
    assert.equal(replay.error!.message, r.error!.message)
    const extraChoice = [...r.schedule.slice(0, -1), [...r.schedule.at(-1)!, ...r.schedule.at(-1)!]]
    const diverged = explore(spec, { strategy: 'dpor', maxSteps: 1, replay: extraChoice })
    assert.include(diverged.error!.message, 'diverged')
    assert.equal(explore(make('true', [], 'history'), { strategy: 'por', maxSteps: 1 }).status, 'error')
  })

  it('resolves choice used as a boolean guard before taking the else branch', async () => {
    const make = await model(`
      var x: int
      action init = x' = 0
      action enabledGuard = any { false, true }
      action disabledGuard = { nondet n = Set(1, 2).oneOf() n == 3 }
      action step = if (enabledGuard and not(disabledGuard)) x' = 1 else x' = 2`)
    for (const strategy of strategies) {
      const r = explore(make('x != 2', ['x == 1']), { strategy, maxSteps: 2 })
      assert.equal(r.status, 'ok', r.error?.message)
      assert.deepEqual(r.witnessed, [true])
    }
  })

  it('checks state-dependent diamonds against the oracle on generated finite transition systems', async () => {
    // A table entry of -1 disables the event. Same-state successors, cycles,
    // competing events and newly enabled events all occur in these machines.
    let seed = 37
    const draw = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
      return seed
    }
    for (let j = 0; j < 16; j++) {
      const rows = Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => ((draw() >>> 8) % 5) - 1))
      const make = await model(`
        var s: int
        pure val rows = ${JSON.stringify(rows)}
        action init = s' = 0
        action step = {
          nondet e = 0.to(2).oneOf()
          val target = rows.nth(e).nth(s)
          all { target >= 0, s' = target }
        }`)
      const checked = make(
        'true',
        [0, 1, 2, 3].map(i => 's == ' + i)
      )
      for (let depth = 0; depth <= 4; depth++) {
        const oracle = explore(checked, { strategy: 'exhaustive', maxSteps: depth })
        assert.equal(oracle.status, 'ok', oracle.error?.message)
        for (const strategy of ['por', 'dpor'] as const) {
          const reduced = explore(checked, { strategy, maxSteps: depth })
          assert.equal(reduced.status, 'ok', reduced.error?.message)
          assert.deepEqual(reduced.witnessed, oracle.witnessed, `machine ${j}, depth ${depth}`)
        }
      }
    }
  }).timeout(20000)

  it('reduces Tendermint timeouts and preserves quorum reachability and transient violations', async () => {
    const make = await model('', resolve('../examples/cosmos/tendermint/TendermintPOR.qnt'))
    const block = make('Agreement', [], 'timeoutStep', 'Init')
    assert.equal(explore(block, { strategy: 'exhaustive', maxSteps: 3 }).stats.schedules, 6)
    for (const strategy of ['por', 'dpor'] as const) {
      const r = explore(block, { strategy, maxSteps: 3 })
      assert.equal(r.status, 'ok', r.error?.message)
      assert.equal(r.stats.schedules, 1)
      assert.equal(r.stats.prefixes, 8)
    }
    const quorum = make('Agreement', ['reachedQuorum'], 'quorumStep', 'Init')
    const phases = make('phaseOrder', [], 'timeoutStep', 'Init')
    for (const strategy of strategies) {
      assert.deepEqual(explore(quorum, { strategy, maxSteps: 3 }).witnessed, [false])
      assert.deepEqual(explore(quorum, { strategy, maxSteps: 4 }).witnessed, [true])
      assert.equal(explore(phases, { strategy, maxSteps: 1 }).status, 'violation')
    }
  }).timeout(20000)
})
