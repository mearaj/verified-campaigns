import type { Snapshot } from "@/types";

export type DateRangePreset = "7d" | "14d" | "30d" | "90d" | "all" | "custom";

export interface DateRange {
  preset: DateRangePreset;
  customStart?: string;
  customEnd?: string;
}

export interface TimelineBucket {
  /** Contribution (delta) in this period */
  delta: number;
  /** Cumulative total at end of period */
  total: number;
  periodStart: Date;
  periodEnd: Date;
}

export function resolveRangeMs(range: DateRange): { start: number; end: number } {
  const end = range.customEnd ? new Date(range.customEnd).getTime() : Date.now();
  if (range.preset === "custom" && range.customStart) {
    return { start: new Date(range.customStart).getTime(), end };
  }
  const days =
    range.preset === "7d"
      ? 7
      : range.preset === "14d"
        ? 14
        : range.preset === "30d"
          ? 30
          : range.preset === "90d"
            ? 90
            : range.preset === "all"
              ? 3650
              : 30;
  return { start: end - days * 86400000, end };
}

function cumulativeAt(snapshots: Snapshot[], timeMs: number): number {
  let amount = 0;
  for (const s of snapshots) {
    if (new Date(s.timestamp).getTime() <= timeMs) {
      amount = s.amountRaised;
    } else break;
  }
  return amount;
}

/** Build buckets oldest → newest (left → right on card). */
export function buildTimelineBuckets(
  snapshots: Snapshot[],
  range: DateRange,
  bucketCount = 5
): TimelineBucket[] {
  if (snapshots.length === 0) {
    return Array.from({ length: bucketCount }, () => ({
      delta: 0,
      total: 0,
      periodStart: new Date(),
      periodEnd: new Date(),
    }));
  }

  const sorted = [...snapshots].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const { start, end } = resolveRangeMs(range);
  const span = Math.max(end - start, 1);
  const bucketMs = span / bucketCount;
  const buckets: TimelineBucket[] = [];

  for (let i = 0; i < bucketCount; i++) {
    const periodStart = new Date(start + i * bucketMs);
    const periodEnd = new Date(start + (i + 1) * bucketMs);
    const startAmount = cumulativeAt(sorted, periodStart.getTime() - 1);
    const endAmount = cumulativeAt(sorted, periodEnd.getTime());
    buckets.push({
      delta: Math.max(0, endAmount - startAmount),
      total: endAmount,
      periodStart,
      periodEnd,
    });
  }

  return buckets;
}

export function growthInRange(snapshots: Snapshot[], range: DateRange): number {
  const buckets = buildTimelineBuckets(snapshots, range);
  return buckets.reduce((sum, b) => sum + b.delta, 0);
}

export function lastSnapshotTime(snapshots: Snapshot[]): Date | null {
  if (!snapshots.length) return null;
  const latest = snapshots.reduce((a, b) =>
    new Date(a.timestamp) > new Date(b.timestamp) ? a : b
  );
  return new Date(latest.timestamp);
}
