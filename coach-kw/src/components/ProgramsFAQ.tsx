export default function ProgramsFAQ({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const items = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    t.faq.q3 && t.faq.a3 ? { q: t.faq.q3, a: t.faq.a3 } : null,
  ].filter(Boolean) as Array<{ q: string; a: string }>;
  return (
    <section className="section">
      <div className="container-page" dir={dir}>
        <h2 className="section-title">{t.faq.title}</h2>
        <div className="mt-6 space-y-3">
          {items.map((it) => (
            <details key={it.q} className="card-glass p-4">
              <summary className="cursor-pointer font-medium">{it.q}</summary>
              <p className="mt-2 text-sm opacity-90">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


