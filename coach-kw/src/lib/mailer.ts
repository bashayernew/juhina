import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  console.error("[MAILER] Missing SMTP environment variables", {
    hasHost: !!SMTP_HOST,
    hasPort: !!SMTP_PORT,
    hasUser: !!SMTP_USER,
    hasPass: !!SMTP_PASS,
    hasFrom: !!SMTP_FROM,
  });
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: false, // STARTTLS on 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
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

export async function sendEmail(payload: BaseEmailPayload) {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error("SMTP is not configured");
  }

  const transporter = getTransporter();

  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html ?? `<p>${payload.text}</p>`,
      attachments: payload.attachments,
    });

    console.log("[MAILER] Email sent", {
      messageId: info.messageId,
      to: payload.to,
      subject: payload.subject,
    });

    return info;
  } catch (error: any) {
    console.error("[MAILER] Failed to send email", {
      errorMessage: error?.message,
      code: error?.code,
      response: error?.response,
    });
    throw new Error("Failed to send email");
  }
}
