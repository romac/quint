// Side-by-side end-to-end sampling on the full seven-validator instance.
const assert = require('node:assert/strict')
const path = require('node:path')
const { performance } = require('node:perf_hooks')
const { execFileSync } = require('node:child_process')
const { CommandWrapper } = require('../../dist/src/rust/commandWrapper')
const { rv } = require('../../dist/src/runtime/impl/runtimeValue')
const { forEachRustTrace, loadModel, randomSession, root, seeds } = require('./bench')
const { configs, reference, counter, environment, writeJson } = require('./scale')
const { models } = require('./state-space')

async function main() {
  const [dir] = process.argv.slice(2)
  assert.ok(dir, 'Supply the working directory used by scale.js')
  const c = { ...models.tm7, ...configs['tm7-d8'] }
  const samples = 1500
  const file = path.join(root, c.file)
  const { spec } = await loadModel(c)
  const ref = await reference(c, spec, dir)
  const wrapper = new CommandWrapper(0)
  const input = { ...spec, modules: [], main: c.main }
  const report = { environment: environment(), model: 'tm7-d8', samples, threads: 1, trials: [] }
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
    '--n-threads=1',
    '--verbosity=0',
  ]
  function timeCli(backend, seed, n) {
    const start = performance.now()
    execFileSync(process.execPath, [...args, '--backend=' + backend, '--seed=' + seed, '--max-samples=' + n], {
      stdio: ['ignore', 'ignore', 'pipe'],
    })
    return performance.now() - start
  }
  for (const backend of ['typescript', 'rust']) timeCli(backend, seeds.at(-1), 64)
  for (const [index, seed] of seeds.slice(0, 3).entries()) {
    const trial = { seed: String(seed), cliMs: {}, distinct: {} }
    for (const backend of index % 2 ? ['rust', 'typescript'] : ['typescript', 'rust']) {
      trial.cliMs[backend] = timeCli(backend, seed, samples)
    }
    const ts = counter(c, ref)
    const r = randomSession(c, spec, seed, trace => trace.forEach(state => ts.add(state)))(samples)
    assert.equal(r.status, 'ok')
    assert.equal(r.samples, samples)
    trial.distinct.typescript = ts.size
    const native = counter(c, ref)
    let n = 0,
      atBoundary = 0
    await forEachRustTrace(wrapper, input, file, c.depth, seed, samples, trace => {
      for (const state of trace.states) native.add(rv.fromQuintEx(state))
      if (++n === 160) atBoundary = native.size
    })
    assert.equal(n, samples)
    // Compare the first split with an ordinary single invocation on the same seed.
    const check = counter(c, ref)
    const first = await wrapper.simulate(input, file, 160, c.depth, 160, 1, seed, false)
    assert.equal(first.status, 'ok', first.errors[0]?.message)
    assert.equal(first.bestTraces.length, 160)
    for (const trace of first.bestTraces) for (const state of trace.states) check.add(rv.fromQuintEx(state))
    assert.equal(check.size, atBoundary)
    trial.distinct.rust = native.size
    console.error('1500-trace campaign', trial.seed, trial.distinct, trial.cliMs)
    report.trials.push(trial)
    writeJson(path.join(dir, 'scale-rust.json'), report)
  }
}

main().catch(e => {
  console.error(e)
  process.exitCode = 1
})
