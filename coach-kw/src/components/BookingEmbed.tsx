"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Locale = "en" | "ar";

export default function BookingEmbed({ t, locale }: { t: any; locale: Locale }) {
  const params = useSearchParams();
  const initialKey = params.get("program") || "";
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";

  const programKeys = ["one", "group", "corp", "course"] as const;
  const options = useMemo(() => {
    return programKeys
      .filter((k) => t.programs.items[k])
      .map((k) => ({ key: k, label: t.programs.items[k].name }));
  }, [t]);

  const [selected, setSelected] = useState<string>(initialKey && programKeys.includes(initialKey as any) ? initialKey : options[0]?.key || "");

  useEffect(() => {
    if (initialKey && programKeys.includes(initialKey as any)) setSelected(initialKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKey]);

  const src = useMemo(() => {
    if (!bookingUrl) return "";
    const sep = bookingUrl.includes("?") ? "&" : "?";
    return selected ? `${bookingUrl}${sep}program=${encodeURIComponent(selected)}` : bookingUrl;
  }, [bookingUrl, selected]);

  return (
    <div className="card-glass p-4" style={{ borderColor: "var(--accent)" }}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm">
          {locale === "ar" ? "اختر البرنامج" : "Select Program"}
        </label>
        <select
          className="rounded-md border border-[var(--card-border)] bg-white px-3 py-2 text-sm"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        {src ? (
          <iframe title={locale === "ar" ? "أداة الحجز" : "Booking Widget"} src={src} className="w-full" style={{ minHeight: 640, border: 0 }} />
        ) : (
          <div className="text-sm opacity-90">
            {locale === "ar" ? (
              <>ضع رابط الحجز في <code>NEXT_PUBLIC_BOOKING_URL</code> ثم حدّث الصفحة.</>
            ) : (
              <>Set your booking link in <code>NEXT_PUBLIC_BOOKING_URL</code> and refresh.</>
            )}
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {locale === "ar"
          ? "تنبيهات البريد الإلكتروني تُدار من خلال منصة الحجز (مثل Calendly/Zoho)."
          : "Email notifications are handled by your booking platform (e.g., Calendly/Zoho)."}
      </p>
    </div>
  );
}


