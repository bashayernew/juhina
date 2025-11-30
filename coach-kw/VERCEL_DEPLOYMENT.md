# Vercel Deployment - Email Configuration

## Required Environment Variables

Add these environment variables in your Vercel project settings:

### SMTP Configuration (Hotmail/Outlook)

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=Janon.m@hotmail.com
SMTP_PASS=your-app-password-here
SMTP_FROM=CoachKW <Janon.m@hotmail.com>
MAIL_TO=Janon.m@hotmail.com
```

### How to Set Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: `SMTP_HOST`, **Value**: `smtp.office365.com`
   - **Name**: `SMTP_PORT`, **Value**: `587`
   - **Name**: `SMTP_USER`, **Value**: `Janon.m@hotmail.com`
   - **Name**: `SMTP_PASS`, **Value**: `[Your App Password]` (see below)
   - **Name**: `SMTP_FROM`, **Value**: `CoachKW <Janon.m@hotmail.com>`
   - **Name**: `MAIL_TO`, **Value**: `Janon.m@hotmail.com`
4. Select **Production**, **Preview**, and **Development** environments
5. Click **Save**

### Getting Microsoft App Password

**CRITICAL**: Microsoft requires an **App Password** (not your regular password).

1. Go to: https://account.microsoft.com/security
2. Sign in with `Janon.m@hotmail.com`
3. Enable **Two-Factor Authentication (2FA)** if not already enabled:
   - Go to "Security" → "Advanced security options"
   - Turn on "Two-step verification"
4. After enabling 2FA:
   - Go to "App passwords"
   - Click "Create a new app password"
   - Name it: "CoachKW Website"
   - Copy the generated 16-character password (no spaces)
5. Use this App Password as `SMTP_PASS` in Vercel

### Alternative: Using Gmail

If you prefer Gmail, use these settings:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=CoachKW <your-email@gmail.com>
MAIL_TO=Janon.m@hotmail.com
```

**Gmail App Password:**
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to "App passwords"
4. Create password for "Mail"
5. Use that 16-character password

---

## Testing After Deployment

1. **Deploy to Vercel** (push your changes)
2. **Test the contact form:**
   - Visit your deployed site
   - Go to `/en/contact` or `/ar/contact`
   - Fill out and submit the form
   - Check `Janon.m@hotmail.com` inbox

3. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → **Deployments** → Click on latest deployment
   - Go to **Functions** tab
   - Click on the function to see logs
   - Look for `[SEND-EMAIL]` log entries

---

## Troubleshooting

### Emails Not Sending

1. **Check Vercel Function Logs:**
   - Look for error messages starting with `[SEND-EMAIL]`
   - Common errors:
     - "Missing SMTP configuration" → Check all env vars are set
     - "Authentication failed" → Use App Password, not regular password
     - "Invalid SMTP_PORT" → Must be a number (587)

2. **Verify Environment Variables:**
   - Go to Vercel → Settings → Environment Variables
   - Ensure all 6 variables are set
   - Make sure they're enabled for Production environment

3. **Test Locally First:**
   - Create `.env.local` file with the same variables
   - Test with `npm run dev`
   - If it works locally, the issue is likely Vercel config

---

## Production-Ready Features

✅ All credentials use environment variables (no hardcoding)
✅ Full error handling and logging
✅ Proper JSON responses for frontend
✅ Email validation and sanitization
✅ HTML and plain text email formats
✅ Time sent included in email
✅ Reply-To header set to customer email
✅ Production-ready error messages

---

## API Endpoint

**POST** `/api/send-email`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",  // optional
  "message": "Hello, I would like to..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully.",
  "messageId": "..."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

