# ⚠️ Immediate Action Required - Fix 500 Errors

## Current Situation

Your live site (`juhina-git-main-elhodhods-projects.vercel.app`) is returning 500 errors when forms are submitted. This means the deployed code is either:
1. **Old code** that still uses Resend (most likely)
2. **New code** but missing environment variables

---

## ✅ What I've Done

1. ✅ Rewrote all email routes to use SMTP only (no Resend)
2. ✅ Added comprehensive error logging to help debug
3. ✅ Added validation for environment variables
4. ✅ Enhanced error messages to identify the root cause

---

## 🚀 What You Need To Do NOW

### Step 1: Push the Updated Code to GitHub

The code has been updated locally but needs to be pushed:

```bash
cd coach-kw
git add .
git commit -m "Fix: Replace Resend with SMTP-only email sending with enhanced logging"
git push
```

### Step 2: Verify Vercel Environment Variables

Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

**Verify these are ALL set:**
- ✅ `SMTP_HOST` = `smtp.office365.com`
- ✅ `SMTP_PORT` = `587`
- ✅ `SMTP_USER` = `Janon.m@hotmail.com`
- ✅ `SMTP_PASS` = (your app password - make sure it's correct!)
- ✅ `SMTP_FROM` = `CoachKW <Janon.m@hotmail.com>`
- ✅ `MAIL_TO` = `Janon.m@hotmail.com`

**Make sure they're enabled for:**
- ✅ Production
- ✅ Preview  
- ✅ Development

### Step 3: Force Redeploy on Vercel

After pushing:
1. Go to **Vercel Dashboard** → **Deployments**
2. Find the latest deployment
3. Click **"..."** → **"Redeploy"**
4. Wait for deployment to complete

### Step 4: Check Vercel Function Logs

After redeploying, test a form submission, then:
1. Go to **Vercel Dashboard** → **Your Project** → **Functions** tab
2. Click on a recent `/api/book` or `/api/contact` invocation
3. Look for log messages with these prefixes:
   - `[MAILER]` - Mailer issues
   - `[CONTACT]` - Contact route issues
   - `[BOOKING]` - Booking route issues

**Look for these specific errors:**
- `[MAILER] Missing SMTP environment variables` → Missing env vars
- `[CONTACT] No recipient email configured` → Missing MAIL_TO
- `[MAILER] Failed to send email` → SMTP connection/auth issue

---

## 🔍 What the Logs Will Tell You

### If you see: `Missing SMTP environment variables`
→ **Solution:** Add missing environment variables in Vercel

### If you see: `No recipient email configured`
→ **Solution:** Set `MAIL_TO` environment variable in Vercel

### If you see: `Failed to send email` with error code
→ **Solution:** Check SMTP credentials (especially `SMTP_PASS` app password)

### If you see: `[CONTACT] Body received` but then an error
→ **Solution:** The issue is in email sending - check SMTP connection

---

## 📋 Quick Checklist

Before testing again:
- [ ] Code is pushed to GitHub
- [ ] Vercel shows new deployment (check deployment timestamp)
- [ ] All 6 required environment variables are set in Vercel
- [ ] Environment variables are enabled for Production
- [ ] Vercel deployment completed successfully
- [ ] Ready to test form submission

---

## 🎯 Expected Result After Fix

When everything is working:
- ✅ Forms return `{ ok: true }` with status 200
- ✅ Emails arrive at your Hotmail inbox
- ✅ Vercel logs show: `[MAILER] Email sent` and `[CONTACT]/[BOOKING] ... sent successfully`
- ✅ No more 500 errors

---

## 🆘 Still Getting Errors?

If you're still getting 500 errors after following all steps:

1. **Check Vercel Function Logs** - They will tell you exactly what's wrong
2. **Share the log output** - I can help debug based on the error messages
3. **Verify SMTP credentials** - Make sure the app password is correct
4. **Test SMTP connection** - You can test with a simple Node.js script

---

**Priority:** Push the code and check Vercel logs - they will tell us exactly what's wrong!


