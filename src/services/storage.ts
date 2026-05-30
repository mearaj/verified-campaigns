import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

export async function uploadCampaignFile(
  campaignId: string,
  folder: "progress" | "photos" | "receipts" | "verification",
  file: File
): Promise<string> {
  const path = `campaigns/${campaignId}/${folder}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
