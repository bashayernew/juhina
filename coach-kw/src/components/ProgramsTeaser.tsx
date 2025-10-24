import Link from "next/link";
// Use standard <img> to avoid Next image loader issues with SVGs

export default function ProgramsTeaser({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const items = t.programs.items;
  return (
    <section className="section">
      <div className="container-page" dir={dir}>
        <h2 className="section-title">{t.programs.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {([items.one, items.group, items.corp] as any[]).map((p: any, idx: number) => (
            <div key={p.name} className="card-glass p-0 overflow-hidden">
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={idx === 0 ? "/assets/icons/one.svg" : idx === 1 ? "/assets/icons/users.svg" : "/assets/icons/programs.svg"}
                  alt=""
                  className="h-full w-full object-contain p-6"
                />
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold">{p.name}</div>
                <div className="text-sm text-[var(--muted)] mt-1">{p.duration}</div>
                <div className="mt-4 font-semibold">{p.price}</div>
                {idx === 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[var(--muted)]">
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/one.svg" className="h-5 w-5" alt="" aria-hidden="true" />{locale === "ar" ? "فردي" : "Private"}</div>
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/calendar.svg" className="h-5 w-5" alt="" aria-hidden="true" />{locale === "ar" ? "مرن" : "Flexible"}</div>
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/check.svg" className="h-5 w-5" alt="" aria-hidden="true" />{locale === "ar" ? "مساءلة" : "Accountability"}</div>
                  </div>
                )}
                {idx === 1 && Array.isArray(items.group.features) && (
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[var(--muted)]">
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/users.svg" className="h-5 w-5" alt="" aria-hidden="true" />{(items.group as any).features[0]}</div>
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/calendar.svg" className="h-5 w-5" alt="" aria-hidden="true" />{(items.group as any).features[1]}</div>
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/check.svg" className="h-5 w-5" alt="" aria-hidden="true" />{(items.group as any).features[2]}</div>
                  </div>
                )}
                {idx === 2 && (
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[var(--muted)]">
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/users.svg" className="h-5 w-5" alt="" aria-hidden="true" />{locale === "ar" ? "فرق" : "Teams"}</div>
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/programs.svg" className="h-5 w-5" alt="" aria-hidden="true" />{locale === "ar" ? "حضوري/عن بعد" : "Onsite/Remote"}</div>
                    <div className="inline-flex items-center gap-2"><img src="/assets/icons/check.svg" className="h-5 w-5" alt="" aria-hidden="true" />{locale === "ar" ? "سعر حسب الطلب" : "Custom Quote"}</div>
                  </div>
                )}
                <Link href={`/${locale}/programs`} className="btn-secondary mt-6 inline-flex">{t.programs.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


