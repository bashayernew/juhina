import { JsonLd } from "@/components/SEO";

export default function TestimonialsPage() {
  const reviews = [
    { author: "A.M.", rating: 5, reviewBody: "Consistent progress and better habits." },
    { author: "S.K.", rating: 5, reviewBody: "Clearer goals and more focus." },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reviews.map((r, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating },
      reviewBody: r.reviewBody,
    })),
  };
  return (
    <main className="container-page section" dir="ltr">
      <h1 className="section-title">Testimonials</h1>
      <div className="mt-8 columns-1 gap-4 md:columns-2">
        {reviews.map((r) => (
          <div key={r.author} className="break-inside-avoid card-glass p-6 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border border-[var(--card-border)] bg-white/70 flex items-center justify-center text-xs font-semibold text-[var(--muted)]">
                {r.author.replace(/\./g, "").slice(0,2)}
              </div>
              <div className="text-xs text-[var(--muted)]">{r.author} • {"★".repeat(r.rating)}</div>
            </div>
            <div className="mt-3 text-sm opacity-90">“{r.reviewBody}”</div>
          </div>
        ))}
      </div>
      <JsonLd data={schema} />
    </main>
  );
}


