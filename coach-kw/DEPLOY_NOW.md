# 🚀 Deploy to Vercel - Quick Guide

## All Code is Ready! ✅

The production-ready email system has been implemented. Now you need to:

1. **Set Environment Variables in Vercel**
2. **Push to Deploy**

---

## Step 1: Set Environment Variables in Vercel

### Go to Vercel Dashboard:
1. Open https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these 6 variables:

```
Name: SMTP_HOST
Value: smtp.office365.com

Name: SMTP_PORT
Value: 587

Name: SMTP_USER
Value: Janon.m@hotmail.com

Name: SMTP_PASS
Value: [YOUR APP PASSWORD - see below]

Name: SMTP_FROM
Value: CoachKW <Janon.m@hotmail.com>

Name: MAIL_TO
Value: Janon.m@hotmail.com
```

### Get Microsoft App Password:
1. Go to: https://account.microsoft.com/security
2. Sign in with `Janon.m@hotmail.com`
3. Enable **Two-Factor Authentication** (if not already)
4. Go to **App passwords** → **Create new**
5. Name: "CoachKW Website"
6. Copy the 16-character password
7. Paste it as `SMTP_PASS` in Vercel

**IMPORTANT:** Select all environments (Production, Preview, Development) when adding variables!

---

## Step 2: Push to Deploy

Run these commands in your terminal:

```bash
# Navigate to the project
cd coach-kw

# Check what files changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add production-ready email sending system

- New /api/send-email endpoint
- Uses environment variables only (no hardcoding)
- Full error handling and validation
- User-visible success/error messages
- Ready for Vercel deployment"

# Push to deploy (Vercel will auto-deploy)
git push
```

---

## Step 3: Verify Deployment

After pushing:

1. **Wait for Vercel deployment to complete** (check Vercel dashboard)
2. **Test the contact form:**
   - Visit your deployed site
   - Go to `/en/contact` or `/ar/contact`
   - Fill out and submit the form
   - You should see a success message
3. **Check your email:**
   - Go to `Janon.m@hotmail.com` inbox
   - You should receive the email with all form details

---

## Troubleshooting

### If emails don't send:

1. **Check Vercel Logs:**
   - Dashboard → Deployments → Latest deployment
   - Go to **Functions** tab
   - Click on the function to see logs
   - Look for `[SEND-EMAIL]` messages

2. **Verify Environment Variables:**
   - Go to Settings → Environment Variables
   - Make sure all 6 variables are set
   - Ensure they're enabled for Production

3. **Check App Password:**
   - Must use App Password, NOT regular password
   - Ensure 2FA is enabled

---

## What Was Created

✅ **New API Route:** `/api/send-email`
   - File: `src/app/api/send-email/route.ts`
   - Production-ready, secure, fully validated

✅ **Updated Contact Form:**
   - File: `src/components/ContactForm.tsx`
   - Now uses new endpoint
   - Better validation and user feedback

✅ **Updated Mailer:**
   - File: `src/lib/mailer.ts`
   - Added SMTP_FROM support

✅ **Documentation:**
   - `VERCEL_DEPLOYMENT.md` - Full deployment guide
   - `IMPLEMENTATION_SUMMARY.md` - Technical details
   - `DEPLOY_NOW.md` - This file

---

## Ready to Deploy! 🎉

Everything is implemented and ready. Just:
1. Add environment variables in Vercel
2. Push your code
3. Test the contact form

**Good luck!** 🚀


