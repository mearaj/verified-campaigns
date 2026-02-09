import FundraiserMenu from "../FundraiserMenu";
import type { PropsWithChildren } from "react";
import type { Campaign, Organizer } from "@/types";

interface CampaignCardProps extends PropsWithChildren {
  campaign: Campaign;
  organizer: Organizer;
}

function CampaignCard({ campaign, organizer }: CampaignCardProps) {
  const isVerified = campaign.verifiedBy.length > 0;

  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {campaign.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Organized by {organizer.name}
          </p>
        </div>

        {isVerified && (
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Verified
          </span>
        )}
      </header>

      <p className="mt-4 text-sm leading-relaxed text-gray-700">
        {campaign.story}
      </p>
        <footer className="flex items-center justify-between mt-auto">
        <span className="text-xs font-medium text-gray-500">
          Verified by {campaign.verifiedBy.length}
        </span>

        <FundraiserMenu fundraiserLinks={campaign.fundraiserLinks} />
      </footer>
    </article>
  );
}

export default CampaignCard;
