# 🔍 Debugging 500 Errors - Email Routes

## Current Issue

You're seeing 500 errors when submitting forms on the live site:
- `/api/book` returns `{ ok: false, error: "Failed to send booking email" }`
- `/api/contact` returns `{ ok: false, error: "Failed to send contact email" }`

## Most Likely Causes

### 1. New Code Not Deployed Yet ✅ MOST LIKELY
- The new SMTP-only code might not be pushed to GitHub
- Vercel is still running old code that uses Resend

**Solution:** Push the code and verify deployment

### 2. Missing Environment Variables in Vercel
The following environment variables MUST be set in Vercel:

**Required:**
- `SMTP_HOST` = `smtp.office365.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = `Janon.m@hotmail.com`
- `SMTP_PASS` = (your app password)
- `SMTP_FROM` = `CoachKW <Janon.m@hotmail.com>`
- `MAIL_TO` = `Janon.m@hotmail.com`

**Optional:**
- `CONTACT_INBOX` - Override for contact form
- `BOOKING_INBOX` or `BOOKING_TO_EMAIL` - Override for booking form
- `DESIRE_INBOX` - Override for desire form

**Solution:** Verify all required variables are set in Vercel dashboard

### 3. SMTP Connection Issue
- Wrong SMTP credentials
- Firewall blocking port 587
- App password not configured correctly

**Solution:** Test SMTP connection separately

---

## How to Debug

### Step 1: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → Functions tab
2. Look for recent invocations of `/api/book` or `/api/contact`
3. Check the logs for error messages with these prefixes:
   - `[MAILER]` - Mailer configuration/connection issues
   - `[CONTACT]` - Contact route errors
   - `[BOOKING]` - Booking route errors
   - `[DESIRE]` - Desire route errors

**Look for:**
- `[MAILER] Missing SMTP environment variables` - Missing env vars
- `[CONTACT] No recipient email configured` - Missing MAIL_TO
- `[MAILER] Failed to send email` - SMTP connection/auth error

### Step 2: Verify Environment Variables

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Verify all required variables are set
3. Check that they're enabled for Production, Preview, and Development
4. If any are missing, add them and redeploy

### Step 3: Check Git Status

Run locally:
```bash
cd coach-kw
git status
```

If there are uncommitted changes:
```bash
git add .
git commit -m "Fix: Replace Resend with SMTP-only email sending"
git push
```

### Step 4: Force Vercel Redeploy

After pushing:
1. Go to Vercel Dashboard → Deployments
2. Find the latest deployment
3. Click "..." → "Redeploy"
4. Wait for deployment to complete

---

## Enhanced Logging Added

The code now includes detailed logging that will help identify the issue:

- Configuration checks for all environment variables
- Email recipient validation
- SMTP connection attempts
- Detailed error messages with error codes

All logs will appear in Vercel Function Logs with the appropriate prefixes.

---

## Quick Fix Checklist

- [ ] Verify code is pushed to GitHub
- [ ] Check Vercel deployment status (should show latest commit)
- [ ] Verify all required environment variables are set in Vercel
- [ ] Check Vercel Function Logs for detailed error messages
- [ ] Force redeploy if needed
- [ ] Test form submission again

---

## Expected Behavior After Fix

When working correctly:
- Forms return `{ ok: true }` with status 200
- Emails arrive at `MAIL_TO` inbox (or route-specific inbox)
- Vercel logs show `[MAILER] Email sent` and `[CONTACT]/[BOOKING] ... sent successfully`

---

**Next Steps:** Push the code, check Vercel logs, and verify environment variables.

