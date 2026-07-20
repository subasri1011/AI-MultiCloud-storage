import { IconSparkle, IconDuplicate, IconShield, IconWarning, IconCheck } from "./icons.jsx";

export default function AIAssistantPanel() {
  return (
    <div className="card border-ink/5 bg-ink text-white">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint/20 text-mint">
          <IconSparkle />
        </div>
        <h3 className="font-semibold">AI Assistant</h3>
      </div>

      {/* Best cloud recommendation */}
      <div className="rounded-xl bg-white/5 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-mint">Recommendation</p>
        <p className="mt-1.5 text-sm text-white/90">
          Upload your next large media files to <span className="font-semibold">OneDrive</span> — it has the most free space relative to plan size right now.
        </p>
      </div>

      {/* Storage optimization */}
      <div className="mt-4 flex gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt/30 text-cobalt-light">
          <IconCheck />
        </div>
        <p className="text-sm text-white/80">
          Archiving files untouched for 12+ months could free up <span className="font-semibold text-white">9.4 GB</span> across Drive and Dropbox.
        </p>
      </div>

      {/* Duplicate warning */}
      <div className="mt-4 flex gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/30 text-amber">
          <IconDuplicate />
        </div>
        <p className="text-sm text-white/80">
          <span className="font-semibold text-white">3 duplicate files</span> found between Google Drive and Dropbox, totaling 640 MB.
        </p>
      </div>

      {/* Security recommendation */}
      <div className="mt-4 flex gap-3">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/30 text-coral">
          <IconWarning />
        </div>
        <p className="text-sm text-white/80">
          <span className="font-semibold text-white">2 files</span> are shared with "anyone with the link." Review access before they're indexed publicly.
        </p>
      </div>

      <button className="btn-primary mt-6 w-full bg-mint hover:bg-mint-dark">
        <IconShield />
        Run full security scan
      </button>
    </div>
  );
}
