import {
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/config/firebase";

export type AdminAccessResult =
  | { granted: true }
  | { granted: false; reason: "not_invited" | "permission_denied" | "error"; message: string };

/** Grant admin access: existing admin doc, first-site bootstrap, or email invite. */
export async function resolveAdminAccess(user: User): Promise<AdminAccessResult> {
  try {
    const adminRef = doc(db, "admins", user.uid);
    if ((await getDoc(adminRef)).exists()) {
      return { granted: true };
    }

    const siteRef = doc(db, "settings", "site");
    const siteInitialized = (await getDoc(siteRef)).exists();

    if (!siteInitialized) {
      const batch = writeBatch(db);
      batch.set(adminRef, { email: user.email ?? "" });
      batch.set(siteRef, {
        initializedAt: new Date().toISOString(),
        initializedBy: user.uid,
      });
      await batch.commit();
      return { granted: true };
    }

    if (user.email) {
      const emailKey = user.email.toLowerCase();
      const grantRef = doc(db, "adminGrants", emailKey);
      const grant = await getDoc(grantRef);
      if (grant.exists()) {
        const batch = writeBatch(db);
        batch.set(adminRef, { email: user.email });
        batch.delete(grantRef);
        await batch.commit();
        return { granted: true };
      }
    }

    return {
      granted: false,
      reason: "not_invited",
      message:
        "This Google account is not an admin yet. Ask an existing admin to invite your Gmail, or fix a broken first-time setup in Firebase Console (see SETUP.md).",
    };
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err
        ? String((err as { code: string }).code)
        : "";
    if (code === "permission-denied") {
      return {
        granted: false,
        reason: "permission_denied",
        message:
          "Firestore blocked admin setup (permission denied). Deploy the latest firestore.rules, or add your account manually in Firebase Console.",
      };
    }
    return {
      granted: false,
      reason: "error",
      message: "Could not verify admin access. Try again in a moment.",
    };
  }
}

export async function inviteAdminByEmail(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) throw new Error("Email required");
  await setDoc(doc(db, "adminGrants", normalized), {
    invitedAt: new Date().toISOString(),
  });
}
