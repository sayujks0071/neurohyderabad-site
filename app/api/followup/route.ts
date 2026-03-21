import { NextRequest, NextResponse } from "next/server";
import { getRateLimit } from "@/lib/ratelimit";
import { sendEmail, CONTACT_EMAIL } from "@/lib/mailer";
import { logToSheets } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = getRateLimit(ip);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const {
      patientName,
      phone,
      email,
      procedure,
      dateOfSurgery,
      concernType,
      concernDescription,
      severity
    } = body;

    const subject = `Post-Op Follow-Up — ${patientName} | ${procedure} | ${concernType}`;

    const htmlBody = `
      <h2>Post-Op Follow-Up Query</h2>
      <p><strong>Patient Name:</strong> ${patientName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Procedure Performed:</strong> ${procedure}</p>
      <p><strong>Date of Surgery:</strong> ${dateOfSurgery}</p>
      <p><strong>Type of Concern:</strong> ${concernType}</p>
      <p><strong>Severity:</strong> <strong style="color: ${severity === 'Severe' ? 'red' : 'inherit'}">${severity}</strong></p>

      <h3>Concern Description:</h3>
      <p>${concernDescription}</p>
    `;

    const clinicResult = await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html: htmlBody,
      replyTo: email,
    });

    if (!clinicResult.success) {
      throw new Error(clinicResult.error?.toString() || "Failed to send clinic email");
    }

    if (email) {
      const patientSubject = `Your follow-up query has been received`;
      const patientHtml = `
        <p>Dear ${patientName},</p>
        <p>Thank you for sending your follow-up query. Dr. Sayuj's team will review your concern and respond shortly with guidance.</p>
        <p>If you are experiencing severe symptoms, please call +91 9778280044 immediately or visit the nearest emergency department.</p>
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

    logToSheets({
      source: 'Website – Follow-up',
      name: patientName,
      phone,
      email: email || '',
      condition: `${procedure} Post-Op - ${concernType}`,
      notes: `Surgery Date: ${dateOfSurgery}, Severity: ${severity}\nDescription: ${concernDescription}`,
      status: 'New'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Follow-up API error", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
