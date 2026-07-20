import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import HeroIllustration from "../components/HeroIllustration.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only — a real app would authenticate against a backend here.
    navigate("/dashboard");
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left: brand / illustration panel, hidden on small screens */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-white md:flex">
        <Link to="/">
          <Logo className="[&_span]:text-white" />
        </Link>

        <div>
          <h2 className="max-w-sm text-3xl font-semibold leading-tight">
            Every cloud you use, watched over by one assistant.
          </h2>
          <div className="mt-10 rounded-2xl bg-white/5 p-6 backdrop-blur">
            <HeroIllustration />
          </div>
        </div>

        <p className="text-xs text-white/40">© {new Date().getFullYear()} CloudVault AI</p>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 flex md:hidden">
            <Logo />
          </Link>

          <h1 className="text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Log in to view your unified storage dashboard.</p>

          <button className="btn-secondary mt-7 w-full">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="#4285F4" d="M15.68 8.18c0-.57-.05-1.11-.15-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.4 2.4-3.45 2.4-5.88Z" />
              <path fill="#34A853" d="M8 16c2.16 0 3.97-.71 5.29-1.94l-2.58-2c-.72.48-1.63.76-2.71.76-2.09 0-3.85-1.4-4.48-3.3H.86v2.07A8 8 0 0 0 8 16Z" />
              <path fill="#FBBC05" d="M3.52 9.52a4.8 4.8 0 0 1 0-3.04V4.41H.86a8 8 0 0 0 0 7.18l2.66-2.07Z" />
              <path fill="#EA4335" d="M8 3.18c1.18 0 2.23.4 3.06 1.2l2.29-2.29A7.95 7.95 0 0 0 8 0 8 8 0 0 0 .86 4.41l2.66 2.07C4.15 4.58 5.91 3.18 8 3.18Z" />
            </svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <div className="h-px flex-1 bg-line" />
            or continue with email
            <div className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cobalt"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-muted">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-medium text-cobalt hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cobalt"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Log In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Don't have an account?{" "}
            <a href="#create-account" className="font-semibold text-cobalt hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
