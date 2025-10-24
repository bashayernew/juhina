import Link from "next/link";
import LangToggle from "@/components/LangToggle";

export default function Navbar({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const nav = t.nav;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--card-border)]/70 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="text-sm font-semibold tracking-tight">
          {t.brand.name}
        </Link>
        <nav aria-label="Primary" dir={dir} className="hidden gap-6 md:flex">
          <Link href={`/${locale}`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/about.svg" alt="" className="h-4 w-4" />{nav.home}
          </Link>
          <Link href={`/${locale}/programs`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/programs.svg" alt="" className="h-4 w-4" />{nav.programs}
          </Link>
          <Link href={`/${locale}/booking`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/booking.svg" alt="" className="h-4 w-4" />{nav.booking}
          </Link>
          <Link href={`/${locale}/about`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/about.svg" alt="" className="h-4 w-4" />{nav.about}
          </Link>
          <Link href={`/${locale}/testimonials`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/clarity.svg" alt="" className="h-4 w-4" />{nav.testimonials}
          </Link>
          <Link href={`/${locale}/contact`} className="hover:opacity-80 inline-flex items-center gap-1">
            <img src="/assets/icons/contact.svg" alt="" className="h-4 w-4" />{nav.contact}
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


