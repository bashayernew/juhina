import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name ?? "";
    const email = body.email ?? "";
    const phone = body.phone ?? "";
    const reason = body.reason ?? "";
    const message = body.message ?? "";

    const to =
      process.env.CONTACT_INBOX ||
      process.env.MAIL_TO ||
      process.env.SMTP_USER!;

    const subject = `New contact form submission from ${name || "Unknown"}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Reason: ${reason}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await sendEmail({
      to,
      subject,
      text,
    });

    console.log("[CONTACT] Contact email sent successfully");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[CONTACT] API error", {
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      { ok: false, error: "Failed to send contact email" },
      { status: 500 }
    );
  }
}
