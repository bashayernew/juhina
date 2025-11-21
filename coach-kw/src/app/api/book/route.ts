// coach-kw/src/app/api/book/route.ts
export const runtime = "nodejs";

import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildICS } from "@/lib/ics";

export async function POST(req: Request) {
  console.log("[BOOKING] incoming request");
  
  try {
    const body = await req.json();
    console.log("[BOOKING] incoming body", body);
    
    const { name, email, phone, program, date, time, durationMins = 60, notes } = body ?? {};

    // Validate required fields
    if (!name || !email || !phone || !program || !date || !time) {
      console.error("[BOOKING] Missing required fields", { name: !!name, email: !!email, phone: !!phone, program: !!program, date: !!date, time: !!time });
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Set email addresses with fallbacks
    const toEmail = process.env.BOOKING_TO_EMAIL || process.env.BOOKING_INBOX || "Janon.m@hotmail.com";
    const fromEmail = process.env.FROM_EMAIL || process.env.BOOKING_FROM || "CoachKW <onboarding@resend.dev>";
    const resendApiKey = process.env.RESEND_API_KEY;
    
    console.log("[BOOKING] env check", { hasKey: !!resendApiKey, to: toEmail, from: fromEmail });
    
    if (!resendApiKey) {
      console.error("[BOOKING] Missing RESEND_API_KEY");
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
    }

    // Build Kuwait time start/end and create ICS
    const start = new Date(`${date}T${time}:00+03:00`);
    const end = new Date(start.getTime() + durationMins * 60000);

    const icsText = buildICS({
      title: `${program} — ${name}`,
      description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes || "-"}`,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      organizerEmail: toEmail,
    });

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

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Booking Request: ${program} — ${name}`,
      html: htmlContent,
      text: `
New booking request:

Name: ${name}
Email: ${email}
Phone: ${phone}
Program: ${program}
Preferred slot: ${date} ${time} (Asia/Kuwait)
Notes: ${notes || "-"}

• Click the attached .ics to add it to your calendar.
• Reply to confirm with the client.
      `.trim(),
      attachments: [
        {
          filename: "booking.ics",
          content: Buffer.from(icsText, "utf-8").toString("base64"),
          contentType: "text/calendar",
        },
      ],
    });

    console.log("[BOOKING] resend response", emailResult);

    if (emailResult.error) {
      console.error("[BOOKING] resend error", emailResult.error);
      return NextResponse.json({ ok: false, error: emailResult.error.message || "Failed to send email" }, { status: 500 });
    }

    const emailId = (emailResult.data as any)?.id || null;
    return NextResponse.json({ ok: true, emailId }, { status: 200 });
    
  } catch (error: any) {
    console.error("[BOOKING] resend error", error);
    return NextResponse.json({ ok: false, error: error?.message || "Failed to send booking request" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
