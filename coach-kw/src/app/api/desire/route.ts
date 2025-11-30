// coach-kw/src/app/api/desire/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  console.log("[DESIRE] incoming request");
  
  try {
    const data = (await req.json()) as any;
    const { desire, email, name } = data ?? {};

    if (!desire || desire.trim().length === 0) {
      console.error("[DESIRE] Missing required field: desire");
      return NextResponse.json({ ok: false, error: "Desire is required" }, { status: 400 });
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C8A24A; color: #000; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #C8A24A; }
            .desire-box { background-color: #fff; padding: 15px; border-left: 3px solid #C8A24A; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Desire Submission</h1>
            </div>
            <div class="content">
              ${name ? `<div class="field"><span class="label">Name:</span> ${name}</div>` : ''}
              ${email ? `<div class="field"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>` : ''}
              <div class="desire-box">
                <div class="label">Desire:</div>
                <div>${desire.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New desire submission:

${name ? `Name: ${name}\n` : ""}${email ? `Email: ${email}\n` : ""}
Desire:
${desire}

---
This was submitted from the discovery section on the website.
    `.trim();

    console.log("[DESIRE] Attempting to send email via shared mailer");
    
    const result = await sendMail({
      subject: `New Desire Submission${name ? ` — ${name}` : ""}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    });

    if (!result.success) {
      console.error("[DESIRE] Failed to send email:", result.error);
      return NextResponse.json({ ok: false, error: "Failed to send desire submission" }, { status: 500 });
    }

    console.log("[DESIRE] Email sent successfully", result.messageId);
    return NextResponse.json({ ok: true, messageId: result.messageId }, { status: 200 });
    
  } catch (error: any) {
    console.error("[DESIRE] Error:", error);
    return NextResponse.json({ ok: false, error: error?.message || "Server error" }, { status: 500 });
  }
}


