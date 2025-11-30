import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { Buffer } from "buffer";
import { buildICS } from "@/lib/ics";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
      process.env.SMTP_USER!;

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

    await sendEmail({
      to,
      subject,
      text,
      attachments,
    });

    console.log("[BOOKING] Booking email sent successfully");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[BOOKING] API error", {
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      { ok: false, error: "Failed to send booking email" },
      { status: 500 }
    );
  }
}
