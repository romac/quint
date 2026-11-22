/// A finite one-round schedule for comparing the systematic search strategies.
module TendermintPOR {
  import Tendermint(
    Corr = Set("p1", "p2", "p3", "p4"), Faulty = Set(), N = 4, T = 1,
    ValidValues = Set("v0"), InvalidValues = Set(), MaxRound = 0,
    Proposer = Map(0 -> "p1")
  ).* from "./Tendermint"

  action timeoutStep = {
    nondet p = Set("p2", "p3", "p4").oneOf()
    OnTimeoutPropose(p)
  }
  action quorumStep = any { timeoutStep, OnQuorumOfNilPrevotes("p2") }

  val reachedQuorum = step.get("p2") == "precommit"
  val phaseOrder = step.get("p2") != "prevote" or step.get("p3") != "propose"
}
