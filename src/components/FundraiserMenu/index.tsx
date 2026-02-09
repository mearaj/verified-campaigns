import { useEffect, useRef, useState } from "react";
import type { FundraiserLink, Snapshot } from "@/types";

interface FundraiserMenuProps {
  fundraiserLinks: FundraiserLink[];
}

type TimeUnit = "hours" | "days" | "weeks";

function filterSnapshots(
  snapshots: Snapshot[],
  value: number,
  unit: TimeUnit
) {
  if (snapshots.length === 0) return [];

  const latest = Math.max(
    ...snapshots.map(s => new Date(s.timestamp).getTime())
  );

  const ms =
    unit === "hours"
      ? value * 60 * 60 * 1000
      : unit === "days"
      ? value * 24 * 60 * 60 * 1000
      : value * 7 * 24 * 60 * 60 * 1000;

  return snapshots.filter(s => {
    return new Date(s.timestamp).getTime() >= latest - ms;
  });
}


function FundraiserMenu({ fundraiserLinks }: FundraiserMenuProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"links" | "activity">("links");
  const [rangeValue, setRangeValue] = useState(7);
  const [rangeUnit, setRangeUnit] = useState<TimeUnit>("days");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setView("links");
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open]);

  if (fundraiserLinks.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="text-sm font-medium text-gray-900 hover:underline"
      >
        Fundraisers ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg border border-gray-100 z-10 p-4">
          {view === "links" && (
            <ul className="text-sm space-y-2">
              {fundraiserLinks.map(link => (
                <li key={link.id} className="flex justify-between">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="hover:underline"
                  >
                    {link.platform} ({link.currency})
                  </a>
                </li>
              ))}

              <li>
                <button
                  onClick={() => setView("activity")}
                  className="mt-2 text-xs text-gray-600 hover:underline"
                >
                  View activity →
                </button>
              </li>
            </ul>
          )}

          {view === "activity" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="number"
                  value={rangeValue}
                  onChange={e => setRangeValue(Number(e.target.value))}
                  className="w-16 rounded border px-2 py-1"
                />
                <select
                  value={rangeUnit}
                  onChange={e => setRangeUnit(e.target.value as TimeUnit)}
                  className="rounded border px-2 py-1"
                >
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                </select>
              </div>

              {fundraiserLinks.map(link => {
                const filtered = filterSnapshots(
                  link.snapshots,
                  rangeValue,
                  rangeUnit
                );

                if (filtered.length < 2) {
  return (
    <div key={link.id} className="text-xs text-gray-500">
      {link.platform} ({link.currency}) — not enough data
    </div>
  );
}


                const values = filtered.map(s => s.amountRaised);
                const min = Math.min(...values);
                const max = Math.max(...values);

                const points = filtered
                  .map((s, i) => {
                    const x = (i / (filtered.length - 1)) * 260;
                    const y =
                      60 -
                      ((s.amountRaised - min) / (max - min || 1)) * 60;
                    return `${x},${y}`;
                  })
                  .join(" ");

                return (
                  <div key={link.id}>
                    <div className="text-xs mb-1">
                      {link.platform} ({link.currency})
                    </div>
                    <svg width="260" height="60">
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        points={points}
                      />
                    </svg>
                  </div>
                );
              })}

              <button
                onClick={() => setView("links")}
                className="text-xs text-gray-600 hover:underline"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FundraiserMenu;
