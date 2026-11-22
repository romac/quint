"""Measure a fresh Quint CLI invocation for every workload on Unix."""

import argparse
import json
import os
from pathlib import Path
import platform
import subprocess
import sys
import tempfile
import time


ROOT = Path(__file__).resolve().parents[3]
FIXTURE = 'quint/benchmarks/exploration/ScaleModels.qnt'
TM4 = 'examples/cosmos/tendermint/TendermintPOR.qnt'
LOG = 'quint/benchmarks/exploration/Models.qnt'
# (file, module, init, step, invariant, witness, depth, optional BFS state budget)
CASES = {
    'tm4-d7': (TM4, 'TendermintPOR', 'Init', 'Next', 'Agreement', 'reachedQuorum', 7, None),
    'tm4-d9': (TM4, 'TendermintPOR', 'Init', 'Next', 'Agreement', 'reachedQuorum', 9, None),
    'tm7-d8': (FIXTURE, 'SevenValidators', 'Init', 'Next', 'Agreement', 'reachedQuorum', 8, None),
    'timeouts': (FIXTURE, 'TwelveTimeouts', 'Init', 'timeouts', 'Agreement', 'allTimedOut', 12, None),
    'twophase': (FIXTURE, 'TwoPhaseEight', 'init', 'step', 'consistencyInv', 'fourPrepares', 14, 30_000),
    'log': (LOG, 'OrderedLog', 'init', 'step', 'valid', 'sixTwos', 12, 50_000),
    'log-full': (LOG, 'OrderedLog', 'init', 'step', 'valid', 'sixTwos', 12, None),
}


# Independent bounds in LARGE.md (including the analytic eight-manager count).
REACHABLE = {
    'tm4-d7': 1455, 'tm4-d9': 3861, 'tm7-d8': 30530, 'timeouts': 2 ** 12,
    'twophase': 1255810, 'log': sum(3 ** n for n in range(13)), 'log-full': sum(3 ** n for n in range(13)),
}


def group_rss_kib(group):
    """Sum resident pages in the new process group created for this CLI."""
    pages = 0
    for entry in Path('/proc').glob('[0-9]*/stat'):
        try:
            # comm is parenthesized and can contain spaces and parentheses.
            fields = entry.read_text().rsplit(')', 1)[1].split()
            if int(fields[2]) == group:
                pages += int(fields[21])
        except (FileNotFoundError, ProcessLookupError, PermissionError):
            continue
    return pages * os.sysconf('SC_PAGE_SIZE') // 1024


def measure(cmd):
    start = time.monotonic()
    proc = subprocess.Popen(cmd, cwd=ROOT, start_new_session=True)
    tree_peak = None
    if sys.platform.startswith('linux'):
        tree_peak = 0
        while True:
            tree_peak = max(tree_peak, group_rss_kib(proc.pid))
            pid, status, usage = os.wait4(proc.pid, os.WNOHANG)
            if pid:
                break
            time.sleep(0.05)
    else:
        _, status, usage = os.wait4(proc.pid, 0)
    proc.returncode = os.waitstatus_to_exitcode(status)
    elapsed = time.monotonic() - start
    # wait4 measures the largest individual process, including waited children.
    peak = usage.ru_maxrss / (1024 ** 2 if sys.platform == 'darwin' else 1024)
    return proc.returncode, dict(seconds=elapsed, peakProcessMiB=peak,
                                 sampledPeakTreeMiB=tree_peak / 1024 if tree_peak is not None else None)


def run(name, backend, strategy, max_work):
    file, module, init, step, inv, witness, depth, cap = CASES[name]
    with tempfile.TemporaryDirectory() as directory:
        output = Path(directory) / 'result.json'
        cmd = ['node', str(ROOT / 'quint/dist/src/cli.js'), 'run', file,
               '--main', module, '--strategy', strategy, '--backend', backend, '--init', init,
               '--step', step, '--invariant', inv, '--witnesses', witness, '--max-steps', str(depth),
               '--out', str(output)]
        cap = cap if strategy == 'bfs' else None
        if cap is not None:
            cmd += ['--max-states', str(cap)]
        if max_work is not None:
            cmd += ['--max-work', str(max_work)]
        code, resources = measure(cmd)
        if not output.exists():
            raise RuntimeError(f'{backend} {strategy} {name} exited with {code} before writing a report: {resources}')
        result = json.loads(output.read_text())
        status, limit = result.get('status'), result.get('limit')
        expected_limits = {'max-states'} if cap is not None else set()
        if max_work is not None:
            expected_limits.add('max-work')
        if (status, code) != ('ok', 0) and not (status == 'incomplete' and code == 1 and limit in expected_limits):
            raise RuntimeError((cmd, code, status, limit, result.get('errors')))
        stats = result['exploration']
        if strategy == 'bfs' and max_work is None:
            reachable = REACHABLE[name]
            expected = reachable if cap is None else min(cap, reachable)
            expected_status = 'ok' if expected == reachable else 'incomplete'
            if stats['bfs']['distinctStates'] != expected or status != expected_status:
                raise RuntimeError(f'{name}: expected {expected} distinct states and {expected_status}')
        return dict(case=name, backend=backend, strategy=strategy, status=status, limit=limit,
                    maxStates=cap, maxWork=max_work, **resources, witnessed=result['witnessed'],
                    **{k: v for k, v in stats.items() if k != 'bfs'}, **stats.get('bfs', {}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--backend', choices=['rust', 'typescript'], required=True)
    parser.add_argument('--strategy', choices=['bfs', 'exhaustive', 'por', 'dpor'], default='bfs')
    parser.add_argument('--max-work', type=int)
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('cases', nargs='*', metavar='CASE')
    args = parser.parse_args()
    rows = []
    for case in args.cases or list(CASES)[:-1]:
        row = run(case, args.backend, args.strategy, args.max_work)
        print(json.dumps(row), flush=True)
        rows.append(row)
        args.out.write_text(json.dumps(dict(host=platform.platform(), rows=rows), indent=2) + '\n')
