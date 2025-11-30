// coach-kw/src/app/api/send-email/route.ts
// Production-ready email sending API route for contact forms
// Uses environment variables for all credentials - no hardcoding

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Cache transporter instance
let transporter: Transporter | null = null;

/**
 * Get or create the SMTP transporter
 * All configuration from environment variables
 */
function getTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  // Get all credentials from environment variables
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Validate required environment variables
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    const missing = [];
    if (!smtpHost) missing.push("SMTP_HOST");
    if (!smtpPort) missing.push("SMTP_PORT");
    if (!smtpUser) missing.push("SMTP_USER");
    if (!smtpPass) missing.push("SMTP_PASS");
    
    console.error("[SEND-EMAIL] Missing SMTP configuration:", missing.join(", "));
    throw new Error(
      `Missing SMTP configuration. Please set the following environment variables in Vercel: ${missing.join(", ")}`
    );
  }

  // Validate and parse port
  const port = Number(smtpPort);
  if (isNaN(port) || port <= 0 || port > 65535) {
    console.error("[SEND-EMAIL] Invalid SMTP_PORT:", smtpPort);
    throw new Error(`Invalid SMTP_PORT: ${smtpPort}. Must be a valid port number (1-65535).`);
  }

  // Create transporter with environment variables
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  console.log("[SEND-EMAIL] SMTP transporter created successfully");
  return transporter;
}

/**
 * POST /api/send-email
 * Accepts: { name, email, phone, message }
 * Returns: { success: boolean, message?: string, error?: string }
 */
export async function POST(req: Request) {
  const startTime = Date.now();
  console.log("[SEND-EMAIL] ========== New email request ==========");
  
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log("[SEND-EMAIL] Request body received:", { 
        hasName: !!body.name, 
        hasEmail: !!body.email, 
        hasPhone: !!body.phone, 
        hasMessage: !!body.message 
      });
    } catch (parseError: any) {
      console.error("[SEND-EMAIL] Failed to parse request body:", parseError.message);
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid request format. Expected JSON with name, email, phone, and message fields." 
        },
        { status: 400 }
      );
    }

    // Extract and validate required fields
    const { name, email, phone, message } = body ?? {};

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      console.error("[SEND-EMAIL] Validation failed: name is required and must be non-empty string");
      return NextResponse.json(
        { success: false, error: "Name is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      console.error("[SEND-EMAIL] Validation failed: email is required and must be non-empty string");
      return NextResponse.json(
        { success: false, error: "Email is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      console.error("[SEND-EMAIL] Validation failed: invalid email format:", email);
      return NextResponse.json(
        { success: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      console.error("[SEND-EMAIL] Validation failed: message is required and must be non-empty string");
      return NextResponse.json(
        { success: false, error: "Message is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    // Phone is optional, but if provided, should be a string
    const phoneValue = phone && typeof phone === "string" ? phone.trim() : "";

    // Get environment variables
    const smtpFrom = process.env.SMTP_FROM;
    const mailTo = process.env.MAIL_TO;

    // Validate environment configuration
    if (!smtpFrom) {
      console.error("[SEND-EMAIL] Missing SMTP_FROM environment variable");
      return NextResponse.json(
        { 
          success: false, 
          error: "Server configuration error: SMTP_FROM is not configured. Please contact the administrator." 
        },
        { status: 500 }
      );
    }

    if (!mailTo) {
      console.error("[SEND-EMAIL] Missing MAIL_TO environment variable");
      return NextResponse.json(
        { 
          success: false, 
          error: "Server configuration error: MAIL_TO is not configured. Please contact the administrator." 
        },
        { status: 500 }
      );
    }

    // Get current timestamp for email
    const timeSent = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kuwait",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Prepare email content
    const subject = `New Website Message - ${name.trim()}`;
    
    // HTML email body
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Website Message</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f4f4f4;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background-color: #ffffff; 
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header { 
              background-color: #C8A24A; 
              color: #000000; 
              padding: 30px 20px; 
              text-align: center; 
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }
            .content { 
              background-color: #ffffff; 
              padding: 30px 20px; 
            }
            .field { 
              margin: 15px 0; 
              padding-bottom: 15px;
              border-bottom: 1px solid #eeeeee;
            }
            .field:last-of-type {
              border-bottom: none;
            }
            .label { 
              font-weight: bold; 
              color: #C8A24A; 
              display: block;
              margin-bottom: 5px;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value {
              color: #333333;
              font-size: 16px;
            }
            .message-box { 
              background-color: #f9f9f9; 
              padding: 20px; 
              border-left: 4px solid #C8A24A; 
              margin: 20px 0; 
              border-radius: 4px;
            }
            .message-box .label {
              margin-bottom: 10px;
            }
            .time-sent {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #eeeeee;
              font-size: 12px;
              color: #666666;
              text-align: center;
            }
            .footer {
              background-color: #f9f9f9;
              padding: 15px 20px;
              text-align: center;
              font-size: 12px;
              color: #666666;
              border-top: 1px solid #eeeeee;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Website Message</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name</span>
                <div class="value">${name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>
              <div class="field">
                <span class="label">Email</span>
                <div class="value"><a href="mailto:${email.trim()}" style="color: #C8A24A; text-decoration: none;">${email.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</a></div>
              </div>
              ${phoneValue ? `
              <div class="field">
                <span class="label">Phone</span>
                <div class="value">${phoneValue.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>
              ` : ''}
              <div class="message-box">
                <div class="label">Message</div>
                <div class="value">${message.trim().replace(/\n/g, "<br>").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
              </div>
              <div class="time-sent">
                <strong>Time Sent:</strong> ${timeSent}
              </div>
            </div>
            <div class="footer">
              This message was sent from the website contact form.
            </div>
          </div>
        </body>
      </html>
    `.trim();

    // Plain text email body
    const textContent = `
New Website Message

Name: ${name.trim()}
Email: ${email.trim()}
${phoneValue ? `Phone: ${phoneValue}\n` : ""}
Message:
${message.trim()}

Time Sent: ${timeSent}

---
This message was sent from the website contact form.
    `.trim();

    // Get transporter
    let emailTransporter: Transporter;
    try {
      emailTransporter = getTransporter();
    } catch (transporterError: any) {
      console.error("[SEND-EMAIL] Failed to create transporter:", transporterError.message);
      return NextResponse.json(
        { 
          success: false, 
          error: "Server configuration error: Email service is not properly configured." 
        },
        { status: 500 }
      );
    }

    // Prepare email options
    const mailOptions = {
      from: smtpFrom,
      to: mailTo,
      replyTo: email.trim(),
      subject: subject,
      text: textContent,
      html: htmlContent,
    };

    console.log("[SEND-EMAIL] Attempting to send email...");
    console.log("[SEND-EMAIL] From:", smtpFrom);
    console.log("[SEND-EMAIL] To:", mailTo);
    console.log("[SEND-EMAIL] Subject:", subject);

    // Send email
    const info = await emailTransporter.sendMail(mailOptions);

    const duration = Date.now() - startTime;
    console.log("[SEND-EMAIL] ✓ Email sent successfully!");
    console.log("[SEND-EMAIL] Message ID:", info.messageId);
    console.log("[SEND-EMAIL] Response:", info.response);
    console.log("[SEND-EMAIL] Duration:", duration, "ms");
    console.log("[SEND-EMAIL] ======================================");

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        messageId: info.messageId,
      },
      { status: 200 }
    );

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error("[SEND-EMAIL] ✗ Error sending email:");
    console.error("[SEND-EMAIL] Error type:", error.constructor.name);
    console.error("[SEND-EMAIL] Error message:", error.message);
    console.error("[SEND-EMAIL] Error stack:", error.stack);
    console.error("[SEND-EMAIL] Duration:", duration, "ms");
    console.error("[SEND-EMAIL] ======================================");

    // Determine error message
    let errorMessage = "Failed to send email. Please try again later.";
    let statusCode = 500;

    // Handle specific error types
    if (error.code === "EAUTH" || error.code === "ECONNECTION") {
      errorMessage = "Email authentication failed. Please check server configuration.";
      statusCode = 500;
    } else if (error.code === "ETIMEDOUT") {
      errorMessage = "Email service timeout. Please try again later.";
      statusCode = 503;
    } else if (error.message?.includes("535") || error.message?.includes("Authentication unsuccessful")) {
      errorMessage = "Email authentication failed. Please check server configuration.";
      statusCode = 500;
    }

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}

/**
 * GET /api/send-email
 * Returns method not allowed
 */
export async function GET() {
  console.log("[SEND-EMAIL] GET request received - method not allowed");
  return NextResponse.json(
    { 
      success: false, 
      error: "Method not allowed. Use POST to send emails." 
    },
    { status: 405 }
  );
}

