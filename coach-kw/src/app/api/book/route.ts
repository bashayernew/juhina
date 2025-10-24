// coach-kw/src/app/api/book/route.ts
export const runtime = "nodejs"; // ensure Node runtime (Buffer is available)

import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildICS } from "@/lib/ics";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as any;
    const {
      name,
      email,
      phone,
      program,
      date,            // "YYYY-MM-DD"
      time,            // "HH:MM" 24h
      durationMins = 60,
      notes,
    } = data ?? {};

    if (!(name && email && phone && program && date && time)) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Assume Kuwait time (+03:00) and convert to UTC ISO
    const start = new Date(`${date}T${time}:00+03:00`);
    const end = new Date(start.getTime() + durationMins * 60000);

    const icsText = buildICS({
      title: `${program} — ${name}`,
      description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes || "-"}`,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      organizerEmail: process.env.BOOKING_INBOX ?? "",
    });

    await resend.emails.send({
      from: process.env.BOOKING_FROM || "Bookings <onboarding@resend.dev>",
      to: process.env.BOOKING_INBOX ?? "",
      replyTo: email,
      subject: `New Booking Request: ${program} — ${name}`,
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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
