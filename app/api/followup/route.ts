import { NextRequest, NextResponse, after } from "next/server";
import { getRateLimit } from "@/lib/ratelimit";
import { sendEmail, CONTACT_EMAIL } from "@/lib/mailer";
import { logToSheets } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = getRateLimit(ip);

  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();

    if (body.company) {
      console.warn("Honeypot field filled");
      return NextResponse.json({ ok: true });
    }

    const {
      patientName, phone, email, procedure, surgeryDate,
      concern, description, severity
    } = body;

    if (!patientName || !phone || !procedure || !surgeryDate || !concern || !description || !severity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `Post-Op Follow-Up — ${patientName} | ${procedure} | ${concern}`;
    const htmlBody = `
      <h2>New Post-Operative Follow-Up Query</h2>
      <p><strong>Patient Name:</strong> ${patientName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Procedure:</strong> ${procedure}</p>
      <p><strong>Surgery Date:</strong> ${surgeryDate}</p>
      <p><strong>Concern Category:</strong> ${concern}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Severity:</strong> <span style="color: ${severity === 'Severe' ? 'red' : 'black'}; font-weight: bold;">${severity}</span></p>
    `;

    // Send to clinic
    await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html: htmlBody,
      replyTo: email || undefined,
    });

    // Send acknowledgement to patient (if email provided)
    if (email) {
      const patientSubject = `Your follow-up query has been received`;
      const patientHtml = `
        <p>Dear ${patientName},</p>
        <p>Thank you for sending your follow-up query.</p>
        <p>Dr. Sayuj's team will review your concern regarding "${concern}" and respond shortly with guidance.</p>
        <p><strong>If you are experiencing severe symptoms, please call +91 9778280044 immediately or visit the nearest emergency department.</strong></p>
        <br/>
        <p>Take care,<br/>
        Team Dr. Sayuj | Yashoda Hospitals</p>
      `;

      await sendEmail({
        to: email,
        subject: patientSubject,
        html: patientHtml,
      });
    }

    after(async () => {
      await logToSheets({
        source: 'Website – Follow-up',
        name: patientName,
        phone,
        email: email || '',
        condition: procedure,
        notes: `Date: ${surgeryDate}. Concern: ${concern}. Description: ${description}. Severity: ${severity}`,
        status: 'New'
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Follow-up API error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
