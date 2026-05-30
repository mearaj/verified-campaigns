import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vc-bg text-vc-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-vc-bg px-4 text-center">
        <p className="text-sm text-gray-300">
          Signed in as {user.email}, but this account is not an admin yet.
        </p>
        <p className="max-w-md text-xs text-vc-muted">
          Ask Mearaj to add your Firebase user ID to the{" "}
          <code className="text-vc-green-text">admins</code> collection in
          Firestore after you create an account.
        </p>
        <p className="text-[10px] text-vc-muted">UID: {user.uid}</p>
      </div>
    );
  }

  return children;
}
