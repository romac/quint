// Larger bounded searches. Build Quint first, then run from any directory:
// node --expose-gc scale.js <working-directory> [case ...]
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { performance } = require('node:perf_hooks')
const { explore } = require('../../dist/src/runtime/exploration/search')
const { loadModel, randomSession, root, seeds } = require('./bench')
const { models, StateKeys, breadthFirst, saveOracle, readOracle } = require('./state-space')

const windowMs = 8000
const configs = {
  'tm4-d7': { model: 'tm4', depth: 7, maxWork: 2000000 },
  'tm4-d9': { model: 'tm4', depth: 9, maxWork: 500000 },
  'tm7-d8': { model: 'tm7', depth: 8, maxWork: 500000 },
  'timeout-d12': { model: 'timeout', depth: 12, maxWork: 500000 },
  'twophase-d14': { model: 'twophase', depth: 14, maxWork: 500000 },
  'log-d12': { model: 'log', depth: 12, maxWork: 2000000 },
}
const oracleDepth = { tm4: 9, tm7: 8, timeout: 12 }
const threeManagers = {
  file: 'examples/classic/distributed/TwoPhaseCommit/two_phase_commit.qnt',
  main: 'two_phase_commit_3',
  invariant: 'consistencyInv',
  goal: 'TM::preparedRMs.size() >= 2',
}

// Coefficient k is the number of states whose shortest path has k transitions.
function twoPhaseCount(n, depth) {
  function power(coefficients) {
    let product = [1]
    for (let i = 0; i < n; i++) {
      const next = Array(product.length + coefficients.length - 1).fill(0)
      product.forEach((p, j) =>
        coefficients.forEach((q, k) => {
          next[j + k] += p * q
        })
      )
      product = next
    }
    return product
  }
  const through = (coefficients, shift) =>
    coefficients.slice(0, Math.max(0, depth + 1 - shift)).reduce((x, y) => x + y, 0)
  return through(power([1, 2, 1]), 0) + through(power([1, 2, 2, 1]), 1) + through(power([1, 1]), 2 * n + 1)
}

function writeJson(file, value) {
  fs.writeFileSync(file + '.tmp', JSON.stringify(value, null, 2) + '\n')
  fs.renameSync(file + '.tmp', file)
}

async function reference(c, spec, dir) {
  if (c.model === 'log') return { method: 'all ternary words through depth', total: (3 ** (c.depth + 1) - 1) / 2 }
  if (c.model === 'twophase') {
    const checks = []
    for (const [n, model, d] of [
      [3, threeManagers, 10],
      [8, models.twophase, 4],
    ]) {
      const modelSpec = n === 8 ? spec : (await loadModel(model)).spec
      const { layers } = breadthFirst(modelSpec, d)
      for (const l of layers) assert.equal(l.distinct, twoPhaseCount(n, l.depth))
      checks.push({ managers: n, layers })
    }
    return { method: 'two-phase-commit shortest-distance polynomial', total: twoPhaseCount(8, c.depth), checks }
  }
  const file = path.join(dir, c.model + '.oracle')
  if (!fs.existsSync(file)) {
    const oracle = breadthFirst(spec, oracleDepth[c.model], layer =>
      console.error('BFS', c.model, layer.depth, layer.distinct)
    )
    saveOracle(file, oracle, c.model)
  }
  const { keys, seen, layer, layers, name } = readOracle(file, c.depth)
  assert.equal(name, c.model)
  if (c.model === 'timeout') assert.equal(seen.size, 2 ** c.depth)
  return { method: 'breadth-first full-state enumeration', total: seen.size, keys, seen, layer, layers }
}

// The word rank is injective across lengths: children of i are 3i+1, 3i+2 and 3i+3.
function counter(c, ref) {
  if (c.model === 'log') {
    const visited = new Uint8Array(ref.total)
    let size = 0
    return {
      get size() {
        return size
      },
      add(state) {
        let rank = 0
        for (const x of state.toOrderedMap().get('logEntries').toList()) {
          const symbol = Number(x.toInt())
          assert.ok(symbol >= 0 && symbol <= 2)
          rank = 3 * rank + 1 + symbol
        }
        assert.ok(rank < visited.length)
        if (!visited[rank]) {
          visited[rank] = 1
          size++
        }
      },
    }
  }
  const keys = ref.keys || new StateKeys()
  const visited = new Set()
  return {
    get size() {
      return visited.size
    },
    add(state) {
      const k = keys.key(state)
      if (ref.seen) assert.ok(ref.seen.has(k), 'Observed a state outside the BFS reference')
      visited.add(k)
    },
  }
}

function systematic(c, spec, strategy, ref, checkpointMs = windowMs) {
  const count = counter(c, ref)
  explore(spec, { maxSteps: 2, strategy })
  global.gc?.()
  let atWindow
  const start = performance.now()
  const r = explore(spec, {
    strategy,
    maxSteps: c.depth,
    maxWork: c.maxWork,
    onState(state) {
      if (atWindow === undefined && performance.now() - start >= checkpointMs) atWindow = count.size
      count.add(state)
    },
  })
  const ms = performance.now() - start
  assert.ok(r.status === 'ok' || r.status === 'incomplete', r.error?.message)
  if (r.status === 'ok' && strategy === 'exhaustive') assert.equal(count.size, ref.total)
  assert.ok(count.size <= ref.total)
  return {
    status: r.status,
    distinct: count.size,
    atWindow: atWindow ?? count.size,
    ms,
    witness: r.witnessed[0],
    ...r.stats,
  }
}

function sampling(c, spec, ref, seed) {
  const count = counter(c, ref)
  let completed = 0,
    atWindow,
    samplesAtWindow
  global.gc?.()
  const start = performance.now()
  const batch = randomSession(c, spec, seed, trace => {
    if (atWindow === undefined && performance.now() - start >= windowMs) {
      atWindow = count.size
      samplesAtWindow = completed
    }
    for (const state of trace) count.add(state)
    completed++
  })
  let hits = 0
  do {
    const r = batch(16)
    assert.equal(r.status, 'ok')
    assert.equal(r.samples, 16)
    hits += r.witnessingTraces[0]
  } while (performance.now() - start < windowMs)
  const ms = performance.now() - start
  assert.ok(count.size <= ref.total)
  return {
    seed: String(seed),
    samplesAtWindow: samplesAtWindow ?? completed,
    atWindow: atWindow ?? count.size,
    samples: completed,
    distinct: count.size,
    witnessingTraces: hits,
    ms,
  }
}

async function runCase(name, dir) {
  const c = { ...models[configs[name].model], ...configs[name] }
  const { spec } = await loadModel(c)
  const ref = await reference(c, spec, dir)
  const { keys, seen, ...evidence } = ref
  const report = { case: name, config: c, windowMs, reference: evidence, systematic: {}, random: [] }
  const file = path.join(dir, name + '.json')
  const types = ['exhaustive', 'por', 'dpor']
  const order = Object.keys(configs).indexOf(name) % types.length
  for (let i = 0; i < types.length; i++) {
    const strategy = types[(order + i) % types.length]
    const r = systematic(c, spec, strategy, ref)
    console.error(name, strategy, r.status, r.distinct, Math.round(r.ms), 'ms')
    report.systematic[strategy] = r
    writeJson(file, report)
  }
  const warm = randomSession(c, spec, seeds.at(-1))
  assert.equal(warm(32).status, 'ok')
  for (const seed of seeds.slice(0, 5)) {
    const r = sampling(c, spec, ref, seed)
    console.error(name, 'random', r.atWindow, r.samplesAtWindow, 'traces')
    report.random.push(r)
    writeJson(file, report)
  }
  return report
}

// Re-run DPOR with the precise evaluation count that completed the BFS.
// Also capture coverage at that BFS run's measured elapsed time.
async function matchBfs(dir) {
  const file = path.join(dir, 'tm7-d8.json')
  const report = JSON.parse(fs.readFileSync(file, 'utf8'))
  const c = { ...report.config }
  const { spec } = await loadModel(c)
  const ref = await reference(c, spec, dir)
  assert.equal(ref.total, report.reference.total)
  c.maxWork = ref.layer.evaluations
  const checkpointMs = ref.layer.ms
  const dpor = systematic(c, spec, 'dpor', ref, checkpointMs)
  report.dporAtBfsBudget = { maxWork: c.maxWork, checkpointMs, ...dpor }
  console.error('DPOR at full BFS work', dpor.status, dpor.distinct, Math.round(dpor.ms), 'ms')
  writeJson(file, report)
}

function environment() {
  return {
    runtimeTree: execFileSync('git', ['rev-parse', 'HEAD:quint/src/runtime'], { cwd: root, encoding: 'utf8' }).trim(),
    node: process.version,
    v8: process.versions.v8,
    os: os.type(),
    release: os.release(),
    arch: os.arch(),
    cpu: os.cpus()[0].model,
  }
}

async function main() {
  const [dir, ...names] = process.argv.slice(2)
  assert.ok(dir, 'Supply a directory for the reference sets and per-case JSON')
  fs.mkdirSync(dir, { recursive: true })
  if (names.length === 1 && names[0] === '--match-bfs') {
    await matchBfs(dir)
  } else {
    for (const name of names.length ? names : Object.keys(configs)) {
      assert.ok(configs[name], 'Unknown case ' + name)
      await runCase(name, dir)
    }
  }
  const cases = Object.keys(configs)
    .filter(n => fs.existsSync(path.join(dir, n + '.json')))
    .map(n => JSON.parse(fs.readFileSync(path.join(dir, n + '.json'), 'utf8')))
  writeJson(path.join(dir, 'scale-results.json'), { environment: environment(), cases })
}

module.exports = { configs, reference, counter, environment, writeJson }
if (require.main === module)
  main().catch(e => {
    console.error(e)
    process.exitCode = 1
  })
