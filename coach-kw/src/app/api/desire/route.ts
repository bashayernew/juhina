// coach-kw/src/app/api/desire/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as any;
    const { desire, email, name } = data ?? {};

    if (!desire || desire.trim().length === 0) {
      return NextResponse.json({ ok: false, error: "Desire is required" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("Missing RESEND_API_KEY environment variable; desire email skipped.");
      return NextResponse.json({ ok: true, warning: "Email delivery skipped due to missing API key." });
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: process.env.DESIRE_FROM || process.env.BOOKING_FROM || "Desire Submission <onboarding@resend.dev>",
      to: process.env.DESIRE_INBOX || process.env.BOOKING_INBOX || "life21545@gmail.com",
      replyTo: email || undefined,
      subject: `New Desire Submission${name ? ` — ${name}` : ""}`,
      text: `
New desire submission:

${name ? `Name: ${name}\n` : ""}${email ? `Email: ${email}\n` : ""}
Desire:
${desire}

---
This was submitted from the discovery section on the website.
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


