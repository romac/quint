/// Same correct-node, one-value, round-zero model as TendermintPOR, scaled to seven validators.
module SevenValidators {
  import Tendermint(
    Corr = Set("p1", "p2", "p3", "p4", "p5", "p6", "p7"), Faulty = Set(), N = 7, T = 2,
    ValidValues = Set("v0"), InvalidValues = Set(), MaxRound = 0, Proposer = Map(0 -> "p1")
  ).* from "../../../examples/cosmos/tendermint/Tendermint"
  val reachedQuorum = step.get("p2") == "precommit"
}

module TwelveTimeouts {
  import Tendermint(
    Corr = Set("p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13"),
    Faulty = Set(), N = 13, T = 4, ValidValues = Set("v0"), InvalidValues = Set(), MaxRound = 0,
    Proposer = Map(0 -> "p1")
  ).* from "../../../examples/cosmos/tendermint/Tendermint"
  pure val followers = Corr.exclude(Set("p1"))
  action timeouts = { nondet p = followers.oneOf() OnTimeoutPropose(p) }
  val allTimedOut = followers.forall(p => step.get(p) == "prevote")
}

module TwoPhaseEight {
  import two_phase_commit(resourceManagers = Set("rm1", "rm2", "rm3", "rm4", "rm5", "rm6", "rm7", "rm8")).*
    from "../../../examples/classic/distributed/TwoPhaseCommit/two_phase_commit"
  val fourPrepares = TM::preparedRMs.size() >= 4
}
