# Larger bounded state spaces in Quint

Six workloads extend the original study to a full Tendermint transition relation with seven validators, eight-manager two-phase commit, and a completely dependent execution tree with almost 800,000 states. The `systematic-por` branch uses dynamic sleep sets for DPOR. When read/write information is inconclusive, it replays the two action orders and compares the resulting states. All counts include the initial state and every intermediate model state through the bound.

At seven validators and depth eight, full Tendermint has **30,530** reachable states. With 500,000 action evaluations, DPOR visited **7,113** of them and exhaustive DFS visited **6,019**. With eight resource managers and depth fourteen, two-phase commit has **1,255,810** reachable states. Under the same evaluation cap, the three path searches each covered less than 1%.

## Reachability and elapsed time

Each entry gives distinct states visited and elapsed seconds. A dagger (†) means the search stopped at its action-evaluation cap. An unmarked entry means the bounded search completed. Action evaluations include disabled choices and speculative replays. The common cap was 500,000 per strategy, raised to 2,000,000 on four-validator Tendermint at depth seven and on the ordered log so those searches could finish. Wall times include counting coverage.

| Workload | Reachable states | Exhaustive DFS | POR | DPOR |
| --- | ---: | ---: | ---: | ---: |
| Tendermint, 4 validators, d7 | 1,455 | 1,455 / 73.1 s | 1,455 / 57.8 s | 1,455 / 32.5 s |
| Tendermint, 4 validators, d9 | 3,861 | 1,001 / 27.0 s† | 1,001 / 26.7 s† | 1,050 / 28.2 s† |
| Tendermint, 7 validators, d8 | 30,530 | 6,019 / 26.9 s† | 6,300 / 27.9 s† | 7,113 / 26.7 s† |
| Tendermint, 12 timeouts, d12 | 4,096 | 251 / 56.1 s† | 4,096 / 8.6 s | 4,096 / 7.1 s |
| Two-phase commit, 8 managers, d14 | 1,255,810 | 3,233 / 47.4 s† | 12,301 / 29.9 s† | 12,079 / 28.4 s† |
| Ordered log, d12 | 797,161 | 797,161 / 24.7 s | 797,161 / 25.0 s | 797,161 / 28.6 s |

## Coverage with eight seconds per strategy

Each entry counts distinct full states seen by the eight-second checkpoint. A search that finishes earlier retains its final coverage. The random column shows the median and range over five independent seeded TypeScript campaigns. Its trace count is the median number of completed traces at the checkpoint. The clock and state counting are inside each run. The fixed-work results above and this fixed-time comparison answer different questions.

| Workload | Exhaustive DFS | POR | DPOR | Random states, median [range] | Random traces |
| --- | ---: | ---: | ---: | ---: | ---: |
| Tendermint, 4 validators, d7 | 1,152 | 1,184 | 1,281 | 849 [834–878] | 2,153 |
| Tendermint, 4 validators, d9 | 677 | 677 | 693 | 1,121 [1,066–1,217] | 1,318 |
| Tendermint, 7 validators, d8 | 2,813 | 2,888 | 3,294 | 2,860 [2,773–2,982] | 1,183 |
| Tendermint, 12 timeouts, d12 | 128 | 3,834 | 4,096 | 2,600 [2,546–2,699] | 767 |
| Two-phase commit, 8 managers, d14 | 213 | 4,578 | 4,578 | 2,705 [2,630–2,717] | 383 |
| Ordered log, d12 | 260,317 | 254,111 | 216,159 | 100,622 [99,244–101,154] | 28,206 |

The ordering changes with the protocol instance. At four validators and depth nine, random sampling reached a median of 1,121 states in eight seconds, compared with 693 for DPOR. At seven validators and depth eight, DPOR reached 3,294, compared with 2,860 for random sampling. DFS explores a subtree before moving to its siblings. A fresh random trace can sample a different part of the tree immediately.

## Interpreting the differences

- **Full Tendermint.** Both instances use the upstream `Next`, one valid value, correct validators only, and round zero. Increasing the four-validator depth from six to nine grows the reachable set from 627 to 3,861. For seven validators the exact counts at depths six, seven and eight are 2,280, 5,308 and 30,530. A benchmark-only breadth-first search first reached the named validator’s precommit at depth four with four validators and depth six with seven.
- **Independent timeouts.** Restricting the scheduler to twelve non-proposers gives $2^{12}=4,096$ distinct subsets and $12!=479,001,600$ full orders. DPOR covered 4,096 states, completed one maximal schedule and used 65,539 evaluations.
- **Ordered log.** Each transition appends one of three symbols. All $3^{12}=531,441$ depth-twelve schedules have distinct final states. DFS and DPOR completed all of them. DPOR tried 265,719 swaps, requiring 1,328,599 action evaluations versus 797,161 for DFS. With no commuting pair of distinct appends, the dynamic checks added 16% to elapsed time in this run.

Every run of exhaustive DFS, POR and DPOR reached its named witness. All five random seeds reached Tendermint’s named precommit on both full instances and the final state of the timeout fixture. None reached four recorded prepares on eight-manager two-phase commit or twelve consecutive 2s on the log, even counting the last batch that overlapped the eight-second deadline. Once the transaction manager aborts, it cannot record any further prepares.

## Counting protocol states independently

The reference breadth-first search uses the same Quint step evaluator and enumerates every enabled action. It expands each full state once, at its shortest distance, and checks the invariant and witness on each newly discovered state. This is valid for the state predicates and history-free transitions in these fixtures. The search holds the current and next frontiers in memory as well as a set of all discovered state keys. Times below include state interning and observation and exclude serializing the reference set. They are single measurements.

| Workload | Distinct states | Action evaluations | Elapsed | Earliest witness depth |
| --- | ---: | ---: | ---: | ---: |
| Tendermint, 4 validators, d7 | 1,455 | 59,953 | 2.9 s | 4 |
| Tendermint, 4 validators, d9 | 3,861 | 300,881 | 13.3 s | 4 |
| Tendermint, 7 validators, d8 | 30,530 | 1,556,794 | 67.3 s | 6 |
| Tendermint, 12 timeouts, d12 | 4,096 | 49,141 | 6.4 s | 12 |

On seven-validator Tendermint we also gave DPOR the exact 1,556,794 action evaluations that completed BFS. At the BFS elapsed time of 67.3 s, DPOR had reached 13,675 states. At the matched work cap, DPOR had reached **14,151 / 30,530 (46.4%)** in 77.6 s. The capped run returned `incomplete`. Breadth-first search combines paths as soon as they reach the same full state.

On eight-manager two-phase commit, a separate breadth-first run with exactly 500,000 action evaluations admitted 37,451 states (3.0%) in 336.2 s. It had admitted 2,878 states at eight seconds. It fully discovered depth 6 (26,806 states), matching the polynomial below at every completed layer. Four recorded prepares require at least eight steps. This BFS run never reached that depth, while all three depth-first searches reached the witness.

For two-phase commit we also counted every possible complete state by its shortest distance from initialization. Let $n$ be the number of resource managers. The number of states reachable through depth $d$ is the sum of coefficients through $x^d$ in

$$
(1+2x+x^2)^n + x(1+2x+2x^2+x^3)^n + x^{2n+1}(1+x)^n.
$$

The three terms correspond to the transaction manager being initial, aborted or committed. While it is initial, a resource manager can be working, spontaneously aborted, prepared but unrecorded, or prepared and recorded. The minimum costs are 0, 1, 1 and 2. Once the transaction manager aborts, a manager that prepared can also abort, retaining its prepare message and any previously recorded receipt. The two extra cases cost 2 and 3 local transitions. All receipts must precede the manager’s global abort decision. Commit requires all $n$ prepares, all $n$ receipts and one decision. Each subsequent local commit adds one transition. These categories fix the individual manager states, the transaction manager state, the set of receipts and all sent messages. The harness cross-checks the polynomial against actual Quint BFS at **every depth** through depth ten for three managers (288 states at the fixed point), and through depth four for eight managers (3,342 states). The 1,255,810 denominator at depth fourteen is calculated analytically.

## Default Rust sampler on seven validators

Each backend ran exactly 1,500 traces per seed on full seven-validator Tendermint at depth eight, with one worker. Timings launch a fresh `quint run` and include CLI startup, parsing, typechecking, and backend transport. Each of the same three seeds was then replayed for untimed full-state collection. Every sampled state was checked against the 30,530-state reference.

| Backend | Median distinct | Range | Median coverage | Median CLI time |
| --- | ---: | ---: | ---: | ---: |
| TypeScript | 3,310 | 3,301–3,319 | 10.8% | 10.7 s |
| Rust | 3,366 | 3,365–3,385 | 11.0% | 3.6 s |

## Reproduction and interpretation

Measured on Linux 6.18.57 (x64), INTEL(R) XEON(R) PLATINUM 8573C, Node v24.22.3.

- Run each campaign serially. The TypeScript experiment measures one warmed search per systematic strategy and workload, rotating strategy order across workloads, and five random seeds per workload. Construction of the measured evaluator, exploration, invariant and witness checks, and passive coverage bookkeeping are timed. Parsing and typechecking are outside the eight-second comparison. The Rust comparison uses three fresh-process measurements per backend and one short warmup per backend.
- Coverage uses all model variables, including Tendermint’s `fired_action`. Normalized Quint values are interned with structural equality. Each state visited by any mode on the Tendermint instances must belong to the saved BFS set. The log uses an injective rank for each word. Random coverage includes all prefixes of every completed sample. The sampler runs batches of 16 with a continuous RNG stream and records a separate coverage checkpoint at the deadline.
- A completed bounded search and a partial run have different guarantees. Systematic results report the implementation’s completion flag. The checked predicates are Tendermint agreement and precommit, all follower timeouts for the restricted model, two-phase consistency and four recorded prepares, and log validity and twelve consecutive 2s. Work-capped runs can leave both admissible schedules and states unexplored. Percentages refer to these finite instances and depth bounds.
- The recorded environment and every measurement, including work counts, witnesses, and seed-level ranges, are in [scale-results.json](scale-results.json), [scale-bfs.json](scale-bfs.json) and [scale-rust.json](scale-rust.json). Timings are host-specific. The breadth-first routine is benchmark code. The systematic strategies use the implementation behind `quint run`.

From the repository root, build the simulator and use a fresh directory for the cached reachability references. The case list below reproduces the measurement order.

```sh
(cd quint && npm ci && npm run compile)
scale_dir=$(mktemp -d)
suite=quint/benchmarks/exploration
node --expose-gc --max-old-space-size=2800 "$suite/scale.js" "$scale_dir" \
  twophase-d14 tm7-d8 log-d12 timeout-d12 tm4-d9 tm4-d7
node --expose-gc --max-old-space-size=2800 "$suite/scale.js" "$scale_dir" --match-bfs
node --max-old-space-size=2800 "$suite/state-space.js" twophase 14 "$scale_dir/scale-bfs.json" 500000
```

For the native comparison, build the release binary from the same checkout.

```sh
cargo build --release --locked --manifest-path evaluator/Cargo.toml
benchmark_config=$(mktemp -d)
mkdir -p "$benchmark_config/rust-evaluator-v0.7.1"
cp evaluator/target/release/quint_evaluator "$benchmark_config/rust-evaluator-v0.7.1/"
QUINT_HOME="$benchmark_config" node --expose-gc --max-old-space-size=2800 "$suite/scale-rust.js" "$scale_dir"
```
