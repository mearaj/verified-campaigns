import { Link } from "react-router-dom";

export default function AdminHelpPage() {
  return (
    <div className="min-h-screen bg-vc-bg text-gray-100">
      <header className="border-b border-vc-border px-4 py-4">
        <div className="mx-auto max-w-2xl">
          <Link to="/admin" className="text-xs text-vc-muted hover:text-white">
            ← Admin
          </Link>
          <h1 className="mt-2 text-lg font-semibold text-vc-green-text">
            Organizer guide
          </h1>
          <p className="mt-1 text-xs text-vc-muted">
            Simple steps — no technical knowledge needed
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6 text-sm leading-relaxed text-gray-300">
        <section>
          <h2 className="font-medium text-white">What this site does</h2>
          <p className="mt-2">
            Donors browse verified campaigns on{" "}
            <strong className="text-white">verifiedcampaigns.org</strong> and click
            through to <strong className="text-white">Chuffed / GoFundMe</strong> to
            donate. We do not take payments here.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-white">Add a campaign (5 steps)</h2>
          <ol className="mt-2 list-inside list-decimal space-y-2 text-xs sm:text-sm">
            <li>Admin → <strong className="text-white">+ New campaign</strong></li>
            <li>
              <strong className="text-white">Title</strong> — family or campaign name
              (as on Chuffed)
            </li>
            <li>
              <strong className="text-white">Chuffed / donate link</strong> — full URL
              from the fundraiser page
            </li>
            <li>
              <strong className="text-white">Amount raised</strong> — number from the
              fundraiser (used to show stunted campaigns first)
            </li>
            <li>
              <strong className="text-white">Progress screenshot</strong> — screenshot
              of the fundraiser page so donors see progress (like Instagram compendiums)
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-medium text-white">Optional uploads</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-vc-muted">
            <li>Transfer receipts (private — for your records)</li>
            <li>Verification video (private — for your records)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-medium text-white">Verification</h2>
          <p className="mt-2 text-xs sm:text-sm">
            Verification is done by <strong className="text-white">organizers</strong>{" "}
            — not Radio Watermelon. Pick your organizer name in the form; &quot;Verified
            by&quot; fills automatically.
          </p>
          <Link
            to="/how-we-verify"
            className="mt-2 inline-block text-xs text-vc-green-text underline"
          >
            Public &quot;How we verify&quot; page
          </Link>
        </section>

        <section>
          <h2 className="font-medium text-white">Draft vs published</h2>
          <p className="mt-2 text-xs sm:text-sm">
            Uncheck &quot;Published&quot; to keep a campaign private while you work on
            it. Check it when ready for donors to see.
          </p>
        </section>

        <section className="rounded-lg border border-vc-border bg-vc-card p-4 text-xs">
          <h2 className="font-medium text-white">Need access?</h2>
          <p className="mt-2 text-vc-muted">
            Open <strong className="text-white">/admin</strong> and tap{" "}
            <strong className="text-white">Continue with Google</strong>. Use the
            Gmail address an admin invited. On a brand-new site, the first Google
            sign-in becomes admin automatically.
          </p>
        </section>
      </main>
    </div>
  );
}
