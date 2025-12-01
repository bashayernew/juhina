# ✅ Ready to Commit - Email System Fix

## Commit Message

```
Fix: Replace Resend with SMTP-only email sending

- Rewrite mailer to use Nodemailer with SMTP (Outlook/Hotmail)
- Update /api/contact to use sendEmail() with CONTACT_INBOX support
- Update /api/book to use sendEmail() with BOOKING_INBOX support and ICS attachments
- Update /api/desire to use sendEmail() with DESIRE_INBOX support
- Remove all Resend dependencies and runtime usage
- Add proper error handling and logging with [MAILER], [CONTACT], [BOOKING], [DESIRE] prefixes
- All routes return { ok: true/false } JSON format for frontend compatibility
- Runtime set to 'nodejs' for all email routes

Uses environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, MAIL_TO
Optional overrides: CONTACT_INBOX, BOOKING_INBOX, DESIRE_INBOX
```

---

## Files Changed

### Modified:
1. **`src/lib/mailer.ts`**
   - Complete rewrite following exact specification
   - Singleton transporter pattern
   - Uses SMTP environment variables
   - Supports attachments (for ICS calendar files)
   - Proper error logging

2. **`src/app/api/contact/route.ts`**
   - Simplified to match specification
   - Uses `sendEmail()` from mailer
   - Supports `CONTACT_INBOX` env var override
   - Returns `{ ok: true/false }` format

3. **`src/app/api/book/route.ts`**
   - Simplified to match specification
   - Uses `sendEmail()` from mailer
   - Supports `BOOKING_INBOX` or `BOOKING_TO_EMAIL` env var override
   - Maintains ICS calendar attachment support
   - Returns `{ ok: true/false }` format

4. **`src/app/api/desire/route.ts`**
   - Simplified to match specification
   - Uses `sendEmail()` from mailer
   - Supports `DESIRE_INBOX` env var override
   - Returns `{ ok: true/false }` format

---

## Key Changes Summary

### Before:
- Used Resend API (causing errors in production)
- Complex error handling
- Multiple mailer functions
- Wrapper result structures

### After:
- Pure SMTP via Nodemailer
- Simple, clean implementation
- Single `sendEmail()` function
- Direct error throwing (caught by route handlers)
- Uses environment variables from Vercel

---

## Verification Checklist

✅ No Resend imports in TypeScript files
✅ All routes use `sendEmail()` from mailer
✅ All routes have `export const runtime = "nodejs"`
✅ TypeScript compilation passes
✅ All routes return `{ ok: true/false }` format
✅ Proper logging with route prefixes
✅ Error messages don't leak SMTP details
✅ Supports optional inbox overrides via env vars

---

## Environment Variables (Vercel)

**Required (already configured):**
- `SMTP_HOST` = `smtp.office365.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = `Janon.m@hotmail.com`
- `SMTP_PASS` = (app password)
- `SMTP_FROM` = `CoachKW <Janon.m@hotmail.com>`
- `MAIL_TO` = `Janon.m@hotmail.com`

**Optional (for route-specific inboxes):**
- `CONTACT_INBOX`
- `BOOKING_INBOX` or `BOOKING_TO_EMAIL`
- `DESIRE_INBOX`

---

## Testing After Deployment

1. Submit contact form → Should send to `CONTACT_INBOX || MAIL_TO`
2. Submit booking form → Should send to `BOOKING_INBOX || MAIL_TO` (with ICS attachment)
3. Submit desire form → Should send to `DESIRE_INBOX || MAIL_TO`
4. Check Vercel function logs for `[MAILER]`, `[CONTACT]`, `[BOOKING]`, `[DESIRE]` messages
5. Verify emails arrive at Hotmail inbox

---

**Status:** ✅ Ready to Commit and Deploy


