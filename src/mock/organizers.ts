import type { Organizer } from "@/types";

export const organizers: Organizer[] = [
  {
    id: "org-1",
    name: "Example Organizer A",
    description: "Trusted organizer with an established verification process.",
    verifiedBy: [
      {
        id: "ver-vc-1",
        name: "Verified Campaigns",
        role: "Organizer verification",
        note: "Trusted organizer — process confirmed by the team.",
        date: "2026-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "org-2",
    name: "Example Organizer B",
    description: "Coordinates verified family fundraisers and donor outreach.",
    verifiedBy: [
      {
        id: "ver-vc-2",
        name: "Verified Campaigns",
        role: "Organizer verification",
        note: "Trusted organizer — process confirmed by the team.",
        date: "2026-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "org-3",
    name: "Example Organizer C",
    description: "Grassroots organizer supporting verified families.",
    verifiedBy: [
      {
        id: "ver-vc-3",
        name: "Verified Campaigns",
        role: "Organizer verification",
        note: "Trusted organizer — process confirmed by the team.",
        date: "2026-01-01T00:00:00Z",
      },
    ],
  },
];
