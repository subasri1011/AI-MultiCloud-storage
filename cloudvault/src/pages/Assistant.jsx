import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { IconSparkle, IconSend, IconUpload, IconCheck, IconDrive } from "../components/icons.jsx";

const INITIAL_MESSAGES = [
  {
    from: "assistant",
    text: "I found 4 presentations uploaded in the last month. Here they are:",
    files: [
      { name: "Project-Presentation.pptx", source: "OneDrive", date: "Apr 16" },
      { name: "Seminar-Slides.pptx", source: "Google Drive", date: "Apr 12" },
      { name: "Research-Talk.pptx", source: "Dropbox", date: "Apr 5" },
    ],
  },
];

const SUGGESTIONS = ["Show my presentations from last month", "Free up space", "Find large files"];

export default function Assistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  function sendMessage(text) {
    const content = text ?? input;
    if (!content.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: content },
      { from: "assistant", text: "Got it — I'll take a look and follow up shortly." },
    ]);
    setInput("");
  }

  return (
    <DashboardLayout>
      <div className="border-b border-line bg-surface px-4 py-5 sm:px-8">
        <h1 className="text-xl font-semibold text-ink">AI Assistant</h1>
        <p className="text-sm text-muted">Ask about your files, storage, or security across every connected cloud.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-8 lg:grid-cols-3">
        {/* Chat column */}
        <div className="card flex h-[560px] flex-col lg:col-span-2">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cobalt-50 text-cobalt">
              <IconSparkle />
            </div>
            <h3 className="font-semibold text-ink">Ask me anything</h3>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted hover:border-cobalt hover:text-cobalt"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto rounded-xl bg-paper p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-sm rounded-2xl px-4 py-3 text-sm ${
                    m.from === "user" ? "bg-cobalt text-white" : "bg-surface text-ink shadow-card"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.files && (
                    <div className="mt-3 space-y-2">
                      {m.files.map((f) => (
                        <div key={f.name} className="flex items-center gap-2.5 rounded-lg bg-paper px-3 py-2">
                          <span className="text-cobalt"><IconDrive /></span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-ink">{f.name}</p>
                            <p className="text-[11px] text-muted">{f.source} · {f.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="mt-4 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-sm outline-none focus:border-cobalt"
            />
            <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cobalt text-white hover:bg-cobalt-dark">
              <IconSend />
            </button>
          </form>
        </div>

        {/* Suggestion + upload column */}
        <div className="space-y-6">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-cobalt">AI Suggestion</p>
            <p className="mt-2 text-sm text-ink">Best place to store your file</p>

            <div className="mt-3 flex items-center justify-between rounded-xl bg-paper px-3.5 py-2.5">
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <IconDrive /> Google Drive
              </span>
              <span className="rounded-full bg-mint/10 px-2.5 py-0.5 text-xs font-semibold text-mint-dark">Recommended</span>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-muted">
              {["Faster access", "More space available", "Frequently used"].map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span className="text-mint"><IconCheck /></span>
                  {r}
                </li>
              ))}
            </ul>

            <button className="btn-primary mt-5 w-full">Upload</button>
          </div>

          <div className="card flex flex-col items-center justify-center border-dashed py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cobalt-50 text-cobalt">
              <IconUpload />
            </div>
            <p className="text-sm font-medium text-ink">Drag & drop your files here</p>
            <p className="mt-1 text-xs text-muted">or click to browse</p>
            <button className="btn-secondary mt-4">Browse Files</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
