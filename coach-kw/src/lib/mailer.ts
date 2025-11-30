// coach-kw/src/lib/mailer.ts
// Production-ready SMTP mailer using Nodemailer for Outlook/Hotmail
// 
// How it works:
// - Reads SMTP configuration from environment variables at module load
// - Creates a singleton transporter with Outlook/Hotmail SMTP settings
// - sendEmail() validates config, sends via transporter, and bubbles up real SMTP errors
//
// Environment variables required:
// - SMTP_HOST (e.g., smtp.office365.com)
// - SMTP_PORT (e.g., 587)
// - SMTP_USER (email address for authentication)
// - SMTP_PASS (app password)
// - SMTP_FROM (sender address, defaults to SMTP_USER if not set)

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Read environment variables (validated at runtime to avoid build-time errors)
const host = process.env.SMTP_HOST;
const portRaw = process.env.SMTP_PORT || "587";
const port = Number(portRaw);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || user;

// Singleton transporter - created once and reused
let transporter: Transporter | null = null;

/**
 * Get or create the SMTP transporter for Outlook/Hotmail
 * Uses environment variables validated at module load
 */
function getTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  // Validate all required environment variables
  if (!host || isNaN(port) || port <= 0 || !user || !pass || !from) {
    console.error("[MAILER] Missing SMTP environment variables", {
      hasHost: !!host,
      hasPort: !!port && !isNaN(port) && port > 0,
      portValue: portRaw,
      hasUser: !!user,
      hasPass: !!pass,
      hasFrom: !!from,
    });
    throw new Error("MAILER_CONFIG_ERROR: Missing required SMTP environment variables");
  }

  // Create transporter with Outlook/Hotmail SMTP settings
  // secure: false means STARTTLS will be used on port 587
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // STARTTLS on port 587 (use true for port 465)
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export interface BaseEmailPayload {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

/**
 * Send an email using Outlook/Hotmail SMTP
 * 
 * This function:
 * 1. Validates that all required env vars are present
 * 2. Gets or creates the transporter
 * 3. Sends the email via transporter.sendMail()
 * 4. On error, logs detailed error info and throws an error with the real SMTP error details
 * 
 * @param payload Email payload with to, subject, text, optional html and attachments
 * @returns Nodemailer sendMail result with messageId
 * @throws Error with detailed SMTP error information (not generic "Failed to send email")
 */
export async function sendEmail(payload: BaseEmailPayload) {
  // Validate configuration at runtime
  if (!host || isNaN(port) || port <= 0 || !user || !pass || !from) {
    console.error("[MAILER] Missing SMTP environment variables", {
      hasHost: !!host,
      hasPort: !!port && !isNaN(port) && port > 0,
      portValue: portRaw,
      hasUser: !!user,
      hasPass: !!pass,
      hasFrom: !!from,
    });
    throw new Error("MAILER_CONFIG_ERROR: Missing required SMTP environment variables");
  }

  const transporter = getTransporter();

  try {
    const info = await transporter.sendMail({
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html ?? `<p>${payload.text}</p>`,
      attachments: payload.attachments,
    });

    console.log("[MAILER] Email sent successfully", {
      messageId: info.messageId,
      to: payload.to,
      subject: payload.subject,
    });

    return info;
  } catch (error: any) {
    // Log detailed error information for debugging
    console.error("[MAILER] Failed to send email", {
      errorMessage: error?.message,
      code: error?.code,
      name: error?.name,
      response: error?.response,
      responseCode: error?.responseCode,
      command: error?.command,
      stack: error?.stack,
    });

    // Extract error details and create a descriptive error message
    const code = error?.code || error?.responseCode;
    const msg = error?.message || "Unknown mailer error";
    
    // Throw error with preserved SMTP error details
    // Format: SMTP_ERROR[CODE]: message or SMTP_ERROR: message
    const errorMessage = code 
      ? `SMTP_ERROR[${code}]: ${msg}`
      : `SMTP_ERROR: ${msg}`;
    
    throw new Error(errorMessage);
  }
}
