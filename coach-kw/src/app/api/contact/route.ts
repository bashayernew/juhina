// coach-kw/src/app/api/contact/route.ts
// Production-ready contact form email handler using SMTP (Nodemailer)
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  console.log("[CONTACT] incoming request");
  
  try {
    const body = await req.json();
    console.log("[CONTACT] incoming body", body);
    
    const { name, email, phone, reason, message } = body ?? {};

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      console.error("[CONTACT] Missing required field: name");
      return NextResponse.json({ ok: false, error: "Name is required and must be a non-empty string." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      console.error("[CONTACT] Missing required field: email");
      return NextResponse.json({ ok: false, error: "Email is required and must be a non-empty string." }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      console.error("[CONTACT] Invalid email format:", email);
      return NextResponse.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      console.error("[CONTACT] Missing required field: message");
      return NextResponse.json({ ok: false, error: "Message is required and must be a non-empty string." }, { status: 400 });
    }

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

    const subject = `New Website Message - ${name.trim()}`;
    
    const textContent = [
      `New contact message from website:`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone ? phone.trim() : "Not provided"}`,
      `Reason: ${reason ? reason.trim() : "Not provided"}`,
      ``,
      `Message:`,
      message.trim(),
      ``,
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n");

    console.log("[CONTACT] Attempting to send email via SMTP mailer");
    
    const result = await sendEmail({
      subject,
      text: textContent,
      html: htmlContent,
      replyTo: email.trim(),
    });

    if (!result.success) {
      console.error("[CONTACT] Failed to send email:", result.error);
      return NextResponse.json({ ok: false, error: "Failed to send contact email" }, { status: 500 });
    }

    console.log("[CONTACT] Email sent successfully", result.messageId);
    return NextResponse.json({ ok: true }, { status: 200 });
    
  } catch (error: any) {
    console.error("[CONTACT] Error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send contact form" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
