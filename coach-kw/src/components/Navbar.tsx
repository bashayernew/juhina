import Link from "next/link";
import LangToggle from "@/components/LangToggle";

export default function Navbar({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const nav = t.nav;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--card-border)]/70 backdrop-blur" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", color: "rgba(255, 255, 255, 0.95)" }}>
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="text-sm font-semibold tracking-tight" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
          {t.brand.name}
        </Link>
        <nav aria-label="Primary" dir={dir} className="hidden gap-6 md:flex" style={{ color: "rgba(255, 255, 255, 0.95)" }}>
          <Link href={`/${locale}`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/about.svg" alt="" className="h-4 w-4" />{nav.home}
          </Link>
          <Link href={`/${locale}/booking`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/booking.svg" alt="" className="h-4 w-4" />
            {locale === "ar" ? "الحجز والتواصل" : "Booking & Contact"}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <Link href={`/${locale}/booking`} className="btn-primary">{t.cta.book}</Link>
        </div>
      </div>
    </header>
  );
}


