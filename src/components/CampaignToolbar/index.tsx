import type { ReactNode } from "react";
import {
  DEFAULT_FILTERS,
  SORT_LABELS,
  type ListFilters,
  type PlatformFilter,
  type SortOption,
  type ScreenshotFilter,
  type VerificationFilter,
} from "@/lib/campaignFilters";
import type { DateRangePreset } from "@/lib/contributionTimeline";
import type { Organizer } from "@/types";

interface CampaignToolbarProps {
  filters: ListFilters;
  onChange: (next: ListFilters) => void;
  organizers: Organizer[];
  resultCount: number;
}

const PLATFORMS: PlatformFilter[] = [
  "all",
  "Chuffed",
  "GoFundMe",
  "PayPal",
  "Spotfund",
  "Other",
];

const VERIFICATION: { id: VerificationFilter; label: string }[] = [
  { id: "all", label: "All verification" },
  { id: "any_verified", label: "Any verified" },
  { id: "organizer_verified", label: "Organizer verified" },
  { id: "story_verified", label: "Story verified" },
  { id: "unverified", label: "Not verified" },
];

const SCREENSHOTS: { id: ScreenshotFilter; label: string }[] = [
  { id: "all", label: "All cards" },
  { id: "with_screenshot", label: "With screenshot" },
  { id: "without_screenshot", label: "No screenshot" },
];

const DATE_PRESETS: { id: DateRangePreset; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "14d", label: "14 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "all", label: "All time" },
  { id: "custom", label: "Custom" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-vc-green text-white"
          : "border border-vc-border bg-vc-card text-vc-muted hover:border-vc-green/50 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function CampaignToolbar({
  filters,
  onChange,
  organizers,
  resultCount,
}: CampaignToolbarProps) {
  const set = (patch: Partial<ListFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="mb-5 space-y-4 rounded-xl border border-vc-border bg-vc-card/50 p-3 sm:p-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-[200px] flex-1 text-xs text-vc-muted">
          Search campaigns
          <input
            type="search"
            placeholder="Family name, story…"
            value={filters.search}
            onChange={e => set({ search: e.target.value })}
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm text-white"
          />
        </label>

        <label className="min-w-[220px] text-xs text-vc-muted">
          Order cards by
          <select
            value={filters.sort}
            onChange={e => set({ sort: e.target.value as SortOption })}
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm text-white"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map(key => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>

        <p className="text-xs text-vc-muted">
          <span className="font-semibold text-vc-green-text">{resultCount}</span>{" "}
          campaign{resultCount === 1 ? "" : "s"}
        </p>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-vc-muted">
          Timeline range (on each card)
        </p>
        <div className="flex flex-wrap gap-2">
          {DATE_PRESETS.map(p => (
            <Pill
              key={p.id}
              active={filters.dateRange.preset === p.id}
              onClick={() =>
                set({
                  dateRange: {
                    preset: p.id,
                    customStart: filters.dateRange.customStart,
                    customEnd: filters.dateRange.customEnd,
                  },
                })
              }
            >
              {p.label}
            </Pill>
          ))}
        </div>
        {filters.dateRange.preset === "custom" && (
          <div className="mt-2 flex flex-wrap gap-2">
            <label className="text-xs text-vc-muted">
              From
              <input
                type="date"
                value={filters.dateRange.customStart?.slice(0, 10) ?? ""}
                onChange={e =>
                  set({
                    dateRange: {
                      ...filters.dateRange,
                      customStart: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : undefined,
                    },
                  })
                }
                className="mt-1 block rounded-lg border border-vc-border bg-vc-bg px-2 py-1.5 text-sm"
              />
            </label>
            <label className="text-xs text-vc-muted">
              To
              <input
                type="date"
                value={filters.dateRange.customEnd?.slice(0, 10) ?? ""}
                onChange={e =>
                  set({
                    dateRange: {
                      ...filters.dateRange,
                      customEnd: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : undefined,
                    },
                  })
                }
                className="mt-1 block rounded-lg border border-vc-border bg-vc-bg px-2 py-1.5 text-sm"
              />
            </label>
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-vc-muted">
          Filter by organizer
        </p>
        <div className="flex flex-wrap gap-2">
          <Pill
            active={filters.organizerId === "all"}
            onClick={() => set({ organizerId: "all" })}
          >
            All organizers
          </Pill>
          {organizers.map(org => (
            <Pill
              key={org.id}
              active={filters.organizerId === org.id}
              onClick={() => set({ organizerId: org.id })}
            >
              {org.name}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-vc-muted">
          Filter by platform
        </p>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <Pill
              key={p}
              active={filters.platform === p}
              onClick={() => set({ platform: p })}
            >
              {p === "all" ? "All platforms" : p}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-vc-muted">
            Verification
          </p>
          <div className="flex flex-wrap gap-2">
            {VERIFICATION.map(v => (
              <Pill
                key={v.id}
                active={filters.verification === v.id}
                onClick={() => set({ verification: v.id })}
              >
                {v.label}
              </Pill>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-vc-muted">
            Screenshots
          </p>
          <div className="flex flex-wrap gap-2">
            {SCREENSHOTS.map(s => (
              <Pill
                key={s.id}
                active={filters.screenshot === s.id}
                onClick={() => set({ screenshot: s.id })}
              >
                {s.label}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange({ ...DEFAULT_FILTERS })}
        className="text-xs text-vc-muted underline hover:text-white"
      >
        Reset all filters
      </button>
    </div>
  );
}

export { DEFAULT_FILTERS };
