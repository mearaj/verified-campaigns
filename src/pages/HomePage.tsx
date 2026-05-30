import { Link } from "react-router-dom";
import { useState } from "react";
import CampaignList from "@/components/CampaignList";
import Header from "@/components/Header";
import InfoModal from "@/components/InfoModal";
import { useCatalog } from "@/hooks/useCatalog";

export default function HomePage() {
  const [infoOpen, setInfoOpen] = useState(false);
  const { campaigns, organizers, loading, usingMock } = useCatalog(true);

  return (
    <div className="flex min-h-screen flex-col bg-vc-bg text-gray-100">
      <Header
        campaignCount={campaigns.length}
        onInfoClick={() => setInfoOpen(true)}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 sm:px-4 sm:py-6">
        <p className="mb-4 text-xs text-vc-muted sm:text-sm">
          Verified appeals from trusted organizers — stunted campaigns shown first.
          Click through to donate on Chuffed, GoFundMe, or other platforms.
        </p>

        {usingMock && !loading && (
          <p className="mb-4 rounded-lg border border-vc-border bg-vc-card px-3 py-2 text-xs text-vc-muted">
            Preview mode — campaigns will appear here once organizers add them via{" "}
            <Link to="/admin" className="text-vc-green-text underline">
              Admin
            </Link>
            .
          </p>
        )}

        {loading ? (
          <p className="text-sm text-vc-muted">Loading campaigns…</p>
        ) : (
          <CampaignList campaigns={campaigns} organizers={organizers} />
        )}
      </main>

      <footer className="border-t border-vc-border py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-center text-[11px] text-vc-muted sm:flex-row sm:justify-between sm:text-left">
          <span>© Verified Campaigns</span>
          <div className="flex justify-center gap-4 sm:justify-end">
            <Link to="/how-we-verify" className="hover:text-white">
              How we verify
            </Link>
            <span>No donations processed on this site</span>
          </div>
        </div>
      </footer>

      {infoOpen && <InfoModal onClose={() => setInfoOpen(false)} />}
    </div>
  );
}
