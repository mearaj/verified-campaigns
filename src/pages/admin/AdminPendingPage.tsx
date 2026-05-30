import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AdminPendingPage() {
  const { user, isAdmin, logout, refreshAdmin } = useAuth();
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function handleCheckAgain() {
    setChecking(true);
    setMessage("");
    try {
      const result = await refreshAdmin();
      if (result?.granted) {
        return;
      }
      setMessage(result?.message ?? "Still waiting for admin access.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vc-bg px-4 text-center">
      <div className="max-w-md rounded-xl border border-vc-border bg-vc-card p-6">
        <h1 className="text-lg font-semibold text-white">Access pending</h1>
        <p className="mt-3 text-sm text-gray-300">
          Signed in as <strong>{user?.email}</strong>.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-vc-muted">
          Your Google account is signed in, but organizer admin access is not active
          yet. An existing admin must invite this Gmail address, then tap Check again.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-vc-muted">
          If you are setting up the site for the first time and see this screen, the
          first-time bootstrap may have failed — use the Firebase Console fix below.
        </p>

        {message && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-left text-xs text-red-300">
            {message}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleCheckAgain}
            disabled={checking}
            className="cursor-pointer rounded-lg bg-vc-green py-2.5 text-sm font-semibold text-white transition hover:bg-vc-green-text hover:text-black disabled:cursor-wait disabled:opacity-70"
          >
            {checking ? "Checking…" : "Check again"}
          </button>
          <button
            type="button"
            onClick={() => logout()}
            className="cursor-pointer rounded-lg border border-vc-border py-2 text-xs text-vc-muted hover:text-white"
          >
            Sign out
          </button>
          <Link to="/" className="text-xs text-vc-muted hover:text-white">
            ← Public site
          </Link>
        </div>

        <details className="mt-6 text-left text-[11px] text-vc-muted">
          <summary className="cursor-pointer text-vc-green-text hover:underline">
            First-time setup fix (Firebase Console)
          </summary>
          <ol className="mt-2 list-inside list-decimal space-y-1.5 leading-relaxed">
            <li>
              Open Firebase Console → Authentication → find your Google user → copy{" "}
              <strong className="text-gray-300">User UID</strong>
            </li>
            <li>
              Firestore → create collection <strong className="text-gray-300">admins</strong>{" "}
              → document ID = that UID → field{" "}
              <strong className="text-gray-300">email</strong> = your Gmail
            </li>
            <li>Return here and tap Check again</li>
          </ol>
          <p className="mt-2">
            Or: Firestore → delete <strong className="text-gray-300">settings/site</strong> if
            no real admins exist yet, redeploy the app, sign in again (first Google sign-in
            becomes admin).
          </p>
        </details>
      </div>
    </div>
  );
}
