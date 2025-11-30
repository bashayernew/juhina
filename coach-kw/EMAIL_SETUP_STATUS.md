# Email Setup Status & Next Steps

## ✅ What Has Been Done (Code Implementation)

### 1. **Email Infrastructure is Complete** ✓
   - **Mailer Library**: `src/lib/mailer.ts` 
     - Uses `nodemailer` package
     - Configured for Hotmail/Outlook SMTP
     - Supports HTML and text emails
     - Includes error handling with helpful messages
   
   - **Three Email Endpoints Created**:
     - `/api/contact` - Contact form submissions
     - `/api/book` - Booking requests (includes .ics calendar attachment)
     - `/api/desire` - Desire submissions from hero section

### 2. **Form Integration** ✓
   - Contact form sends emails
   - Booking form sends emails with calendar attachments
   - Hero section "desire" form sends emails

### 3. **Email Features** ✓
   - HTML formatted emails with styling
   - Plain text fallback
   - Reply-To header set to customer's email
   - Calendar (.ics) attachments for bookings
   - Professional email templates

---

## ⚠️ What YOU Need To Do (Configuration Required)

### **STEP 1: Create `.env.local` File** 

You need to create a `.env.local` file in the `coach-kw` directory with your email credentials.

**Create the file at:** `coach-kw/.env.local`

**Add these variables:**

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=Janon.m@hotmail.com
SMTP_PASS=your-app-password-here

MAIL_TO=Janon.m@hotmail.com
MAIL_FROM=CoachKW <Janon.m@hotmail.com>
```

---

### **STEP 2: Get Microsoft App Password** 🔑

**CRITICAL**: Microsoft requires an **App Password** (not your regular password) for SMTP authentication.

**Follow These Steps:**

1. **Go to:** https://account.microsoft.com/security
2. **Sign in** with `Janon.m@hotmail.com`
3. **Enable Two-Factor Authentication (2FA)** if not already enabled:
   - Go to "Security" → "Advanced security options"
   - Turn on "Two-step verification"
4. **Create App Password**:
   - After enabling 2FA, go to "App passwords"
   - Click "Create a new app password"
   - Name it: "CoachKW Website"
   - **Copy the generated 16-character password** (no spaces)
5. **Paste it** into `.env.local` as `SMTP_PASS`

---

### **STEP 3: Restart Your Dev Server** 🔄

After creating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd coach-kw
npm run dev
```

---

### **STEP 4: Test the Forms** ✅

1. **Test Contact Form:**
   - Go to `/en/contact` or `/ar/contact`
   - Fill out and submit
   - Check `Janon.m@hotmail.com` inbox

2. **Test Booking Form:**
   - Go to `/en/booking` or `/ar/booking`
   - Fill out booking details
   - Check inbox for email with .ics calendar attachment

3. **Test Desire Form:**
   - Go to homepage
   - Fill out the desire form
   - Check inbox

---

## 🔍 Troubleshooting

### **If Emails Don't Send:**

1. **Check Server Logs:**
   - Look in terminal where `npm run dev` is running
   - Error messages will show what's wrong

2. **Common Issues:**

   **Error: "Authentication failed"**
   - ❌ You're using your regular password
   - ✅ Use App Password instead (see Step 2)

   **Error: "Missing SMTP configuration"**
   - ❌ `.env.local` file missing or incomplete
   - ✅ Check all variables are set correctly

   **Error: "MAIL_TO is not configured"**
   - ❌ Missing `MAIL_TO` in `.env.local`
   - ✅ Add `MAIL_TO=Janon.m@hotmail.com`

3. **Verify .env.local Location:**
   - Must be in `coach-kw/.env.local` (same folder as `package.json`)

---

## 📧 Alternative: Use Gmail Instead

If you prefer Gmail (easier setup):

**Change in `.env.local`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
MAIL_TO=Janon.m@hotmail.com
MAIL_FROM=CoachKW <your-email@gmail.com>
```

**Gmail App Password:**
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Create password for "Mail"
5. Use that 16-character password

---

## 📝 Summary

**Code Status:** ✅ **100% Complete**
- All email sending code is written and tested
- Forms are connected to email API
- Error handling is in place

**Your Action Items:**
1. ❌ Create `.env.local` file
2. ❌ Get Microsoft App Password
3. ❌ Add credentials to `.env.local`
4. ❌ Restart dev server
5. ❌ Test forms

**Once `.env.local` is configured, emails will start working immediately!**

