import {
  formatCurrency,
  getLatestRaised,
  getPrimaryLink,
  shortenUrl,
} from "@/lib/campaignUtils";
import type { Campaign, Organizer } from "@/types";

interface CampaignCardProps {
  campaign: Campaign;
  organizer: Organizer;
}

function CampaignCard({ campaign, organizer }: CampaignCardProps) {
  const primaryLink = getPrimaryLink(campaign);
  const isOrganizerVerified = organizer.verifiedBy.length > 0;
  const isCampaignVerified = campaign.verifiedBy.length > 0;
  const raised = primaryLink ? getLatestRaised(primaryLink) : 0;
  const extraLinks = campaign.fundraiserLinks.length - 1;
  const progressImage = campaign.screenshots[0];

  return (
    <article className="flex h-full flex-col rounded-xl border border-vc-border bg-vc-card p-3 transition hover:border-vc-green/50">
      {progressImage && (
        <img
          src={progressImage}
          alt="Fundraiser progress"
          className="mb-2 h-24 w-full rounded-lg object-cover object-top"
        />
      )}

      <header className="mb-2 space-y-1">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-white">
          {campaign.title}
        </h3>
        <p className="text-xs text-vc-muted">by {organizer.name}</p>
      </header>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {isOrganizerVerified && (
          <span className="rounded bg-vc-green/30 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-vc-green-text">
            Organizer verified
          </span>
        )}
        {isCampaignVerified && (
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-gray-300">
            Verified story
          </span>
        )}
      </div>

      {primaryLink && (
        <div className="mt-auto space-y-2">
          {raised > 0 && (
            <p className="text-xs text-vc-muted">
              Raised{" "}
              <span className="font-medium text-gray-200">
                {formatCurrency(raised, primaryLink.currency)}
              </span>
            </p>
          )}

          <a
            href={primaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-vc-green px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-vc-green-text hover:text-black"
          >
            Donate · {primaryLink.platform}
          </a>

          <p className="truncate text-[10px] text-vc-muted" title={primaryLink.url}>
            {shortenUrl(primaryLink.url)}
          </p>

          {extraLinks > 0 && (
            <p className="text-[10px] text-vc-muted">+ {extraLinks} more link(s)</p>
          )}
        </div>
      )}
    </article>
  );
}

export default CampaignCard;
