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
      doctorName, specialty, hospital, doctorEmail, doctorPhone,
      patientName, patientAge, patientGender, diagnosis, urgency,
      notes, reportsAvailable
    } = body;

    if (!doctorName || !doctorEmail || !doctorPhone || !patientName || !diagnosis || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `Patient Referral — ${patientName} | Referred by Dr. ${doctorName} | ${urgency}`;
    const htmlBody = `
      <h2>New Patient Referral</h2>
      <h3>Referring Doctor</h3>
      <p><strong>Name:</strong> Dr. ${doctorName}</p>
      <p><strong>Specialty:</strong> ${specialty}</p>
      <p><strong>Hospital/Clinic:</strong> ${hospital}</p>
      <p><strong>Email:</strong> ${doctorEmail}</p>
      <p><strong>Phone:</strong> ${doctorPhone}</p>
      <br/>
      <h3>Patient Details</h3>
      <p><strong>Name:</strong> ${patientName}</p>
      <p><strong>Age:</strong> ${patientAge}</p>
      <p><strong>Gender:</strong> ${patientGender}</p>
      <p><strong>Diagnosis:</strong> ${diagnosis}</p>
      <p><strong>Urgency:</strong> ${urgency}</p>
      <p><strong>Reports Available:</strong> ${reportsAvailable ? 'Yes' : 'No'}</p>
      <p><strong>Clinical Notes:</strong> ${notes || 'N/A'}</p>
    `;

    // Send to clinic
    await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html: htmlBody,
      replyTo: doctorEmail,
    });

    // Send acknowledgement to referring doctor
    const docSubject = `Referral Received — ${patientName}`;
    const docHtml = `
      <p>Dear Dr. ${doctorName},</p>
      <p>Thank you for referring ${patientName} to Dr. Sayuj Krishnan S.</p>
      <p>We have received your referral and will contact you and the patient within 2 hours to schedule an appointment.</p>
      <p>For urgent cases, please call +91 9778280044 directly.</p>
      <br/>
      <p>Warm regards,<br/>
      Dr. Sayuj Krishnan S | Yashoda Hospitals, Malakpet</p>
    `;

    await sendEmail({
      to: doctorEmail,
      subject: docSubject,
      html: docHtml,
    });

    after(async () => {
      await logToSheets({
        source: 'Website – Referral',
        name: `Patient: ${patientName} / Ref: Dr. ${doctorName}`,
        phone: doctorPhone,
        email: doctorEmail,
        condition: diagnosis,
        notes: `Urgency: ${urgency}. Hospital: ${hospital}. Notes: ${notes}`,
        status: 'New'
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Referral API error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
