import type {Snapshot} from "./snapshot.ts";

export interface FundraiserLink {
  id: string
  platform: string
  url: string
  currency: string
  snapshots: Snapshot[]
}
