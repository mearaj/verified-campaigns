import type { Campaign } from "@/types"

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    organizerId: "org-1",
    title: "Emergency Support for the Al-Khatib Family",
    story:
      "The Al-Khatib family has been displaced multiple times and is currently without stable access to food and medicine. Funds raised will be used for basic necessities and medical care.",
    fundraiserLinks: [
      {
        id: "link-1",
        platform: "GoFundMe",
        url: "https://example.com/gofundme-alkhatib",
        currency: "USD",
        snapshots: [
          {
            timestamp: "2026-01-28T00:00:00Z",
            amountRaised: 8200,
          },
          {
            timestamp: "2026-01-29T00:00:00Z",
            amountRaised: 9050,
          },
          {
            timestamp: "2026-01-30T00:00:00Z",
            amountRaised: 10120,
          },
        ],
      },
      {
        id: "link-2",
        platform: "LaunchGood",
        url: "https://example.com/launchgood-alkhatib",
        currency: "USD",
        snapshots: [
          {
            timestamp: "2026-01-28T00:00:00Z",
            amountRaised: 4100,
          },
          {
            timestamp: "2026-01-29T00:00:00Z",
            amountRaised: 4800,
          },
          {
            timestamp: "2026-01-30T00:00:00Z",
            amountRaised: 5600,
          },
        ],
      },
    ],
    screenshots: [
      "/images/campaigns/alkhatib-1.jpg",
      "/images/campaigns/alkhatib-2.jpg",
    ],
    verifiedBy: [
      {
        id: "ver-2",
        name: "Humanitarian Field Researcher",
        role: "NGO volunteer",
        note: "Reviewed documentation and confirmed fundraiser legitimacy.",
        date: "2026-01-05T00:00:00Z",
      },
    ],
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "camp-2",
    organizerId: "org-2",
    title: "Medical Aid for Displaced Children",
    story:
      "This campaign supports families seeking urgent medical treatment for children affected by ongoing displacement.",
    fundraiserLinks: [
      {
        id: "link-3",
        platform: "PayPal",
        url: "https://example.com/paypal-medical-aid",
        currency: "EUR",
        snapshots: [
          {
            timestamp: "2026-01-25T00:00:00Z",
            amountRaised: 2300,
          },
          {
            timestamp: "2026-01-29T00:00:00Z",
            amountRaised: 2950,
          },
        ],
      },
    ],
    screenshots: [],
    verifiedBy: [],
    createdAt: "2026-01-20T00:00:00Z",
  },
]
