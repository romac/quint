//! Systematic interpretations of the two choice constructs. Nondeterminism in
//! a boolean guard is existential. In action position it enumerates schedules.
use super::{domain::Domain, invalid};
use crate::evaluator::{CompiledExpr, Env, EvalResult};
use crate::ir::{QuintId, QuintName};
use crate::value::Value;
use std::{cell::RefCell, rc::Rc};

pub(crate) fn as_value(expr: CompiledExpr) -> CompiledExpr {
    CompiledExpr::new(move |env| {
        let previous = std::mem::replace(&mut env.control.read_only, true);
        let result = expr.execute(env);
        env.control.read_only = previous;
        result
    })
}

pub(crate) fn action_any(site: QuintId, args: Vec<CompiledExpr>) -> CompiledExpr {
    CompiledExpr::new(move |env| {
        if env.control.read_only {
            for arg in &args {
                env.control.charge()?;
                if arg.execute(env)?.as_bool() {
                    return Ok(Value::bool(true));
                }
            }
            return Ok(Value::bool(false));
        }
        let domain = Value::interval(0, args.len() as i64 - 1);
        let Some(i) = env.control.choices.select(site, &domain)? else {
            return Ok(Value::bool(false));
        };
        env.var_storage.borrow_mut().clear_metadata();
        let snapshot = env.var_storage.borrow().take_snapshot();
        let result = args[i.as_i64().unwrap() as usize].execute(env)?;
        if !result.as_bool() {
            env.var_storage.borrow_mut().restore(&snapshot)
        }
        Ok(result)
    })
}

pub(crate) fn nondet(
    site: QuintId,
    name: QuintName,
    set: CompiledExpr,
    body: CompiledExpr,
    cache: Rc<RefCell<Option<EvalResult>>>,
) -> CompiledExpr {
    let set = as_value(set);
    CompiledExpr::new(move |env| {
        let set = set.execute(env)?;
        let run = |env: &mut Env, pick: Value| {
            let previous = cache.replace(Some(Ok(pick.clone())));
            let result = body.execute(env);
            cache.replace(previous);
            if !env.control.read_only {
                env.var_storage
                    .borrow_mut()
                    .track_nondet(name.clone(), pick);
            }
            result
        };
        if env.control.read_only {
            for pick in Domain::new(&set)?.iter() {
                env.control.charge()?;
                if run(env, pick)?.as_bool() {
                    return Ok(Value::bool(true));
                }
            }
            return Ok(Value::bool(false));
        }
        match env.control.choices.select(site, &set)? {
            None => Ok(Value::bool(false)),
            Some(pick) => run(env, pick),
        }
    })
}

pub(crate) fn reject(message: &'static str) -> CompiledExpr {
    CompiledExpr::new(move |_| Err(invalid(message)))
}
