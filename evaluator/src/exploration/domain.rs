//! Restartable, lazy iterators for finite choices. Even a powerset whose
//! cardinality exceeds u64 yields its first alternative immediately.
use super::invalid;
use crate::ir::QuintError;
use crate::value::{ImmutableMap, ImmutableSet, Value, ValueRef};
use num_bigint::BigUint;
use num_traits::{One, Zero};
use std::rc::Rc;

type Values = Box<dyn Iterator<Item = Value>>;

#[derive(Clone)]
pub(super) enum Domain {
    Set(ImmutableSet<Value>),
    Range(i64, i64),
    Product(Vec<Domain>),
    Maps(Vec<Value>, Rc<Domain>),
    Power(Rc<Domain>),
}

impl Domain {
    pub fn new(value: &Value) -> Result<Self, QuintError> {
        if value.is_empty_set() {
            return Ok(Self::Set(Default::default()));
        }
        match value.view() {
            ValueRef::Set(s) => Ok(Self::Set(s.clone())),
            ValueRef::Interval(a, b) => Ok(Self::Range(a, b)),
            ValueRef::CrossProduct(sets) => Ok(Self::Product(
                sets.iter().map(Self::new).collect::<Result<_, _>>()?,
            )),
            ValueRef::PowerSet(base) => Ok(Self::Power(Rc::new(Self::new(base)?))),
            ValueRef::MapSet(keys, _) if keys.is_empty_set() => Ok(Self::Set(ImmutableSet::from(
                vec![Value::map(Default::default())],
            ))),
            ValueRef::MapSet(keys, values) => Ok(Self::Maps(
                Self::new(keys)?.iter().collect(),
                Rc::new(Self::new(values)?),
            )),
            _ => Err(invalid(
                "Systematic exploration needs a finite oneOf domain",
            )),
        }
    }

    pub fn contains(&self, value: &Value) -> bool {
        match (self, value.view()) {
            (Self::Set(s), _) => s.contains(value),
            (Self::Range(a, b), ValueRef::Int(i)) => (*a..=*b).contains(&i),
            (Self::Product(sets), ValueRef::Tuple(v)) => {
                sets.len() == v.len() && sets.iter().zip(v).all(|(d, x)| d.contains(x))
            }
            (Self::Power(base), ValueRef::Set(s)) => s.iter().all(|x| base.contains(x)),
            (Self::Maps(keys, range), ValueRef::Map(m)) => {
                keys.len() == m.len()
                    && keys
                        .iter()
                        .all(|k| m.get(k).is_some_and(|v| range.contains(v)))
            }
            _ => false,
        }
    }

    pub fn iter(&self) -> Values {
        match self {
            Self::Set(s) => Box::new(s.clone().into_iter()),
            Self::Range(a, b) => Box::new((*a..=*b).map(Value::int)),
            Self::Product(sets) => {
                Box::new(product(sets.clone()).map(|v| Value::tuple(v.into_iter().collect())))
            }
            Self::Maps(keys, range) => {
                let keys = keys.clone();
                Box::new(product(vec![(**range).clone(); keys.len()]).map(move |v| {
                    Value::map(keys.iter().cloned().zip(v).collect::<ImmutableMap<_, _>>())
                }))
            }
            Self::Power(base) => {
                let mut base = base.iter();
                let mut members = Vec::new();
                let mut mask = BigUint::zero();
                Box::new(std::iter::from_fn(move || {
                    if mask.bits() > members.len() as u64 {
                        members.push(base.next()?)
                    }
                    let value = Value::set(
                        members
                            .iter()
                            .enumerate()
                            .filter(|(i, _)| mask.bit(*i as u64))
                            .map(|(_, x)| x.clone())
                            .collect(),
                    );
                    mask += BigUint::one();
                    Some(value)
                }))
            }
        }
    }
}

fn product(domains: Vec<Domain>) -> impl Iterator<Item = Vec<Value>> {
    let mut stack: Vec<Values> = vec![];
    let mut prefix = vec![];
    let mut started = false;
    std::iter::from_fn(move || {
        if !started {
            started = true;
            if domains.is_empty() {
                return Some(vec![]);
            }
            stack.push(domains[0].iter());
        }
        loop {
            if let Some(v) = stack.last_mut()?.next() {
                if stack.len() == domains.len() {
                    let mut row = prefix.clone();
                    row.push(v);
                    return Some(row);
                }
                prefix.push(v);
                stack.push(domains[stack.len()].iter());
            } else {
                stack.pop();
                prefix.pop();
            }
        }
    })
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub(super) struct Decision {
    pub site: u64,
    pub value: Value,
}
pub(super) type Event = Vec<Decision>;

#[derive(Default)]
pub(crate) struct Choices {
    frames: Vec<(Decision, Values)>,
    index: usize,
    replay: Option<Event>,
    diverged: bool,
}

impl Choices {
    pub(super) fn replay(event: Event) -> Self {
        Self {
            replay: Some(event),
            ..Self::default()
        }
    }
    pub(super) fn complete(&self) -> bool {
        !self.diverged && self.replay.as_ref().is_none_or(|e| self.index == e.len())
    }
    pub(super) fn event(&self) -> Event {
        self.frames.iter().map(|(d, _)| d.clone()).collect()
    }
    pub(super) fn advance(&mut self) -> bool {
        self.index = 0;
        while let Some((decision, rest)) = self.frames.last_mut() {
            if let Some(value) = rest.next() {
                decision.value = value;
                return true;
            }
            self.frames.pop();
        }
        false
    }
    pub(crate) fn select(
        &mut self,
        site: u64,
        values: &Value,
    ) -> Result<Option<Value>, QuintError> {
        if let Some(event) = &self.replay {
            let domain = Domain::new(values)?;
            let pick = event
                .get(self.index)
                .filter(|d| d.site == site && domain.contains(&d.value));
            self.index += 1;
            if pick.is_none() {
                self.diverged = true
            }
            return Ok(pick.map(|d| d.value.clone()));
        }
        if let Some((d, _)) = self.frames.get(self.index) {
            if d.site != site {
                return Err(invalid("Choice prefix diverged during enumeration"));
            }
            self.index += 1;
            return Ok(Some(d.value.clone()));
        }
        let mut iter = Domain::new(values)?.iter();
        let Some(value) = iter.next() else {
            return Ok(None);
        };
        self.frames.push((
            Decision {
                site,
                value: value.clone(),
            },
            iter,
        ));
        self.index += 1;
        Ok(Some(value))
    }
}
