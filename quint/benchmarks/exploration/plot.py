"""Rebuild comparison.svg with Python and matplotlib, from the adjacent results.json."""
import json
from pathlib import Path
from statistics import median, quantiles

import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.ticker import FixedFormatter, FixedLocator, NullLocator, PercentFormatter

directory = Path(__file__).resolve().parent
rows = json.loads((directory / "results.json").read_text())["cases"]
labels = {
    "tendermint-4": "Tendermint · depth 4",
    "tendermint-5": "Tendermint · depth 5",
    "tendermint-6": "Tendermint · depth 6",
    "two-phase-commit": "Two-phase commit",
    "independent-timeouts": "Six independent timeouts",
    "guarded-handshake": "Guarded handshake",
    "ordered-log": "Ordered log",
}
colors = {"por": "#a45305", "dpor": "#007189", "random": "#6c4a91"}
plt.rcParams.update({"svg.fonttype": "none", "svg.hashsalt": "quint-por-benchmark", "font.size": 10})
fig, (speed, coverage) = plt.subplots(1, 2, figsize=(10.1, 4.5), sharey=True)
fig.subplots_adjust(left=.21, right=.97, top=.84, bottom=.19, wspace=.15)
for i, row in enumerate(rows):
    t = row["timing"]["milliseconds"]
    total = row["systematic"]["exhaustive"]["states"]
    for strategy, marker, offset in [("por", "s", -.18), ("dpor", "o", .0)]:
        speed.scatter(median(t["exhaustive"]) / median(t[strategy]), i + offset,
                      marker=marker, s=37, color=colors[strategy], zorder=3)
        coverage.scatter(100 * row["systematic"][strategy]["states"] / total, i + offset,
                         marker=marker, s=37, color=colors[strategy], zorder=3)
    values = [100 * trial["coverage"][str(row["matchedSamples"])] / total for trial in row["trials"]]
    q1, _, q3 = quantiles(values, n=4, method="inclusive")
    coverage.plot([q1, q3], [i + .18, i + .18], color=colors["random"], lw=2)
    coverage.scatter(median(values), i + .18, marker="D", s=32, color=colors["random"], zorder=3)

speed.set_title("Speed relative to exhaustive search", loc="left", weight="bold", fontsize=12)
coverage.set_title("Distinct reachable states visited", loc="left", weight="bold", fontsize=12)
speed.set_xscale("log")
speed.set_xlim(.45, 25)
ticks = [.5, 1, 2, 5, 10, 20]
speed.xaxis.set_major_locator(FixedLocator(ticks))
speed.xaxis.set_major_formatter(FixedFormatter([f"{v:g}×" for v in ticks]))
speed.xaxis.set_minor_locator(NullLocator())
speed.axvline(1, color="#717980", lw=1)
coverage.set_xlim(-2, 104)
coverage.set_xticks([0, 25, 50, 75, 100])
coverage.xaxis.set_major_formatter(PercentFormatter(100))
speed.set_yticks(range(len(rows)), [labels[r["name"]] for r in rows])
speed.set_ylim(len(rows) - .5, -.5)
for ax in (speed, coverage):
    ax.spines[:].set_visible(False)
    ax.tick_params(length=0, pad=6)
    ax.grid(axis="x", color="#d0d7dc", alpha=.7, lw=.7)
    ax.set_axisbelow(True)
    for y in range(len(rows) - 1):
        ax.axhline(y + .5, color="#e6e9ec", lw=.6, zorder=0)
legend = [Line2D([], [], color=colors[key], linestyle="", marker=mark, label=label)
          for key, mark, label in [("por", "s", "POR"), ("dpor", "o", "DPOR"),
                                    ("random", "D", "Random at DPOR time budget (median and IQR)")]]
fig.legend(handles=legend, loc="lower center", ncol=3, frameon=False)
output = directory / "comparison.svg"
fig.savefig(output, metadata={"Date": None,
    "Title": "Bounded Quint simulator coverage and performance",
    "Description": "Measured speed relative to exhaustive search, and exact bounded state coverage for seven workloads."})

output.write_text("\n".join(line.rstrip() for line in output.read_text().splitlines()) + "\n")
