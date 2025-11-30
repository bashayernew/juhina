import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("[CONTACT] Incoming request");
  
  try {
    const body = await req.json();
    console.log("[CONTACT] Body received", { 
      hasName: !!body.name, 
      hasEmail: !!body.email,
      hasMessage: !!body.message 
    });

    const name = body.name ?? "";
    const email = body.email ?? "";
    const phone = body.phone ?? "";
    const reason = body.reason ?? "";
    const message = body.message ?? "";

    const to =
      process.env.CONTACT_INBOX ||
      process.env.MAIL_TO ||
      process.env.SMTP_USER;

    console.log("[CONTACT] Email configuration check", {
      hasCONTACT_INBOX: !!process.env.CONTACT_INBOX,
      hasMAIL_TO: !!process.env.MAIL_TO,
      hasSMTP_USER: !!process.env.SMTP_USER,
      finalTo: to,
    });

    if (!to) {
      console.error("[CONTACT] No recipient email configured - missing CONTACT_INBOX, MAIL_TO, and SMTP_USER");
      return NextResponse.json(
        { ok: false, error: "Email recipient not configured" },
        { status: 500 }
      );
    }

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

    console.log("[CONTACT] Attempting to send email via SMTP");
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
      code: error?.code,
      stack: error?.stack,
      name: error?.name,
    });

    return NextResponse.json(
      { ok: false, error: "Failed to send contact email" },
      { status: 500 }
    );
  }
}
