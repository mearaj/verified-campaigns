import { useEffect, useState } from "react";
import { campaigns as mockCampaigns, organizers as mockOrganizers } from "@/mock";
import { watchCampaigns, watchOrganizers } from "@/services/firestore";
import { filterPublished, sortStuntedFirst } from "@/lib/sortCampaigns";
import type { Campaign, Organizer } from "@/types";

interface CatalogState {
  campaigns: Campaign[];
  organizers: Organizer[];
  loading: boolean;
  usingMock: boolean;
  error: string | null;
}

export function useCatalog(publicOnly = true): CatalogState {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let gotOrganizers = false;
    let gotCampaigns = false;

    const maybeDone = () => {
      if (gotOrganizers && gotCampaigns) setLoading(false);
    };

    const unsubOrg = watchOrganizers(
      items => {
        gotOrganizers = true;
        if (items.length > 0) {
          setOrganizers(items);
          setUsingMock(false);
        } else {
          setOrganizers(mockOrganizers);
          setUsingMock(true);
        }
        maybeDone();
      },
      err => {
        setError(err.message);
        setOrganizers(mockOrganizers);
        setUsingMock(true);
        gotOrganizers = true;
        maybeDone();
      }
    );

    const unsubCamp = watchCampaigns(
      items => {
        gotCampaigns = true;
        if (items.length > 0) {
          let list = items;
          if (publicOnly) list = filterPublished(list);
          setCampaigns(sortStuntedFirst(list));
          setUsingMock(false);
        } else {
          let list = mockCampaigns.map(c => ({ ...c, published: true }));
          if (publicOnly) list = filterPublished(list);
          setCampaigns(sortStuntedFirst(list));
          setUsingMock(true);
        }
        maybeDone();
      },
      err => {
        setError(err.message);
        let list = mockCampaigns.map(c => ({ ...c, published: true }));
        if (publicOnly) list = filterPublished(list);
        setCampaigns(sortStuntedFirst(list));
        setUsingMock(true);
        gotCampaigns = true;
        maybeDone();
      }
    );

    return () => {
      unsubOrg();
      unsubCamp();
    };
  }, [publicOnly]);

  return { campaigns, organizers, loading, usingMock, error };
}

export function getOrganizerById(
  organizers: Organizer[],
  organizerId: string
): Organizer | undefined {
  return organizers.find(o => o.id === organizerId);
}
