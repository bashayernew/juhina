import { getDictionary } from "@/lib/i18n";
import { JsonLd } from "@/components/SEO";

export default function AboutPage() {
  const t = getDictionary("en");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.brand.name,
    jobTitle: t.brand.title,
    address: { "@type": "PostalAddress", addressCountry: "KW" },
    email: "Janon.m@hotmail.com",
    sameAs: [
      "https://instagram.com/juhainah_alshawaf",
      "https://linkbio.co/6122712elzlqu",
    ],
  };
  return (
    <main className="container-page section" dir="ltr">
      <h1 className="section-title">{t.about.title}</h1>
      <p className="mt-4 section-subtitle">{t.about.bio}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card-glass p-6 md:col-span-2 order-2 md:order-1">
          <h2 className="text-xl font-serif">{t.about.philosophy}</h2>
          <p className="mt-3 text-sm opacity-90">
            I help clients cultivate self-awareness, reprogram limiting beliefs, and restore
            balanced energy so growth feels natural and sustainable. Sessions blend
            science-based habit design with mindful practices tailored to everyday life.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[var(--card-border)] bg-white/60 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]"><img src="/assets/icons/clarity.svg" className="h-4 w-4" alt="" />Expertise</div>
              <div className="mt-2 text-sm">Awareness & Mind Reprogramming</div>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-white/60 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]"><img src="/assets/icons/mindset.svg" className="h-4 w-4" alt="" />Focus</div>
              <div className="mt-2 text-sm">Habits, Clarity, Energy</div>
            </div>
            <div className="rounded-lg border border-[var(--card-border)] bg-white/60 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]"><img src="/assets/icons/programs.svg" className="h-4 w-4" alt="" />Format</div>
              <div className="mt-2 text-sm">1:1, Group, Corporate</div>
            </div>
          </div>
        </div>
        <aside className="card-glass p-6 order-1 md:order-2">
          <div className="relative mb-4 h-56 w-full overflow-hidden rounded-lg border border-[var(--card-border)]">
            <img src="/assets/juhaina.jpg" alt={t.brand.name} className="h-full w-full object-cover" />
          </div>
          <h3 className="text-lg font-semibold">{t.about.cred}</h3>
          <ul className="mt-3 space-y-2 text-sm opacity-90">
            <li>ICF-aligned training</li>
            <li>Press: Kuwait Times</li>
            <li>Founder: Riadyoon initiative</li>
            <li>Podcast host & speaker</li>
            <li>Corporate workshops in Kuwait</li>
          </ul>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--muted)]"><img src="/assets/icons/location.svg" className="h-4 w-4" alt="" />Kuwait</div>
        </aside>
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-serif">{t.about.timeline}</h2>
        <ol className="mt-4 space-y-3 text-sm">
          <li className="card-glass p-4">2019 — Started coaching</li>
          <li className="card-glass p-4">2022 — Corporate workshops</li>
          <li className="card-glass p-4">2024 — Launched Riadyoon community</li>
        </ol>
      </section>
      <section className="mt-10">
        <figure className="card-glass p-6">
          <blockquote className="text-lg font-serif">
            “Lasting change happens when awareness, intention, and daily systems move in one direction.”
          </blockquote>
        </figure>
        <div className="mt-6 flex gap-3">
          <a href="https://instagram.com/juhainah_alshawaf" className="btn-secondary">Instagram</a>
          <a href="https://linkbio.co/6122712elzlqu" className="btn-primary">Link in Bio</a>
        </div>
      </section>
      <JsonLd data={person} />
    </main>
  );
}


