import type { Campaign, FundraiserLink } from "@/types";

export function getLatestRaised(link: FundraiserLink): number {
  if (link.snapshots.length === 0) return 0;
  return link.snapshots.reduce((latest, snapshot) => {
    const amount = snapshot.amountRaised;
    return amount > latest ? amount : latest;
  }, 0);
}

export function getPrimaryLink(campaign: Campaign): FundraiserLink | undefined {
  return campaign.fundraiserLinks[0];
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function shortenUrl(url: string, max = 42): string {
  const trimmed = url.replace(/^https?:\/\//, "");
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}
