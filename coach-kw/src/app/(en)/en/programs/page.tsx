import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import ProgramsCompare from "@/components/ProgramsCompare";
import ProgramsFAQ from "@/components/ProgramsFAQ";

export default function ProgramsPage() {
  const t = getDictionary("en");
  const items = t.programs.items as any;
  return (
    <>
      <main className="container-page section" dir="ltr">
        <h1 className="section-title">{t.programs.title}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {Object.entries(items).map(([key, p]: any) => (
            <div key={p.name} className="card-glass p-6">
              <div className="mb-3 h-8 w-8">
                {key === "one" && <img src="/assets/icons/one.svg" className="h-8 w-8" alt="" />}
                {key === "group" && <img src="/assets/icons/users.svg" className="h-8 w-8" alt="" />}
                {key === "corp" && <img src="/assets/icons/programs.svg" className="h-8 w-8" alt="" />} 
                {key === "course" && <img src="/assets/icons/check.svg" className="h-8 w-8" alt="" />}
              </div>
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="text-sm text-[var(--muted)]">{p.duration}</div>
              <div className="mt-4 font-semibold">{p.price}</div>
              {key === "group" && Array.isArray(items.group.features) && (
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[var(--muted)]">
                  <div className="inline-flex items-center gap-1"><img src="/assets/icons/users.svg" className="h-4 w-4" alt="" />{(items.group as any).features[0]}</div>
                  <div className="inline-flex items-center gap-1"><img src="/assets/icons/calendar.svg" className="h-4 w-4" alt="" />{(items.group as any).features[1]}</div>
                  <div className="inline-flex items-center gap-1"><img src="/assets/icons/check.svg" className="h-4 w-4" alt="" />{(items.group as any).features[2]}</div>
                </div>
              )}
              <Link href={`/en/booking?program=${encodeURIComponent(key)}`} className="btn-primary mt-6 inline-flex">
                {t.cta.book}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <ProgramsCompare t={t} locale="en" />
      <ProgramsFAQ t={t} locale="en" />
    </>
  );
}


