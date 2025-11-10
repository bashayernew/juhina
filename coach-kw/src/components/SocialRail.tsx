"use client";

import Link from "next/link";

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
  {
    key: "email",
    href: "mailto:Janon.m@hotmail.com",
    label: { en: "Email", ar: "البريد الإلكتروني" },
    icon: "/assets/icons/email.svg",
  },
  {
    key: "linkbio",
    href: "https://linkbio.co/6122712elzlqu",
    label: { en: "Link in Bio", ar: "الرابط" },
    icon: "/assets/icons/programs.svg",
  },
];

export default function SocialRail({ locale }: { locale: Locale }) {
  return (
    <nav
      aria-label={locale === "ar" ? "روابط التواصل الاجتماعي" : "Social media shortcuts"}
      className={`fixed top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex ${
        locale === "ar" ? "left-10" : "right-10"
      }`}
    >
      {SOCIAL_LINKS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black/40 p-2 transition hover:border-[var(--accent)] hover:bg-black/70"
          aria-label={item.label[locale]}
        >
          <img src={item.icon} alt="" className="h-5 w-5 text-white group-hover:opacity-100" />
        </Link>
      ))}
    </nav>
  );
}

