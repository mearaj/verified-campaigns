import type { Organizer } from "@/types";

export const organizers: Organizer[] = [
  {
    id: "org-dylan",
    name: "Dylan Moss",
    description: "Organizer with established verification process for families in Gaza.",
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
    id: "org-kimberly",
    name: "Kimberly",
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
    id: "org-gail-asim",
    name: "Gail / Asim",
    description: "Grassroots organizers supporting verified families.",
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
