import { Link } from "react-router-dom";
import HeroIllustration from "./HeroIllustration.jsx";

export default function Hero() {
  return (
    <section id="home" className="section grid items-center gap-16 pt-16 md:grid-cols-2 md:pt-24">
      <div>
        <p className="eyebrow mb-4">AI-powered · Multi-cloud · Encrypted</p>
        <h1 className="text-4xl font-semibold leading-[1.1] text-ink md:text-5xl">
          One vault.<br />
          Every cloud you already use.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted">
          CloudVault AI connects Google Drive, OneDrive, Dropbox and MEGA into a
          single dashboard — then uses AI to pick the right storage, catch
          duplicates, and flag security risks before they become problems.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link to="/login" className="btn-primary">
            Get Started
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="#features" className="btn-secondary">
            Connect Cloud
          </a>
        </div>
        <div className="mt-10 flex items-center gap-6 text-xs text-muted">
          <span>Trusted with 40,000+ files synced daily</span>
        </div>
      </div>

      <HeroIllustration />
    </section>
  );
}
