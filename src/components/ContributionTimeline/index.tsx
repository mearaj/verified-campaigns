import { buildTimelineBuckets, type DateRange } from "@/lib/contributionTimeline";
import { formatCurrency } from "@/lib/campaignUtils";
import type { Snapshot } from "@/types";

interface ContributionTimelineProps {
  snapshots: Snapshot[];
  currency: string;
  range: DateRange;
  bucketCount?: number;
}

function rangeLabel(range: DateRange): string {
  if (range.preset === "custom") return "selected dates";
  if (range.preset === "all") return "all time";
  return `${range.preset.replace("d", "")} days`;
}

function compactAmount(n: number): string {
  if (n >= 1000) return `${Math.round(n / 100) / 10}k`;
  return String(Math.round(n));
}

export default function ContributionTimeline({
  snapshots,
  currency,
  range,
  bucketCount = 5,
}: ContributionTimelineProps) {
  const buckets = buildTimelineBuckets(snapshots, range, bucketCount);

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 px-2 py-2">
      <p className="mb-2 text-[9px] leading-tight text-vc-muted">
        Raised per period ({rangeLabel(range)}) — older left, newer right
      </p>
      <div
        className="grid items-end gap-1"
        style={{ gridTemplateColumns: `repeat(${bucketCount}, minmax(0, 1fr))` }}
      >
        {buckets.map((bucket, i) => (
          <div key={i} className="flex min-w-0 flex-col items-center text-center">
            <span
              className={`text-base font-bold tabular-nums leading-none sm:text-lg ${
                bucket.delta > 0 ? "text-vc-green-text" : "text-red-400"
              }`}
            >
              {bucket.delta > 0 ? compactAmount(bucket.delta) : "0"}
            </span>
            <div className="my-1.5 h-px w-full bg-white/30" />
            <span
              className="truncate text-[8px] tabular-nums text-vc-muted"
              title={formatCurrency(bucket.total, currency)}
            >
              Σ {compactAmount(bucket.total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
