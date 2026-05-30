import type { Campaign } from "@/types";

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    organizerId: "org-1",
    title: "Gaza Family Needs Urgent Shelter, Food and Dignity",
    story:
      "A displaced family of six is living in a tent without stable access to food or medicine. Funds go directly to shelter and basic necessities.",
    fundraiserLinks: [
      {
        id: "link-1",
        platform: "Chuffed",
        url: "https://chuffed.org/project/170008-gaza-family-needs-urgent-shelter-food-and-dignity",
        currency: "USD",
        snapshots: [
          { timestamp: "2026-05-20T00:00:00Z", amountRaised: 980 },
          { timestamp: "2026-05-22T00:00:00Z", amountRaised: 1020 },
          { timestamp: "2026-05-24T00:00:00Z", amountRaised: 1050 },
          { timestamp: "2026-05-26T00:00:00Z", amountRaised: 1180 },
          { timestamp: "2026-05-28T00:00:00Z", amountRaised: 1240 },
        ],
      },
    ],
    screenshots: [],
    verifiedBy: [
      {
        id: "ver-1",
        name: "Example Organizer A",
        role: "Organizer",
        note: "Family documentation reviewed.",
        date: "2026-04-10T00:00:00Z",
      },
    ],
    createdAt: "2026-04-01T00:00:00Z",
    published: true,
  },
  {
    id: "camp-2",
    organizerId: "org-2",
    title: "Help Ahmed Rebuild His Future",
    story:
      "Ahmed and his siblings lost their home. This appeal supports rent, food, and school supplies while they rebuild.",
    fundraiserLinks: [
      {
        id: "link-2",
        platform: "Chuffed",
        url: "https://chuffed.org/project/170766-help-ahmed-rebuild-his-future",
        currency: "USD",
        snapshots: [
          { timestamp: "2026-05-01T00:00:00Z", amountRaised: 2100 },
          { timestamp: "2026-05-20T00:00:00Z", amountRaised: 3180 },
          { timestamp: "2026-05-28T00:00:00Z", amountRaised: 3650 },
        ],
      },
    ],
    screenshots: [],
    verifiedBy: [
      {
        id: "ver-2",
        name: "Example Organizer B",
        role: "Organizer",
        note: "Verified family story and fundraiser link.",
        date: "2026-04-15T00:00:00Z",
      },
    ],
    createdAt: "2026-04-05T00:00:00Z",
    published: true,
  },
  {
    id: "camp-3",
    organizerId: "org-3",
    title: "Help Mother of 3 Najwa Provide for Her Family",
    story:
      "Najwa is raising three children alone after displacement. Support covers food, diapers, and winter supplies.",
    fundraiserLinks: [
      {
        id: "link-3",
        platform: "Chuffed",
        url: "https://chuffed.org/project/168712-help-mother-of-3-najwa-to-provide-for-her-family",
        currency: "USD",
        snapshots: [
          { timestamp: "2026-05-01T00:00:00Z", amountRaised: 680 },
          { timestamp: "2026-05-28T00:00:00Z", amountRaised: 720 },
        ],
      },
    ],
    screenshots: [],
    verifiedBy: [
      {
        id: "ver-3",
        name: "Example Organizer C",
        role: "Organizer",
        note: "Organizer-verified campaign.",
        date: "2026-04-20T00:00:00Z",
      },
    ],
    createdAt: "2026-04-12T00:00:00Z",
    published: true,
  },
  {
    id: "camp-4",
    organizerId: "org-1",
    title: "Stand With Baby Abdullah",
    story:
      "Baby Abdullah needs ongoing medical care and formula. Donations go to treatment and transport to clinic.",
    fundraiserLinks: [
      {
        id: "link-4",
        platform: "Chuffed",
        url: "https://chuffed.org/project/129403-stand-with-baby-abdullah",
        currency: "USD",
        snapshots: [
          { timestamp: "2026-05-18T00:00:00Z", amountRaised: 150 },
          { timestamp: "2026-05-22T00:00:00Z", amountRaised: 150 },
          { timestamp: "2026-05-24T00:00:00Z", amountRaised: 165 },
          { timestamp: "2026-05-26T00:00:00Z", amountRaised: 180 },
          { timestamp: "2026-05-28T00:00:00Z", amountRaised: 210 },
        ],
      },
    ],
    screenshots: [],
    verifiedBy: [],
    createdAt: "2026-05-01T00:00:00Z",
    published: true,
  },
  {
    id: "camp-5",
    organizerId: "org-2",
    title: "Medical Aid for Displaced Children",
    story:
      "Emergency medical support for children affected by ongoing displacement and lack of hospital access.",
    fundraiserLinks: [
      {
        id: "link-5",
        platform: "GoFundMe",
        url: "https://www.gofundme.com/f/example-medical-aid-displaced-children",
        currency: "USD",
        snapshots: [
          { timestamp: "2026-05-05T00:00:00Z", amountRaised: 5400 },
          { timestamp: "2026-05-28T00:00:00Z", amountRaised: 6120 },
        ],
      },
      {
        id: "link-5b",
        platform: "PayPal",
        url: "https://paypal.me/example-medical-aid",
        currency: "USD",
        snapshots: [{ timestamp: "2026-05-28T00:00:00Z", amountRaised: 800 }],
      },
    ],
    screenshots: [],
    verifiedBy: [
      {
        id: "ver-5",
        name: "Example Organizer B",
        role: "Organizer",
        note: "Medical records reviewed.",
        date: "2026-05-02T00:00:00Z",
      },
    ],
    createdAt: "2026-05-02T00:00:00Z",
    published: true,
  },
  {
    id: "camp-6",
    organizerId: "org-3",
    title: "Rebuild Hope After War — Cold Nights",
    story:
      "A family of five needs blankets, fuel, and partial rent after their building was destroyed.",
    fundraiserLinks: [
      {
        id: "link-6",
        platform: "Chuffed",
        url: "https://chuffed.org/project/155160-help-our-family-rebuild-after-war-cold-nights-and-hope",
        currency: "USD",
        snapshots: [
          { timestamp: "2026-05-01T00:00:00Z", amountRaised: 980 },
          { timestamp: "2026-05-28T00:00:00Z", amountRaised: 1010 },
        ],
      },
    ],
    screenshots: [],
    verifiedBy: [
      {
        id: "ver-6",
        name: "Example Organizer C",
        role: "Organizer",
        note: "Organizer-verified.",
        date: "2026-04-25T00:00:00Z",
      },
    ],
    createdAt: "2026-04-25T00:00:00Z",
    published: true,
  },
];
