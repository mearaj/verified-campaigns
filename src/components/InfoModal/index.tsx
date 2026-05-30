interface InfoModalProps {
  onClose: () => void;
}

function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full rounded-2xl border border-vc-green/40 bg-[#1a2e1a] p-6 text-left shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white hover:bg-red-500"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-vc-green-text">
          verifiedcampaigns.org
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-200">
          <p>
            A directory of <strong>verified Palestinian fundraising campaigns</strong>.
            Organizers we trust list families and stories here — donors go directly to
            external fundraiser pages to give.
          </p>
          <p>
            We show <strong>organizer-verified</strong> appeals first when progress is
            slow, so stunted campaigns get a fair chance to be seen.
          </p>
          <p className="text-vc-muted text-xs">
            No donations are processed on this site. Always verify the fundraiser link
            before you donate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
