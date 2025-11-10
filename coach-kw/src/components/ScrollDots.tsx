"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Locale = "en" | "ar";

const SECTION_CONFIG = [
  { id: "hero-top", label: { en: "Intro", ar: "البداية" } },
  { id: "identity", label: { en: "Identity", ar: "الهوية" } },
  { id: "callout", label: { en: "Why Now", ar: "لماذا الآن" } },
  { id: "beliefs", label: { en: "Mindset", ar: "التفكير" } },
];

export default function ScrollDots({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<string>(SECTION_CONFIG[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: [0.35, 0.6], rootMargin: "-10% 0px -40% 0px" }
    );

    SECTION_CONFIG.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex ${
        locale === "ar" ? "right-10" : "left-10"
      }`}
    >
      {SECTION_CONFIG.map((section) => {
        const isActive = section.id === activeId;
        return (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className={`group relative flex h-4 w-4 items-center justify-center rounded-full border ${
              isActive
                ? "border-[var(--accent)] bg-[var(--accent)]"
                : "border-white/40 bg-transparent"
            }`}
            aria-label={section.label[locale]}
          >
            <span className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 translate-x-6 whitespace-nowrap rounded-full bg-black/80 px-2 py-1 text-xs text-white shadow group-hover:block">
              {section.label[locale]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

