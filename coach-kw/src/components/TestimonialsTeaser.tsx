export default function TestimonialsTeaser({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const quotes = [
    { name: "A.M.", text: "Habits that finally stuck." },
    { name: "S.K.", text: "More energy and clarity every day." },
    { name: "N.R.", text: "Work and life in balance." },
  ];
  return (
    <section id="testimonials" className="section">
      <div className="container-page" dir={dir}>
        <h2 className="section-title">{t.testimonials.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="card-glass p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-[var(--card-border)] bg-white/70 flex items-center justify-center text-xs font-semibold text-[var(--muted)]">
                  {q.name.replace(/\./g, "").slice(0,2)}
                </div>
                <figcaption className="text-xs text-[var(--muted)]">{q.name}</figcaption>
              </div>
              <blockquote className="mt-3 text-sm opacity-90">“{q.text}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


