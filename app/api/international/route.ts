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
      patientName, country, whatsapp, email, nationality, diagnosis,
      reportsAvailable, preferredMode, travelDates, notes
    } = body;

    if (!patientName || !country || !whatsapp || !email || !nationality || !diagnosis || !preferredMode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `International Patient Enquiry — ${patientName} | ${country} | ${diagnosis}`;
    const htmlBody = `
      <h2>New International Patient Request</h2>
      <p><strong>Name:</strong> ${patientName}</p>
      <p><strong>Country of Residence:</strong> ${country}</p>
      <p><strong>Nationality / Passport:</strong> ${nationality}</p>
      <p><strong>WhatsApp:</strong> ${whatsapp}</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <h3>Medical Information</h3>
      <p><strong>Diagnosis/Condition:</strong> ${diagnosis}</p>
      <p><strong>Reports Available:</strong> ${reportsAvailable ? 'Yes' : 'No'}</p>
      <br/>
      <h3>Travel & Consultation Preferences</h3>
      <p><strong>Preferred Mode:</strong> ${preferredMode}</p>
      <p><strong>Tentative Travel Dates:</strong> ${travelDates || 'N/A'}</p>
      <p><strong>Additional Notes:</strong> ${notes || 'N/A'}</p>
    `;

    // Send to clinic
    await sendEmail({
      to: CONTACT_EMAIL,
      subject,
      html: htmlBody,
      replyTo: email,
    });

    // Send acknowledgement to patient
    const patientSubject = `International Consultation Request Received`;
    const patientHtml = `
      <p>Dear ${patientName},</p>
      <p>Thank you for reaching out to Dr. Sayuj Krishnan's international patient services.</p>
      <p>We have received your enquiry regarding treatment for ${diagnosis}. Our international patient coordinator will review your request and contact you via WhatsApp or Email within 24-48 hours.</p>
      <p>If you requested a telemedicine appointment, you can also view available slots using our online booking system: <a href="https://www.drsayuj.info/appointments">Book Consultation</a></p>
      <p>For urgent queries, please WhatsApp us at +91 9778280044.</p>
      <br/>
      <p>Warm regards,<br/>
      International Patient Services<br/>
      Yashoda Hospitals | Dr. Sayuj Krishnan S</p>
    `;

    await sendEmail({
      to: email,
      subject: patientSubject,
      html: patientHtml,
    });

    after(async () => {
      await logToSheets({
        source: 'Website – International',
        name: patientName,
        phone: whatsapp,
        email: email,
        condition: diagnosis,
        notes: `Country: ${country}, Nationality: ${nationality}, Mode: ${preferredMode}. Notes: ${notes}`,
        status: 'New'
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("International API error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
