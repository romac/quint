//! Read/write footprints. Only syntactically direct collection operations can
//! refine a whole-register access. Unrecognized expressions stay conservative.
use crate::evaluator::{CompiledExpr, CompiledExprWithArgs};
use crate::ir::{LookupDefinition, LookupTable, QuintDeclaration, QuintEx, QuintId, QuintName};
use crate::value::Value;
use fxhash::FxHashSet;

#[derive(Clone)]
pub(crate) struct Location {
    name: QuintName,
    key: Option<Value>,
    members: Option<Value>,
}
impl Location {
    fn whole(name: QuintName) -> Self {
        Self {
            name,
            key: None,
            members: None,
        }
    }
    fn overlaps(&self, other: &Self) -> bool {
        if self.name != other.name {
            return false;
        }
        if let (Some(m), Some(k)) = (&self.members, &other.key) {
            return m.contains(k).unwrap_or(true);
        }
        if let (Some(m), Some(k)) = (&other.members, &self.key) {
            return m.contains(k).unwrap_or(true);
        }
        self.key.is_none() || other.key.is_none() || self.key == other.key
    }
}

#[derive(Clone)]
struct Write {
    loc: Location,
    insert: bool,
    literal: Option<Value>,
}
#[derive(Clone, Default)]
pub(crate) struct Access {
    reads: Vec<Location>,
    writes: Vec<Write>,
    frames: FxHashSet<QuintName>,
    pub unset: FxHashSet<QuintName>,
    collection: Option<(QuintId, usize, Location, bool)>,
}
impl Access {
    pub fn read(&mut self, name: QuintName) {
        self.reads.push(Location::whole(name))
    }
    pub fn len(&self) -> usize {
        self.reads.len()
    }
    pub fn write(&mut self, name: QuintName) {
        self.writes.push(Write {
            loc: Location::whole(name),
            insert: false,
            literal: None,
        })
    }
    pub fn assign(
        &mut self,
        name: QuintName,
        site: QuintId,
        start: usize,
        frame: bool,
        literal: Option<Value>,
    ) {
        if frame
            && self.reads.len() == start + 1
            && self.reads[start].name == name
            && self.reads[start].key.is_none()
        {
            self.reads.pop();
            self.frames.insert(name);
            return;
        }
        if let Some((id, idx, loc, insert)) = &self.collection {
            if *id == site
                && *idx >= start
                && loc.name == name
                && self.reads.get(*idx).is_some_and(|r| r.name == name)
            {
                self.writes.push(Write {
                    loc: loc.clone(),
                    insert: *insert,
                    literal: None,
                });
                if *insert {
                    self.reads.remove(*idx);
                } else {
                    self.reads[*idx].key = loc.key.clone()
                }
                self.collection = None;
                return;
            }
        }
        self.writes.push(Write {
            loc: Location::whole(name),
            insert: false,
            literal,
        });
    }
    pub fn independent(&self, other: &Self) -> bool {
        self.frames.is_disjoint(&other.unset)
            && other.frames.is_disjoint(&self.unset)
            && self
                .writes
                .iter()
                .all(|w| other.reads.iter().all(|r| !w.loc.overlaps(r)))
            && other
                .writes
                .iter()
                .all(|w| self.reads.iter().all(|r| !w.loc.overlaps(r)))
            && self.writes.iter().all(|a| {
                other.writes.iter().all(|b| {
                    !a.loc.overlaps(&b.loc)
                        || (a.insert && b.insert)
                        || (a.literal.is_some() && a.literal == b.literal)
                })
            })
    }
}

pub(crate) fn variable(table: &LookupTable, expr: &QuintEx) -> bool {
    matches!(expr, QuintEx::QuintName { .. })
        && matches!(
            table.get(&expr.id()),
            Some(LookupDefinition::Definition(QuintDeclaration::QuintVar(_)))
        )
}

fn mentions(table: &LookupTable, ex: &QuintEx, param: QuintId) -> bool {
    if table.get(&ex.id()).is_some_and(|d| d.id() == param) {
        return true;
    }
    match ex {
        QuintEx::QuintApp { args, .. } => args.iter().any(|a| mentions(table, a, param)),
        QuintEx::QuintLambda { expr, .. } => mentions(table, expr, param),
        QuintEx::QuintLet { opdef, expr, .. } => {
            mentions(table, &opdef.expr, param) || mentions(table, expr, param)
        }
        _ => false,
    }
}

// Recognize old => old.union(delta) only when delta cannot inspect old.
fn inserts_into_bucket(table: &LookupTable, update: &QuintEx) -> bool {
    let QuintEx::QuintLambda { params, expr, .. } = update else {
        return false;
    };
    let [old] = params.as_slice() else {
        return false;
    };
    let QuintEx::QuintApp { id, opcode, args } = expr.as_ref() else {
        return false;
    };
    let [base, delta] = args.as_slice() else {
        return false;
    };
    opcode == "union"
        && !table.contains_key(id)
        && table.get(&base.id()).is_some_and(|d| d.id() == old.id)
        && !mentions(table, delta, old.id)
}

pub(crate) fn tracked(
    table: &LookupTable,
    id: QuintId,
    op: &str,
    args: &[QuintEx],
    exprs: Vec<CompiledExpr>,
    apply: CompiledExprWithArgs,
) -> Option<CompiledExpr> {
    if table.contains_key(&id)
        || !matches!(
            op,
            "get" | "field" | "contains" | "set" | "setBy" | "put" | "union"
        )
        || !args.first().is_some_and(|e| variable(table, e))
    {
        return None;
    }
    let bucket = op == "setBy"
        && args
            .get(2)
            .is_some_and(|update| inserts_into_bucket(table, update));
    let op = op.to_owned();
    Some(CompiledExpr::new(move |env| {
        let start = env.control.access.as_ref().map(Access::len);
        let first = exprs[0].execute(env)?;
        let base = start.filter(|i| {
            env.control
                .access
                .as_ref()
                .is_some_and(|a| a.len() == *i + 1)
        });
        let mut values = vec![first];
        for expr in &exprs[1..] {
            values.push(expr.execute(env)?)
        }
        let arg = values[1].clone();
        let result = apply.execute(env, values)?;
        if let (Some(i), Some(a)) = (base, env.control.access.as_mut()) {
            let mut loc = a.reads[i].clone();
            if op == "union" {
                loc.members = Some(arg)
            } else {
                loc.key = Some(arg)
            }
            if matches!(op.as_str(), "get" | "field" | "contains") {
                a.reads[i] = loc
            } else {
                a.collection = Some((id, i, loc, op == "union" || bucket))
            }
        }
        Ok(result)
    }))
}
