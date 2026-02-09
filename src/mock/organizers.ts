import type { Organizer } from "@/types"

export const organizers: Organizer[] = [
  {
    id: "org-1",
    name: "Local Aid Volunteers – Gaza",
    description: "Grassroots volunteers coordinating direct aid for families.",
    verifiedBy: [
      {
        id: "ver-1",
        name: "Dr. Amal Hassan",
        role: "Physician",
        note: "Personally confirmed the organizer and beneficiary families.",
        date: "2025-12-10T00:00:00Z",
      },
    ],
  },
  {
    id: "org-2",
    name: "Independent Family Support Network",
    description: "Network helping displaced families raise emergency funds.",
    verifiedBy: [],
  },
]
