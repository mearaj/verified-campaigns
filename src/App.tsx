import './App.css'
import {useState} from "react";
import CampaignList from "@/components/CampaignList";
import Header from "@/components/Header";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
       <Header/>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="bg-white w-64 h-full p-4">
            <button
              className="mb-6"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <nav className="flex flex-col gap-4">
              <a href="#">Campaigns</a>
              <a href="#">About</a>
              <a href="#">Verification</a>
            </nav>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
        <CampaignList/>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div
          className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-500 flex flex-col md:flex-row justify-between gap-2">
          <span>© Verified Campaigns</span>
          <span>No donations processed on this site</span>
        </div>
      </footer>
    </div>
  );
}
