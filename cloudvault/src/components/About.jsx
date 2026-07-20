import { IconShield, IconBrain, IconSparkle } from "./icons.jsx";

const POINTS = [
  {
    icon: <IconBrain />,
    title: "Built around one model",
    text: "A single AI assistant watches every connected account and reasons about placement, duplicates, and risk together — not as separate tools bolted on afterward.",
  },
  {
    icon: <IconShield />,
    title: "Security first, not security added",
    text: "Encryption and permission auditing run continuously in the background, so problems surface before a file is ever shared incorrectly.",
  },
  {
    icon: <IconSparkle />,
    title: "Your providers, your rules",
    text: "CloudVault AI never replaces Drive, OneDrive, Dropbox, or MEGA — it coordinates them, so you keep the accounts and plans you already have.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid gap-14 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-4">About CloudVault AI</p>
          <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Storage is scattered by default.
            <br />
            We built the layer that isn't.
          </h2>
          <p className="mt-5 text-muted">
            Most people have files spread across three or four cloud accounts
            with no shared view of what's duplicated, unencrypted, or over-shared.
            CloudVault AI was built to close that gap with one dashboard and one
            assistant that actually understands where everything lives.
          </p>
        </div>

        <div className="space-y-6">
          {POINTS.map((p) => (
            <div key={p.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cobalt-50 text-cobalt">
                {p.icon}
              </div>
              <div>
                <h3 className="font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
