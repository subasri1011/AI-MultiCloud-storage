import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section">
      <div className="card mx-auto max-w-2xl md:p-10">
        <p className="eyebrow mb-3">Contact</p>
        <h2 className="text-2xl font-semibold text-ink md:text-3xl">Talk to the team</h2>
        <p className="mt-2 text-sm text-muted">
          Questions about connecting a provider, security, or pricing — send a note and we'll reply within a day.
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl border border-mint/30 bg-mint/10 px-5 py-4 text-sm text-mint-dark">
            Message sent. We'll get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              required
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cobalt"
            />
            <input
              type="email"
              placeholder="Email address"
              required
              className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cobalt"
            />
            <textarea
              placeholder="How can we help?"
              required
              rows={4}
              className="sm:col-span-2 rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-cobalt"
            />
            <button type="submit" className="btn-primary sm:col-span-2">
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
