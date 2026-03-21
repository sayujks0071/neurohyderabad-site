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
      country,
      whatsapp,
      email,
      nationality,
      diagnosis,
      reportsAvailable,
      preferredMode,
      travelDates,
      notes
    } = body;

    const subject = `International Patient Enquiry — ${patientName} | ${country} | ${diagnosis}`;

    const htmlBody = `
      <h2>New International Patient Enquiry</h2>
      <p><strong>Patient Name:</strong> ${patientName}</p>
      <p><strong>Country of Residence:</strong> ${country}</p>
      <p><strong>Nationality/Passport:</strong> ${nationality}</p>
      <p><strong>WhatsApp:</strong> ${whatsapp}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Diagnosis/Condition:</strong> ${diagnosis}</p>
      <p><strong>Reports Available:</strong> ${reportsAvailable ? 'Yes' : 'No'}</p>
      <p><strong>Preferred Mode:</strong> ${preferredMode}</p>
      <p><strong>Tentative Travel Dates:</strong> ${travelDates || 'Not provided'}</p>

      <h3>Additional Notes:</h3>
      <p>${notes || 'None provided'}</p>
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

    const patientSubject = `International Consultation Request Received`;
    const patientHtml = `
      <p>Dear ${patientName},</p>
      <p>Thank you for reaching out to Dr. Sayuj Krishnan S from ${country}. We have received your international consultation request.</p>
      <p>Our international patient coordinator will contact you shortly via email or WhatsApp (${whatsapp}) to guide you on the next steps, including how to share your medical records securely and schedule a telemedicine appointment.</p>
      <p>For immediate assistance, please message us on WhatsApp: <a href="https://wa.me/919778280044">+91 9778280044</a>.</p>
      <br/>
      <p>Warm regards,<br/>
      International Patient Services<br/>
      Dr. Sayuj Krishnan S | Yashoda Hospitals</p>
    `;

    await sendEmail({
      to: email,
      subject: patientSubject,
      html: patientHtml,
    });

    logToSheets({
      source: 'Website – International',
      name: patientName,
      phone: whatsapp,
      email: email,
      condition: diagnosis,
      notes: `Country: ${country}, Nationality: ${nationality}, Mode: ${preferredMode}\nTravel: ${travelDates}\nReports: ${reportsAvailable}`,
      status: 'New'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("International API error", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
