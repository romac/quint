// Equality uses normalized Quint values. Intern fields so many states sharing
// a validator map or message set can be counted without copying that value.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { performance } = require('node:perf_hooks')
const { Map: ValueMap } = require('immutable')
const { Machine } = require('../../dist/src/runtime/exploration/machine')
const { WorkLimit } = require('../../dist/src/runtime/exploration/choices')
const { rv } = require('../../dist/src/runtime/impl/runtimeValue')
const { loadModel } = require('./bench')
const fixtures = 'quint/benchmarks/exploration/ScaleModels.qnt'
const models = {
  tm4: {
    file: 'examples/cosmos/tendermint/TendermintPOR.qnt',
    main: 'TendermintPOR',
    init: 'Init',
    step: 'Next',
    invariant: 'Agreement',
    goal: 'reachedQuorum',
  },
  tm7: {
    file: fixtures,
    main: 'SevenValidators',
    init: 'Init',
    step: 'Next',
    invariant: 'Agreement',
    goal: 'reachedQuorum',
  },
  timeout: {
    file: fixtures,
    main: 'TwelveTimeouts',
    init: 'Init',
    step: 'timeouts',
    invariant: 'Agreement',
    goal: 'allTimedOut',
  },
  twophase: { file: fixtures, main: 'TwoPhaseEight', invariant: 'consistencyInv', goal: 'fourPrepares' },
  log: {
    file: 'quint/benchmarks/exploration/Models.qnt',
    main: 'OrderedLog',
    invariant: 'valid',
    goal: 'logEntries == [' + Array(12).fill(2).join(',') + ']',
  },
}

class StateKeys {
  constructor(values = [], names) {
    this.ids = new Map()
    this.cache = new WeakMap()
    this.values = []
    this.names = names
    for (const v of values) this.intern(rv.fromQuintEx(v))
  }
  intern(value) {
    let id = this.cache.get(value)
    if (id !== undefined) return id
    const normalized = value.normalForm()
    // Keep Quint types separate. Set-like runtime values of different types
    // can have the same enumerated elements (e.g. an empty set and a map).
    const type = normalized.constructor
    if (!this.ids.has(type)) this.ids.set(type, ValueMap().asMutable())
    const ids = this.ids.get(type)
    id = ids.get(normalized)
    if (id === undefined) {
      id = this.values.length
      ids.set(normalized, id)
      this.values.push(normalized)
    }
    this.cache.set(value, id)
    return id
  }
  key(state) {
    const fields = state.toOrderedMap()
    if (!this.names) this.names = fields.keySeq().toArray()
    assert.equal(fields.size, this.names.length)
    // All these models fully assign the same variable set in every step.
    return this.names.map(name => this.intern(fields.get(name))).join(',')
  }
}

// Expanding a state at its shortest distance leaves the greatest remaining
// depth. The examples have state predicates and history-free atomic steps.
function breadthFirst(spec, depth, afterLayer = () => {}, maxWork = Infinity, windowMs = Infinity) {
  const machine = new Machine(spec, false, maxWork)
  const keys = new StateKeys()
  const seen = new Set()
  let frontier = []
  let firstWitness = null
  const layers = []
  const start = performance.now()
  let atWindow
  let status = 'ok'
  const admit = (transition, level, next) => {
    const k = keys.key(transition.state)
    if (seen.has(k)) return
    if (windowMs !== Infinity && atWindow === undefined && performance.now() - start >= windowMs) atWindow = seen.size
    seen.add(k)
    next.push(transition.state)
    const observation = machine.observe(transition.state)
    assert.deepEqual(observation.violated, [])
    if (firstWitness === null && observation.witnessed.length) firstWitness = level
  }
  try {
    for (const t of machine.successors(rv.mkRecord([]), machine.init)) admit(t, 0, frontier)
    for (let i = 0; i <= depth; i++) {
      const layer = {
        depth: i,
        distinct: seen.size,
        newStates: frontier.length,
        firstWitness,
        evaluations: machine.evaluations,
        ms: performance.now() - start,
      }
      layers.push(layer)
      afterLayer(layer)
      if (i === depth) break
      const next = []
      for (const state of frontier) for (const t of machine.successors(state, machine.step)) admit(t, i + 1, next)
      frontier = next
    }
  } catch (e) {
    if (!(e instanceof WorkLimit)) throw e
    status = 'incomplete'
  }
  return {
    keys,
    seen,
    layers,
    status,
    distinct: seen.size,
    atWindow: atWindow ?? seen.size,
    firstWitness,
    evaluations: machine.evaluations,
    ms: performance.now() - start,
  }
}

const encode = (_, v) => (typeof v === 'bigint' ? String(v) : v)
function saveOracle(file, oracle, name) {
  const { keys, seen, layers } = oracle
  const payload = { name, layers, names: keys.names, values: keys.values.map(rv.toQuintEx), states: [...seen] }
  fs.writeFileSync(file + '.tmp', JSON.stringify(payload, encode))
  fs.renameSync(file + '.tmp', file)
}
function readOracle(file, depth) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'), (_, v) => {
    if (v?.kind === 'int') v.value = BigInt(v.value)
    return v
  })
  const layer = data.layers.find(x => x.depth === depth)
  assert.ok(layer, 'Oracle does not cover depth ' + depth)
  const seen = new Set(data.states.slice(0, layer.distinct))
  const keys = new StateKeys(data.values, data.names)
  assert.equal(keys.values.length, data.values.length)
  return { seen, keys, layer, layers: data.layers.slice(0, depth + 1), name: data.name }
}

async function run() {
  const [name, d, out, cap] = process.argv.slice(2)
  assert.ok(models[name] && out && Number.isSafeInteger(Number(d)) && Number(d) >= 0)
  const { spec } = await loadModel(models[name])
  const maxWork = cap === undefined ? Infinity : Number(cap)
  assert.ok(maxWork === Infinity || (Number.isSafeInteger(maxWork) && maxWork > 0))
  const onLayer = level => console.error(name, JSON.stringify(level))
  const windowMs = 8000
  const ref = breadthFirst(spec, Number(d), onLayer, maxWork, windowMs)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  if (cap === undefined) {
    saveOracle(out, ref, name)
  } else {
    const { keys, seen, ...measurement } = ref
    fs.writeFileSync(
      out,
      JSON.stringify({ model: name, depth: Number(d), maxWork, windowMs, ...measurement }, null, 2) + '\n'
    )
  }
}

module.exports = { models, StateKeys, breadthFirst, saveOracle, readOracle }
if (require.main === module)
  run().catch(e => {
    console.error(e)
    process.exitCode = 1
  })
