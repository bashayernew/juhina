"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

export default function ClientDir({ locale }: { locale: Locale }) {
  useEffect(() => {
    const el = document.documentElement;
    const dir = locale === "ar" ? "rtl" : "ltr";
    el.setAttribute("dir", dir);
    el.setAttribute("lang", locale);
    try {
      localStorage.setItem("locale", locale);
    } catch {}
  }, [locale]);
  return null;
}


