const PLATFORMS = ["Chuffed", "GoFundMe", "PayPal", "Spotfund", "Other"] as const;

export type DonationPlatform = (typeof PLATFORMS)[number];

export { PLATFORMS };

export function buildPrimaryLink(
  url: string,
  platform: string,
  amountRaised: number | null,
  currency = "USD"
) {
  return {
    id: crypto.randomUUID(),
    platform,
    url: url.trim(),
    currency,
    snapshots:
      amountRaised != null && !Number.isNaN(amountRaised)
        ? [{ timestamp: new Date().toISOString(), amountRaised }]
        : [],
  };
}

export function parseAmountRaised(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function readPrimaryLinkForm(campaign: {
  fundraiserLinks: { platform: string; url: string; snapshots: { amountRaised: number }[] }[];
}) {
  const primary = campaign.fundraiserLinks[0];
  if (!primary) {
    return { platform: "Chuffed" as DonationPlatform, url: "", amountRaised: "" };
  }
  const latest = primary.snapshots.reduce(
    (max, s) => (s.amountRaised > max ? s.amountRaised : max),
    0
  );
  return {
    platform: (PLATFORMS.includes(primary.platform as DonationPlatform)
      ? primary.platform
      : "Other") as DonationPlatform,
    url: primary.url,
    amountRaised: latest > 0 ? String(latest) : "",
  };
}
