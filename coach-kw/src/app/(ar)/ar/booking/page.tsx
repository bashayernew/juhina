import { getDictionary } from "@/lib/i18n";
import BookingForm from "@/components/BookingForm";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

export default function BookingPage() {
  const t = getDictionary("ar");
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";
  const params = typeof window === "undefined" ? undefined : new URLSearchParams(window.location.search);
  const program = params?.get("program") || "";
  return (
    <main className="container-page section" dir="rtl">
      <h1 className="section-title">{t.booking.title}</h1>
      <p className="section-subtitle mt-2">{t.booking.desc}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-glass p-6">
          <BookingForm locale="ar" />
        </div>
        <div className="card-glass p-6">
          <div className="mb-3 inline-flex items-center gap-2 text-sm text-[var(--muted)]"><img src="/assets/icons/contact.svg" className="h-4 w-4" alt="" />أرسل رسالة</div>
          <ContactForm t={t} locale="ar" />
        </div>
      </div>
      <div className="mt-6">
        <ContactInfo locale="ar" showHours={false} showSocial />
      </div>
    </main>
  );
}


