import { getDictionary } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export default function BookingPage() {
  const t = getDictionary("en");
  return (
    <main className="container-page section" dir="ltr">
      {/* Calendly Widget - Creates actual Calendly bookings */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">Book Directly via Calendly</h2>
        <CalendlyEmbed />
      </div>
      
      <div className="mt-8">
        <div className="card-glass p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Send a message</h2>
          <div className="mb-3 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
            <img src="/assets/icons/contact.svg" className="h-4 w-4" alt="" />
            Send a message
          </div>
          <ContactForm t={t} locale="en" />
        </div>
      </div>
      
      <div className="mt-6">
        <ContactInfo locale="en" showHours={false} showSocial />
      </div>
    </main>
  );
}


