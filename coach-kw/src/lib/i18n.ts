export type Locale = "en" | "ar";

import en from "@/i18n/en.json";
import ar from "@/i18n/ar.json";

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return locale === "ar" ? (ar as Dictionary) : (en as Dictionary);
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function switchLocaleInPath(pathname: string, next: Locale): string {
  const cleaned = pathname || "/";
  const replaced = cleaned.replace(/^\/(en|ar)(?=\/|$)/, `/${next}`);
  if (replaced === cleaned) {
    return `/${next}${cleaned === "/" ? "" : cleaned}`;
  }
  return replaced;
}


