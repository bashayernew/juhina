import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, reason, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields. Name, email, and message are required." 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid email format." 
        },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("[SEND] RESEND_API_KEY is not configured");
      return NextResponse.json(
        { 
          success: false, 
          error: "Email service not configured. Please contact the administrator." 
        },
        { status: 500 }
      );
    }

    // Prepare email content with exact template
    const htmlBody = `
      You received a new message from the website:<br/><br/>
      
      <b>Name:</b> ${name || "Not provided"} <br/>
      <b>Email:</b> ${email} <br/>
      <b>Phone:</b> ${phone || "Not provided"} <br/>
      <b>Reason:</b> ${reason || "Not provided"} <br/><br/>
      
      <b>Message:</b><br/>
      ${message.replace(/\n/g, "<br/>")}
    `;

    // Send email via Resend
    const result = await resend.emails.send({
      from: "contact@juhainah-alshawaf.com",
      to: "Janon.m@hotmail.com",
      subject: "New Contact Form Submission – Juhaina Website",
      html: htmlBody,
    });

    console.log("[SEND] Email sent successfully", result);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error: any) {
    // Full error handling
    console.error("[SEND] Error sending email:", {
      message: error?.message,
      code: (error as any)?.code,
      name: error?.name,
      stack: error?.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

