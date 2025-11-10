export default function Footer({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const year = new Date().getFullYear();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "var(--accent)" }}>
      <div className="container-page py-10" dir={dir} style={{ backgroundColor: "var(--surface)" }}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[var(--muted)]">© {year} • {t.brand.name}. {t.footer.rights}</div>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://www.instagram.com/juhainah_alshawaf?igsh=MWYwejU1MGZwNXVtdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <img src="/assets/icons/instagram.svg" alt="Instagram" className="h-4 w-4" />
              Instagram
            </a>
            <a href="https://t.me/+k7mGFAN6qCcyNWU0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <img src="/assets/icons/telegram.svg" alt="Telegram" className="h-4 w-4" />
              Telegram
            </a>
            <a href="https://youtube.com/@juhainah_alshawaf?si=PVHSwR30KjBERMZV" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <img src="/assets/icons/youtube.svg" alt="YouTube" className="h-4 w-4" />
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


