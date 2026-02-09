import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight">
            Verified Campaigns
          </span>
          <nav className="hidden md:flex gap-8 text-sm text-gray-600">
            <a className="hover:text-gray-900">Campaigns</a>
            <a className="hover:text-gray-900">Verification</a>
            <a className="hover:text-gray-900">About</a>
          </nav>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <aside className="w-72 h-full bg-white p-6">
            <button
              className="mb-8 text-sm text-gray-500"
              onClick={() => setOpen(false)}
            >
              Close
            </button>

            <nav className="flex flex-col gap-6 text-sm text-gray-700">
              <a>Campaigns</a>
              <a>Verification</a>
              <a>About</a>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
export default Header;
