export default function ContactInfo({ locale }: { locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div className="card-glass p-6">
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

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent)", opacity: 0.15 }}>
            <img src="/assets/icons/clock.svg" alt="" className="h-5 w-5" style={{ filter: "none" }} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{locale === "ar" ? "الأحد–الخميس • 10:00–18:00" : "Sun–Thu • 10:00–18:00"}</div>
            <div className="text-xs text-[var(--muted)] mt-0.5">{locale === "ar" ? "ساعات العمل" : "Working Hours"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
