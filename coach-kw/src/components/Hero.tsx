"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Locale = "en" | "ar";

function DesireFormSection({ t, locale, textAlign }: { t: any; locale: Locale; textAlign: string }) {
  const [desire, setDesire] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!desire.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/desire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desire: desire.trim(), email: email.trim() || undefined, name: name.trim() || undefined }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setDesire("");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="discovery" className="py-20">
      <div className="container-page mx-auto flex max-w-5xl flex-col gap-8 text-[var(--fg)]">
        <div className="rounded-3xl border border-[var(--accent)]/35 bg-white/95 p-12 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-8" dir={locale === "ar" ? "rtl" : "ltr"}>
            <div className={`flex flex-col gap-3 text-neutral-900 ${textAlign}`}>
              <span className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                {locale === "ar" ? "Discovery Session" : "Discovery Session"}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl">{t.title}</h3>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed">{t.description}</p>
            </div>

            <div className={`flex flex-col gap-4 ${textAlign}`}>
              <p className="text-lg font-semibold text-neutral-900 leading-relaxed">{t.question}</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <textarea
                    value={desire}
                    onChange={(e) => setDesire(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    rows={6}
                    className="w-full rounded-2xl border border-[var(--accent)]/30 bg-white/80 px-6 py-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  />
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={locale === "ar" ? "الاسم (اختياري)" : "Name (optional)"}
                      className="rounded-xl border border-[var(--accent)]/30 bg-white/80 px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={locale === "ar" ? "البريد الإلكتروني (اختياري)" : "Email (optional)"}
                      className="rounded-xl border border-[var(--accent)]/30 bg-white/80 px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={status === "loading" || !desire.trim()}
                  className="btn-primary self-start px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? t.sending : t.button}
                </button>

                {status === "success" && (
                  <p className="text-base font-medium text-[var(--accent)]">{t.success}</p>
                )}
                {status === "error" && (
                  <p className="text-base font-medium text-red-500">{t.error}</p>
                )}
              </form>

              <div className={`mt-6 ${textAlign}`}>
                <Link href={`/${locale}/booking`} className="btn-primary px-8 py-3 inline-block">
                  {locale === "ar" ? "اريد حجز استشارة" : "I want to book a consultation"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero({ t, locale }: { t: any; locale: Locale }) {
  const isRTL = locale === "ar";
  const enHeadline = "Manifest your reality.";
  const arHeadline = "اجعل واقعك يتجلّى.";
  const textAlign = isRTL ? "text-right" : "text-left";
  const beliefItemLayout = isRTL ? "flex items-start gap-4 flex-row-reverse text-right" : "flex items-start gap-4";
  const listItemLayout = isRTL ? "flex items-start gap-3 flex-row-reverse text-right" : "flex items-start gap-3";

  return (
    <>
      <section id="hero-top" className="relative isolate min-h-screen overflow-hidden bg-black text-[var(--fg)]">
        <Image
          src="/assets/programs/juhaina-new.jpg"
          alt="Juhainah Al-Shawaf portrait"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-contain object-center"
          unoptimized
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/65 to-black/80" />

        <div className="container-page relative mx-auto flex min-h-screen items-center justify-center py-16">
          <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
            <div className="space-y-2">
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight" dir="ltr">
                {enHeadline}
              </div>
              <div className="font-serif text-lg md:text-xl lg:text-2xl text-[var(--muted)] leading-tight mt-2" dir="rtl">
                {arHeadline}
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-base text-[var(--muted)] md:text-lg" dir={locale === "ar" ? "rtl" : "ltr"}>
              {t.hero.sub}
            </p>
            {t.hero.ctaPrimary && String(t.hero.ctaPrimary).trim().length > 0 && (
              <div className="mt-10 flex justify-center">
                <Link href={`/${locale}/booking`} className="btn-primary">
                  {t.hero.ctaPrimary}
                </Link>
              </div>
            )}
          </div>
        </div>

        <a
          href="#identity"
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 transform items-center gap-3 rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)] md:flex"
        >
          Scroll
        </a>
      </section>

      <section id="identity" className="py-24 mt-12">
        <div className="container-page mx-auto flex max-w-4xl flex-col items-center text-center text-[var(--fg)]">
          {locale === "ar" ? (
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">{t.hero.nameAr}</h2>
          ) : (
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">{t.hero.nameEn}</h2>
          )}
          <p className="mt-8 max-w-3xl text-base md:text-lg text-[var(--muted)]" dir={locale === "ar" ? "rtl" : "ltr"}>
            {t.hero.sub}
          </p>
          {Array.isArray(t.hero.identity) && t.hero.identity.length > 0 && (
            <div className="mt-10 space-y-4 text-sm md:text-base text-[var(--muted)] leading-relaxed">
              {t.hero.identity.map((paragraph: string) => (
                <p key={paragraph} dir={locale === "ar" ? "rtl" : "ltr"}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {Array.isArray(t.hero.callout) && t.hero.callout.length > 0 && (
        <section id="callout" className="py-20">
          <div className="container-page mx-auto flex max-w-5xl flex-col gap-6 text-[var(--fg)]">
            <div
              className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/40 bg-gradient-to-br from-black/85 via-black/75 to-[var(--accent)]/20 p-12 shadow-2xl backdrop-blur"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <div className={`flex flex-col gap-4 text-base md:text-xl text-white/90 ${textAlign}`}>
                    {t.hero.callout.map((line: string, index: number) => (
                      <div
                        key={line}
                        className="group flex items-start gap-4 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 transition duration-300 hover:border-[var(--accent)]/80 hover:bg-white/10"
                      >
                        <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[var(--accent)]/80 bg-black/70 text-sm font-semibold text-[var(--accent)]">
                          {index + 1}
                        </span>
                        <div className={`flex-1 leading-relaxed ${textAlign} flex flex-col gap-2`} dir={locale === "ar" ? "rtl" : "ltr"}>
                          {line
                            .split("\n")
                            .map((segment: string) => segment.trim())
                            .filter(Boolean)
                            .map((segment: string, segmentIndex: number) => (
                              <span key={`${line}-${segmentIndex}`} className="block">
                                {segment}
                              </span>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-none">
                  <Link href={`/${locale}/booking`} className="btn-primary whitespace-nowrap px-8 py-3">
                    {t.hero.calloutButton}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {t.hero.beliefsTitle && Array.isArray(t.hero.beliefs) && t.hero.beliefs.length > 0 && (
        <section id="beliefs" className="py-20">
          <div className="container-page mx-auto flex max-w-5xl flex-col gap-6 text-[var(--fg)]">
            <div className="rounded-3xl border border-[var(--accent)]/35 bg-black/70 p-12 shadow-2xl backdrop-blur">
              <div className="flex flex-col gap-8">
                <div className={`flex flex-col gap-3 ${textAlign}`}>
                  <span className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                    {locale === "ar" ? "Mindset Shift" : "Mindset Shift"}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl" dir={locale === "ar" ? "rtl" : "ltr"}>
                    {t.hero.beliefsTitle}
                  </h3>
                </div>

                <div className={`text-base md:text-lg text-[var(--muted)] leading-relaxed ${textAlign}`} dir={locale === "ar" ? "rtl" : "ltr"}>
                  {t.hero.beliefs.length === 1 ? (
                    <p>{t.hero.beliefs[0]}</p>
                  ) : (
                    <div className={`grid gap-4`}>
                      {t.hero.beliefs.map((point: string, index: number) => (
                        <div
                          key={point}
                          className="group relative rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 px-6 py-5 transition duration-300 hover:border-[var(--accent)] hover:bg-white/10"
                        >
                          <div className={`${beliefItemLayout} ${isRTL ? "pl-4" : "pr-4"}`}>
                            <span
                              className={`mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[var(--accent)]/70 bg-black/70 text-sm font-semibold text-[var(--accent)] ${
                                isRTL ? "order-2" : ""
                              }`}
                            >
                              {index + 1}
                            </span>
                            <p className={`flex-1 leading-relaxed ${textAlign}`} dir={locale === "ar" ? "rtl" : "ltr"}>
                              {point}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={locale === "ar" ? "self-start" : "self-start"}>
                  <Link href={`/${locale}/booking`} className="btn-primary px-7 py-3">
                    {t.hero.beliefsButton}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {t.hero.discovery?.title && (
        <DesireFormSection t={t.hero.discovery} locale={locale} textAlign={textAlign} />
      )}

      {t.hero.sessionDetails?.title && (
        <section id="session-details" className="py-20">
          <div className="container-page mx-auto flex max-w-5xl flex-col gap-8 text-[var(--fg)]">
            <div className="rounded-3xl border border-[var(--accent)]/40 bg-neutral-900/90 p-12 shadow-2xl backdrop-blur">
              <div className={`flex flex-col gap-6 ${textAlign}`} dir={locale === "ar" ? "rtl" : "ltr"}>
                <div className="flex flex-col gap-3">
                  <span className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
                    {locale === "ar" ? "Session Flow" : "Session Flow"}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white">{t.hero.sessionDetails.title}</h3>
                </div>
                <p className="text-base md:text-lg leading-relaxed text-[var(--muted)]">
                  {t.hero.sessionDetails.description}
                </p>
                <div className={locale === "ar" ? "self-start" : "self-start"}>
                  <Link href={`/${locale}/booking`} className="btn-primary px-7 py-3">
                    {t.hero.sessionDetails.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* paradigm section removed per request */}
    </>
  );
}
