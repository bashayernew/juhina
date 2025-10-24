import Link from "next/link";
import Image from "next/image";

export default function Hero({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <section className="section">
      <div className="container-page" dir={dir}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h1 className="section-title">{t.hero.headline}</h1>
            <p className="mt-4 text-lg section-subtitle">{t.hero.sub}</p>
            <div className="mt-8 flex gap-4">
              <Link href={`/${locale}/booking`} className="btn-primary">{t.hero.ctaPrimary}</Link>
              <Link href={`/${locale}/programs`} className="btn-secondary">{t.hero.ctaSecondary}</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-[var(--card-border)] shadow-sm md:h-80 md:w-80" aria-hidden="true">
              <Image src="/assets/juhaina.jpg" alt="Juhainah Al-Shawaf" fill sizes="(max-width: 768px) 16rem, 20rem" className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


