// Single feature tile. `accent` picks a background tint for the icon badge
// so the grid reads with light color variation instead of one flat tone.
export default function FeatureCard({ icon, title, description, accent = "cobalt" }) {
  const accentClasses = {
    cobalt: "bg-cobalt-50 text-cobalt",
    mint: "bg-mint/10 text-mint-dark",
    amber: "bg-amber-light text-amber",
    coral: "bg-coral-light text-coral",
  };

  return (
    <div className="card transition hover:-translate-y-1 hover:shadow-panel">
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
        {icon}
      </div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
