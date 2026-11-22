// Run with Node after compiling quint. The measured paths are the ones behind quint run.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { performance } = require('node:perf_hooks')
const { execFileSync } = require('node:child_process')
const { Set: ValueSet } = require('immutable')
const { parse, typecheck } = require('../../dist/src/cliCommands')
const { toExpr } = require('../../dist/src/cliHelpers')
const { newRng } = require('../../dist/src/rng')
const { newTraceRecorder } = require('../../dist/src/runtime/trace')
const { Evaluator } = require('../../dist/src/runtime/impl/evaluator')
const { rv } = require('../../dist/src/runtime/impl/runtimeValue')
const { CommandWrapper } = require('../../dist/src/rust/commandWrapper')
const { explore } = require('../../dist/src/runtime/exploration/search')

const root = path.resolve(__dirname, '../../..')
const fixtures = 'quint/benchmarks/exploration/Models.qnt'
const tendermint = 'examples/cosmos/tendermint/TendermintPOR.qnt'
const twoPhase = 'examples/classic/distributed/TwoPhaseCommit/two_phase_commit.qnt'
const cases = [
  {
    name: 'tendermint-4',
    file: tendermint,
    main: 'TendermintPOR',
    init: 'Init',
    step: 'Next',
    depth: 4,
    invariant: 'Agreement',
    goal: 'reachedQuorum',
  },
  {
    name: 'tendermint-5',
    file: tendermint,
    main: 'TendermintPOR',
    init: 'Init',
    step: 'Next',
    depth: 5,
    invariant: 'Agreement',
    goal: 'reachedQuorum',
  },
  {
    name: 'tendermint-6',
    file: tendermint,
    main: 'TendermintPOR',
    init: 'Init',
    step: 'Next',
    depth: 6,
    invariant: 'Agreement',
    goal: 'reachedQuorum',
  },
  {
    name: 'two-phase-commit',
    file: twoPhase,
    main: 'two_phase_commit_3',
    depth: 5,
    invariant: 'consistencyInv',
    goal: 'TM::preparedRMs.size() >= 2',
  },
  {
    name: 'independent-timeouts',
    file: fixtures,
    main: 'IndependentTimeouts',
    init: 'Init',
    step: 'timeouts',
    depth: 6,
    invariant: 'Agreement',
    goal: 'allTimedOut',
  },
  {
    name: 'guarded-handshake',
    file: fixtures,
    main: 'GuardedHandshake',
    depth: 6,
    invariant: 'valid',
    goal: 'acknowledged',
  },
  { name: 'ordered-log', file: fixtures, main: 'OrderedLog', depth: 6, invariant: 'valid', goal: 'sixTwos' },
]
const strategies = ['exhaustive', 'por', 'dpor']
const fixedSamples = 100
const repetitions = 7
// Each random draw advances Quint's 64-bit counter. Widely spaced initial
// counters avoid adjacent seeds replaying almost the same stream.
const seeds = Array.from({ length: 20 }, (_, i) => BigInt.asUintN(64, BigInt(i + 1) * 0x9e3779b97f4a7c15n))

async function loadModel(c) {
  const file = path.join(root, c.file)
  const parsed = await parse({
    args: { input: file, main: c.main },
    path: file,
    sourceCode: new Map([[file, fs.readFileSync(file, 'utf8')]]),
    stage: 'loading',
  })
  const checked = await parsed.asyncChain(typecheck)
  if (checked.isLeft())
    throw Error(JSON.stringify(checked.value.stage.errors, (_, v) => (typeof v === 'bigint' ? String(v) : v)))
  const tc = checked.unwrap()
  const ex = name => toExpr(tc, name).unwrap()
  const spec = {
    table: tc.resolver.table,
    init: ex(c.init || 'init'),
    step: ex(c.step || 'step'),
    invariants: [ex(c.invariant)],
    witnesses: [ex(c.goal)],
  }
  return { spec, failure: { ...spec, invariants: [ex('not(' + c.goal + ')')], witnesses: [] } }
}

function search(c, spec, strategy, onState, status = 'ok') {
  const r = explore(spec, { strategy, maxSteps: c.depth, onState })
  assert.equal(r.status, status, r.error?.message)
  return r
}

function random(c, spec, seed, samples, onTrace) {
  const rng = newRng(seed)
  const recorder = newTraceRecorder(0, rng)
  if (onTrace) {
    const finish = recorder.onRunReturn.bind(recorder)
    recorder.onRunReturn = (result, trace) => {
      onTrace(trace)
      finish(result, trace)
    }
  }
  const evaluator = new Evaluator(spec.table, recorder, rng)
  const r = evaluator.simulate(spec.init, spec.step, spec.invariants[0], spec.witnesses, samples, c.depth, 1)
  assert.ok(r.status === 'ok' || r.status === 'violation', r.errors[0]?.message)
  return r
}

function stateCollector() {
  let states = ValueSet()
  let visits = 0
  return {
    add(state) {
      states = states.add(state.normalForm())
      visits++
    },
    get states() {
      return states
    },
    get visits() {
      return visits
    },
  }
}

function elapsed(fn, batch = 1) {
  const start = performance.now()
  for (let i = 0; i < batch; i++) fn()
  return (performance.now() - start) / batch
}

function quantile(xs, q) {
  const sorted = [...xs].sort((a, b) => a - b)
  const offset = (sorted.length - 1) * q
  const left = Math.floor(offset)
  return sorted[left] + (offset - left) * (sorted[Math.ceil(offset)] - sorted[left])
}
const median = xs => quantile(xs, 0.5)

// Rotate the order each round. Batch short searches so timer resolution and
// an individual GC have less influence on the reported per-search wall time.
function measure(jobs) {
  const names = Object.keys(jobs)
  const batches = {}
  const milliseconds = {}
  for (const name of names) {
    jobs[name](seeds.at(-1))
    const warm = elapsed(() => jobs[name](seeds.at(-2)))
    batches[name] = Math.min(64, Math.max(1, Math.ceil(35 / Math.max(0.1, warm))))
    milliseconds[name] = []
  }
  for (let round = 0; round < repetitions; round++) {
    for (let j = 0; j < names.length; j++) {
      const name = names[(j + round) % names.length]
      milliseconds[name].push(elapsed(() => jobs[name](seeds[round]), batches[name]))
    }
  }
  return { batches, milliseconds }
}

function calibrate(c, spec, targetMs, fixedMs) {
  let samples = Math.max(1, Math.round((fixedSamples * targetMs) / fixedMs))
  for (let i = 0; i < 3; i++) {
    const measured = median(seeds.slice(-3).map(seed => elapsed(() => random(c, spec, seed, samples))))
    const next = Math.max(1, Math.round((samples * targetMs) / measured))
    if (next === samples || Math.abs(measured / targetMs - 1) <= 0.08) break
    samples = next
  }
  return samples
}

function randomCoverage(c, spec, failure, seed, matchedSamples, oracle) {
  const limits = new Set([1, 10, fixedSamples, matchedSamples])
  const cap = Math.max(...limits)
  const count = stateCollector()
  const coverage = {}
  let samples = 0
  const outcome = random(c, spec, seed, cap, trace => {
    trace.forEach(count.add)
    if (limits.has(++samples)) coverage[samples] = count.states.size
  })
  assert.equal(outcome.status, 'ok')
  assert.equal(outcome.samples, cap)
  assert.equal(samples, cap)
  assert.ok(count.states.isSubset(oracle), 'Sampling reached a state outside the exhaustive reference')
  // Rerun the identical random stream with the target negated as an invariant.
  // All benchmark predicates are deterministic, so checking them consumes no draws.
  const probe = random(c, failure, seed, cap)
  const firstHit = probe.status === 'violation' ? probe.samples : null
  assert.equal(outcome.witnessingTraces[0] > 0, firstHit !== null)
  return { coverage, firstHit }
}

async function benchmark(c) {
  const { spec, failure } = await loadModel(c)
  const jobs = Object.fromEntries(strategies.map(s => [s, () => search(c, spec, s)]))
  jobs.random100 = seed => assert.equal(random(c, spec, seed, fixedSamples).status, 'ok')
  const timing = measure(jobs)
  const matchedSamples = calibrate(c, spec, median(timing.milliseconds.dpor), median(timing.milliseconds.random100))
  const matchedTiming = measure({ randomMatched: seed => random(c, spec, seed, matchedSamples) })
  Object.assign(timing.batches, matchedTiming.batches)
  Object.assign(timing.milliseconds, matchedTiming.milliseconds)

  let oracle
  const systematic = {}
  for (const strategy of strategies) {
    const seen = stateCollector()
    const r = search(c, spec, strategy, seen.add)
    assert.deepEqual(r.witnessed, [true])
    assert.equal(seen.visits, r.stats.prefixes)
    if (strategy === 'exhaustive') oracle = seen.states
    assert.ok(seen.states.isSubset(oracle))
    if (strategy !== 'por' || r.stats.stubbornPruned === 0)
      assert.ok(seen.states.equals(oracle), 'Missing reachable states: ' + c.name + '/' + strategy)
    const violation = search(c, failure, strategy, undefined, 'violation')
    systematic[strategy] = {
      states: seen.states.size,
      ...r.stats,
      firstViolation: { depth: violation.trace.length - 1, evaluations: violation.stats.evaluations },
    }
  }
  const trials = seeds.map(seed => randomCoverage(c, spec, failure, seed, matchedSamples, oracle))
  return { ...c, timing, systematic, matchedSamples, trials }
}

async function transientProbe() {
  const c = { ...cases[0], step: 'timeoutStep', invariant: 'phaseOrder', depth: 1 }
  const { spec } = await loadModel(c)
  const systematic = Object.fromEntries(
    strategies.map(strategy => {
      const r = search(c, spec, strategy, undefined, 'violation')
      assert.equal(r.trace.length, 2)
      return [strategy, r.stats.evaluations]
    })
  )
  const firstHit = seeds.map(seed => {
    const r = random(c, spec, seed, 10)
    return r.status === 'violation' ? r.samples : null
  })
  return {
    model: c.file,
    step: c.step,
    invariant: c.invariant,
    depth: c.depth,
    systematicEvaluations: systematic,
    firstHit,
  }
}

// CLI wall times include startup, the front end and Rust process transport.
// Coverage is collected separately with all traces requested from a single Rust worker.
async function rustComparison() {
  const c = cases.find(c => c.name === 'tendermint-5')
  const { spec } = await loadModel(c)
  const seen = stateCollector()
  search(c, spec, 'exhaustive', seen.add)
  const wrapper = new CommandWrapper(0)
  const file = path.join(root, c.file)
  const input = { ...spec, modules: [], main: c.main }
  const trials = []
  for (const seed of seeds) {
    const r = await wrapper.simulate(input, file, fixedSamples, c.depth, fixedSamples, 1, seed, false)
    assert.equal(r.status, 'ok', r.errors[0]?.message)
    assert.equal(r.samples, fixedSamples)
    assert.equal(r.bestTraces.length, fixedSamples)
    const count = stateCollector()
    for (const trace of r.bestTraces) for (const state of trace.states) count.add(rv.fromQuintEx(state))
    assert.ok(count.states.isSubset(seen.states), 'Rust state outside the exhaustive reference')
    trials.push({ states: count.states.size, hit: r.witnessingTraces[0] > 0 })
  }
  const timeCli = (name, seed, samples = 1000) => {
    const args = [
      path.join(root, 'quint/dist/src/cli.js'),
      'run',
      file,
      '--main=' + c.main,
      '--init=' + c.init,
      '--step=' + c.step,
      '--invariant=' + c.invariant,
      '--witnesses=' + c.goal,
      '--max-steps=' + c.depth,
      '--verbosity=0',
    ]
    if (name.startsWith('random'))
      args.push(
        '--backend=' + (name === 'randomTS' ? 'typescript' : 'rust'),
        '--max-samples=' + samples,
        '--n-threads=1',
        '--seed=' + seed
      )
    else args.push('--strategy=' + name)
    return elapsed(() => execFileSync(process.execPath, args, { stdio: ['ignore', 'ignore', 'pipe'] }))
  }
  const milliseconds = {}
  const names = ['randomTS', 'randomRust', 'exhaustive', 'por', 'dpor']
  for (const name of names) milliseconds[name] = []
  for (let round = -1; round < 5; round++) {
    for (let j = 0; j < names.length; j++) {
      const name = names[(j + round + names.length) % names.length]
      const t = timeCli(name, seeds[(round + seeds.length) % seeds.length])
      if (round >= 0) milliseconds[name].push(t)
    }
  }
  // A fresh CLI invocation has a sizeable fixed cost. Fit two batch sizes
  // instead of extrapolating throughput from a single sample count.
  const target = median(milliseconds.dpor)
  const time1000 = median(milliseconds.randomRust)
  const time4000 = median(seeds.slice(-3).map(seed => timeCli('randomRust', seed, 4000)))
  assert.ok(time4000 > time1000, 'Rust calibration needs a positive marginal cost per trace')
  const msPerTrace = (time4000 - time1000) / 3000
  let matchedSamples = Math.max(1, Math.round(1000 + (target - time1000) / msPerTrace))
  for (let i = 0; i < 2; i++) {
    milliseconds.rustMatched = seeds.slice(0, 5).map(seed => timeCli('randomRust', seed, matchedSamples))
    const measured = median(milliseconds.rustMatched)
    if (i === 0 && Math.abs(measured / target - 1) > 0.12) {
      matchedSamples = Math.max(1, Math.round(matchedSamples + (target - measured) / msPerTrace))
    } else break
  }
  console.error('Collecting Rust coverage at 100, 1000 and', matchedSamples, 'traces')
  const cutoffs = new Set([fixedSamples, 1000, matchedSamples])
  const cap = Math.max(...cutoffs)
  for (const [index, seed] of seeds.entries()) {
    const count = stateCollector()
    const coverage = {}
    let start = seed
    let samples = 0
    // Rust returns traces ranked by quality. Recover their order from each
    // trace's starting RNG counter. Replay one overlapping trace between
    // batches to continue the original campaign with bounded export memory.
    while (samples < cap) {
      const take = Math.min(160, cap - samples)
      const requested = take + Number(samples + take < cap)
      const r = await wrapper.simulate(input, file, requested, c.depth, requested, 1, start, false)
      assert.equal(r.status, 'ok', r.errors[0]?.message)
      assert.equal(r.bestTraces.length, requested)
      const ordered = r.bestTraces.sort((a, b) => (a.seed < b.seed ? -1 : a.seed > b.seed ? 1 : 0))
      assert.equal(ordered[0].seed, start)
      assert.ok(ordered.every((t, j) => !j || t.seed > ordered[j - 1].seed))
      for (const trace of ordered.slice(0, take)) {
        for (const state of trace.states) count.add(rv.fromQuintEx(state))
        if (cutoffs.has(++samples)) coverage[samples] = count.states.size
      }
      if (requested > take) start = ordered[take].seed
    }
    assert.ok(count.states.isSubset(seen.states))
    assert.equal(coverage[fixedSamples], trials[index].states)
    trials[index].coverage = coverage
  }
  return {
    model: c.name,
    coverageSamples: fixedSamples,
    timedRandomSamples: 1000,
    matchedSamples,
    threads: 1,
    trials,
    cliMilliseconds: milliseconds,
  }
}

async function main() {
  const args = process.argv.slice(2)
  const outputIndex = args.indexOf('--output')
  let output
  if (outputIndex >= 0) {
    output = args[outputIndex + 1]
    assert.ok(output && !output.startsWith('--'), 'Supply a JSON filename after --output')
    args.splice(outputIndex, 2)
  }
  const rustOnly = args.includes('--rust-only')
  const names = args.filter(s => s !== '--rust' && s !== '--rust-only')
  for (const name of names)
    assert.ok(
      cases.some(c => c.name === name),
      'Unknown model: ' + name
    )
  const results = {
    runtimeTree: execFileSync('git', ['rev-parse', 'HEAD:quint/src/runtime'], { cwd: root, encoding: 'utf8' }).trim(),
    environment: {
      node: process.version,
      v8: process.versions.v8,
      os: os.platform(),
      kernel: os.release(),
      arch: os.arch(),
      cpu: os.cpus()[0]?.model,
    },
    repetitions,
    fixedSamples,
    seeds: seeds.map(String),
    cases: [],
  }
  const checkpoint = () => {
    if (!output) return
    fs.writeFileSync(output + '.tmp', JSON.stringify(results, null, 2) + '\n')
    fs.renameSync(output + '.tmp', output)
  }
  for (const c of cases.filter(c => !rustOnly && (!names.length || names.includes(c.name)))) {
    console.error('Measuring ' + c.name)
    const result = await benchmark(c)
    results.cases.push(result)
    checkpoint()
    console.error(c.name, 'states:', result.systematic.exhaustive.states, 'matched samples:', result.matchedSamples)
  }
  if (!rustOnly) results.transient = await transientProbe()
  if (rustOnly || args.includes('--rust')) {
    console.error('Measuring single-worker Rust coverage and fresh CLI processes')
    results.rust = await rustComparison()
  }
  checkpoint()
  if (!output) console.log(JSON.stringify(results, null, 2))
}
main().catch(err => {
  console.error(err)
  process.exitCode = 1
})
