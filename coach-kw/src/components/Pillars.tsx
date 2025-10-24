export default function Pillars({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const pillars: string[] = t.framework.pillars as string[];
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <section className="section">
      <div className="container-page" dir={dir}>
        <h2 className="section-title">{t.framework.title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {pillars.map((p: string, idx: number) => {
            const icon = [
              "/assets/icons/clarity.svg",
              "/assets/icons/systems.svg",
              "/assets/icons/accountability.svg",
              "/assets/icons/mindset.svg",
            ][idx % 4];
            return (
              <div key={p} className="card-glass p-5 text-center">
                <div className="mx-auto h-10 w-10">
                  <img src={icon} alt="" className="h-10 w-10 mx-auto" />
                </div>
                <div className="mt-3 text-lg font-semibold">{p}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


