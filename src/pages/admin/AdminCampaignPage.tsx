import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { saveCampaign } from "@/services/firestore";
import { uploadCampaignFile } from "@/services/storage";
import { useCatalog } from "@/hooks/useCatalog";
import FieldHint from "@/components/admin/FieldHint";
import {
  buildPrimaryLink,
  parseAmountRaised,
  PLATFORMS,
  readPrimaryLinkForm,
  type DonationPlatform,
} from "@/lib/campaignForm";
import type { Campaign } from "@/types";

export default function AdminCampaignPage() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { organizers } = useCatalog(false);

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [organizerId, setOrganizerId] = useState("");
  const [published, setPublished] = useState(true);
  const [platform, setPlatform] = useState<DonationPlatform>("Chuffed");
  const [donateUrl, setDonateUrl] = useState("");
  const [amountRaised, setAmountRaised] = useState("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [receiptUrls, setReceiptUrls] = useState<string[]>([]);
  const [verificationVideoUrls, setVerificationVideoUrls] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [pendingProgress, setPendingProgress] = useState<File[]>([]);
  const [pendingReceipts, setPendingReceipts] = useState<File[]>([]);
  const [pendingVideos, setPendingVideos] = useState<File[]>([]);

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
      const linkForm = readPrimaryLinkForm(data);
      setTitle(data.title);
      setStory(data.story);
      setOrganizerId(data.organizerId);
      setPublished(data.published !== false);
      setPlatform(linkForm.platform);
      setDonateUrl(linkForm.url);
      setAmountRaised(linkForm.amountRaised);
      setScreenshots(data.screenshots ?? []);
      setReceiptUrls(data.receiptUrls ?? []);
      setVerificationVideoUrls(data.verificationVideoUrls ?? []);
      setCreatedAt(data.createdAt);
      setLoading(false);
    }
    load();
  }, [id, isNew]);

  const effectiveOrganizerId = organizerId || organizers[0]?.id || "";
  const selectedOrganizer = organizers.find(o => o.id === effectiveOrganizerId);

  async function uploadPendingFiles(campaignId: string) {
    const newScreenshots: string[] = [];
    const newReceipts: string[] = [];
    const newVideos: string[] = [];

    for (const file of pendingProgress) {
      newScreenshots.push(await uploadCampaignFile(campaignId, "progress", file));
    }
    for (const file of pendingReceipts) {
      newReceipts.push(await uploadCampaignFile(campaignId, "receipts", file));
    }
    for (const file of pendingVideos) {
      newVideos.push(await uploadCampaignFile(campaignId, "verification", file));
    }

    return {
      screenshots: [...screenshots, ...newScreenshots],
      receiptUrls: [...receiptUrls, ...newReceipts],
      verificationVideoUrls: [...verificationVideoUrls, ...newVideos],
    };
  }

  async function handleUploadNow(
    folder: "progress" | "receipts" | "verification",
    files: FileList | null
  ) {
    if (!files?.length || isNew) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadCampaignFile(id!, folder, file));
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

    const verifierName = selectedOrganizer?.name ?? "Organizer";
    const primaryLink = buildPrimaryLink(
      donateUrl,
      platform,
      parseAmountRaised(amountRaised)
    );

    try {
      let savedId = id;
      let finalScreenshots = screenshots;
      let finalReceipts = receiptUrls;
      let finalVideos = verificationVideoUrls;

      const basePayload: Omit<Campaign, "id"> = {
        title,
        story: story.trim() || title,
        organizerId: effectiveOrganizerId,
        published,
        fundraiserLinks: primaryLink.url ? [primaryLink] : [],
        screenshots: finalScreenshots,
        receiptUrls: finalReceipts,
        verificationVideoUrls: finalVideos,
        verifiedBy: [
          {
            id: crypto.randomUUID(),
            name: verifierName,
            role: "Organizer",
            note: "Organizer-verified campaign.",
            date: new Date().toISOString(),
          },
        ],
        createdAt,
      };

      if (isNew) {
        savedId = await saveCampaign(basePayload);
        if (
          pendingProgress.length ||
          pendingReceipts.length ||
          pendingVideos.length
        ) {
          setUploading(true);
          const uploaded = await uploadPendingFiles(savedId);
          finalScreenshots = uploaded.screenshots;
          finalReceipts = uploaded.receiptUrls;
          finalVideos = uploaded.verificationVideoUrls;
          await updateDoc(doc(db, "campaigns", savedId), {
            screenshots: finalScreenshots,
            receiptUrls: finalReceipts,
            verificationVideoUrls: finalVideos,
          });
          setUploading(false);
        }
        navigate("/admin");
      } else {
        if (
          pendingProgress.length ||
          pendingReceipts.length ||
          pendingVideos.length
        ) {
          setUploading(true);
          const uploaded = await uploadPendingFiles(savedId!);
          basePayload.screenshots = uploaded.screenshots;
          basePayload.receiptUrls = uploaded.receiptUrls;
          basePayload.verificationVideoUrls = uploaded.verificationVideoUrls;
          setUploading(false);
        }
        await saveCampaign(basePayload, savedId);
        navigate("/admin");
      }
    } catch {
      setError("Failed to save. Check you are signed in as admin and Firebase is set up.");
      setSaving(false);
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vc-bg text-vc-muted">
        Loading…
      </div>
    );
  }

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
        <label className="block text-xs font-medium text-gray-300">
          Campaign title
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Help Ahmed Rebuild His Future"
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-sm"
          />
          <FieldHint>Same as on Chuffed or GoFundMe — donors will see this.</FieldHint>
        </label>

        <label className="block text-xs font-medium text-gray-300">
          Short story (optional)
          <textarea
            rows={3}
            value={story}
            onChange={e => setStory(e.target.value)}
            placeholder="Who is this for? What will donations cover?"
            className="mt-1 w-full rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-sm"
          />
        </label>

        <label className="block text-xs font-medium text-gray-300">
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
          <FieldHint>
            Verification is recorded under this organizer automatically.
          </FieldHint>
        </label>

        <fieldset className="space-y-3 rounded-lg border border-vc-border p-4">
          <legend className="px-1 text-xs font-medium text-gray-300">
            Donate link
          </legend>

          <label className="block text-xs text-vc-muted">
            Platform
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value as DonationPlatform)}
              className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm"
            >
              {PLATFORMS.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs text-vc-muted">
            Fundraiser URL
            <input
              required
              type="url"
              value={donateUrl}
              onChange={e => setDonateUrl(e.target.value)}
              placeholder="https://chuffed.org/project/..."
              className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm"
            />
          </label>

          <label className="block text-xs text-vc-muted">
            Amount raised (USD)
            <input
              inputMode="decimal"
              value={amountRaised}
              onChange={e => setAmountRaised(e.target.value)}
              placeholder="e.g. 1240"
              className="mt-1 w-full rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm"
            />
            <FieldHint>
              From the fundraiser page — lower amounts are listed first (stunted
              campaigns).
            </FieldHint>
          </label>
        </fieldset>

        <fieldset className="space-y-3 rounded-lg border border-vc-border p-4">
          <legend className="px-1 text-xs font-medium text-gray-300">Files</legend>

          <label className="block text-xs text-vc-muted">
            Progress screenshot (shown on public card)
            <input
              type="file"
              accept="image/*"
              disabled={uploading || saving}
              onChange={e => {
                const files = e.target.files;
                if (!files?.length) return;
                if (isNew) {
                  setPendingProgress(prev => [...prev, ...Array.from(files)]);
                } else {
                  void handleUploadNow("progress", files);
                }
                e.target.value = "";
              }}
              className="mt-1 block w-full text-xs"
            />
            {(screenshots.length > 0 || pendingProgress.length > 0) && (
              <FieldHint>
                {screenshots.length + pendingProgress.length} screenshot(s) ready
              </FieldHint>
            )}
          </label>

          <label className="block text-xs text-vc-muted">
            Transfer receipts (private)
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              disabled={uploading || saving}
              onChange={e => {
                const files = e.target.files;
                if (!files?.length) return;
                if (isNew) {
                  setPendingReceipts(prev => [...prev, ...Array.from(files)]);
                } else {
                  void handleUploadNow("receipts", files);
                }
                e.target.value = "";
              }}
              className="mt-1 block w-full text-xs"
            />
          </label>

          <label className="block text-xs text-vc-muted">
            Verification video (private)
            <input
              type="file"
              accept="video/*"
              disabled={uploading || saving}
              onChange={e => {
                const files = e.target.files;
                if (!files?.length) return;
                if (isNew) {
                  setPendingVideos(prev => [...prev, ...Array.from(files)]);
                } else {
                  void handleUploadNow("verification", files);
                }
                e.target.value = "";
              }}
              className="mt-1 block w-full text-xs"
            />
          </label>
        </fieldset>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
          />
          Published — visible on verifiedcampaigns.org
        </label>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full rounded-lg bg-vc-green py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving || uploading ? "Saving…" : "Save campaign"}
        </button>
      </form>
    </div>
  );
}
