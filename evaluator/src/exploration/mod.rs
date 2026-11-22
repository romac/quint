//! Native bounded safety and witness exploration over the compiled evaluator.
mod access;
mod domain;
mod eval;
mod machine;
mod search;
mod wire;

use crate::{ir::QuintError, simulator::ParsedQuint, value::Value};
pub(crate) use access::{tracked, variable};
use domain::Event;
pub(crate) use eval::{action_any, as_value, nondet, reject};
pub(crate) use machine::Control;
use machine::Machine;
use serde::{Deserialize, Serialize};
use wire::{Ground, Pick};

const WORK_LIMIT: &str = "Action evaluation limit reached";
pub(crate) fn invalid(message: &str) -> QuintError {
    QuintError::new("QNT501", message)
}
fn is_limit(e: &QuintError) -> bool {
    e.code == "WORK_LIMIT"
}

#[derive(Deserialize, Copy, Clone, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Strategy {
    Bfs,
    Exhaustive,
    Por,
    Dpor,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Input {
    parsed: ParsedQuint,
    strategy: Strategy,
    max_steps: usize,
    max_work: Option<u64>,
    max_states: Option<usize>,
    #[serde(default)]
    mbt: bool,
    replay: Option<Vec<Vec<Pick>>>,
    stubborn: Option<search::Stubborn>,
}

#[derive(Serialize, Default)]
#[serde(rename_all = "camelCase")]
struct Stats {
    prefixes: u64,
    schedules: u64,
    slept: u64,
    stubborn_pruned: u64,
    diamonds: u64,
    evaluations: u64,
    #[serde(skip_serializing_if = "Option::is_none")]
    bfs: Option<BfsStats>,
}

#[derive(Serialize, Default)]
#[serde(rename_all = "camelCase")]
struct BfsStats {
    distinct_states: usize,
    duplicates: u64,
    expanded_states: u64,
    peak_frontier: usize,
    completed_depth: Option<usize>,
    witness_depths: Vec<Option<usize>>,
}

#[derive(Serialize, PartialEq, Eq, Default)]
#[serde(rename_all = "lowercase")]
enum Status {
    #[default]
    Ok,
    Violation,
    Incomplete,
    Error,
}

#[derive(Default)]
struct ResultData {
    status: Status,
    stats: Stats,
    trace: Vec<Value>,
    schedule: Vec<Event>,
    witnessed: Vec<bool>,
    violated: Vec<usize>,
    error: Option<QuintError>,
    limit: Option<&'static str>,
}

#[derive(Serialize)]
pub struct Output {
    status: Status,
    stats: Stats,
    trace: Vec<Ground>,
    schedule: Vec<Vec<Pick>>,
    witnessed: Vec<bool>,
    violated: Vec<usize>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<QuintError>,
    #[serde(skip_serializing_if = "Option::is_none")]
    limit: Option<&'static str>,
}

impl ResultData {
    fn fail(&mut self, e: QuintError) {
        if is_limit(&e) {
            self.status = Status::Incomplete;
            self.limit = Some("max-work");
        } else {
            self.status = Status::Error;
            self.error = Some(e)
        }
    }
    fn observe(
        &mut self,
        m: &mut Machine,
        state: &Value,
        depth: usize,
    ) -> Result<bool, QuintError> {
        let (violated, hits) = m.observe(state)?;
        let first = hits.iter().any(|i| !self.witnessed[*i]);
        for i in hits {
            self.witnessed[i] = true;
            if let Some(stats) = &mut self.stats.bfs {
                stats.witness_depths[i].get_or_insert(depth);
            }
        }
        if !violated.is_empty() {
            self.violated = violated;
            self.status = Status::Violation;
        }
        Ok(first)
    }
}

pub fn explore(input: Input) -> Result<Output, QuintError> {
    let Input {
        parsed,
        strategy,
        max_steps,
        max_work,
        max_states,
        mbt,
        replay,
        stubborn,
    } = input;
    if max_states.is_some() && (strategy != Strategy::Bfs || replay.is_some()) {
        return Err(invalid("--max-states requires a BFS search"));
    }
    let mut r = ResultData {
        witnessed: vec![false; parsed.witnesses.len()],
        ..Default::default()
    };
    let plan = stubborn.filter(|_| strategy == Strategy::Por);
    let track =
        matches!(strategy, Strategy::Por | Strategy::Dpor) && plan.is_none() && replay.is_none();
    let mut m = Machine::new(parsed, mbt, max_work, track);
    if let Some(events) = replay {
        let events = events
            .into_iter()
            .map(wire::decode)
            .collect::<Result<Vec<_>, _>>()?;
        if let Err(e) = search::replay(&mut m, &events, &mut r) {
            r.fail(e)
        }
    } else if strategy == Strategy::Bfs {
        search::bfs(&mut m, max_steps, max_states, mbt, &mut r)?;
    } else {
        search::dfs(&mut m, strategy, max_steps, plan.as_ref(), &mut r);
    }
    r.stats.evaluations = m.env.control.evaluations;
    Ok(Output {
        status: r.status,
        stats: r.stats,
        trace: r
            .trace
            .iter()
            .map(Ground::encode)
            .collect::<Result<_, _>>()?,
        schedule: r
            .schedule
            .iter()
            .map(wire::encode)
            .collect::<Result<_, _>>()?,
        witnessed: r.witnessed,
        violated: r.violated,
        error: r.error,
        limit: r.limit,
    })
}
