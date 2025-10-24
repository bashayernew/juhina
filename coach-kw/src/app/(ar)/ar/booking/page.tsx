import { getDictionary } from "@/lib/i18n";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  const t = getDictionary("ar");
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";
  const params = typeof window === "undefined" ? undefined : new URLSearchParams(window.location.search);
  const program = params?.get("program") || "";
  return (
    <main className="container-page section" dir="rtl">
      <h1 className="section-title">{t.booking.title}</h1>
      <p className="section-subtitle mt-2">{t.booking.desc}</p>
      <div className="card-glass p-6 mt-8">
        <BookingForm locale="ar" />
      </div>
      <div className="mt-6"><a href="https://wa.me/96599986494" className="btn-primary">{t.cta.whatsapp}</a></div>
    </main>
  );
}


