import Link from "next/link";

export default function CTABand({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <section id="cta" className="py-10 border-t border-[var(--card-border)]/70">
      <div className="container-page flex flex-col items-center justify-between gap-4 md:flex-row" dir={dir}>
        <div className="text-lg font-serif">{locale === "ar" ? "سجّل الآن واستثمر في نفسك" : "Enroll now and invest in yourself"}</div>
        <div className="flex gap-3">
          <Link href={`/${locale}/booking`} className="btn-primary">{locale === "ar" ? "رابط التسجيل" : "Book Now"}</Link>
        </div>
      </div>
    </section>
  );
}


