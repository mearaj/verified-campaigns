import CampaignCard from "../CampaignCard";
import { campaigns, organizers } from "@/mock";

const getOrganizerById = (organizerId: string) =>
  organizers.find(o => o.id === organizerId);

function CampaignList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {campaigns.map(campaign => {
        const organizer = getOrganizerById(campaign.organizerId);

        return (
          organizer && (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              organizer={organizer}
            />
          )
        );
      })}
    </div>
  );
}

export default CampaignList;
