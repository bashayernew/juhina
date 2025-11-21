// coach-kw/src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("[CONTACT] incoming request");
  
  try {
    const body = await req.json();
    console.log("[CONTACT] incoming body", body);
    
    const { name, email, phone, reason, message } = body ?? {};

    // Validate required fields
    if (!name || !email || !message) {
      console.error("[CONTACT] Missing required fields", { name: !!name, email: !!email, message: !!message });
      return NextResponse.json({ ok: false, error: "Name, email, and message are required" }, { status: 400 });
    }

    // Set email addresses with fallbacks
    const toEmail = process.env.BOOKING_TO_EMAIL || process.env.BOOKING_INBOX || "Janon.m@hotmail.com";
    const fromEmail = process.env.FROM_EMAIL || process.env.BOOKING_FROM || "CoachKW <onboarding@resend.dev>";
    const resendApiKey = process.env.RESEND_API_KEY;
    
    console.log("[CONTACT] env check", { hasKey: !!resendApiKey, to: toEmail, from: fromEmail });
    
    if (!resendApiKey) {
      console.error("[CONTACT] Missing RESEND_API_KEY");
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
    }

    // Send email via Resend
    const resend = new Resend(resendApiKey);
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C8A24A; color: #000; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #C8A24A; }
            .message-box { background-color: #fff; padding: 15px; border-left: 3px solid #C8A24A; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              ${phone ? `<div class="field"><span class="label">Phone:</span> ${phone}</div>` : ''}
              ${reason ? `<div class="field"><span class="label">Reason:</span> ${reason}</div>` : ''}
              <div class="message-box">
                <div class="label">Message:</div>
                <div>${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Submission${reason ? ` — ${reason}` : ""}`,
      html: htmlContent,
      text: `
New contact form submission:

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ""}${reason ? `Reason: ${reason}\n` : ""}
Message:
${message}

---
This was submitted from the contact form on the website.
      `.trim(),
    });

    console.log("[CONTACT] resend response", emailResult);

    return NextResponse.json({ ok: true, emailId: emailResult.id }, { status: 200 });
    
  } catch (error: any) {
    console.error("[CONTACT] resend error", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to send contact form" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
