import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCatalog } from "@/hooks/useCatalog";
import { removeCampaign, seedFromMock } from "@/services/firestore";
import { campaigns as mockCampaigns, organizers as mockOrganizers } from "@/mock";

export default function AdminDashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { campaigns, organizers, loading } = useCatalog(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSeed() {
    if (!confirm("Load sample organizers and campaigns into Firestore?")) return;
    setSeeding(true);
    setMessage("");
    try {
      await seedFromMock(mockCampaigns, mockOrganizers);
      setMessage("Sample data loaded.");
    } catch {
      setMessage("Failed to load sample data.");
    } finally {
      setSeeding(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await removeCampaign(id);
  }

  return (
    <div className="min-h-screen bg-vc-bg text-gray-100">
      <header className="border-b border-vc-border px-4 py-4">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-vc-green-text">Admin</h1>
            <p className="text-xs text-vc-muted">{user?.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/campaigns/new"
              className="rounded-lg bg-vc-green px-3 py-1.5 text-xs font-semibold text-white"
            >
              + New campaign
            </Link>
            <button
              type="button"
              onClick={handleSeed}
              disabled={seeding}
              className="rounded-lg border border-vc-border px-3 py-1.5 text-xs text-vc-muted hover:text-white disabled:opacity-50"
            >
              {seeding ? "Loading…" : "Load sample data"}
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg border border-vc-border px-3 py-1.5 text-xs text-vc-muted"
            >
              Sign out
            </button>
            <Link to="/" className="rounded-lg border border-vc-border px-3 py-1.5 text-xs text-vc-muted">
              Public site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {message && (
          <p className="mb-4 rounded-lg border border-vc-green/40 bg-vc-green/10 px-3 py-2 text-xs text-vc-green-text">
            {message}
          </p>
        )}

        <p className="mb-4 text-xs text-vc-muted">
          Manage campaigns, upload progress screenshots, receipts, and verification
          videos. Published campaigns appear on the public site (stunted first).
        </p>

        {loading ? (
          <p className="text-sm text-vc-muted">Loading…</p>
        ) : campaigns.length === 0 ? (
          <p className="text-sm text-vc-muted">
            No campaigns yet. Click &quot;Load sample data&quot; or create one.
          </p>
        ) : (
          <ul className="space-y-2">
            {campaigns.map(c => {
              const org = organizers.find(o => o.id === c.organizerId);
              return (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-vc-border bg-vc-card px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-vc-muted">
                      {org?.name ?? c.organizerId} ·{" "}
                      {c.published ? "Published" : "Draft"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/campaigns/${c.id}`)}
                      className="text-xs text-vc-green-text hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id, c.title)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
