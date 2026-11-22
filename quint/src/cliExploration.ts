import { readFileSync, writeFileSync } from 'fs'
import { mergeInMany, right } from '@sweet-monads/either'
import type { CLIProcedure, TracingStage, TypecheckedStage } from './cliCommands'
import { mkErrorMessage, toExpr } from './cliHelpers'
import { cliErr, maybePrintCounterExample, printViolatedInvariantsByIndex } from './cliReporting'
import { QuintEx } from './ir/quintIr'
import { SimulatorOptions } from './simulation'
import { CommandWrapper } from './rust/commandWrapper'
import { explore } from './runtime/exploration/search'
import { readSchedule, writeSchedule } from './runtime/exploration/schedule'
import { rv } from './runtime/impl/runtimeValue'
import { verbosity } from './verbosity'

export async function runExploration(
  prev: TypecheckedStage,
  init: QuintEx,
  step: QuintEx,
  witnesses: QuintEx[],
  individualInvariants: string[],
  options: SimulatorOptions
): Promise<CLIProcedure<TracingStage>> {
  const simulator = { ...prev, stage: 'running' as const }
  const verbosityLevel = options.verbosity
  const predicates = mergeInMany(individualInvariants.map(inv => toExpr(prev, inv)))
  if (predicates.isLeft()) {
    return cliErr('Argument error', { ...simulator, errors: predicates.value.map(mkErrorMessage(prev.sourceMap)) })
  }
  try {
    const spec = { table: prev.resolver.table, init, step, invariants: predicates.value, witnesses }
    const search = {
      strategy: prev.args.strategy === 'random' ? 'exhaustive' : prev.args.strategy,
      maxSteps: options.maxSteps,
      maxWork: prev.args.maxWork,
      maxStates: prev.args.maxStates,
      mbt: options.storeMetadata,
      replay: prev.args.replay ? readSchedule(readFileSync(prev.args.replay, 'utf8')) : undefined,
    }
    const result =
      prev.args.backend === 'rust'
        ? await new CommandWrapper(verbosityLevel).explore(spec, search)
        : explore(spec, search)
    const states = result.trace.map(rv.toQuintEx)
    if (prev.args.outSchedule && result.schedule.length)
      writeFileSync(prev.args.outSchedule, writeSchedule(result.schedule))
    if (states.length) {
      const vars = [...new Set(result.trace.flatMap(s => s.toOrderedMap().keySeq().toArray()))].filter(
        name => name !== 'mbt::actionTaken' && name !== 'mbt::nondetPicks'
      )
      options.onTrace?.(0, result.status, vars, states)
      maybePrintCounterExample(verbosityLevel, states, [], [], options.hideVars)
    }
    if (verbosity.hasResults(verbosityLevel)) {
      const s = result.stats
      const message = prev.args.replay ? 'Replayed schedule' : `Search to depth ${options.maxSteps}`
      if (s.bfs) {
        const b = s.bfs
        console.log(
          `[${result.status}] ${message}. ${b.distinctStates} distinct states, ${b.duplicates} duplicate transitions, ${
            b.peakFrontier
          } peak queued states, deepest fully checked layer ${b.completedDepth ?? 'none'}, ${
            s.evaluations
          } action evaluations.`
        )
      } else {
        console.log(
          `[${result.status}] ${message}. ${s.prefixes} prefixes, ${s.schedules} completed schedules, ${s.slept} sleep-set skips, ${s.stubbornPruned} stubborn-set skips, ${s.evaluations} action evaluations.`
        )
      }
      result.witnessed.forEach((found, i) =>
        console.log(`Witness ${prev.args.witnesses[i]}: ${found ? 'reached' : 'unseen'}`)
      )
      if (result.violated.length) printViolatedInvariantsByIndex(result.violated, individualInvariants)
    }
    const report = {
      ...simulator,
      status: result.status,
      trace: states,
      exploration: result.stats,
      limit: result.limit,
      witnessed: result.witnessed,
      errors: result.error ? [mkErrorMessage(prev.sourceMap)(result.error)] : [],
    }
    if (result.status === 'ok') return right(report)
    return cliErr(
      result.status === 'incomplete'
        ? result.limit === 'max-states'
          ? 'Exploration state limit reached (--max-states)'
          : 'Exploration work limit reached (--max-work)'
        : result.status === 'violation'
        ? 'Invariant violated'
        : 'Exploration failed',
      report
    )
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return cliErr('Exploration failed', {
      ...simulator,
      status: 'error',
      errors: [mkErrorMessage(prev.sourceMap)({ code: 'QNT501', message })],
    })
  }
}
