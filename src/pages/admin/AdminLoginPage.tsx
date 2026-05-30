import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const { user, isAdmin, loading, login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && isAdmin) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      setError("Login failed. Check email and password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vc-bg px-4">
      <div className="w-full max-w-sm rounded-xl border border-vc-border bg-vc-card p-6">
        <h1 className="text-lg font-semibold text-vc-green-text">Admin login</h1>
        <p className="mt-1 text-xs text-vc-muted">
          For Asje&apos;s organizers — manage campaigns and uploads.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-xs text-vc-muted">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs text-vc-muted">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm text-white"
            />
          </label>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-vc-green py-2 text-sm font-semibold text-white hover:bg-vc-green-text hover:text-black disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link to="/" className="mt-4 block text-center text-xs text-vc-muted hover:text-white">
          ← Public site
        </Link>
      </div>
    </div>
  );
}
