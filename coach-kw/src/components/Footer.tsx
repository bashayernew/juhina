import Link from "next/link";

export default function Footer({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const year = new Date().getFullYear();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "var(--accent)" }}>
      <div className="container-page py-10" dir={dir} style={{ backgroundColor: "var(--surface)" }}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[var(--muted)]">© {year} • {t.brand.name}. {t.footer.rights}</div>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://instagram.com/juhainah_alshawaf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <img src="/assets/icons/instagram.svg" alt="Instagram" className="h-4 w-4" />
              Instagram
            </a>
            <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
            <Link href={`/${locale}/terms`}>{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


