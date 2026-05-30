import ContributionTimeline from "../ContributionTimeline";
import {
  formatCurrency,
  getLatestRaised,
  getPrimaryLink,
  shortenUrl,
} from "@/lib/campaignUtils";
import { lastSnapshotTime } from "@/lib/contributionTimeline";
import type { DateRange } from "@/lib/contributionTimeline";
import type { Campaign, Organizer } from "@/types";

interface CampaignCardProps {
  campaign: Campaign;
  organizer: Organizer;
  dateRange: DateRange;
}

function CampaignCard({ campaign, organizer, dateRange }: CampaignCardProps) {
  const primaryLink = getPrimaryLink(campaign);
  const isOrganizerVerified = organizer.verifiedBy.length > 0;
  const isCampaignVerified = campaign.verifiedBy.length > 0;
  const raised = primaryLink ? getLatestRaised(primaryLink) : 0;
  const progressImage = campaign.screenshots[0];
  const lastUpdate = primaryLink ? lastSnapshotTime(primaryLink.snapshots) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-vc-border/80 bg-gradient-to-b from-vc-card to-[#0d0d0d] shadow-lg transition hover:border-vc-green/60 hover:shadow-vc-green/5">
      {progressImage && (
        <div className="relative h-28 overflow-hidden">
          <img
            src={progressImage}
            alt=""
            className="h-full w-full object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-3">
        {lastUpdate && (
          <p className="text-[9px] text-vc-muted">
            Last update{" "}
            <time dateTime={lastUpdate.toISOString()}>
              {lastUpdate.toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </time>
          </p>
        )}

        <header className="mt-1 space-y-0.5">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
            {campaign.title}
          </h3>
          <p className="text-[11px] text-vc-muted">{organizer.name}</p>
        </header>

        <div className="mt-2 flex flex-wrap gap-1">
          {isOrganizerVerified && (
            <span className="rounded bg-vc-green/25 px-1.5 py-0.5 text-[9px] font-medium text-vc-green-text">
              Org verified
            </span>
          )}
          {isCampaignVerified && (
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-gray-300">
              Story verified
            </span>
          )}
          {primaryLink && (
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-vc-muted">
              {primaryLink.platform}
            </span>
          )}
        </div>

        {primaryLink && raised > 0 && (
          <p className="mt-3 text-2xl font-bold tabular-nums text-vc-green-text">
            {formatCurrency(raised, primaryLink.currency)}
          </p>
        )}

        {primaryLink && primaryLink.snapshots.length > 0 && (
          <ContributionTimeline
            snapshots={primaryLink.snapshots}
            currency={primaryLink.currency}
            range={dateRange}
          />
        )}

        {primaryLink && (
          <div className="mt-auto pt-3">
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-vc-green px-3 py-2.5 text-xs font-bold text-white transition group-hover:bg-vc-green-text group-hover:text-black"
            >
              Donate on {primaryLink.platform}
            </a>
            <p
              className="mt-1.5 truncate text-center text-[9px] text-vc-muted"
              title={primaryLink.url}
            >
              {shortenUrl(primaryLink.url, 36)}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default CampaignCard;
