export const runtime = 'nodejs';
import { Buffer } from 'buffer';
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildICS } from "@/lib/ics";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, program, date, time, durationMins = 60, notes } = data || {};
    if (!name || !email || !phone || !program || !date || !time) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const start = new Date(`${date}T${time}:00+03:00`); // Kuwait time
    const end = new Date(start.getTime() + Number(durationMins) * 60000);

    const ics = buildICS({
      title: `${program} — ${name}`,
      description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes || '-'}`,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      organizerEmail: process.env.BOOKING_INBOX,
    });

    await resend.emails.send({
      from: (process.env.BOOKING_FROM as string) || "Bookings <onboarding@resend.dev>",
      to: process.env.BOOKING_INBOX as string,
      reply_to: email,
      subject: `New Booking Request: ${program} — ${name}`,
      text: `New booking request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}\nPreferred slot: ${date} ${time} (Kuwait)\nNotes: ${notes || '-'}\n\nClick the attached .ics to add to calendar and reply to confirm.`,
      attachments: [
        {
          filename: "booking.ics",
          content: Buffer.from(ics).toString("base64"),
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

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildICS } from "@/lib/ics";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, program, date, time, durationMins = 60, notes } = data || {};
    if (!name || !email || !phone || !program || !date || !time) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const start = new Date(`${date}T${time}:00+03:00`);
    const end = new Date(start.getTime() + Number(durationMins) * 60000);

    const ics = buildICS({
      title: `${program} — ${name}`,
      description: `Client: ${name}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes || '-'}`,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
      organizerEmail: process.env.BOOKING_INBOX,
    });

    await resend.emails.send({
      from: process.env.BOOKING_FROM || "Bookings <onboarding@resend.dev>",
      to: (process.env.BOOKING_INBOX as string) || "Janon.m@hotmail.com",
      reply_to: email,
      subject: `New Booking Request: ${program} — ${name}`,
      text: `New booking request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram: ${program}\nPreferred slot: ${date} ${time} (Kuwait)\nNotes: ${notes || '-'}\n\nClick the attached .ics to add to calendar and reply to confirm.`,
      attachments: [
        {
          filename: "booking.ics",
          content: Buffer.from(ics).toString("base64"),
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


