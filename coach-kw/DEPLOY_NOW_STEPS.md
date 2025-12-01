# 🚀 Deploy to Vercel - Step by Step Guide

## Quick Deploy Steps

### Step 1: Open Terminal/Git Bash in the `coach-kw` folder

Navigate to your project:
```bash
cd coach-kw
```

### Step 2: Check Git Status

```bash
git status
```

You should see modified files like:
- `src/lib/mailer.ts`
- `src/app/api/book/route.ts`
- `src/app/api/contact/route.ts`
- `package.json`
- etc.

### Step 3: Add All Changes

```bash
git add .
```

### Step 4: Commit Changes

```bash
git commit -m "Remove Resend, migrate to Hotmail SMTP only"
```

### Step 5: Push to Deploy

```bash
git push
```

This will push to your repository and **Vercel will automatically deploy**!

---

## Before Deploying: Verify Environment Variables in Vercel

**IMPORTANT:** Before the code works, make sure these are set in Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these are set:

```
✅ SMTP_HOST = smtp.office365.com
✅ SMTP_PORT = 587
✅ SMTP_USER = Janon.m@hotmail.com
✅ SMTP_PASS = vewkxntegktyygcv
✅ SMTP_FROM = CoachKW <Janon.m@hotmail.com>
✅ MAIL_TO = Janon.m@hotmail.com
```

5. **Remove** `RESEND_API_KEY` if it exists
6. Make sure all variables are enabled for **Production**, **Preview**, and **Development**

---

## After Pushing

1. **Check Vercel Dashboard:**
   - Go to your project on Vercel
   - You'll see a new deployment starting
   - Wait for it to complete (usually 1-2 minutes)

2. **Check Deployment Logs:**
   - Click on the deployment
   - Check for any errors
   - Look for build success message

3. **Test the Forms:**
   - Go to your website
   - Submit the contact form
   - Submit the booking form
   - Check `Janon.m@hotmail.com` inbox!

---

## Troubleshooting

### If git push fails:

**No remote repository?**
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

**Need to pull first?**
```bash
git pull
git push
```

**Different branch?**
```bash
git push origin <your-branch-name>
```

---

## What Will Happen

1. ✅ Code pushed to repository
2. ✅ Vercel detects the push
3. ✅ Vercel builds the project
4. ✅ Vercel deploys to production
5. ✅ Forms now use Hotmail SMTP (no Resend)
6. ✅ Emails go to `Janon.m@hotmail.com`

---

## Success Indicators

After deployment, you should see:
- ✅ Deployment status: "Ready" in Vercel
- ✅ No Resend errors when submitting forms
- ✅ Emails arriving in `Janon.m@hotmail.com` inbox
- ✅ Success messages on the website after form submission

---

**Ready to deploy?** Run the commands above! 🚀


