import { useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { AuthContext, type AuthContextValue } from "@/context/authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async nextUser => {
      setUser(nextUser);
      if (nextUser) {
        const adminDoc = await getDoc(doc(db, "admins", nextUser.uid));
        setIsAdmin(adminDoc.exists());
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  const value: AuthContextValue = {
    user,
    isAdmin,
    loading,
    login: (email, password) => signInWithEmailAndPassword(auth, email, password).then(() => {}),
    logout: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
