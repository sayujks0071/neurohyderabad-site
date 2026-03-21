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
      doctorName,
      specialty,
      hospital,
      doctorEmail,
      doctorPhone,
      patientName,
      patientAge,
      patientGender,
      diagnosis,
      urgency,
      clinicalNotes,
      reportsAvailable
    } = body;

    const subject = `Patient Referral — ${patientName} | Referred by Dr. ${doctorName} | ${urgency}`;

    const htmlBody = `
      <h2>New Patient Referral</h2>
      <h3>Referring Doctor Details</h3>
      <p><strong>Name:</strong> Dr. ${doctorName}</p>
      <p><strong>Specialty:</strong> ${specialty}</p>
      <p><strong>Hospital/Clinic:</strong> ${hospital}</p>
      <p><strong>Email:</strong> ${doctorEmail}</p>
      <p><strong>Phone:</strong> ${doctorPhone}</p>

      <h3>Patient Details</h3>
      <p><strong>Name:</strong> ${patientName}</p>
      <p><strong>Age:</strong> ${patientAge}</p>
      <p><strong>Gender:</strong> ${patientGender}</p>
      <p><strong>Diagnosis/Condition:</strong> ${diagnosis}</p>
      <p><strong>Urgency:</strong> ${urgency}</p>
      <p><strong>Reports Available:</strong> ${reportsAvailable ? 'Yes' : 'No'}</p>
      <p><strong>Clinical Notes:</strong><br/>${clinicalNotes || 'None provided'}</p>
    `;

    const clinicResult = await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html: htmlBody,
      replyTo: doctorEmail,
    });

    if (!clinicResult.success) {
      throw new Error(clinicResult.error?.toString() || "Failed to send clinic email");
    }

    const doctorSubject = `Referral Received — ${patientName}`;
    const doctorHtml = `
      <p>Dear Dr. ${doctorName},</p>
      <p>Thank you for referring ${patientName} to Dr. Sayuj Krishnan S. We have received your referral and will contact you and the patient within 2 hours to schedule an appointment.</p>
      <p>For urgent cases, please call +91 9778280044 directly.</p>
      <br/>
      <p>Warm regards,<br/>
      Dr. Sayuj Krishnan S | Yashoda Hospitals, Malakpet</p>
    `;

    await sendEmail({
      to: doctorEmail,
      subject: doctorSubject,
      html: doctorHtml,
    });

    logToSheets({
      source: 'Website – Referral',
      name: `Dr. ${doctorName} (Patient: ${patientName})`,
      phone: doctorPhone,
      email: doctorEmail,
      condition: diagnosis,
      notes: `Urgency: ${urgency}, Hospital: ${hospital}`,
      status: 'New'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Referral API error", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
