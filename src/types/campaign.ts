import type {Verifier} from "./verifier.ts";
import type {FundraiserLink} from "./fundraiserLink.ts";

export interface Campaign {
  id: string
  organizerId: string
  title: string
  story: string
  fundraiserLinks: FundraiserLink[]
  screenshots: string[]
  verifiedBy: Verifier[]
  createdAt: string
}
