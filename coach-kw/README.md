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
3. Visit: `http://localhost:3000` (auto-redirects to `/en` or `/ar`)

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

Deploy
------
- Set `NEXT_PUBLIC_SITE_URL` or update hardcoded base in `sitemap.ts` and `robots.ts`.
- Deploy to Vercel/AWS/etc.
