"use client";

import { useCallback } from "react";
import { switchLocaleInPath, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

export default function LangToggle() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const current: Locale = /^\/ar(\/|$)/.test(pathname) ? "ar" : "en";
  const next: Locale = current === "ar" ? "en" : "ar";

  const toggle = useCallback(() => {
    try { localStorage.setItem("locale", next); } catch {}
    try { document.cookie = `locale=${next}; path=/; max-age=31536000`; } catch {}
    const href = switchLocaleInPath(pathname, next);
    router.push(href);
  }, [next, pathname, router]);

  return (
    <button onClick={toggle} className="btn-secondary focus-ring" aria-label="Toggle language">
      {current === "ar" ? "EN" : "عربي"}
    </button>
  );
}


