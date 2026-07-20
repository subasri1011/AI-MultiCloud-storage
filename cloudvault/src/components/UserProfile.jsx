export default function UserProfile() {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-xl px-3.5 py-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cobalt font-display text-sm font-semibold text-white">
        AR
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">Aditi Rao</p>
        <p className="truncate text-xs text-muted">aditi@company.com</p>
      </div>
    </div>
  );
}
