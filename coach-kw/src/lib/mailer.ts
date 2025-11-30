// coach-kw/src/lib/mailer.ts
// Production-ready SMTP mailer using Nodemailer for Outlook/Hotmail
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

/**
 * Get or create the SMTP transporter for Hotmail/Outlook
 * Uses environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */
function getTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Validate required environment variables
  if (!host || !user || !pass) {
    console.error("[MAILER] Missing SMTP environment variables");
    const missing = [];
    if (!host) missing.push("SMTP_HOST");
    if (!process.env.SMTP_PORT) missing.push("SMTP_PORT");
    if (!user) missing.push("SMTP_USER");
    if (!pass) missing.push("SMTP_PASS");
    throw new Error(
      `Missing SMTP configuration. Please set the following environment variables: ${missing.join(", ")}`
    );
  }

  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid SMTP_PORT: ${process.env.SMTP_PORT}. Must be a valid port number (1-65535).`);
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export interface SendMailOptions {
  subject: string;
  text: string;
  html?: string;
  to?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

export interface SendMailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an email using Hotmail/Outlook SMTP
 * Uses environment variables: SMTP_FROM (default "from"), MAIL_TO (default "to")
 */
export async function sendEmail(options: SendMailOptions): Promise<SendMailResult> {
  const { subject, text, html, to, from, replyTo, attachments } = options;

  if (!subject || !text) {
    throw new Error("Subject and text are required to send email");
  }

  try {
    const fromDefault = process.env.SMTP_FROM || process.env.SMTP_USER || "CoachKW";
    const toDefault = process.env.MAIL_TO || process.env.SMTP_USER;

    if (!toDefault) {
      throw new Error("MAIL_TO environment variable is not configured");
    }

    const transporter = getTransporter();

    const mailOptions = {
      from: from || fromDefault,
      to: to || toDefault,
      replyTo: replyTo || undefined,
      subject,
      text,
      html: html ?? undefined,
      attachments: attachments || undefined,
    };

    console.log("[MAILER] Sending email via SMTP", {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject,
    });

    const result = await transporter.sendMail(mailOptions);

    console.log("[MAILER] Email sent", {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error: any) {
    console.error("[MAILER] Error:", error);

    // Clean error message - never expose Resend or other service errors
    let errorMessage = "Failed to send email";
    
    // Handle specific SMTP errors
    const errorMsg = String(error?.message || "").toLowerCase();
    if (errorMsg.includes("535") || errorMsg.includes("authentication unsuccessful")) {
      errorMessage = "Email authentication failed. Please check SMTP configuration.";
    } else if (errorMsg.includes("econn") || errorMsg.includes("timeout")) {
      errorMessage = "Email service connection failed. Please try again later.";
    } else if (errorMsg.includes("resend")) {
      // Filter out any Resend-related errors (shouldn't happen but just in case)
      errorMessage = "Email service configuration error. Please contact support.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Legacy function name for backward compatibility
 * @deprecated Use sendEmail instead
 */
export async function sendMail(options: SendMailOptions): Promise<SendMailResult> {
  return sendEmail(options);
}

