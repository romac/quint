//! The same lossless ground Quint constructors used by schedule version 1.
use super::{
    domain::{Decision, Event},
    invalid,
};
use crate::{
    ir::QuintError,
    value::{Value, ValueRef},
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "lowercase")]
pub(super) enum Ground {
    Bool { value: bool },
    Str { value: String },
    Int { value: String },
    Name { name: String },
    App { opcode: String, args: Vec<Ground> },
}

impl Ground {
    fn app(opcode: &str, args: Vec<Self>) -> Self {
        Self::App {
            opcode: opcode.into(),
            args,
        }
    }
    fn string(s: &str) -> Self {
        Self::Str { value: s.into() }
    }
    pub fn encode(v: &Value) -> Result<Self, QuintError> {
        Ok(match v.view() {
            ValueRef::Bool(value) => Self::Bool { value },
            ValueRef::Int(n) => Self::Int {
                value: n.to_string(),
            },
            ValueRef::BigInt(n) => Self::Int {
                value: n.to_string(),
            },
            ValueRef::Str(s) => Self::string(s),
            ValueRef::InfiniteInt => Self::Name { name: "Int".into() },
            ValueRef::InfiniteNat => Self::Name { name: "Nat".into() },
            ValueRef::Tuple(xs) => Self::app(
                "Tup",
                xs.iter().map(Self::encode).collect::<Result<_, _>>()?,
            ),
            ValueRef::List(xs) => Self::app(
                "List",
                xs.iter().map(Self::encode).collect::<Result<_, _>>()?,
            ),
            ValueRef::Variant(tag, value) => {
                Self::app("variant", vec![Self::string(tag), Self::encode(value)?])
            }
            ValueRef::Map(m) => Self::app(
                "Map",
                m.iter()
                    .map(|(k, v)| Ok(Self::app("Tup", vec![Self::encode(k)?, Self::encode(v)?])))
                    .collect::<Result<_, _>>()?,
            ),
            ValueRef::Record(r) => {
                let mut args = Vec::with_capacity(r.len() * 2);
                for (k, v) in r {
                    args.push(Self::string(k));
                    args.push(Self::encode(v)?);
                }
                Self::app("Rec", args)
            }
            ValueRef::Lambda(..) => return Err(invalid("Cannot record a function in a schedule")),
            _ => Self::app(
                "Set",
                v.as_set_iter()?
                    .map(|x| Self::encode(&x))
                    .collect::<Result<_, _>>()?,
            ),
        })
    }
    pub fn decode(self) -> Result<Value, QuintError> {
        let bad = || invalid("Invalid ground Quint value in schedule");
        Ok(match self {
            Self::Bool { value } => Value::bool(value),
            Self::Str { value } => Value::str(value.into()),
            Self::Int { value } => Value::bigint(value.parse().map_err(|_| bad())?),
            Self::Name { name } if name == "Int" => Value::infinite_int(),
            Self::Name { name } if name == "Nat" => Value::infinite_nat(),
            Self::App { opcode, args } => {
                let args = args
                    .into_iter()
                    .map(Self::decode)
                    .collect::<Result<Vec<_>, _>>()?;
                match opcode.as_str() {
                    "Tup" => Value::tuple(args.into_iter().collect()),
                    "List" => Value::list(args.into_iter().collect()),
                    "Set" => Value::set(args.into_iter().collect()),
                    "Map" => Value::map(
                        args.iter()
                            .map(|p| match p.view() {
                                ValueRef::Tuple(t) if t.len() == 2 => {
                                    Ok((t[0].clone(), t[1].clone()))
                                }
                                _ => Err(bad()),
                            })
                            .collect::<Result<_, _>>()?,
                    ),
                    "Rec" if args.len() % 2 == 0 => Value::record(
                        args.chunks_exact(2)
                            .map(|pair| match pair[0].view() {
                                ValueRef::Str(k) => Ok((k.clone(), pair[1].clone())),
                                _ => Err(bad()),
                            })
                            .collect::<Result<_, _>>()?,
                    ),
                    "variant" if args.len() == 2 => match args[0].view() {
                        ValueRef::Str(k) => Value::variant(k.clone(), args[1].clone()),
                        _ => return Err(bad()),
                    },
                    _ => return Err(bad()),
                }
            }
            _ => return Err(bad()),
        })
    }
}

#[derive(Serialize, Deserialize)]
pub(super) struct Pick {
    site: String,
    value: Ground,
}
pub(super) fn encode(event: &Event) -> Result<Vec<Pick>, QuintError> {
    event
        .iter()
        .map(|d| {
            Ok(Pick {
                site: d.site.to_string(),
                value: Ground::encode(&d.value)?,
            })
        })
        .collect()
}
pub(super) fn decode(event: Vec<Pick>) -> Result<Event, QuintError> {
    event
        .into_iter()
        .map(|d| {
            Ok(Decision {
                site: d.site.parse().map_err(|_| invalid("Invalid choice site"))?,
                value: d.value.decode()?,
            })
        })
        .collect()
}
