import { Link } from "react-router-dom";

interface HeaderProps {
  campaignCount: number;
  onInfoClick: () => void;
  showAbout?: boolean;
}

function Header({ campaignCount, onInfoClick, showAbout = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-vc-border bg-vc-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="truncate text-sm font-semibold tracking-tight text-vc-green-text sm:text-base">
            verifiedcampaigns
          </span>
          {campaignCount > 0 && (
            <span className="shrink-0 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              {campaignCount}
            </span>
          )}
        </Link>

        <nav className="flex shrink-0 items-center gap-2">
          <Link
            to="/how-we-verify"
            className="rounded-lg border border-vc-border px-3 py-1.5 text-xs text-vc-muted transition hover:border-vc-green-text hover:text-white"
          >
            Verify
          </Link>
          {showAbout && (
            <button
              type="button"
              onClick={onInfoClick}
              className="rounded-lg border border-vc-border px-3 py-1.5 text-xs text-vc-muted transition hover:border-vc-green-text hover:text-white"
            >
              About
            </button>
          )}
          <Link
            to="/admin"
            className="rounded-lg border border-vc-border px-3 py-1.5 text-xs text-vc-muted transition hover:border-vc-green-text hover:text-white"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
