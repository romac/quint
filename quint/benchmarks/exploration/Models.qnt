// Six independent non-proposer timeouts, using the actions in the Tendermint example.
module IndependentTimeouts {
  import Tendermint(
    Corr = Set("p1", "p2", "p3", "p4", "p5", "p6", "p7"), Faulty = Set(), N = 7, T = 2,
    ValidValues = Set("v0"), InvalidValues = Set(), MaxRound = 0, Proposer = Map(0 -> "p1")
  ).* from "../../../examples/cosmos/tendermint/Tendermint"

  pure val followers = Set("p2", "p3", "p4", "p5", "p6", "p7")
  action timeouts = { nondet p = followers.oneOf() OnTimeoutPropose(p) }
  val allTimedOut = followers.forall(p => step.get(p) == "prevote")
}

// The acknowledgement depends only on the request. Two background counters
// model independent work and are intentionally invisible to the checked goal.
module GuardedHandshake {
  var phase: int
  var a: int
  var b: int
  action init = all { phase' = 0, a' = 0, b' = 0 }
  action step = any {
    all { a < 4, a' = a + 1, b' = b, phase' = phase },
    all { b < 4, b' = b + 1, a' = a, phase' = phase },
    all { phase == 0, phase' = 1, a' = a, b' = b },
    all { phase == 1, phase' = 2, a' = a, b' = b },
  }
  val valid = phase >= 0 and phase <= 2
  val acknowledged = phase == 2
}

// Appends never commute for distinct symbols. Every word is a different state.
module OrderedLog {
  var logEntries: List[int]
  action init = logEntries' = []
  action step = {
    nondet symbol = Set(0, 1, 2).oneOf()
    logEntries' = logEntries.append(symbol)
  }
  val valid = logEntries.indices().forall(i => logEntries.nth(i) >= 0 and logEntries.nth(i) <= 2)
  val sixTwos = logEntries == [2, 2, 2, 2, 2, 2]
}
