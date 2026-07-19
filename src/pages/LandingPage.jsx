import { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  { title: 'Multi Cloud Integration', icon: '☁️', description: 'Connect Google Drive, Dropbox, OneDrive, and MEGA in one seamless workspace.' },
  { title: 'AI Smart Management', icon: '🤖', description: 'Let AI suggest the best place to upload, optimize storage, and reduce clutter.' },
  { title: 'Advanced Security', icon: '🔒', description: 'Protect files with encryption, access control, and privacy-first protection.' },
  { title: 'Smart Search Assistant', icon: '🔎', description: 'Find files instantly with intuition-based AI search and metadata understanding.' },
];

const steps = [
  { title: 'Connect', description: 'Link your cloud accounts in seconds.' },
  { title: 'Organize', description: 'Use AI to sort, classify, and optimize storage.' },
  { title: 'Secure', description: 'Protect every file with a single security layer.' },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cobalt to-cobalt-dark text-lg text-white shadow-soft">
        ☁️
      </div>
      <div>
        <div className="font-heading text-lg font-bold text-ink">Valute Mate</div>
        <div className="text-xs text-muted">AI Cloud Storage</div>
      </div>
    </div>
  );
}

function FeatureCard({ title, icon, description }) {
  return (
    <div className="group rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cobalt/10 text-xl text-cobalt transition group-hover:bg-cobalt/15">
        {icon}
      </div>
      <h3 className="mb-2 text-base font-bold text-ink">{title}</h3>
      <p className="text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#home" className="text-sm font-medium text-muted transition hover:text-cobalt">Home</a>
            <a href="#features" className="text-sm font-medium text-muted transition hover:text-cobalt">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted transition hover:text-cobalt">How it Works</a>
            <a href="#about" className="text-sm font-medium text-muted transition hover:text-cobalt">About</a>
            <a href="#contact" className="text-sm font-medium text-muted transition hover:text-cobalt">Contact</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="focus-ring rounded-xl border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-cobalt hover:text-cobalt">
              Login
            </Link>
            <Link to="/login" className="focus-ring rounded-xl bg-cobalt px-4 py-2 text-sm font-semibold text-white transition hover:bg-cobalt-dark">
              Get Started
            </Link>
          </div>
          <button
            type="button"
            className="focus-ring rounded-lg border border-line px-3 py-2 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-line bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a href="#home" className="text-sm font-medium text-muted">Home</a>
              <a href="#features" className="text-sm font-medium text-muted">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted">How it Works</a>
              <a href="#about" className="text-sm font-medium text-muted">About</a>
              <a href="#contact" className="text-sm font-medium text-muted">Contact</a>
              <Link to="/login" className="focus-ring rounded-xl bg-cobalt px-4 py-2 text-center text-sm font-semibold text-white">
                Login
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-cobalt shadow-soft">
                <span className="rounded-full bg-mint/15 px-2 py-1 text-mint">⚡</span>
                One AI for every cloud you use
              </div>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                One AI. All Your Cloud Storage.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
                Connect, Manage and Secure all cloud storage in one platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/login" className="focus-ring rounded-xl bg-cobalt px-5 py-3 text-center font-semibold text-white transition hover:bg-cobalt-dark">
                  Get Started
                </Link>
                <Link to="/dashboard" className="focus-ring rounded-xl border border-line bg-white px-5 py-3 text-center font-semibold text-ink transition hover:border-cobalt hover:text-cobalt">
                  View Demo
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] bg-gradient-to-br from-cobalt-dark via-cobalt to-cobalt-light p-[1px] shadow-soft">
              <div className="rounded-[31px] bg-white/85 p-5 backdrop-blur-md">
                <div className="relative rounded-[28px] bg-slate-950 px-4 py-5 text-white">
                  <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt shadow-lg shadow-cobalt/40" />
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 text-center text-xs font-bold text-cobalt leading-10">
                    AI
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4 text-center">Google Drive</div>
                    <div className="rounded-2xl bg-white/10 p-4 text-center">Dropbox</div>
                    <div className="rounded-2xl bg-white/10 p-4 text-center">OneDrive</div>
                    <div className="rounded-2xl bg-white/10 p-4 text-center">Mega</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cobalt">Features</div>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Powerful AI features for every workflow</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-8 text-center">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cobalt">How it Works</div>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">A simple flow to secure and manage everything</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cobalt text-sm font-bold text-white">0{index + 1}</div>
                <h3 className="mb-2 text-xl font-bold text-ink">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cobalt">About</div>
              <h2 className="text-3xl font-bold text-ink">One secure cloud hub for modern teams</h2>
              <p className="mt-4 text-muted">Valute Mate brings all your cloud storage into a single intelligent operating layer so you can connect, search, organize, and secure your files without juggling multiple apps.</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-cobalt-dark to-cobalt p-8 text-white shadow-soft">
              <h3 className="text-2xl font-bold">Built for clarity, speed, and trust.</h3>
              <p className="mt-3 text-white/85">No fragmented storage workflow. No constant context switching. Just one AI-powered place to manage it all.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="rounded-[28px] bg-gradient-to-r from-cobalt-dark via-cobalt to-cobalt-light p-[1px] shadow-soft">
            <div className="rounded-[27px] bg-white p-8">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cobalt">Contact</div>
                  <h2 className="text-3xl font-bold text-ink">Let’s simplify your storage.</h2>
                  <p className="mt-3 text-muted">Tell us what you need and we’ll help you get started with Valute Mate.</p>
                </div>
                <form className="space-y-4">
                  <input className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3" placeholder="Your name" />
                  <input type="email" className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3" placeholder="Your email" />
                  <textarea rows="4" className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3" placeholder="Your message" />
                  <button type="button" className="focus-ring rounded-xl bg-cobalt px-4 py-3 font-semibold text-white transition hover:bg-cobalt-dark">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span>© 2026 Valute Mate. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="#about" className="transition hover:text-cobalt">About</a>
            <a href="#features" className="transition hover:text-cobalt">Features</a>
            <a href="#contact" className="transition hover:text-cobalt">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
