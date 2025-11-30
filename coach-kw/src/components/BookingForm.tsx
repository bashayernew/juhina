'use client'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ar } from 'date-fns/locale'

export default function BookingForm({ locale = 'en' }: { locale?: 'en' | 'ar' }) {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<boolean | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<Date | null>(null)
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Validate date and time are selected
    if (!selectedDate || !selectedTime) {
      setOk(false)
      return
    }
    
    const fd = new FormData(e.currentTarget)
    
    // Format date and time for API
    const dateStr = selectedDate.toISOString().split('T')[0] // YYYY-MM-DD
    const timeStr = selectedTime.toTimeString().split(' ')[0].slice(0, 5) // HH:MM
    
    // Collect all form fields
    const payload = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      program: fd.get('program') as string || 'Consultation',
      date: dateStr,
      time: timeStr,
      notes: fd.get('notes') as string || '',
    }
    
    console.log('📤 Frontend: Submitting booking form', payload)
    
    setLoading(true)
    setOk(null)
    
    try {
      // Use relative URL - works in both dev and production
      const apiUrl = '/api/book'
      console.log('📤 Frontend: POSTing to', apiUrl)
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()
      console.log('📥 Frontend: API response status', res.status)
      console.log('📥 Frontend: API response data', data)
      
      if (res.ok && data.ok) {
        console.log('✅ Frontend: Booking submitted successfully')
        setOk(true)
        // Reset form
        ;(e.target as HTMLFormElement).reset()
        setSelectedDate(null)
        setSelectedTime(null)
      } else {
        console.error('❌ Frontend: Booking failed', data.error || data.message)
        setOk(false)
      }
    } catch (error: any) {
      console.error('❌ Frontend: Network error', error)
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
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-[var(--muted)] mb-2">{t('Date','التاريخ')}</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText={t('dd/mm/yyyy', 'dd/mm/yyyy')}
            required
            className="w-full rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 text-white focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            wrapperClassName="w-full"
            calendarClassName="!bg-black !border-[var(--card-border)]"
            dayClassName={(date) => "!text-white hover:!bg-[var(--accent)]"}
            popperClassName="!z-50"
            locale={locale === 'ar' ? ar : undefined}
          />
        </div>
        <div>
          <label className="block text-sm text-[var(--muted)] mb-2">{t('Time','الوقت')}</label>
          <DatePicker
            selected={selectedTime}
            onChange={(date: Date | null) => setSelectedTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="HH:mm"
            timeCaption={t('Time', 'الوقت')}
            placeholderText={t('--:--', '--:--')}
            required
            className="w-full rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3 text-white focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            wrapperClassName="w-full"
            calendarClassName="!bg-black !border-[var(--card-border)]"
            popperClassName="!z-50"
          />
        </div>
      </div>
      <textarea name="notes" placeholder={t('Notes (optional)','ملاحظات (اختياري)')} rows={4} className="w-full rounded-md border border-[var(--card-border)] bg-transparent px-4 py-3" />
      <div className="flex gap-3 items-center">
        <button className="btn-primary" disabled={loading}>
          {loading ? t('Sending…','جارٍ الإرسال…') : t('Send Request','إرسال الطلب')}
        </button>
      </div>
      {ok === true && (
        <div className="rounded-md p-3" style={{ backgroundColor: 'rgba(200, 162, 74, 0.1)', border: '1px solid var(--accent)' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
            {locale === 'ar' ? 'تم إرسال طلب الحجز بنجاح. سنقوم بالتواصل معك قريبًا!' : '✓ Booking request sent successfully. We will contact you soon!'}
          </p>
        </div>
      )}
      {ok === false && (
        <div className="rounded-md p-3" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
          <p className="text-sm font-medium" style={{ color: '#ef4444' }}>
            {locale === 'ar' ? 'حدث خطأ، حاول مرة أخرى.' : '✗ Something went wrong. Please try again.'}
          </p>
        </div>
      )}
      <p className="text-xs text-[var(--muted)]">{t(
        'Requests are emailed to our inbox. You will receive a calendar invite once confirmed.',
        'يتم إرسال الطلب إلى بريدنا الإلكتروني وستتلقى دعوة تقويم عند التأكيد.'
      )}</p>
    </form>
  )
}
