import {
  getLatestRaised,
  getPrimaryLink,
} from "@/lib/campaignUtils";
import type { Campaign } from "@/types";

/** Lower score = show first (most stunted / needs visibility). */
export function getStuntedScore(campaign: Campaign): number {
  const primary = getPrimaryLink(campaign);
  if (!primary) return 0;

  const raised = getLatestRaised(primary);
  if (primary.snapshots.length >= 2) {
    const sorted = [...primary.snapshots].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    const first = sorted[0].amountRaised;
    const last = sorted[sorted.length - 1].amountRaised;
    const growth = last - first;
    return raised + growth * 0.1;
  }

  return raised;
}

export function sortStuntedFirst(campaigns: Campaign[]): Campaign[] {
  return [...campaigns].sort((a, b) => {
    const scoreDiff = getStuntedScore(a) - getStuntedScore(b);
    if (scoreDiff !== 0) return scoreDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export function filterPublished(campaigns: Campaign[]): Campaign[] {
  return campaigns.filter(c => c.published !== false);
}
