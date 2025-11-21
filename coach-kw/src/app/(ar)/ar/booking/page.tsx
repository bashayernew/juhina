import { getDictionary } from "@/lib/i18n";
import BookingForm from "@/components/BookingForm";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export default function BookingPage() {
  const t = getDictionary("ar");
  return (
    <main className="container-page section" dir="rtl">
      <h1 className="section-title text-white">{t.booking.title}</h1>
      <p className="section-subtitle mt-2">{t.booking.desc}</p>
      
      {/* Calendly Widget - Creates actual Calendly bookings */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">احجز مباشرة عبر Calendly</h2>
        <CalendlyEmbed />
      </div>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-glass p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">احجز جلستك</h2>
          <p className="text-sm text-[var(--muted)] mb-4">اختر الوقت المناسب لك. التوقيت: الكويت.</p>
          <p className="text-xs text-[var(--muted)] mb-4">(يرسل طلب حجز عبر البريد الإلكتروني)</p>
          <BookingForm locale="ar" />
        </div>
        <div className="card-glass p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">أرسل رسالة</h2>
          <div className="mb-3 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
            <img src="/assets/icons/contact.svg" className="h-4 w-4" alt="" />
            أرسل رسالة
          </div>
          <ContactForm t={t} locale="ar" />
        </div>
      </div>
      
      <div className="mt-6">
        <ContactInfo locale="ar" showHours={false} showSocial />
      </div>
    </main>
  );
}


