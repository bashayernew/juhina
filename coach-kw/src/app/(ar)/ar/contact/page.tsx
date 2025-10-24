import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/lib/i18n";

export default function ContactPage() {
  const t = getDictionary("ar");
  return (
    <main className="container-page section" dir="rtl">
      <h1 className="section-title">{t.contact.title}</h1>
      <p className="section-subtitle mt-2">{t.contact.desc}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-glass p-6">
          <div className="mb-3 inline-flex items-center gap-2 text-sm text-[var(--muted)]"><img src="/assets/icons/contact.svg" className="h-4 w-4" alt="" />أرسل رسالة</div>
          <ContactForm t={t} locale="ar" />
        </div>
        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold">{t.contact.hours}</h2>
          <p className="mt-2 text-sm opacity-90">الأحد–الخميس • 10:00–18:00 (الكويت)</p>
          <div className="mt-4 aspect-video w-full rounded-md overflow-hidden">
            <iframe title="الخريطة" src="https://maps.google.com/maps?q=Kuwait&t=&z=10&ie=UTF8&iwloc=&output=embed" className="h-full w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}


