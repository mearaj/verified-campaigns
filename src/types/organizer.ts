import type {Verifier} from "./verifier.ts";

export interface Organizer {
  id: string
  name: string
  description?: string
  verifiedBy: Verifier[]
}
