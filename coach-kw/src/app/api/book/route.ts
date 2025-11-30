import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { Buffer } from "buffer";
import { buildICS } from "@/lib/ics";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("[BOOKING] Incoming request");
  
  try {
    const body = await req.json();
    console.log("[BOOKING] Body received", { 
      hasName: !!body.name, 
      hasEmail: !!body.email,
      hasProgram: !!body.program,
      hasDate: !!body.date,
      hasTime: !!body.time 
    });

    const name = body.name ?? "";
    const email = body.email ?? "";
    const phone = body.phone ?? "";
    const program = body.program ?? "";
    const date = body.date ?? "";
    const time = body.time ?? "";
    const notes = body.notes ?? "";

    const to =
      process.env.BOOKING_INBOX ||
      process.env.BOOKING_TO_EMAIL ||
      process.env.MAIL_TO ||
      process.env.SMTP_USER;

    console.log("[BOOKING] Email configuration check", {
      hasBOOKING_INBOX: !!process.env.BOOKING_INBOX,
      hasBOOKING_TO_EMAIL: !!process.env.BOOKING_TO_EMAIL,
      hasMAIL_TO: !!process.env.MAIL_TO,
      hasSMTP_USER: !!process.env.SMTP_USER,
      finalTo: to,
    });

    if (!to) {
      console.error("[BOOKING] No recipient email configured - missing all booking email env vars");
      return NextResponse.json(
        { ok: false, error: "Email recipient not configured" },
        { status: 500 }
      );
    }

    const subject = `New booking: ${program || "Unknown program"} – ${name}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Program: ${program}`,
      `Date: ${date}`,
      `Time: ${time}`,
      "",
      "Notes:",
      notes,
    ].join("\n");

    // Build ICS calendar attachment if date and time are provided
    let attachments;
    if (date && time) {
      try {
        const durationMins = 60;
        const start = new Date(`${date}T${time}:00+03:00`);
        const end = new Date(start.getTime() + durationMins * 60000);
        const organizerEmail = to;
        
        const icsText = buildICS({
          title: `${program || "Consultation"} — ${name}`,
          description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes || "-"}`,
          startISO: start.toISOString(),
          endISO: end.toISOString(),
          organizerEmail: organizerEmail,
        });

        attachments = [
          {
            filename: "booking.ics",
            content: Buffer.from(icsText, "utf-8"),
            contentType: "text/calendar",
          },
        ];
      } catch (icsError: any) {
        console.error("[BOOKING] Failed to generate ICS", {
          error: icsError?.message,
        });
        // Continue without ICS attachment
      }
    }

    console.log("[BOOKING] Attempting to send email via SMTP");
    await sendEmail({
      to,
      subject,
      text,
      attachments,
    });

    console.log("[BOOKING] Booking email sent successfully");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    // Log full error details for debugging in Vercel logs
    console.error("[BOOKING] API error", {
      message: error?.message,
      code: (error as any)?.code,
      name: error?.name,
      stack: error?.stack,
    });

    // Return the actual error message (which now includes SMTP error details)
    // This allows the frontend and logs to see the real cause
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to send booking email" },
      { status: 500 }
    );
  }
}
