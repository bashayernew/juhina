type Locale = "en" | "ar";

const SOCIAL_LINKS = [
  {
    key: "instagram",
    href: "https://www.instagram.com/juhainah_alshawaf?igsh=MWYwejU1MGZwNXVtdQ%3D%3D&utm_source=qr",
    label: { en: "Instagram", ar: "إنستغرام" },
    icon: "/assets/icons/instagram.svg",
  },
  {
    key: "telegram",
    href: "https://t.me/+k7mGFAN6qCcyNWU0",
    label: { en: "Telegram", ar: "تيليغرام" },
    icon: "/assets/icons/telegram.svg",
  },
  {
    key: "youtube",
    href: "https://youtube.com/@juhainah_alshawaf?si=PVHSwR30KjBERMZV",
    label: { en: "YouTube", ar: "يوتيوب" },
    icon: "/assets/icons/youtube.svg",
  },
];

interface ContactInfoProps {
  locale: Locale;
  showHours?: boolean;
  showSocial?: boolean;
}

export default function ContactInfo({ locale, showHours = true, showSocial = false }: ContactInfoProps) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div className="card-glass p-6" dir={dir}>
      <h3 className="text-lg font-semibold mb-4">{locale === "ar" ? "معلومات الاتصال" : "Contact Info"}</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent)", opacity: 0.15 }}>
            <img src="/assets/icons/location.svg" alt="" className="h-5 w-5" style={{ filter: "none" }} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{locale === "ar" ? "الكويت" : "Kuwait"}</div>
            <div className="text-xs text-[var(--muted)] mt-0.5">{locale === "ar" ? "الموقع" : "Location"}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent)", opacity: 0.15 }}>
            <img src="/assets/icons/email.svg" alt="" className="h-5 w-5" style={{ filter: "none" }} />
          </div>
          <div className="flex-1">
            <a href="mailto:Janon.m@hotmail.com" className="text-sm font-medium hover:opacity-80" style={{ color: "var(--accent)" }}>
              Janon.m@hotmail.com
            </a>
            <div className="text-xs text-[var(--muted)] mt-0.5">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</div>
          </div>
        </div>

        {showHours && (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent)", opacity: 0.15 }}>
              <img src="/assets/icons/clock.svg" alt="" className="h-5 w-5" style={{ filter: "none" }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{locale === "ar" ? "الأحد–الخميس • 10:00–18:00" : "Sun–Thu • 10:00–18:00"}</div>
              <div className="text-xs text-[var(--muted)] mt-0.5">{locale === "ar" ? "ساعات العمل" : "Working Hours"}</div>
            </div>
          </div>
        )}

        {showSocial && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-white/5 px-4 py-2 text-sm text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-white/10"
                aria-label={item.label[locale]}
              >
                <img src={item.icon} alt="" className="h-4 w-4" />
                <span>{item.label[locale]}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
