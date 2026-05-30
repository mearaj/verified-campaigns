import { useEffect, useState } from "react";
import { campaigns as mockCampaigns, organizers as mockOrganizers } from "@/mock";
import { watchCampaigns, watchOrganizers } from "@/services/firestore";
import { filterPublished } from "@/lib/sortCampaigns";
import type { Campaign, Organizer } from "@/types";

interface CatalogState {
  campaigns: Campaign[];
  organizers: Organizer[];
  loading: boolean;
  /** True when public site shows demo data (Firestore campaigns empty). */
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
        } else if (publicOnly) {
          setOrganizers(mockOrganizers);
        } else {
          setOrganizers([]);
        }
        maybeDone();
      },
      err => {
        setError(err.message);
        setOrganizers(publicOnly ? mockOrganizers : []);
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
          setCampaigns(list);
          setUsingMock(false);
        } else if (publicOnly) {
          let list = mockCampaigns.map(c => ({ ...c, published: true }));
          list = filterPublished(list);
          setCampaigns(list);
          setUsingMock(true);
        } else {
          setCampaigns([]);
          setUsingMock(false);
        }
        maybeDone();
      },
      err => {
        setError(err.message);
        if (publicOnly) {
          let list = mockCampaigns.map(c => ({ ...c, published: true }));
          list = filterPublished(list);
          setCampaigns(list);
          setUsingMock(true);
        } else {
          setCampaigns([]);
          setUsingMock(false);
        }
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
