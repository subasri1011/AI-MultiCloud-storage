import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
        <Logo />
        <p className="text-xs text-muted">© {new Date().getFullYear()} CloudVault AI. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-muted">
          <a href="#home" className="hover:text-ink">Privacy</a>
          <a href="#home" className="hover:text-ink">Terms</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </div>
      </div>
    </footer>
  );
}
