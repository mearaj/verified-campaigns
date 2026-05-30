import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { saveCampaign } from "@/services/firestore";
import { uploadCampaignFile } from "@/services/storage";
import { useCatalog } from "@/hooks/useCatalog";
import type { Campaign, FundraiserLink } from "@/types";

const emptyLink = (): FundraiserLink => ({
  id: crypto.randomUUID(),
  platform: "Chuffed",
  url: "",
  currency: "USD",
  snapshots: [],
});

export default function AdminCampaignPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { organizers } = useCatalog(false);

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [published, setPublished] = useState(true);
  const [links, setLinks] = useState<FundraiserLink[]>([emptyLink()]);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [receiptUrls, setReceiptUrls] = useState<string[]>([]);
  const [verificationVideoUrls, setVerificationVideoUrls] = useState<string[]>([]);
  const [verifiedByName, setVerifiedByName] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;

    async function load() {
      const snap = await getDoc(doc(db, "campaigns", id!));
      if (!snap.exists()) {
        setError("Campaign not found");
        setLoading(false);
        return;
      }
      const data = snap.data() as Omit<Campaign, "id">;
      setTitle(data.title);
      setStory(data.story);
      setOrganizerId(data.organizerId);
      setPublished(data.published !== false);
      setLinks(data.fundraiserLinks.length ? data.fundraiserLinks : [emptyLink()]);
      setScreenshots(data.screenshots ?? []);
      setReceiptUrls(data.receiptUrls ?? []);
      setVerificationVideoUrls(data.verificationVideoUrls ?? []);
      setVerifiedByName(data.verifiedBy[0]?.name ?? "");
      setCreatedAt(data.createdAt);
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  const effectiveOrganizerId = organizerId || organizers[0]?.id || "";

  async function handleUpload(
    folder: "progress" | "receipts" | "verification",
    files: FileList | null,
    campaignId: string
  ) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadCampaignFile(campaignId, folder, file));
      }
      if (folder === "progress") setScreenshots(prev => [...prev, ...urls]);
      if (folder === "receipts") setReceiptUrls(prev => [...prev, ...urls]);
      if (folder === "verification") setVerificationVideoUrls(prev => [...prev, ...urls]);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Omit<Campaign, "id"> = {
      title,
      story,
      organizerId: effectiveOrganizerId,
      published,
      fundraiserLinks: links.filter(l => l.url.trim()),
      screenshots,
      receiptUrls,
      verificationVideoUrls,
      verifiedBy: verifiedByName
        ? [
            {
              id: crypto.randomUUID(),
              name: verifiedByName,
              role: "Organizer",
              date: new Date().toISOString(),
            },
          ]
        : [],
      createdAt,
    };

    try {
      const savedId = await saveCampaign(payload, isNew ? undefined : id);
      if (isNew) {
        navigate(`/admin/campaigns/${savedId}`);
      } else {
        navigate("/admin");
      }
    } catch {
      setError("Failed to save. Check Firestore rules and admin access.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vc-bg text-vc-muted">
        Loading…
      </div>
    );
  }

  const uploadTargetId = isNew ? "new" : id!;

  return (
    <div className="min-h-screen bg-vc-bg text-gray-100">
      <header className="border-b border-vc-border px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <Link to="/admin" className="text-xs text-vc-muted hover:text-white">
            ← Admin
          </Link>
          <h1 className="mt-2 text-lg font-semibold">
            {isNew ? "New campaign" : "Edit campaign"}
          </h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5 px-4 py-6">
        <label className="block text-xs text-vc-muted">
          Title
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-xs text-vc-muted">
          Story
          <textarea
            required
            rows={4}
            value={story}
            onChange={e => setStory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-xs text-vc-muted">
          Organizer
          <select
            required
            value={effectiveOrganizerId}
            onChange={e => setOrganizerId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-sm"
          >
            {organizers.map(o => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs text-vc-muted">
          Verified by (organizer name)
          <input
            value={verifiedByName}
            onChange={e => setVerifiedByName(e.target.value)}
            placeholder="e.g. Asje"
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-sm"
          />
        </label>

        <fieldset className="space-y-3 rounded-lg border border-vc-border p-4">
          <legend className="px-1 text-xs text-vc-muted">Fundraiser links</legend>
          {links.map((link, i) => (
            <div key={link.id} className="grid gap-2 sm:grid-cols-3">
              <input
                placeholder="Platform"
                value={link.platform}
                onChange={e => {
                  const next = [...links];
                  next[i] = { ...link, platform: e.target.value };
                  setLinks(next);
                }}
                className="rounded border border-vc-border bg-vc-bg px-2 py-1.5 text-sm"
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={e => {
                  const next = [...links];
                  next[i] = { ...link, url: e.target.value };
                  setLinks(next);
                }}
                className="rounded border border-vc-border bg-vc-bg px-2 py-1.5 text-sm sm:col-span-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setLinks([...links, emptyLink()])}
            className="text-xs text-vc-green-text hover:underline"
          >
            + Add link
          </button>
        </fieldset>

        {!isNew && (
          <fieldset className="space-y-3 rounded-lg border border-vc-border p-4">
            <legend className="px-1 text-xs text-vc-muted">Uploads</legend>
            <label className="block text-xs">
              Progress screenshot (shown on public card)
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={e => handleUpload("progress", e.target.files, uploadTargetId)}
                className="mt-1 block w-full text-xs"
              />
            </label>
            <label className="block text-xs">
              Transfer receipts (admin only)
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                disabled={uploading}
                onChange={e => handleUpload("receipts", e.target.files, uploadTargetId)}
                className="mt-1 block w-full text-xs"
              />
            </label>
            <label className="block text-xs">
              Verification video
              <input
                type="file"
                accept="video/*"
                disabled={uploading}
                onChange={e => handleUpload("verification", e.target.files, uploadTargetId)}
                className="mt-1 block w-full text-xs"
              />
            </label>
            {screenshots.length > 0 && (
              <p className="text-[10px] text-vc-muted">
                {screenshots.length} progress screenshot(s) uploaded
              </p>
            )}
          </fieldset>
        )}

        {isNew && (
          <p className="text-xs text-amber-200/80">
            Save the campaign first, then edit it to upload photos, receipts, and videos.
          </p>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
          />
          Published on public site
        </label>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-vc-green px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save campaign"}
        </button>
      </form>
    </div>
  );
}
