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
      console.error("[DESIRE] No recipient email configured - missing DESIRE_INBOX, MAIL_TO, and SMTP_USER");
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

    console.log("[DESIRE] Attempting to send email via SMTP");
    await sendEmail({
      to,
      subject,
      text,
    });

    console.log("[DESIRE] Desire email sent successfully");

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    // Log full error details for debugging in Vercel logs
    console.error("[DESIRE] API error", {
      message: error?.message,
      code: (error as any)?.code,
      name: error?.name,
      stack: error?.stack,
    });

    // Return the actual error message (which now includes SMTP error details)
    // This allows the frontend and logs to see the real cause
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to send desire submission" },
      { status: 500 }
    );
  }
}
