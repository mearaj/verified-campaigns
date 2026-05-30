import { useMemo, useState } from "react";
import CampaignCard from "../CampaignCard";
import CampaignToolbar, { DEFAULT_FILTERS } from "../CampaignToolbar";
import { filterAndSortCampaigns } from "@/lib/campaignFilters";
import type { Campaign, Organizer } from "@/types";

interface CampaignListProps {
  campaigns: Campaign[];
  organizers: Organizer[];
}

function CampaignList({ campaigns, organizers }: CampaignListProps) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const visible = useMemo(
    () => filterAndSortCampaigns(campaigns, organizers, filters),
    [campaigns, organizers, filters]
  );

  return (
    <div>
      <CampaignToolbar
        filters={filters}
        onChange={setFilters}
        organizers={organizers}
        resultCount={visible.length}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map(campaign => {
          const organizer = organizers.find(o => o.id === campaign.organizerId);
          if (!organizer) return null;
          return (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              organizer={organizer}
              dateRange={filters.dateRange}
            />
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="rounded-xl border border-vc-border bg-vc-card p-8 text-center text-sm text-vc-muted">
          No campaigns match these filters. Try reset or broaden your search.
        </p>
      )}
    </div>
  );
}

export default CampaignList;
