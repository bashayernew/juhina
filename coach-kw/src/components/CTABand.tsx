import Link from "next/link";

export default function CTABand({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <section id="cta" className="py-10 border-t border-[var(--card-border)]/70">
      <div className="container-page flex flex-col items-center justify-between gap-4 md:flex-row" dir={dir}>
        <div className="text-lg font-serif">
          {locale === "ar" ? "جاهز للبدء؟" : "Ready to get started?"}
        </div>
        <div className="flex gap-3">
          <Link href={`/${locale}/booking`} className="btn-primary">{t.cta.book}</Link>
        </div>
      </div>
    </section>
  );
}


