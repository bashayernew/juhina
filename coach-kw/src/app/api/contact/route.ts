import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  console.log("[CONTACT] Incoming request");
  
  try {
    const body = await req.json();
    console.log("[CONTACT] Body received", { 
      hasName: !!body.name, 
      hasEmail: !!body.email,
      hasMessage: !!body.message 
    });

    const { name, email, phone, reason, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[CONTACT] RESEND_API_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("[CONTACT] Attempting to send email via Resend");
    
    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: "Janon.m@hotmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Reason:</strong> ${reason || "Not provided"}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    console.log("[CONTACT] Contact email sent successfully via Resend");

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    // Log full error details for debugging
    console.error("[CONTACT] API error", {
      message: error?.message,
      code: (error as any)?.code,
      name: error?.name,
      stack: error?.stack,
    });

    return NextResponse.json(
      { success: false, error: error?.message || "Failed to send contact email" },
      { status: 500 }
    );
  }
}
