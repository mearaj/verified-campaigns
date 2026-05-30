import { getDocs } from "firebase/firestore";
import { organizers as defaultOrganizers } from "@/mock/organizers";
import { organizersCol, saveOrganizer } from "@/services/firestore";

/** Creates default organizers in Firestore if none exist. Returns true if seeded. */
export async function ensureOrganizers(): Promise<boolean> {
  const snap = await getDocs(organizersCol);
  if (!snap.empty) return false;

  for (const org of defaultOrganizers) {
    await saveOrganizer(org);
  }
  return true;
}
