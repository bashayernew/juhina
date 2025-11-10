"use client";

import { useState } from "react";

export default function LeadCaptureForm({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("https://formspree.io/f/your-id", { method: "POST", body: JSON.stringify({ email }), headers: { "Content-Type": "application/json" } });
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  }
  return (
    <section id="lead" className="section">
      <div className="container-page" dir={dir}>
        <div className="card-glass p-6">
          <h3 className="text-xl font-serif">{t.lead.title}</h3>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locale === "ar" ? "البريد الإلكتروني" : "Email"}
              className="min-w-0 flex-1 rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 focus-ring"
            />
            <button className="btn-primary" disabled={status !== "idle"}>
              {status === "loading" ? (locale === "ar" ? "جاري الإرسال…" : "Sending…") : t.lead.cta}
            </button>
          </form>
          {status === "done" && (
            <p className="mt-3 text-sm" style={{ color: "var(--accent)" }}>{locale === "ar" ? "تم الإرسال!" : "Sent! Please check your email."}</p>
          )}
        </div>
      </div>
    </section>
  );
}


