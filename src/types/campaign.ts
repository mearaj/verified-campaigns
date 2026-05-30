import type {Verifier} from "./verifier.ts";
import type {FundraiserLink} from "./fundraiserLink.ts";

export interface Campaign {
  id: string
  organizerId: string
  title: string
  story: string
  fundraiserLinks: FundraiserLink[]
  /** Public progress screenshot URLs (Firebase Storage) */
  screenshots: string[]
  /** Private admin uploads — receipts, extra photos */
  receiptUrls?: string[]
  verificationVideoUrls?: string[]
  verifiedBy: Verifier[]
  createdAt: string
  published: boolean
}
