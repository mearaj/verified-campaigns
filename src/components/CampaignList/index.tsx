import { useState } from "react";
import CampaignCard from "../CampaignCard";
import { sortStuntedFirst } from "@/lib/sortCampaigns";
import type { Campaign, Organizer } from "@/types";

interface CampaignListProps {
  campaigns: Campaign[];
  organizers: Organizer[];
}

function CampaignList({ campaigns, organizers }: CampaignListProps) {
  const [organizerFilter, setOrganizerFilter] = useState<string>("all");

  const filtered =
    organizerFilter === "all"
      ? campaigns
      : campaigns.filter(c => c.organizerId === organizerFilter);

  const sorted = sortStuntedFirst(filtered);

  return (
    <div>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setOrganizerFilter("all")}
          className={`shrink-0 rounded-full px-3 py-1 text-xs ${
            organizerFilter === "all"
              ? "bg-vc-green text-white"
              : "border border-vc-border text-vc-muted hover:text-white"
          }`}
        >
          All organizers
        </button>
        {organizers.map(org => (
          <button
            key={org.id}
            type="button"
            onClick={() => setOrganizerFilter(org.id)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs ${
              organizerFilter === org.id
                ? "bg-vc-green text-white"
                : "border border-vc-border text-vc-muted hover:text-white"
            }`}
          >
            {org.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sorted.map(campaign => {
          const organizer = organizers.find(o => o.id === campaign.organizerId);
          if (!organizer) return null;
          return (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              organizer={organizer}
            />
          );
        })}
      </div>

      {sorted.length === 0 && (
        <p className="text-sm text-vc-muted">No campaigns for this organizer.</p>
      )}
    </div>
  );
}

export default CampaignList;
