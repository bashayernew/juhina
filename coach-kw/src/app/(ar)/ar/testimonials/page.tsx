import { JsonLd } from "@/components/SEO";

export default function TestimonialsPage() {
  const reviews = [
    { author: "أ.م", rating: 5, reviewBody: "تقدم مستمر وعادات أفضل." },
    { author: "س.ك", rating: 5, reviewBody: "أهداف أوضح وتركيز أعلى." },
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
    <main className="container-page section" dir="rtl">
      <h1 className="section-title">آراء العملاء</h1>
      <div className="mt-8 columns-1 gap-4 md:columns-2">
        {reviews.map((r) => (
          <div key={r.author} className="break-inside-avoid card-glass p-6 mb-4">
            <div className="text-sm opacity-90">“{r.reviewBody}”</div>
            <div className="mt-2 text-xs text-[var(--muted)]">{r.author} • {"★".repeat(r.rating)}</div>
          </div>
        ))}
      </div>
      <JsonLd data={schema} />
    </main>
  );
}


