import { Link } from "react-router-dom";

interface AdminQuickStartProps {
  campaignCount: number;
  organizersReady: boolean;
}

export default function AdminQuickStart({
  campaignCount,
  organizersReady,
}: AdminQuickStartProps) {
  const steps = [
    {
      done: organizersReady,
      label: "Default organizers ready",
    },
    {
      done: campaignCount > 0,
      label: "At least one campaign added",
    },
  ];

  const allDone = steps.every(s => s.done);

  if (allDone) return null;

  return (
    <section className="mb-6 rounded-xl border border-vc-green/30 bg-vc-green/5 p-4">
      <h2 className="text-sm font-semibold text-vc-green-text">Quick start</h2>
      <p className="mt-1 text-xs text-vc-muted">
        You can use this without waiting for anyone else. Follow these steps:
      </p>
      <ol className="mt-3 space-y-2 text-xs">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-2">
            <span className={step.done ? "text-vc-green-text" : "text-vc-muted"}>
              {step.done ? "✓" : i + 1}.
            </span>
            <span className={step.done ? "text-gray-400 line-through" : "text-gray-200"}>
              {step.label}
            </span>
          </li>
        ))}
        <li className="flex gap-2">
          <span className="text-vc-muted">3.</span>
          <span className="text-gray-200">
            <Link to="/admin/campaigns/new" className="text-vc-green-text underline">
              Add a campaign
            </Link>{" "}
            — paste the Chuffed link, amount raised, and a progress screenshot
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-vc-muted">4.</span>
          <span className="text-gray-200">
            Check{" "}
            <Link to="/" className="text-vc-green-text underline">
              public site
            </Link>{" "}
            — slow campaigns appear first
          </span>
        </li>
      </ol>
      <Link
        to="/admin/help"
        className="mt-3 inline-block text-[11px] text-vc-green-text hover:underline"
      >
        Full organizer guide →
      </Link>
    </section>
  );
}
