Coach KW — Bilingual Coaching Site (EN/AR)
================================================

Tech stack
---------
- Next.js 14 App Router, TypeScript, Tailwind v4
- i18n with JSON dictionaries (`src/i18n/en.json`, `src/i18n/ar.json`)
- RTL/LTR toggle with persistence (localStorage + middleware cookie redirect)

Getting started
---------------
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Visit: `image.png
http://localhost:3000` (auto-redirects to `/en` or `/ar`)

Content & translations
----------------------
- Update UI strings in `src/i18n/*.json`.
- Pages live under `src/app/(en)/en/*` and `src/app/(ar)/ar/*`.

Brand & theme
-------------
- Colors: bg `#0B0F14`, text `#FFFFFF`, accent `#C8A24A`
- Fonts: Inter (UI), Playfair Display (headings), Cairo (Arabic)

Bookings (Zoho/Calendly)
------------------------
1. Replace the `src` of the iframe in:
   - `src/app/(en)/en/booking/page.tsx`
   - `src/app/(ar)/ar/booking/page.tsx`
2. Ensure timezone is set to Kuwait in your booking system.

Payments (MyFatoorah/Tap) — placeholders
----------------------------------------
- Add CTA buttons to program details and wire later.
- When ready, integrate SDKs:
  - MyFatoorah: see docs (`https://myfatoorah.readme.io/`)
  - Tap: see docs (`https://tap.company/developers`)

Analytics (optional)
--------------------
- Add GA snippet/Meta Pixel in `src/app/layout.tsx` or via Tag Manager.

SEO & Schema
------------
- Edit `metadata` in `src/app/layout.tsx`.
- Update `src/app/sitemap.ts` and `src/app/robots.ts` with your domain.
- Use `<JsonLd />` from `src/components/SEO.tsx` for Person/Product/FAQ/Review schemas.

WhatsApp
--------
- Edit phone in `src/components/WhatsAppFAB.tsx` (E.164 format).

Email Forms (SMTP)
------------------
The site uses SMTP via nodemailer to send form submissions. All forms send emails to `Janon.m@hotmail.com`.

**Required Environment Variables:**

Create a `.env.local` file in the `coach-kw` directory with:

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=Janon.m@hotmail.com
SMTP_PASS=your-app-password-here

MAIL_TO=Janon.m@hotmail.com
MAIL_FROM=CoachKW <Janon.m@hotmail.com>
```

**Setup Instructions for Hotmail/Outlook:**

**IMPORTANT:** Microsoft has disabled basic authentication. You MUST use an **App Password** instead of your regular password.

**How to Get an App Password:**

1. Go to https://account.microsoft.com/security
2. Sign in with your Hotmail account (`Janon.m@hotmail.com`)
3. Enable **Two-Factor Authentication (2FA)** if not already enabled:
   - Go to "Security" → "Advanced security options"
   - Turn on "Two-step verification"
4. After enabling 2FA, go to "App passwords":
   - Click "Create a new app password"
   - Name it: "CoachKW Website"
   - Copy the generated password (16 characters, no spaces)
5. Use this App Password as `SMTP_PASS` in `.env.local`

**Alternative: If App Passwords Are Not Available**

If you can't enable 2FA or App Passwords aren't available, you have two options:

**Option A: Use Gmail to Send (Easier)**
- Change `SMTP_HOST` to `smtp.gmail.com`
- Use a Gmail account with an App Password
- Still sends to `Janon.m@hotmail.com` as recipient

**Option B: Use OAuth2 (Complex)**
- Requires Azure app registration
- See Microsoft OAuth2 documentation

**After Setup:**
1. Save `.env.local` with your App Password
2. Restart your dev server: `npm run dev`
3. Test the forms - emails should send successfully

Deploy
------
- Set `NEXT_PUBLIC_SITE_URL` or update hardcoded base in `sitemap.ts` and `robots.ts`.
- Configure SMTP environment variables (see Email Forms section above).
- Deploy to Vercel/AWS/etc.
