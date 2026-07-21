import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
        <div className="hidden bg-gradient-to-br from-cobalt-dark via-cobalt to-cobalt-light p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">🛡️</div>
              <div>
                <div className="font-heading text-2xl font-bold">Valute Mind</div>
                <div className="text-sm text-white/80">Trusted multi-cloud access</div>
              </div>
            </div>
            <h1 className="max-w-md text-4xl font-bold leading-tight">Protect every file while orchestrating every cloud.</h1>
            <p className="mt-4 max-w-md text-white/80">A secure command center for smart uploads, storage optimization, and AI-guided file management.</p>
          </div>
          <div className="grid gap-3 rounded-2xl bg-white/10 p-4">
            <div className="rounded-xl bg-white/10 p-4">Google Drive</div>
            <div className="rounded-xl bg-white/10 p-4">OneDrive</div>
            <div className="rounded-xl bg-white/10 p-4">Dropbox + MEGA</div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
          <div className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-ink">Welcome back</h2>
              <p className="mt-2 text-muted">Sign in to continue to your vault.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">Email</label>
                <input type="email" className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3" placeholder="name@company.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">Password</label>
                <input type="password" className="focus-ring w-full rounded-xl border border-line bg-paper px-4 py-3" placeholder="••••••••" />
              </div>
              <button type="submit" className="focus-ring w-full rounded-xl bg-cobalt px-4 py-3 font-semibold text-white transition hover:bg-cobalt-dark">
                Log In
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-line"></div>
              <span className="text-xs uppercase text-muted">or</span>
              <div className="h-px flex-1 bg-line"></div>
            </div>

            <button type="button" className="focus-ring flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-white px-4 py-3 font-semibold text-ink transition hover:border-cobalt hover:text-cobalt">
              <span className="flex gap-1 text-lg">
                <span className="text-[#EA4335]">●</span>
                <span className="text-[#FBBC05]">●</span>
                <span className="text-[#34A853]">●</span>
                <span className="text-[#4285F4]">●</span>
              </span>
              Continue with Google
            </button>

            <div className="mt-5 flex flex-col items-center gap-2 text-sm">
              <a href="#" className="text-cobalt hover:text-cobalt-dark">Forgot password?</a>
              <p className="text-muted">Don’t have an account? <a href="#" className="font-semibold text-cobalt hover:text-cobalt-dark">Create one</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
