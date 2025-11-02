import { JsonLd } from "@/components/SEO";

export default function AboutSection({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
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
    <section className="section" dir={dir}>
      <div className="container-page">
        <h2 className="section-title">{t.about.title}</h2>
        <p className="mt-4 section-subtitle">{t.about.bio}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="card-glass p-6 md:col-span-2 order-2 md:order-1">
            <h3 className="text-xl font-serif">{t.about.philosophy}</h3>
            <p className="mt-3 text-sm opacity-90">
              {locale === "ar"
                ? "أساعد العملاء على تنمية الوعي وإعادة برمجة المعتقدات المقيدة واستعادة التوازن الطاقي بحيث يصبح النمو طبيعيًا ومستدامًا. الجلسات تجمع بين تصميم العادات المبني على العلم وممارسات ذهنية مناسبة للحياة اليومية."
                : "I help clients cultivate self-awareness, reprogram limiting beliefs, and restore balanced energy so growth feels natural and sustainable. Sessions blend science-based habit design with mindful practices tailored to everyday life."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[var(--card-border)] bg-white/60 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]"><img src="/assets/icons/clarity.svg" className="h-4 w-4" alt="" />{locale === "ar" ? "التخصص" : "Expertise"}</div>
                <div className="mt-2 text-sm">{locale === "ar" ? "الوعي وبرمجة العقل" : "Awareness & Mind Reprogramming"}</div>
              </div>
              <div className="rounded-lg border border-[var(--card-border)] bg-white/60 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]"><img src="/assets/icons/mindset.svg" className="h-4 w-4" alt="" />{locale === "ar" ? "التركيز" : "Focus"}</div>
                <div className="mt-2 text-sm">{locale === "ar" ? "العادات، الوضوح، الطاقة" : "Habits, Clarity, Energy"}</div>
              </div>
              <div className="rounded-lg border border-[var(--card-border)] bg-white/60 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]"><img src="/assets/icons/programs.svg" className="h-4 w-4" alt="" />{locale === "ar" ? "الأسلوب" : "Format"}</div>
                <div className="mt-2 text-sm">{locale === "ar" ? "فردي، جماعي، شركات" : "1:1, Group, Corporate"}</div>
              </div>
            </div>
          </div>

          <aside className="card-glass p-6 order-1 md:order-2">
            <div className="relative mb-4 h-56 w-full overflow-hidden rounded-lg border border-[var(--card-border)]">
              <img src="/assets/juhaina.jpg" alt={t.brand.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold">{t.about.cred}</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-90">
              <li>{locale === "ar" ? "تدريب متوافق مع ICF" : "ICF-aligned training"}</li>
              <li>{locale === "ar" ? "الصحافة: الكويت تايمز" : "Press: Kuwait Times"}</li>
              <li>{locale === "ar" ? "مؤسسة مبادرة رياديون" : "Founder: Riadyoon initiative"}</li>
              <li>{locale === "ar" ? "مقدمة بودكاست ومتحدثة" : "Podcast host & speaker"}</li>
              <li>{locale === "ar" ? "ورش عمل للشركات في الكويت" : "Corporate workshops in Kuwait"}</li>
            </ul>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--muted)]"><img src="/assets/icons/location.svg" className="h-4 w-4" alt="" />{locale === "ar" ? "الكويت" : "Kuwait"}</div>
          </aside>
        </div>
        <JsonLd data={person} />
      </div>
    </section>
  );
}


