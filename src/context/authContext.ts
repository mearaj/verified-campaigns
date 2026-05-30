import { createContext } from "react";
import type { User } from "firebase/auth";
import type { AdminAccessResult } from "@/services/adminAccess";

export interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAdmin: () => Promise<AdminAccessResult | null>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
