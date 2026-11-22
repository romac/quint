use super::access::Access;
use super::domain::{Choices, Event};
use super::WORK_LIMIT;
use crate::evaluator::{CompiledExpr, Env, Interpreter};
use crate::ir::QuintError;
use crate::simulator::ParsedQuint;
use crate::storage::Storage;
use crate::value::Value;
use crate::Verbosity;
use std::{cell::RefCell, rc::Rc};

#[derive(Default)]
pub(crate) struct Control {
    pub choices: Choices,
    pub read_only: bool,
    pub access: Option<Access>,
    pub evaluations: u64,
    pub max_work: Option<u64>,
}
impl Control {
    pub fn charge(&mut self) -> Result<(), QuintError> {
        if self.max_work.is_some_and(|n| self.evaluations >= n) {
            return Err(QuintError::new("WORK_LIMIT", WORK_LIMIT));
        }
        self.evaluations += 1;
        Ok(())
    }
}

#[derive(Clone)]
pub(super) struct Transition {
    pub state: Value,
    pub event: Event,
    pub access: Access,
}

pub(super) struct Machine {
    pub env: Env,
    init: CompiledExpr,
    step: CompiledExpr,
    invariants: Vec<CompiledExpr>,
    witnesses: Vec<CompiledExpr>,
    pub failed_event: Option<Event>,
    track: bool,
}
impl Machine {
    pub fn new(spec: ParsedQuint, mbt: bool, max_work: Option<u64>, track: bool) -> Self {
        let storage = Rc::new(RefCell::new(Storage::new(mbt)));
        let mut interpreter = Interpreter::with_var_storage(spec.table, storage.clone());
        interpreter.exploring = true;
        let init = interpreter.compile(&spec.init);
        let step = interpreter.compile(&spec.step);
        let invariants = spec
            .invariants
            .iter()
            .map(|e| interpreter.compile(e))
            .collect();
        let witnesses = spec
            .witnesses
            .iter()
            .map(|e| interpreter.compile(e))
            .collect();
        if mbt {
            interpreter.create_nondet_picks();
        }
        let mut env = Env::new(storage, Verbosity::default());
        env.control.max_work = max_work;
        Self {
            env,
            init,
            step,
            invariants,
            witnesses,
            track,
            failed_event: None,
        }
    }

    fn execute(
        &mut self,
        state: &Value,
        init: bool,
        choices: &mut Choices,
    ) -> Result<Option<(Value, Access)>, QuintError> {
        self.failed_event = None;
        self.env.control.charge()?;
        self.env.var_storage.borrow_mut().load_state(state);
        self.env.control.read_only = false;
        self.env.control.access = self.track.then(Access::default);
        self.env.diagnostics.clear();
        std::mem::swap(&mut self.env.control.choices, choices);
        let enabled = if init { &self.init } else { &self.step }.execute(&mut self.env);
        std::mem::swap(&mut self.env.control.choices, choices);
        if !enabled?.as_bool() {
            return Ok(None);
        }
        let mut store = self.env.var_storage.borrow_mut();
        let mut access = self.env.control.access.take().unwrap_or_default();
        if self.track {
            for reg in store.next_vars.values() {
                let reg = reg.borrow();
                if reg.value.is_none() {
                    access.unset.insert(reg.name.clone());
                    access.write(reg.name.clone())
                }
            }
        }
        store.shift_vars();
        Ok(Some((store.as_record(), access)))
    }

    pub fn replay(
        &mut self,
        state: &Value,
        init: bool,
        event: &Event,
    ) -> Result<Option<Transition>, QuintError> {
        let mut choices = Choices::replay(event.clone());
        let result = self.execute(state, init, &mut choices);
        if !choices.complete() && result.as_ref().err().is_none_or(|e| !super::is_limit(e)) {
            return Ok(None);
        }
        result.map(|r| {
            r.map(|(state, access)| Transition {
                state,
                access,
                event: event.clone(),
            })
        })
    }

    pub fn observe(&mut self, state: &Value) -> Result<(Vec<usize>, Vec<usize>), QuintError> {
        self.env.var_storage.borrow_mut().load_state(state);
        self.env.control.read_only = true;
        self.env.control.access = None;
        let mut check = |exprs: &[CompiledExpr], want: bool| -> Result<Vec<usize>, QuintError> {
            let mut hits = vec![];
            for (i, e) in exprs.iter().enumerate() {
                if e.execute(&mut self.env)?.as_bool() == want {
                    hits.push(i)
                }
            }
            Ok(hits)
        };
        Ok((
            check(&self.invariants, false)?,
            check(&self.witnesses, true)?,
        ))
    }
}

#[derive(Default)]
pub(super) struct Successors {
    choices: Choices,
    started: bool,
}
impl Successors {
    pub fn next(
        &mut self,
        m: &mut Machine,
        state: &Value,
        init: bool,
    ) -> Result<Option<Transition>, QuintError> {
        loop {
            if self.started && !self.choices.advance() {
                return Ok(None);
            }
            self.started = true;
            match m.execute(state, init, &mut self.choices) {
                Ok(Some((state, access))) => {
                    return Ok(Some(Transition {
                        state,
                        event: self.choices.event(),
                        access,
                    }))
                }
                Ok(None) => (),
                Err(e) => {
                    m.failed_event = Some(self.choices.event());
                    return Err(e);
                }
            }
        }
    }
}
