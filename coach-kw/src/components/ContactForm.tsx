"use client";

import { useState } from "react";

export default function ContactForm({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    // Validate required fields before sending
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMessage(locale === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setStatus("error");
      setErrorMessage(locale === "ar" ? "البريد الإلكتروني غير صحيح" : "Please enter a valid email address");
      return;
    }
    
    console.log("[CONTACT] Frontend: Submitting contact form", { 
      name: !!form.name, 
      email: !!form.email, 
      phone: !!form.phone, 
      message: !!form.message 
    });
    
    setStatus("loading");
    setErrorMessage("");
    
    try {
      // Prepare message - include reason if provided
      let fullMessage = form.message.trim();
      if (form.reason && form.reason.trim()) {
        fullMessage = `Reason: ${form.reason.trim()}\n\n${fullMessage}`;
      }
      
      // Send to /api/contact endpoint
      const apiUrl = "/api/contact";
      console.log("[CONTACT] Frontend: POSTing to", apiUrl);
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          reason: form.reason.trim() || undefined,
          message: form.message.trim(),
        }),
      });
      
      const data = await res.json();
      console.log("[CONTACT] Frontend: API response status", res.status);
      console.log("[CONTACT] Frontend: API response data", data);
      
      if (res.ok && data.ok) {
        console.log("[CONTACT] Frontend: Contact form submitted successfully");
        setStatus("success");
        setForm({ name: "", email: "", phone: "", reason: "", message: "" });
      } else {
        console.error("[CONTACT] Frontend: Contact failed", data.error);
        setStatus("error");
        setErrorMessage(data.error || (locale === "ar" ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again."));
      }
    } catch (error: any) {
      console.error("[CONTACT] Frontend: Network error", error);
      setStatus("error");
      setErrorMessage(locale === "ar" ? "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى." : "Connection error. Please try again.");
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
        <button 
          type="submit"
          className="btn-primary" 
          disabled={status === "loading"}
          aria-disabled={status === "loading"}
        >
          {status === "loading" 
            ? (locale === "ar" ? "جارٍ الإرسال…" : "Sending…") 
            : t.contact.form.submit}
        </button>
      </div>
      
      {status === "success" && (
        <div className="rounded-md p-3" style={{ backgroundColor: 'rgba(200, 162, 74, 0.1)', border: '1px solid var(--accent)' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            {locale === "ar" ? "تم إرسال رسالتك بنجاح. شكرًا لك!" : "✓ Your message has been sent successfully. Thank you!"}
          </p>
        </div>
      )}
      
      {status === "error" && (
        <div className="rounded-md p-3" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#ef4444' }}>
            {errorMessage || (locale === "ar" ? "حدث خطأ، حاول مرة أخرى." : "✗ Something went wrong. Please try again.")}
          </p>
        </div>
      )}
    </form>
  );
}


