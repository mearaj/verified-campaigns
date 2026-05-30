import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import type { Campaign, Organizer } from "@/types";

const campaignsCol = collection(db, "campaigns");
const organizersCol = collection(db, "organizers");

function cleanPayload<T extends Record<string, unknown>>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export { campaignsCol, organizersCol };

export function watchCampaigns(
  onData: (campaigns: Campaign[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    campaignsCol,
    snap => {
      const items = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Campaign[];
      onData(items);
    },
    err => onError?.(err as Error)
  );
}

export function watchOrganizers(
  onData: (organizers: Organizer[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    organizersCol,
    snap => {
      const items = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Organizer[];
      onData(items);
    },
    err => onError?.(err as Error)
  );
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const snap = await getDocs(campaignsCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Campaign[];
}

export async function fetchOrganizers(): Promise<Organizer[]> {
  const snap = await getDocs(organizersCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Organizer[];
}

export async function saveCampaign(
  data: Omit<Campaign, "id">,
  id?: string
): Promise<string> {
  const payload = cleanPayload(data as Record<string, unknown>);
  if (id) {
    await updateDoc(doc(db, "campaigns", id), payload);
    return id;
  }
  const ref = await addDoc(campaignsCol, payload);
  return ref.id;
}

export async function removeCampaign(id: string): Promise<void> {
  await deleteDoc(doc(db, "campaigns", id));
}

export async function saveOrganizer(org: Organizer): Promise<void> {
  await setDoc(doc(db, "organizers", org.id), org);
}

export async function seedFromMock(
  campaigns: Campaign[],
  organizers: Organizer[]
): Promise<void> {
  for (const org of organizers) {
    await saveOrganizer(org);
  }
  for (const { id, ...rest } of campaigns) {
    await setDoc(doc(db, "campaigns", id), rest);
  }
}

export async function checkIsAdmin(uid: string): Promise<boolean> {
  const snap = await getDocs(collection(db, "admins"));
  if (snap.empty) return false;
  return snap.docs.some(d => d.id === uid);
}
