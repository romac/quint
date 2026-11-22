# State-cached bounded search on TypeScript and Rust

Both production evaluators found every one of the 30,530 reachable seven-validator Tendermint states through depth eight. They took the same 1,556,794 action evaluations and first reached the quorum witness at depth six. At that work limit, DPOR reached quorum on both evaluators and returned `incomplete`. Use BFS for bounded safety when the cache fits.

## BFS coverage, wall time and resident memory

Timings include a fresh CLI process, parsing, typechecking, evaluation and JSON output. The two backend columns give elapsed seconds and the sampled peak sum of resident memory across the command. Seven-validator BFS reports the median of three fresh processes per evaluator. Its wall-time ranges were 73.7–83.1 s for TypeScript and 16.3–44.1 s for Rust. One additional TypeScript process was killed before it returned a report and was repeated. The raw file records the interrupted attempt separately. Other rows are single measurements. Both evaluators agreed on distinct states, duplicates, action evaluations, witness depths and completed layers in every BFS row.

| Model and requested depth | Outcome | Distinct states | Deepest complete layer | First witness depth | Action evaluations | TypeScript time / RSS | Rust time / RSS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Tendermint, 4 validators, d7 | Complete | 1,455 | 7 | 4 | 59,953 | 6.4 s / 282 MiB | 3.0 s / 176 MiB |
| Tendermint, 4 validators, d9 | Complete | 3,861 | 9 | 4 | 300,881 | 24.6 s / 406 MiB | 4.8 s / 204 MiB |
| Tendermint, 7 validators, d8 | Complete | 30,530 | 8 | 6 | 1,556,794 | 79.2 s / 505 MiB | 22.5 s / 522 MiB |
| 12 independent timeouts, d12 | Complete | 4,096 | 12 | 12 | 49,141 | 10.5 s / 397 MiB | 3.7 s / 193 MiB |
| Two-phase commit, 8 managers, d14 | State cap | 30,000 | 6 | unseen | 388,857 | 20.2 s / 458 MiB | 5.5 s / 250 MiB |
| Ordered log, d12, capped | State cap | 50,000 | 9 | 6 | 50,001 | 3.9 s / 326 MiB | 2.4 s / 283 MiB |
| Ordered log, d12, full | Complete | 797,161 | 12 | 6 | 797,161 | 28.9 s / 1,071 MiB | 9.5 s / 2,060 MiB |

The two capped rows stop on the first additional distinct state. Two-phase commit has 1,255,810 reachable states through depth fourteen. The 30,000-state budget finished depth six and part of depth seven. Its four-prepare witness needs at least eight steps. On the ordered log, a 50,000-state budget did reach the six-twos witness. Removing the cap checked all 797,161 states through depth twelve.

## Where partial-order reduction helps

Completed schedules count depth-bound or terminal executions in the depth-first strategies. BFS reports distinct states and a frontier. Different set iteration orders can change which prefixes a backend reaches before a work limit. Where the completed schedule counts differ, the table gives TypeScript followed by Rust.

| Model | Strategy | Outcome | Evaluations | Completed schedules | TypeScript time / RSS | Rust time / RSS |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Tendermint, 7 validators, d8 | `bfs` | ok | 1,556,794 | — | 79.2 s / 505 MiB | 22.5 s / 522 MiB |
| Tendermint, 7 validators, d8 | `dpor` | incomplete | 1,556,794 | 70,359 / 66,934 | 87.7 s / 425 MiB | 16.2 s / 171 MiB |
| 12 independent timeouts, d12 | `bfs` | ok | 49,141 | — | 10.5 s / 397 MiB | 3.7 s / 193 MiB |
| 12 independent timeouts, d12 | `dpor` | ok | 65,539 | 1 | 10.0 s / 419 MiB | 2.9 s / 171 MiB |
| Ordered log, d12, full | `bfs` | ok | 797,161 | — | 28.9 s / 1,071 MiB | 9.5 s / 2,060 MiB |
| Ordered log, d12, full | `dpor` | ok | 1,328,599 | 531,441 | 40.4 s / 413 MiB | 5.6 s / 165 MiB |
| Ordered log, d12, full | `exhaustive` | ok | 797,161 | 531,441 | 23.6 s / 416 MiB | 5.8 s / 164 MiB |

- **Full Tendermint.** Different schedules often lead to the same full model state. BFS expanded 5,308 states below the bound and discarded 32,063 duplicate transitions. The earlier instrumented TypeScript run counted 14,151 distinct states for DPOR under the identical work limit, or 46.4% of the reachable set. Native DPOR peaked at 171 MiB, compared with a median of 522 MiB for native BFS. The prefix counter in the raw report includes repeated states. [Earlier distinct-state measurements](LARGE.md)
- **Independent timeouts.** Twelve independent timeouts have 479,001,600 possible complete orders and 4,096 reachable subsets. Both DPOR runs finished with a single complete ordering and preserved the witness. BFS also finished, with fewer action evaluations. On Rust, DPOR finished in 2.9 s at a sampled peak of 171 MiB.
- **Ordered log.** Every append order produces a different state. BFS recorded zero duplicates, so the cache saved zero action evaluations. BFS can still guarantee a shortest counterexample. Exhaustive DFS checked the same 797,161 prefixes while keeping a depth-twelve stack. DPOR also finished all 531,441 full schedules and spent another 531,438 action evaluations checking possible swaps.

## Reproduce

The Linux host used an Intel Xeon Platinum 8573C, Node 24.22.3 and a release-mode Rust 1.93.1 evaluator built from this fork. The script samples the sum of RSS in the CLI's process group every 50 ms, including the native child. A sample can miss short peaks. Summing RSS counts pages shared by two processes twice. The JSON also records the Unix `wait4` high-water mark for the largest individual process. Timings are host-dependent.

```sh
(cd quint && npm ci && npm run compile)
cargo build --release --locked --manifest-path evaluator/Cargo.toml
suite=quint/benchmarks/exploration/bfs-memory.py
results=$(mktemp -d)
for backend in typescript rust; do
  python3 "$suite" --backend "$backend" --out "$results/bfs-$backend.json" \
    tm7-d8 tm4-d7 tm4-d9 timeouts twophase log log-full
  python3 "$suite" --backend "$backend" --strategy dpor --max-work 1556794 \
    --out "$results/dpor-$backend.json" timeouts tm7-d8
  for strategy in exhaustive dpor; do
    python3 "$suite" --backend "$backend" --strategy "$strategy" \
      --out "$results/log-$strategy-$backend.json" log-full
  done
  for trial in 2 3; do
    python3 "$suite" --backend "$backend" --out "$results/bfs-$backend-$trial.json" tm7-d8
  done
done
```

[Raw measurements](bfs-memory.json) · [Benchmark harness](bfs-memory.py) · [Simulator usage](../../../docs/content/docs/simulator.mdx)
