export default function TestimonialsTeaser({ t, locale }: { t: any; locale: "en" | "ar" }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  const quotes =
    locale === "ar"
      ? [
          {
            name: "سلمان غلوم",
            text:
              "بعد الاستشارة وايد اشياء تغيرت فيني و بحياتي ، قام اتطور و اغير عاداتي ، و شفت ان قام اصير احسن في مجالي ، شكراً صج انتي أثرتي عليّ تأثير وايد زين",
          },
          {
            name: "جعفر م. ششتي",
            text:
              "كنت تائهاً ومشتتاً عن العالم حتى دخلت جهينة حياتي. سألتني عن طموحاتي وأهدافي، وأنا الآن أبدأ رحلتي لأكتشف نفسي وأرى ماذا يخبئ لي المستقبل في هذا الطريق المليء بالغموض!",
          },
          {
            name: "زهراء الهاشم",
            text:
              "بعد الاستشارة اللي كانت في وقتها مو طويلة لكن غنية بالمعلومات والتوضيح، ارتحت كثير رغم خوفي في البداية من قراري اني اخذ هالخطوة، تولعت لمبات في عقلي وحسيت ان هذا العالم هو المكان اللي كنت أبحث عنه من زمان. ارتحت لك كثير وحسيتك اخت اقدر اثق فيها وابدأ معاها رحلة التغيير",
          },
        ]
      : [
          {
            name: "Salman Ghuloom",
            text:
              "After the consultation, so much changed in me and in my life. I started developing and changing my habits, and I could see myself getting better in my field. Thank you—you truly had a very positive impact on me.",
          },
          {
            name: "Jaafar M. Sheshtari",
            text:
              "I was lost and distracted from the world until Juhainah came into my life. She asked me about my ambitions and goals, and I am just starting my journey to find myself—and to see what the future holds on this mysterious path!",
          },
          {
            name: "Zahraa Al-Hashem",
            text:
              "The consultation wasn’t long, but it was rich with information and clarity. I felt relieved, despite being afraid at first to take this step. Lightbulbs went off in my mind and I felt this is the world I’d been searching for. I felt so comfortable with you—like a sister I can trust—and I’m ready to begin the journey of change with you.",
          },
        ];
  return (
    <section id="testimonials" className="section">
      <div className="container-page" dir={dir}>
        <div className="text-center mb-4">
          <h2 className="section-title text-white">{t.testimonials.title}</h2>
          {t.testimonials.subtitle && (
            <p className="text-lg text-white mt-2">{t.testimonials.subtitle}</p>
          )}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="card-glass p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-[var(--card-border)] bg-white/70 flex items-center justify-center text-xs font-semibold text-white">
                  {q.name.replace(/\./g, "").slice(0,2)}
                </div>
                <figcaption className="text-xs text-white">{q.name}</figcaption>
              </div>
              <blockquote className="mt-3 text-sm text-white">"{q.text}"</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}


