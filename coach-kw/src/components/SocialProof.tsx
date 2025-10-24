export default function SocialProof({ locale }: { locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const items = ["KNET", "Apple Pay", "Visa", "Mastercard", "Kuwait Times"];
  return (
    <section className="py-8 border-y border-[var(--card-border)]/70">
      <div className="container-page flex flex-wrap items-center justify-center gap-6 opacity-80" dir={dir}>
        {items.map((name) => (
          <div key={name} className="text-sm">{name}</div>
        ))}
      </div>
    </section>
  );
}


