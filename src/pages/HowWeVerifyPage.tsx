import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function HowWeVerifyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-vc-bg text-gray-100">
      <Header campaignCount={0} onInfoClick={() => {}} showAbout={false} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
        <Link to="/" className="text-xs text-vc-muted hover:text-white">
          ← Back to campaigns
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-vc-green-text">
          How we verify
        </h1>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-300">
          <p>
            <strong className="text-white">verifiedcampaigns.org</strong> lists
            fundraising appeals that are verified by{" "}
            <strong className="text-white">trusted organizers</strong> — not by
            third-party platforms alone.
          </p>

          <section>
            <h2 className="font-medium text-white">Organizer verification</h2>
            <p className="mt-2">
              We start with organizers who already have a verification process in place.
            Complex cases may involve a small core team of verifiers.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-white">Family & story verification</h2>
            <p className="mt-2">
              Before a campaign is listed, the organizer confirms the family,
              their story, and the fundraiser link. Organizers may upload
              photos, transfer receipts, and verification videos as part of
              their process (replacing private Discord workflows).
            </p>
          </section>

          <section>
            <h2 className="font-medium text-white">Progress screenshots</h2>
            <p className="mt-2">
              Organizers upload screenshots of fundraiser progress so donors can
              see how much has been raised — similar to public compendiums on
              social media, but on this site.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-white">What we do not do</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-vc-muted">
              <li>We do not process donations — you donate on Chuffed, GoFundMe, etc.</li>
              <li>We do not use Radio Watermelon or other closed-platform verification as our standard.</li>
              <li>Unknown organizers are vetted before their campaigns are listed.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-medium text-white">Stunted campaigns first</h2>
            <p className="mt-2">
              Appeals with the slowest progress are shown first so families who
              have waited longest get fair visibility — similar in spirit to{" "}
              <a
                href="https://lifeline4gaza.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-vc-green-text underline"
              >
                lifeline4gaza
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
