// coach-kw/src/app/api/book/route.ts
// Production-ready booking form email handler using SMTP (Nodemailer)
export const runtime = "nodejs";

import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { buildICS } from "@/lib/ics";

export async function POST(req: Request) {
  console.log("[BOOKING] incoming request");
  
  try {
    const body = await req.json();
    console.log("[BOOKING] incoming body", body);
    
    const { name, email, phone, program, date, time, durationMins = 60, notes } = body ?? {};

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      console.error("[BOOKING] Missing required field: name");
      return NextResponse.json({ ok: false, error: "Name is required and must be a non-empty string." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      console.error("[BOOKING] Missing required field: email");
      return NextResponse.json({ ok: false, error: "Email is required and must be a non-empty string." }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      console.error("[BOOKING] Invalid email format:", email);
      return NextResponse.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }

    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      console.error("[BOOKING] Missing required field: phone");
      return NextResponse.json({ ok: false, error: "Phone is required and must be a non-empty string." }, { status: 400 });
    }

    if (!program || typeof program !== "string" || program.trim().length === 0) {
      console.error("[BOOKING] Missing required field: program");
      return NextResponse.json({ ok: false, error: "Program is required and must be a non-empty string." }, { status: 400 });
    }

    if (!date || typeof date !== "string" || date.trim().length === 0) {
      console.error("[BOOKING] Missing required field: date");
      return NextResponse.json({ ok: false, error: "Date is required and must be a non-empty string." }, { status: 400 });
    }

    if (!time || typeof time !== "string" || time.trim().length === 0) {
      console.error("[BOOKING] Missing required field: time");
      return NextResponse.json({ ok: false, error: "Time is required and must be a non-empty string." }, { status: 400 });
    }

    // Build Kuwait time start/end and create ICS
    // Note: All emails are sent to MAIL_TO (configured in .env.local via mailer utility)
    const start = new Date(`${date}T${time}:00+03:00`);
    const end = new Date(start.getTime() + durationMins * 60000);

    const mailTo = process.env.MAIL_TO;
    if (!mailTo) {
      return NextResponse.json({ ok: false, error: "MAIL_TO is not configured" }, { status: 500 });
    }
    const icsText = buildICS({
      title: `${program} — ${name}`,
      description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes || "-"}`,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      organizerEmail: mailTo,
    });

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
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Request</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <span class="label">Phone:</span> ${phone}
              </div>
              <div class="field">
                <span class="label">Program:</span> ${program}
              </div>
              <div class="field">
                <span class="label">Preferred Date & Time:</span> ${date} at ${time} (Asia/Kuwait timezone)
              </div>
              ${notes ? `<div class="field"><span class="label">Notes:</span> ${notes.replace(/\n/g, '<br>')}</div>` : ''}
              <div class="footer">
                <p>• Click the attached .ics file to add this booking to your calendar.</p>
                <p>• Reply directly to this email to confirm with the client.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const subject = `New Booking Request - ${name.trim()}`;
    
    const textContent = [
      `New booking request from website:`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Program: ${program.trim()}`,
      `Date: ${date.trim()}`,
      `Time: ${time.trim() || "Not specified"} (Asia/Kuwait timezone)`,
      ``,
      `Message:`,
      notes ? notes.trim() : "No additional message.",
      ``,
      `Submitted at: ${new Date().toISOString()}`,
      ``,
      `• Click the attached .ics file to add this booking to your calendar.`,
      `• Reply directly to this email to confirm with the client.`,
    ].join("\n");

    console.log("[BOOKING] Attempting to send email via SMTP mailer");
    
    const result = await sendEmail({
      subject,
      text: textContent,
      html: htmlContent,
      replyTo: email.trim(),
      attachments: [
        {
          filename: "booking.ics",
          content: Buffer.from(icsText, "utf-8"),
          contentType: "text/calendar",
        },
      ],
    });

    if (!result.success) {
      console.error("[BOOKING] Failed to send email:", result.error);
      return NextResponse.json({ ok: false, error: "Failed to send booking email" }, { status: 500 });
    }

    console.log("[BOOKING] Email sent successfully", result.messageId);
    return NextResponse.json({ ok: true }, { status: 200 });
    
  } catch (error: any) {
    console.error("[BOOKING] Error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send booking request" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
