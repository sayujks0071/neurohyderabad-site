import { NextRequest, NextResponse, after } from "next/server";
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

    if (body.company) {
      console.warn("Honeypot field filled");
      return NextResponse.json({ ok: true });
    }

    const { fullName, phone, email, city, concern, painScore, mriScanAvailable, preferredDate, preferredTime, formType } = body;

    if (!fullName || !phone || !email || !city || !concern) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `Patient Inquiry — ${fullName} | ${city}`;
    const htmlBody = `
      <h2>New Patient Inquiry</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Pain Score:</strong> ${painScore || 'N/A'}</p>
      <p><strong>MRI Available:</strong> ${mriScanAvailable ? 'Yes' : 'No'}</p>
      <p><strong>Concern:</strong> ${concern}</p>
      <p><strong>Preferred Date:</strong> ${preferredDate || 'Any time'}</p>
      <p><strong>Preferred Time:</strong> ${preferredTime || 'Any time'}</p>
      <p><strong>Form Type:</strong> ${formType}</p>
    `;

    // Send to clinic
    await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html: htmlBody,
      replyTo: email,
    });

    // Send auto-acknowledgement to patient
    const patientSubject = `We received your enquiry — Dr. Sayuj Krishnan S`;
    const patientHtml = `
      <p>Dear ${fullName},</p>
      <p>Thank you for reaching out to Dr. Sayuj Krishnan S. We have received your enquiry and our team will contact you within 30–60 minutes during clinic hours.</p>
      <p>For urgent matters, please call +91 9778280044 or WhatsApp us directly.</p>
      <br/>
      <p>Warm regards,<br/>
      Team Dr. Sayuj<br/>
      Yashoda Hospitals, Malakpet | <a href="https://www.drsayuj.info">www.drsayuj.info</a></p>
    `;

    await sendEmail({
      to: email,
      subject: patientSubject,
      html: patientHtml,
    });

    after(async () => {
      await logToSheets({
        source: 'Website – Contact',
        name: fullName,
        phone,
        email,
        condition: concern,
        notes: `City: ${city}, Pain: ${painScore}, MRI: ${mriScanAvailable}`,
        status: 'New'
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
