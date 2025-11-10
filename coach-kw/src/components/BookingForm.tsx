'use client'
import { useState } from 'react'

export default function BookingForm({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<boolean | null>(null)
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    setLoading(true)
    setOk(null)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const j = await res.json()
      setOk(j.ok)
      if (j.ok) (e.target as HTMLFormElement).reset()
    } catch {
      setOk(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder={t('Name','الاسم')} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
        <input type="email" name="email" required placeholder={t('Email','البريد الإلكتروني')} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
        <input name="phone" required placeholder={t('Phone','الهاتف')} className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
        <select name="program" required className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3">
          <option value="Consultation">{t('Book a Consultation','احجز استشارة')}</option>
        </select>
        <input type="date" name="date" required className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
        <input type="time" name="time" required className="rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
      </div>
      <textarea name="notes" placeholder={t('Notes (optional)','ملاحظات (اختياري)')} rows={4} className="w-full rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
      <div className="flex gap-3 items-center">
        <button className="btn-primary" disabled={loading}>
          {loading ? t('Sending…','جارٍ الإرسال…') : t('Send Request','إرسال الطلب')}
        </button>
      </div>
      {ok === true && <p className="text-sm" style={{ color: 'var(--accent)' }}>{t('Sent! We will confirm within 24 hours.','تم الإرسال! سنؤكد خلال 24 ساعة.')}</p>}
      {ok === false && <p className="text-sm" style={{ color: '#ef4444' }}>{t('Something went wrong. Please try again.','حدث خطأ. يرجى المحاولة مرة أخرى.')}</p>}
      <p className="text-xs text-[var(--muted)]">{t(
        'Requests are emailed to our inbox. You will receive a calendar invite once confirmed.',
        'يتم إرسال الطلب إلى بريدنا الإلكتروني وستتلقى دعوة تقويم عند التأكيد.'
      )}</p>
    </form>
  )
}
