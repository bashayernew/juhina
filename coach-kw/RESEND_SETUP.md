# Resend Email Setup Instructions

## ✅ Implementation Complete

The contact form now uses Resend API to send emails directly to **Janon.m@hotmail.com**.

## 🔑 Setup Steps

1. **Get your Resend API Key:**
   - Go to https://resend.com
   - Sign up for a free account (no credit card required)
   - Navigate to API Keys section
   - Create a new API key

2. **Add API Key to Environment Variables:**
   - Create a `.env.local` file in the `coach-kw` directory
   - Add the following line:
     ```
     RESEND_API_KEY=re_your_actual_api_key_here
     ```
   - Replace `re_your_actual_api_key_here` with your actual Resend API key

3. **For Production (Vercel/Netlify/etc):**
   - Add `RESEND_API_KEY` to your hosting platform's environment variables
   - Use the same value from your `.env.local` file

## 📧 Email Configuration

- **Recipient:** Janon.m@hotmail.com (hardcoded in the API route)
- **From Address:** contact@juhainah-alshawaf.com
- **Subject:** "New Contact Form Submission – Juhaina Website"
- **API Endpoint:** `/api/send`

To change the recipient email, edit: `src/app/api/send/route.ts`

## ✅ Testing

1. Start your development server: `npm run dev`
2. Navigate to the contact form page
3. Fill out and submit the form
4. Check:
   - Success message appears on the website
   - Email appears in Resend dashboard under "Sending"
   - Email is delivered to Janon.m@hotmail.com

## 📝 Form Fields

The contact form collects:
- **Name** (required)
- **Email** (required, validated)
- **Phone** (optional)
- **Reason** (optional)
- **Message** (required)

All fields are validated before sending.

