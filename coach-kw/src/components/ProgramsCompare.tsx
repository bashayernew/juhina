export default function ProgramsCompare({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const items = t.programs.items as any;
  const rows = [
    { label: t.compare.who, one: "Individuals wanting deep guidance", group: "Those who want community", corp: "Teams & leaders" },
    { label: t.compare.commitment, one: items.one.duration, group: items.group.duration, corp: items.corp.duration },
    { label: t.compare.price, one: items.one.price, group: items.group.price, corp: items.corp.price },
  ];
  return (
    <section className="section">
      <div className="container-page" dir={dir}>
        <h2 className="section-title">{t.compare.title}</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-3"> </th>
                <th className="text-left p-3">{items.one.name}</th>
                <th className="text-left p-3">{items.group.name}</th>
                <th className="text-left p-3">{items.corp.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-[var(--card-border)]/70">
                  <td className="p-3 text-[var(--muted)]">{r.label}</td>
                  <td className="p-3">{r.one}</td>
                  <td className="p-3">{r.group}</td>
                  <td className="p-3">{r.corp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


