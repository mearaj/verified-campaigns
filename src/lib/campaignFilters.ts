import {
  getLatestRaised,
  getPrimaryLink,
} from "@/lib/campaignUtils";
import { growthInRange } from "@/lib/contributionTimeline";
import { getStuntedScore } from "@/lib/sortCampaigns";
import type { DateRange } from "@/lib/contributionTimeline";
import type { Campaign, Organizer } from "@/types";

export type SortOption =
  | "stunted"
  | "lowest_raised"
  | "highest_raised"
  | "slowest_progress"
  | "fastest_progress"
  | "newest"
  | "oldest"
  | "title_az";

export type PlatformFilter = "all" | "Chuffed" | "GoFundMe" | "PayPal" | "Spotfund" | "Other";

export type VerificationFilter =
  | "all"
  | "organizer_verified"
  | "story_verified"
  | "any_verified"
  | "unverified";

export type ScreenshotFilter = "all" | "with_screenshot" | "without_screenshot";

export interface ListFilters {
  organizerId: string;
  platform: PlatformFilter;
  verification: VerificationFilter;
  screenshot: ScreenshotFilter;
  search: string;
  sort: SortOption;
  dateRange: DateRange;
}

export const DEFAULT_FILTERS: ListFilters = {
  organizerId: "all",
  platform: "all",
  verification: "all",
  screenshot: "all",
  search: "",
  sort: "stunted",
  dateRange: { preset: "30d" },
};

export const SORT_LABELS: Record<SortOption, string> = {
  stunted: "Stunted first — needs visibility",
  lowest_raised: "Lowest total raised",
  highest_raised: "Highest total raised",
  slowest_progress: "Slowest progress in range",
  fastest_progress: "Fastest progress in range",
  newest: "Newest listed",
  oldest: "Oldest listed",
  title_az: "Title A → Z",
};

function primarySnapshots(campaign: Campaign) {
  return getPrimaryLink(campaign)?.snapshots ?? [];
}

function matchesPlatform(campaign: Campaign, platform: PlatformFilter): boolean {
  if (platform === "all") return true;
  const link = getPrimaryLink(campaign);
  if (!link) return false;
  if (platform === "Other") {
    return !["Chuffed", "GoFundMe", "PayPal", "Spotfund"].includes(link.platform);
  }
  return link.platform === platform;
}

function matchesVerification(
  campaign: Campaign,
  organizer: Organizer | undefined,
  filter: VerificationFilter
): boolean {
  if (filter === "all") return true;
  const orgOk = (organizer?.verifiedBy.length ?? 0) > 0;
  const storyOk = campaign.verifiedBy.length > 0;
  switch (filter) {
    case "organizer_verified":
      return orgOk;
    case "story_verified":
      return storyOk;
    case "any_verified":
      return orgOk || storyOk;
    case "unverified":
      return !orgOk && !storyOk;
    default:
      return true;
  }
}

export function filterAndSortCampaigns(
  campaigns: Campaign[],
  organizers: Organizer[],
  filters: ListFilters
): Campaign[] {
  const q = filters.search.trim().toLowerCase();

  let list = campaigns.filter(c => {
    const org = organizers.find(o => o.id === c.organizerId);
    if (filters.organizerId !== "all" && c.organizerId !== filters.organizerId) {
      return false;
    }
    if (!matchesPlatform(c, filters.platform)) return false;
    if (!matchesVerification(c, org, filters.verification)) return false;
    if (filters.screenshot === "with_screenshot" && c.screenshots.length === 0) {
      return false;
    }
    if (filters.screenshot === "without_screenshot" && c.screenshots.length > 0) {
      return false;
    }
    if (q && !c.title.toLowerCase().includes(q) && !c.story.toLowerCase().includes(q)) {
      return false;
    }
    return true;
  });

  list = [...list].sort((a, b) => {
    const linkA = getPrimaryLink(a);
    const linkB = getPrimaryLink(b);
    const raisedA = linkA ? getLatestRaised(linkA) : 0;
    const raisedB = linkB ? getLatestRaised(linkB) : 0;
    const snapsA = primarySnapshots(a);
    const snapsB = primarySnapshots(b);
    const growthA = growthInRange(snapsA, filters.dateRange);
    const growthB = growthInRange(snapsB, filters.dateRange);

    switch (filters.sort) {
      case "stunted":
        return getStuntedScore(a) - getStuntedScore(b);
      case "lowest_raised":
        return raisedA - raisedB;
      case "highest_raised":
        return raisedB - raisedA;
      case "slowest_progress":
        return growthA - growthB;
      case "fastest_progress":
        return growthB - growthA;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "title_az":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return list;
}
