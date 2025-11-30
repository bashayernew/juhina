import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const desire = body.desire ?? "";
    const email = body.email ?? "";
    const name = body.name ?? "";

    const to =
      process.env.DESIRE_INBOX ||
      process.env.MAIL_TO ||
      process.env.SMTP_USER;

    if (!to) {
      console.error("[DESIRE] No recipient email configured");
      return NextResponse.json(
        { ok: false, error: "Email recipient not configured" },
        { status: 500 }
      );
    }

    const subject = `New desire submission${name ? ` from ${name}` : ""}`;

    const text = [
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      "",
      "Desire:",
      desire,
      "",
      "---",
      "This was submitted from the discovery section on the website.",
    ]
      .filter(Boolean)
      .join("\n");

    await sendEmail({
      to,
      subject,
      text,
    });

    console.log("[DESIRE] Desire email sent successfully");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("[DESIRE] API error", {
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      { ok: false, error: "Failed to send desire submission" },
      { status: 500 }
    );
  }
}
