# Fix: Resend Error in Production

## Problem
You're seeing this error in production:
```
"You can only send testing emails to your own email address (life21545@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains..."
```

**This error is coming from the OLD code deployed on Vercel that still uses Resend.**

## Solution

### Step 1: Verify Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Make sure these are set correctly:

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=Janon.m@hotmail.com
SMTP_PASS=vewkxntegktyygcv
SMTP_FROM=CoachKW <Janon.m@hotmail.com>
MAIL_TO=Janon.m@hotmail.com
```

**Important:**
- Remove any `RESEND_API_KEY` environment variable if it exists
- Make sure all SMTP variables are set for **Production**, **Preview**, and **Development** environments

### Step 2: Deploy the Updated Code

The code is already updated and ready. You need to:

1. **Commit and push the changes:**
   ```bash
   cd coach-kw
   git add .
   git commit -m "Remove Resend, use Hotmail SMTP only"
   git push
   ```

2. **Vercel will auto-deploy** after the push

3. **Wait for deployment to complete** (check Vercel dashboard)

### Step 3: Verify Deployment

After deployment:

1. Check Vercel deployment logs to ensure no errors
2. Test the contact form again
3. The error should be gone and emails should send via Hotmail SMTP

## What Was Fixed

✅ **Removed Resend completely** from `package.json`
✅ **Updated mailer** to use only Hotmail SMTP (Nodemailer)
✅ **All routes use SMTP** (`/api/book` and `/api/contact`)
✅ **Environment variables** configured for Hotmail
✅ **Error messages cleaned** - no Resend errors will appear

## Current Code Status

- ✅ No Resend imports anywhere
- ✅ Uses Nodemailer with SMTP
- ✅ Uses Hotmail credentials (Janon.m@hotmail.com)
- ✅ App password: vewkxntegktyygcv
- ✅ All emails go to: Janon.m@hotmail.com

## If Error Persists After Deployment

1. **Check Vercel Logs:**
   - Dashboard → Deployments → Latest → Functions
   - Look for `[MAILER]` or `[CONTACT]` log entries
   - Check for any error messages

2. **Verify Environment Variables:**
   - Make sure SMTP_* variables are set correctly
   - No RESEND_API_KEY should exist

3. **Clear Cache:**
   - Vercel might cache old code
   - Try a new deployment or clear cache in Vercel settings

## Summary

The error you're seeing is from the **old deployed code**. Once you:
1. Push the updated code (no Resend)
2. Ensure environment variables are set in Vercel
3. Wait for deployment

Everything will work with Hotmail SMTP! 🚀

