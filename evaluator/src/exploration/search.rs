use super::{
    domain::Event,
    invalid, is_limit,
    machine::{Machine, Successors, Transition},
    BfsStats, ResultData, Status, Strategy,
};
use crate::{
    ir::QuintError,
    value::{Value, ValueRef},
};
use fxhash::FxHashSet;
use serde::Deserialize;
use std::collections::VecDeque;

fn empty() -> Value {
    Value::record(Default::default())
}

pub(super) fn replay(
    m: &mut Machine,
    events: &[Event],
    r: &mut ResultData,
) -> Result<(), QuintError> {
    if events.is_empty() {
        return Err(invalid("A schedule must include the initializer"));
    }
    let mut state = empty();
    for (i, event) in events.iter().enumerate() {
        let t = match m.replay(&state, i == 0, event) {
            Ok(Some(t)) => t,
            Ok(None) => return Err(invalid(&format!("Replay diverged at step {i}"))),
            Err(e) => {
                if !is_limit(&e) {
                    r.schedule.push(event.clone());
                }
                return Err(e);
            }
        };
        state = t.state;
        r.schedule.push(event.clone());
        r.trace.push(state.clone());
        r.stats.prefixes += 1;
        r.observe(m, &state, i)?;
        if r.status == Status::Violation {
            break;
        }
    }
    r.stats.schedules += 1;
    Ok(())
}

// Value's structural Hash assumes its lazy set operands can be enumerated.
// Surface unsupported state data as a diagnostic before inserting into seen.
fn check_state_key(value: &Value) -> Result<(), QuintError> {
    match value.view() {
        ValueRef::Lambda(..) => Err(invalid("BFS requires data values in model state")),
        ValueRef::Record(fields) => fields.values().try_for_each(check_state_key),
        ValueRef::Map(pairs) => pairs.iter().try_for_each(|(k, v)| {
            check_state_key(k)?;
            check_state_key(v)
        }),
        ValueRef::Tuple(xs) | ValueRef::List(xs) => xs.iter().try_for_each(check_state_key),
        ValueRef::Variant(_, v) => check_state_key(v),
        ValueRef::Set(xs) => xs.iter().try_for_each(check_state_key),
        ValueRef::PowerSet(_) | ValueRef::MapSet(_, _) | ValueRef::CrossProduct(_) => {
            value.cardinality()?;
            value
                .as_set_iter()?
                .try_for_each(|member| check_state_key(&member))
        }
        _ => Ok(()),
    }
}

#[derive(Default)]
struct Frontier {
    seen: FxHashSet<Value>,
    queue: VecDeque<(usize, Value)>,
    parents: Vec<(Option<usize>, Event)>,
    example: Option<usize>,
    witness: Option<usize>,
    failed: Option<Event>,
}
impl Frontier {
    fn admit(
        &mut self,
        t: Transition,
        parent: Option<usize>,
        depth: usize,
        store: &mut BfsStore<'_>,
    ) -> Result<(), QuintError> {
        let mut key = t.state.clone();
        if store.mbt {
            let mut fields = key.as_record_map().clone();
            fields.remove("mbt::nondetPicks");
            fields.remove("mbt::actionTaken");
            key = Value::record(fields);
        }
        check_state_key(&key)?;
        let stats = store.r.stats.bfs.as_mut().unwrap();
        if self.seen.contains(&key) {
            stats.duplicates += 1;
            return Ok(());
        }
        if store.cap.is_some_and(|n| self.seen.len() >= n) {
            store.r.status = Status::Incomplete;
            store.r.limit = Some("max-states");
            return Ok(());
        }
        self.seen.insert(key);
        let id = self.parents.len();
        self.parents.push((parent, t.event));
        self.example = Some(id);
        stats.distinct_states += 1;
        store.r.stats.prefixes += 1;
        if store.r.observe(store.m, &t.state, depth)? {
            self.witness.get_or_insert(id);
        }
        if depth < store.bound && store.r.status == Status::Ok {
            self.queue.push_back((id, t.state));
            let s = store.r.stats.bfs.as_mut().unwrap();
            s.peak_frontier = s.peak_frontier.max(self.queue.len());
        }
        Ok(())
    }
    fn expand(
        &mut self,
        parent: Option<usize>,
        state: &Value,
        depth: usize,
        store: &mut BfsStore<'_>,
    ) -> Result<(), QuintError> {
        let mut iter = Successors::default();
        while store.r.status == Status::Ok {
            match iter.next(store.m, state, parent.is_none()) {
                Ok(Some(t)) => self.admit(t, parent, depth, store)?,
                Ok(None) => break,
                Err(e) => {
                    if !is_limit(&e) {
                        self.example = parent;
                        self.failed = store.m.failed_event.take();
                    }
                    return Err(e);
                }
            }
        }
        Ok(())
    }
}

struct BfsStore<'a> {
    m: &'a mut Machine,
    r: &'a mut ResultData,
    bound: usize,
    cap: Option<usize>,
    mbt: bool,
}
pub(super) fn bfs(
    m: &mut Machine,
    bound: usize,
    cap: Option<usize>,
    mbt: bool,
    r: &mut ResultData,
) -> Result<(), QuintError> {
    r.stats.bfs = Some(BfsStats {
        witness_depths: vec![None; r.witnessed.len()],
        ..Default::default()
    });
    let mut f = Frontier::default();
    let mut store = BfsStore {
        m,
        r,
        bound,
        cap,
        mbt,
    };
    let run = (|| {
        f.expand(None, &empty(), 0, &mut store)?;
        if f.seen.is_empty() && store.r.status == Status::Ok {
            return Err(invalid("No enabled initial state"));
        }
        let mut depth = 0;
        while store.r.status == Status::Ok {
            store.r.stats.bfs.as_mut().unwrap().completed_depth = Some(depth);
            if f.queue.is_empty() {
                break;
            }
            let before = f.seen.len();
            depth += 1;
            for _ in 0..f.queue.len() {
                let (id, state) = f.queue.pop_front().unwrap();
                f.expand(Some(id), &state, depth, &mut store)?;
                if store.r.status != Status::Ok {
                    break;
                }
                store.r.stats.bfs.as_mut().unwrap().expanded_states += 1;
            }
            if before == f.seen.len() {
                break;
            }
        }
        Ok(())
    })();
    if let Err(e) = run {
        r.fail(e)
    }
    let mut node = if r.status == Status::Ok {
        f.witness.or(f.example)
    } else {
        f.example
    };
    while let Some(id) = node {
        let (parent, event) = &f.parents[id];
        r.schedule.push(event.clone());
        node = *parent;
    }
    r.schedule.reverse();
    // Output reconstruction is outside the search budget and cannot change coverage.
    let evaluations = m.env.control.evaluations;
    m.env.control.max_work = None;
    let mut state = empty();
    for (i, event) in r.schedule.iter().enumerate() {
        state = m
            .replay(&state, i == 0, event)?
            .ok_or_else(|| invalid("BFS predecessor schedule diverged"))?
            .state;
        r.trace.push(state.clone());
    }
    m.env.control.evaluations = evaluations;
    if let Some(event) = f.failed {
        r.schedule.push(event)
    }
    Ok(())
}

#[derive(Deserialize)]
pub(super) struct Stubborn {
    site: u64,
    variables: Vec<String>,
    goals: Vec<usize>,
    conflicts: Vec<Vec<usize>>,
    enablers: Vec<Vec<usize>>,
}
impl Stubborn {
    fn select(&self, state: &Value, all: &mut Vec<Transition>) {
        if !self
            .variables
            .iter()
            .all(|v| state.as_record_map().contains_key(v.as_str()))
        {
            return;
        }
        let index = |t: &Transition| match t.event.as_slice() {
            [d] if d.site == self.site => match d.value.view() {
                ValueRef::Int(i) => usize::try_from(i).ok(),
                _ => None,
            },
            _ => None,
        };
        let Some(indices) = all.iter().map(index).collect::<Option<Vec<_>>>() else {
            return;
        };
        let n = self.conflicts.len();
        if n != self.enablers.len() || indices.iter().chain(&self.goals).any(|i| *i >= n) {
            return;
        }
        let enabled: FxHashSet<_> = indices.iter().copied().collect();
        let mut selected: FxHashSet<_> = self.goals.iter().copied().collect();
        let mut todo = self.goals.clone();
        while let Some(i) = todo.pop() {
            let needed = if enabled.contains(&i) {
                &self.conflicts[i]
            } else {
                &self.enablers[i]
            };
            for &j in needed {
                if j >= n {
                    return;
                }
                if selected.insert(j) {
                    todo.push(j)
                }
            }
        }
        if !selected.is_disjoint(&enabled) {
            all.retain(|t| selected.contains(&index(t).unwrap()))
        }
    }
}

struct Frame {
    state: Value,
    choices: Successors,
    selected: Option<std::vec::IntoIter<Transition>>,
    sleep: Vec<Event>,
    earlier: Vec<Transition>,
    enabled: bool,
}
impl Frame {
    fn new(state: Value, sleep: Vec<Event>) -> Self {
        Self {
            state,
            choices: Default::default(),
            selected: None,
            sleep,
            earlier: vec![],
            enabled: false,
        }
    }
    fn next(
        &mut self,
        m: &mut Machine,
        init: bool,
        plan: Option<&Stubborn>,
        r: &mut ResultData,
    ) -> Result<Option<Transition>, QuintError> {
        if let Some(p) = plan.filter(|_| !init) {
            if self.selected.is_none() {
                let mut all = vec![];
                while let Some(t) = self.choices.next(m, &self.state, false)? {
                    all.push(t)
                }
                let n = all.len();
                p.select(&self.state, &mut all);
                r.stats.stubborn_pruned += (n - all.len()) as u64;
                self.selected = Some(all.into_iter());
            }
            Ok(self.selected.as_mut().unwrap().next())
        } else {
            self.choices.next(m, &self.state, init)
        }
    }
}

// Errors on speculative paths make events dependent. The normal search reports
// any reachable failure with its actual prefix. Resource limits always propagate.
fn probe<T>(r: Result<Option<T>, QuintError>) -> Result<Option<T>, QuintError> {
    match r {
        Err(e) if !is_limit(&e) => Ok(None),
        other => other,
    }
}
fn child_sleep(
    m: &mut Machine,
    frame: &Frame,
    child: &Transition,
    strategy: Strategy,
    r: &mut ResultData,
) -> Result<Vec<Event>, QuintError> {
    let mut sleep = vec![];
    let mut consider = |m: &mut Machine, t: &Transition| -> Result<(), QuintError> {
        if t.access.independent(&child.access) {
            sleep.push(t.event.clone())
        } else if strategy == Strategy::Dpor {
            r.stats.diamonds += 1;
            let a = probe(m.replay(&child.state, false, &t.event))?;
            let b = probe(m.replay(&t.state, false, &child.event))?;
            if matches!((a, b), (Some(a), Some(b)) if a.state == b.state) {
                sleep.push(t.event.clone())
            }
        }
        Ok(())
    };
    for e in &frame.sleep {
        if let Some(t) = probe(m.replay(&frame.state, false, e))? {
            consider(m, &t)?
        }
    }
    for t in &frame.earlier {
        consider(m, t)?
    }
    Ok(sleep)
}

pub(super) fn dfs(
    m: &mut Machine,
    strategy: Strategy,
    bound: usize,
    plan: Option<&Stubborn>,
    r: &mut ResultData,
) {
    let mut stack = vec![Frame::new(empty(), vec![])];
    let mut path = Vec::<(Value, Event)>::new();
    fn save(r: &mut ResultData, path: &[(Value, Event)]) {
        (r.trace, r.schedule) = path.iter().cloned().unzip();
    }
    let run = (|| {
        while let Some(frame) = stack.last_mut() {
            let init = path.is_empty();
            let Some(child) = frame.next(m, init, plan, r)? else {
                if !frame.enabled && !init {
                    r.stats.schedules += 1
                }
                if path.len() > r.trace.len() {
                    save(r, &path)
                }
                stack.pop();
                path.pop();
                continue;
            };
            frame.enabled = true;
            if frame.sleep.contains(&child.event) {
                r.stats.slept += 1;
                continue;
            }
            path.push((child.state.clone(), child.event.clone()));
            r.stats.prefixes += 1;
            r.observe(m, &child.state, path.len() - 1)?;
            if r.status == Status::Violation {
                save(r, &path);
                break;
            }
            if path.len() - 1 == bound {
                r.stats.schedules += 1;
                if path.len() > r.trace.len() {
                    save(r, &path)
                }
                path.pop();
                continue;
            }
            let state = child.state.clone();
            let mut sleeping = vec![];
            if !init && plan.is_none() && strategy != Strategy::Exhaustive {
                sleeping = child_sleep(m, frame, &child, strategy, r)?;
                frame.earlier.push(child)
            }
            stack.push(Frame::new(state, sleeping))
        }
        if r.stats.prefixes == 0 {
            return Err(invalid("No enabled initial state"));
        }
        Ok(())
    })();
    if let Err(e) = run {
        if !path.is_empty() || !is_limit(&e) {
            save(r, &path)
        }
        if !is_limit(&e) {
            if let Some(event) = m.failed_event.take() {
                r.schedule.push(event)
            }
        }
        r.fail(e);
    }
}
