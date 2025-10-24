import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/lib/i18n";

export default function ContactPage() {
  const t = getDictionary("en");
  return (
    <main className="container-page section" dir="ltr">
      <h1 className="section-title">{t.contact.title}</h1>
      <p className="section-subtitle mt-2">{t.contact.desc}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-glass p-6">
          <div className="mb-3 inline-flex items-center gap-2 text-sm text-[var(--muted)]"><img src="/assets/icons/contact.svg" className="h-4 w-4" alt="" />Send a message</div>
          <ContactForm t={t} locale="en" />
        </div>
        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold">{t.contact.hours}</h2>
          <p className="mt-2 text-sm opacity-90">Sun–Thu • 10:00–18:00 (Kuwait)</p>
          <div className="mt-4 aspect-video w-full rounded-md overflow-hidden">
            <iframe title="Map" src="https://maps.google.com/maps?q=Kuwait&t=&z=10&ie=UTF8&iwloc=&output=embed" className="h-full w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}


