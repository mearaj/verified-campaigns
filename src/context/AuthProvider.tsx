import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthContext, type AuthContextValue } from "@/context/authContext";
import { resolveAdminAccess } from "@/services/adminAccess";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const syncAdmin = useCallback(async (nextUser: User | null) => {
    if (!nextUser) {
      setIsAdmin(false);
      return null;
    }
    const result = await resolveAdminAccess(nextUser);
    setIsAdmin(result.granted);
    return result;
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, async nextUser => {
      setUser(nextUser);
      await syncAdmin(nextUser);
      setLoading(false);
    });
  }, [syncAdmin]);

  const refreshAdmin = useCallback(async () => {
    if (!user) return null;
    return syncAdmin(user);
  }, [user, syncAdmin]);

  const value: AuthContextValue = {
    user,
    isAdmin,
    loading,
    signInWithGoogle: async () => {
      await signInWithPopup(auth, googleProvider);
    },
    logout: () => signOut(auth),
    refreshAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
