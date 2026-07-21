import FeatureCard from "./FeatureCard.jsx";
import {
  IconBrain,
  IconDrive,
  IconOneDrive,
  IconDropbox,
  IconMega,
  IconDuplicate,
  IconLock,
  IconChart,
  IconSearch,
} from "./icons.jsx";

const FEATURES = [
  {
    icon: <IconBrain />,
    title: "AI Cloud Selection",
    description: "Every upload is routed to the provider with the best fit on cost, space, and speed — decided automatically.",
    accent: "cobalt",
  },
  {
    icon: <IconDrive />,
    title: "Google Drive Integration",
    description: "Connect your Drive account once and manage its files alongside every other cloud from one screen.",
    accent: "cobalt",
  },
  {
    icon: <IconOneDrive />,
    title: "OneDrive Integration",
    description: "Full read, write, and search access to OneDrive, kept in sync with the rest of your vault.",
    accent: "cobalt",
  },
  {
    icon: <IconDropbox />,
    title: "Dropbox Integration",
    description: "Bring existing Dropbox folders into CloudVault without moving or duplicating a single file.",
    accent: "cobalt",
  },
  {
    icon: <IconMega />,
    title: "MEGA Integration",
    description: "MEGA's end-to-end encrypted storage, unified with your other accounts under one login.",
    accent: "amber",
  },
  {
    icon: <IconDuplicate />,
    title: "Duplicate File Detection",
    description: "Content-hash scanning finds copies of the same file across providers and lets you reclaim the space.",
    accent: "coral",
  },
  {
    icon: <IconLock />,
    title: "File Encryption",
    description: "Client-side AES-256 encryption before anything leaves your device — providers only ever see ciphertext.",
    accent: "mint",
  },
  {
    icon: <IconChart />,
    title: "Security Score",
    description: "A live 0–100 score across sharing permissions, encryption coverage, and stale access tokens.",
    accent: "mint",
  },
  {
    icon: <IconSearch />,
    title: "Smart File Search",
    description: "Natural-language search across every connected account — \"invoices from March\" just works.",
    accent: "cobalt",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-4">Features</p>
        <h2 className="text-3xl font-semibold text-ink md:text-4xl">
          Everything your files need, in one place
        </h2>
        <p className="mt-4 text-muted">
          CloudVault AI sits on top of the storage you already pay for and makes it act like one intelligent system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
