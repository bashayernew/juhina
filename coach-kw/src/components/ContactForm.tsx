"use client";

import { useState } from "react";

export default function ContactForm({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("https://formspree.io/f/your-id", { method: "POST", body: JSON.stringify(form), headers: { "Content-Type": "application/json" } });
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  }
  return (
    <form onSubmit={submit} dir={dir} className="grid gap-3">
      <input name="name" value={form.name} onChange={onChange} placeholder={t.contact.form.name} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 focus-ring" required />
      <input name="email" type="email" value={form.email} onChange={onChange} placeholder={t.contact.form.email} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 focus-ring" required />
      <input name="phone" value={form.phone} onChange={onChange} placeholder={t.contact.form.phone} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 focus-ring" />
      <input name="reason" value={form.reason} onChange={onChange} placeholder={t.contact.form.reason} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 focus-ring" />
      <textarea name="message" value={form.message} onChange={onChange} placeholder={t.contact.form.message} className="min-h-32 rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 focus-ring" />
      <div className="flex gap-3">
        <button className="btn-primary" disabled={status !== "idle"}>{t.contact.form.submit}</button>
        <a href="https://wa.me/96599986494" className="btn-secondary">WhatsApp</a>
      </div>
      {status === "done" && <p className="text-sm" style={{ color: 'var(--accent)' }}>{locale === "ar" ? "تم الإرسال!" : "Message sent!"}</p>}
    </form>
  );
}


