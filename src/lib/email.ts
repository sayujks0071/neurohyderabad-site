import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const DEFAULT_FROM_EMAIL = 'Dr. Sayuj Krishnan <hellodr@drsayuj.info>';
const RESEND_FROM = process.env.RESEND_FROM?.trim();

const requireResendConfig = (context: string) => {
  if (!resend) {
    const error = `RESEND_API_KEY is not configured; ${context} email not sent.`;
    console.error(error);
    return { success: false, error, configurationMissing: true };
  }
  return null;
};

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
  from: string;
}

export class EmailService {
  private static fromEmail = RESEND_FROM || DEFAULT_FROM_EMAIL;

  // Send calendar invite
  static async sendCalendarInvite(
    patientEmail: string,
    patientName: string,
    appointmentDate: string,
    icsContent: string
  ) {
    const startDate = new Date(appointmentDate);

    const emailData: any = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `Calendar Invite: Appointment with Dr. Sayuj Krishnan`,
      text: `Please find attached the calendar invite for your appointment with Dr. Sayuj Krishnan.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Calendar Invitation</h2>
          <p>Dear ${patientName},</p>
          <p>Please find attached the calendar invite for your appointment.</p>
          <p><strong>Date:</strong> ${startDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p>You can add this to your calendar (Google, Outlook, Apple) by opening the attachment.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'appointment.ics',
          content: icsContent
        }
      ]
    };

    try {
      const configError = requireResendConfig('calendar invite');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Calendar invite email sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send calendar invite email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send welcome email to new patients
  static async sendWelcomeEmail(patientEmail: string, patientName: string, source: string) {
    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: 'Welcome to Dr. Sayuj Krishnan\'s Neurosurgery Practice',
      text: `Welcome to Dr. Sayuj Krishnan's Neurosurgery Practice

Dear ${patientName},

Thank you for reaching out to Dr. Sayuj Krishnan's neurosurgery practice. We're committed to providing you with the highest quality care for your brain and spine health needs.

What to Expect Next:
- Our team will review your inquiry within 24 hours
- We'll contact you to schedule a consultation
- You'll receive preparation instructions for your visit
- We'll provide personalized care recommendations

Emergency Contact: +91-9778280044

Contact Information:
Phone: +91-9778280044
Email: hellodr@drsayuj.info
Location: Yashoda Hospital, Malakpet, Hyderabad

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to Our Practice</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1e40af; margin-top: 0;">Dear ${patientName},</h2>
            
            <p>Thank you for reaching out to Dr. Sayuj Krishnan's neurosurgery practice. We're committed to providing you with the highest quality care for your brain and spine health needs.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #1e40af; margin-top: 0;">What to Expect Next:</h3>
              <ul style="color: #374151;">
                <li>Our team will review your inquiry within 24 hours</li>
                <li>We'll contact you to schedule a consultation</li>
                <li>You'll receive preparation instructions for your visit</li>
                <li>We'll provide personalized care recommendations</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">🚨 Emergency Contact</h3>
              <p style="color: #92400e; margin: 0;">For urgent neurosurgical emergencies, call us immediately:</p>
              <p style="color: #92400e; font-size: 18px; font-weight: bold; margin: 10px 0;">+91-9778280044</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.drsayuj.info/appointments" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Book Your Consultation
              </a>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Phone:</strong> +91-9778280044</p>
            <p><strong>Email:</strong> hellodr@drsayuj.info</p>
            <p><strong>Location:</strong> Yashoda Hospital, Malakpet, Hyderabad</p>
            <p style="margin-bottom: 0; font-size: 14px; color: #9ca3af;">
              © 2025 Dr. Sayuj Krishnan. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('welcome');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Welcome email sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send follow-up email to a patient
  static async sendFollowUpEmail(
    patientEmail: string,
    patientName: string,
    condition: string,
    followUpType: string,
    source?: string
  ) {
    const followUpLabel = followUpType ? followUpType.replace(/-/g, " ") : "follow-up";
    const conditionLabel = condition || "your consultation";
    const sourceLabel = source ? `Source: ${source}` : "Source: direct inquiry";

    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `Follow-up on your ${conditionLabel} inquiry`,
      text: `Follow-up - Dr. Sayuj Krishnan

Dear ${patientName},

This is a ${followUpLabel} regarding your ${conditionLabel} inquiry. Our team is ready to help you with the next steps for your consultation.

${sourceLabel}

You can book an appointment here:
https://www.drsayuj.info/appointments

If you have any questions, reply to this email or call +91-9778280044.

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Follow-up on Your Inquiry</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          <div style="padding: 24px; background: #f8fafc;">
            <p>Dear ${patientName},</p>
            <p>This is a ${followUpLabel} regarding your <strong>${conditionLabel}</strong> inquiry. Our team is ready to help you with the next steps for your consultation.</p>
            <p style="color: #6b7280; font-size: 14px;">${sourceLabel}</p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://www.drsayuj.info/appointments"
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Book an Appointment
              </a>
            </div>
            <p>If you have questions, reply to this email or call +91-9778280044.</p>
          </div>
          <div style="background: #1f2937; color: white; padding: 16px; text-align: center;">
            <p style="margin: 0; font-size: 12px;">© 2025 Dr. Sayuj Krishnan. All rights reserved.</p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('follow-up');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Follow-up email sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send follow-up email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send appointment summary after consultation
  static async sendAppointmentSummary(
    patientEmail: string,
    patientName: string,
    appointmentType: string,
    diagnosis?: string,
    treatmentPlan?: any
  ) {
    const nextSteps = Array.isArray(treatmentPlan?.nextSteps)
      ? (treatmentPlan.nextSteps as string[])
      : [];
    const planSummary =
      typeof treatmentPlan === "string"
        ? treatmentPlan
        : treatmentPlan?.summary || treatmentPlan?.recommendations || "";

    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `Your Appointment Summary - Dr. Sayuj Krishnan`,
      text: `Appointment Summary - Dr. Sayuj Krishnan

Dear ${patientName},

Thank you for your ${appointmentType} appointment. Below is a brief summary.

Diagnosis: ${diagnosis || "To be shared by the care team"}
Plan: ${planSummary || "Our team will share the detailed plan with you soon."}
${nextSteps.length ? `Next steps:\n${nextSteps.map((step: string) => `- ${step}`).join('\n')}` : ""}

For questions, reply to this email or call +91-9778280044.

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #059669; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Appointment Summary</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          <div style="padding: 24px; background: #f8fafc;">
            <p>Dear ${patientName},</p>
            <p>Thank you for your ${appointmentType} appointment. Below is a brief summary.</p>
            <div style="background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb;">
              <p><strong>Diagnosis:</strong> ${diagnosis || "To be shared by the care team"}</p>
              <p><strong>Plan:</strong> ${planSummary || "Our team will share the detailed plan with you soon."}</p>
            </div>
            ${nextSteps.length ? `
              <div style="background: #ecfdf3; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <h3 style="margin: 0 0 8px 0;">Next Steps</h3>
                <ul>${nextSteps.map((step: string) => `<li>${step}</li>`).join('')}</ul>
              </div>
            ` : ""}
            <p>For questions, reply to this email or call +91-9778280044.</p>
          </div>
          <div style="background: #1f2937; color: white; padding: 16px; text-align: center;">
            <p style="margin: 0; font-size: 12px;">© 2025 Dr. Sayuj Krishnan. All rights reserved.</p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('appointment summary');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Appointment summary sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send appointment summary:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send appointment request alert to clinic admin
  static async sendAppointmentRequestAlert(data: {
    patientName: string;
    age: string;
    gender: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    source?: string;
    email?: string;
    phone?: string;
    painScore?: number;
    mriScanAvailable?: boolean;
  }) {
    const adminEmail =
      process.env.APPOINTMENT_ADMIN_EMAIL ||
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
      "hellodr@drsayuj.info";

    const emailData: EmailTemplate = {
      to: adminEmail,
      from: this.fromEmail,
      subject: `New Appointment Request - ${data.patientName}`,
      text: `New appointment request received.

Patient: ${data.patientName}
Age: ${data.age}
Gender: ${data.gender}
Preferred Date: ${data.appointmentDate}
Preferred Time: ${data.appointmentTime}
Reason: ${data.reason}
${data.painScore ? `Pain Score: ${data.painScore}/10\n` : ""}${data.mriScanAvailable !== undefined ? `MRI Scan Available: ${data.mriScanAvailable ? "Yes" : "No"}\n` : ""}${data.email ? `Email: ${data.email}\n` : ""}${data.phone ? `Phone: ${data.phone}\n` : ""}${data.source ? `Source: ${data.source}\n` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e40af; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Appointment Request</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          <div style="padding: 24px; background: #f8fafc;">
            <h2 style="margin-top: 0; color: #1e40af;">Patient Details</h2>
            <p><strong>Name:</strong> ${data.patientName}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Gender:</strong> ${data.gender}</p>
            <p><strong>Preferred Date:</strong> ${data.appointmentDate}</p>
            <p><strong>Preferred Time:</strong> ${data.appointmentTime}</p>
            <p><strong>Reason:</strong> ${data.reason}</p>
            ${data.painScore ? `<p><strong>Pain Score:</strong> ${data.painScore}/10</p>` : ""}
            ${data.mriScanAvailable !== undefined ? `<p><strong>MRI Scan Available:</strong> ${data.mriScanAvailable ? "Yes" : "No"}</p>` : ""}
            ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            ${data.source ? `<p><strong>Source:</strong> ${data.source}</p>` : ""}
          </div>
        </div>
      `,
    };

    try {
      const configError = requireResendConfig('appointment request alert');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log("Appointment admin alert sent successfully:", result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error("Failed to send appointment admin alert:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return { success: false, error: errorMessage };
    }
  }

  // Send education materials to patient
  static async sendEducationMaterials(
    patientEmail: string,
    patientName: string,
    condition: string,
    educationType: string,
    materials: string[]
  ) {
    const materialList = Array.isArray(materials) ? materials : [];
    const subjectType = educationType ? educationType.replace(/-/g, " ") : "education";

    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `Your ${subjectType} resources - Dr. Sayuj Krishnan`,
      text: `Education Materials - Dr. Sayuj Krishnan

Dear ${patientName},

Here are your ${subjectType} materials for ${condition}:
${materialList.map(item => `- ${item}`).join('\n')}

If you have questions, reply to this email or call +91-9778280044.

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #7c3aed; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Your Education Materials</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          <div style="padding: 24px; background: #f8fafc;">
            <p>Dear ${patientName},</p>
            <p>Here are your <strong>${subjectType}</strong> materials for <strong>${condition}</strong>:</p>
            <ul>
              ${materialList.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p>If you have questions, reply to this email or call +91-9778280044.</p>
          </div>
          <div style="background: #1f2937; color: white; padding: 16px; text-align: center;">
            <p style="margin: 0; font-size: 12px;">© 2025 Dr. Sayuj Krishnan. All rights reserved.</p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('education materials');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Education materials sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send education materials:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send appointment confirmation email
  static async sendAppointmentConfirmation(
    patientEmail: string, 
    patientName: string, 
    appointmentDate: string, 
    appointmentType: string,
    instructions: string[]
  ) {
    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `Appointment Confirmed - Dr. Sayuj Krishnan`,
      text: `Appointment Confirmed - Dr. Sayuj Krishnan

Dear ${patientName},

Your appointment has been successfully confirmed. We look forward to seeing you soon.

Appointment Details:
Date & Time: ${new Date(appointmentDate).toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
Type: ${appointmentType}
Doctor: Dr. Sayuj Krishnan

Preparation Instructions:
${instructions.map(instruction => `- ${instruction}`).join('\n')}

Location:
Yashoda Hospital
Room No 317, OPD Block
Malakpet, Hyderabad - 500036

Emergency Contact: +91-9778280044

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">✅ Appointment Confirmed</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #059669; margin-top: 0;">Dear ${patientName},</h2>
            
            <p>Your appointment has been successfully confirmed. We look forward to seeing you soon.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981;">
              <h3 style="color: #059669; margin-top: 0;">📅 Appointment Details</h3>
              <p><strong>Date & Time:</strong> ${new Date(appointmentDate).toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p><strong>Type:</strong> ${appointmentType}</p>
              <p><strong>Doctor:</strong> Dr. Sayuj Krishnan</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">📋 Preparation Instructions</h3>
              <ul style="color: #92400e;">
                ${instructions.map(instruction => `<li>${instruction}</li>`).join('')}
              </ul>
            </div>
            
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">📍 Location</h3>
              <p style="color: #1e40af; margin: 0;"><strong>Yashoda Hospital</strong></p>
              <p style="color: #1e40af; margin: 0;">Room No 317, OPD Block</p>
              <p style="color: #1e40af; margin: 0;">Malakpet, Hyderabad - 500036</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.drsayuj.info/contact" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Contact Us
              </a>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
            <p><strong>Emergency Contact:</strong> +91-9778280044</p>
            <p style="margin-bottom: 0; font-size: 14px; color: #9ca3af;">
              © 2025 Dr. Sayuj Krishnan. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('appointment confirmation');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Appointment confirmation sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send appointment confirmation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send appointment request confirmation (intake acknowledgment)
  static async sendAppointmentRequestConfirmation(
    patientEmail: string,
    patientName: string,
    appointmentDate: string,
    appointmentTime: string,
    confirmationMessage: string,
    reason?: string
  ) {
    const messageLines = confirmationMessage
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const appointmentDetails = [
      `Date: ${appointmentDate}`,
      `Time: ${appointmentTime}`,
      reason ? `Reason: ${reason}` : undefined,
    ].filter(Boolean);

    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: "Appointment Request Received - Dr. Sayuj Krishnan",
      text: `${confirmationMessage}

Appointment Details:
${appointmentDetails.join("\n")}

If you need to update your request, call +91-9778280044 or reply to this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2563eb; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Appointment Request Received</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          <div style="padding: 24px; background: #f8fafc;">
            <p>Hi ${patientName},</p>
            ${messageLines.map((line) => `<p>${line}</p>`).join("")}
            <div style="background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb;">
              <h3 style="margin: 0 0 8px 0; color: #1e40af;">Appointment Details</h3>
              <ul style="margin: 0; padding-left: 18px; color: #374151;">
                ${appointmentDetails.map((detail) => `<li>${detail}</li>`).join("")}
              </ul>
            </div>
            <p>If you need to update your request, call +91-9778280044 or reply to this email.</p>
          </div>
          <div style="background: #1f2937; color: white; padding: 16px; text-align: center;">
            <p style="margin: 0; font-size: 12px;">© 2025 Dr. Sayuj Krishnan. All rights reserved.</p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('appointment request confirmation');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Appointment request confirmation sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send appointment request confirmation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send appointment reminder
  static async sendAppointmentReminder(
    patientEmail: string, 
    patientName: string, 
    appointmentDate: string, 
    reminderType: string
  ) {
    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `Appointment Reminder - Dr. Sayuj Krishnan`,
      text: `Appointment Reminder - Dr. Sayuj Krishnan

Dear ${patientName},

This is a friendly reminder about your upcoming appointment with Dr. Sayuj Krishnan.

Your Appointment:
Date & Time: ${new Date(appointmentDate).toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
Reminder Type: ${reminderType === '24h' ? '24 hours before' : '1 hour before'}

Please Remember:
- Arrive 15 minutes early for your appointment
- Bring all previous medical reports and MRI/CT scans
- Bring a list of current medications
- Bring your insurance card and ID

Emergency Contact: +91-9778280044

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">⏰ Appointment Reminder</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #dc2626; margin-top: 0;">Dear ${patientName},</h2>
            
            <p>This is a friendly reminder about your upcoming appointment with Dr. Sayuj Krishnan.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #ef4444;">
              <h3 style="color: #dc2626; margin-top: 0;">📅 Your Appointment</h3>
              <p><strong>Date & Time:</strong> ${new Date(appointmentDate).toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p><strong>Reminder Type:</strong> ${reminderType === '24h' ? '24 hours before' : '1 hour before'}</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">📋 Please Remember</h3>
              <ul style="color: #92400e;">
                <li>Arrive 15 minutes early for your appointment</li>
                <li>Bring all previous medical reports and MRI/CT scans</li>
                <li>Bring a list of current medications</li>
                <li>Bring your insurance card and ID</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.drsayuj.info/contact" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Contact Us
              </a>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
            <p><strong>Emergency Contact:</strong> +91-9778280044</p>
            <p style="margin-bottom: 0; font-size: 14px; color: #9ca3af;">
              © 2025 Dr. Sayuj Krishnan. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('appointment reminder');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Appointment reminder sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send appointment reminder:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send health or care reminder
  static async sendHealthReminder(
    patientEmail: string,
    patientName: string,
    reminderType: string,
    subject: string,
    content: string,
    condition?: string
  ) {
    const reminderLabel = reminderType ? reminderType.replace(/-/g, " ") : "health reminder";

    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject,
      text: `${subject}

Dear ${patientName},

${content}

${condition ? `Condition: ${condition}\n` : ""}If you have questions, reply to this email or call +91-9778280044.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0ea5e9; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">${reminderLabel.toUpperCase()}</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          <div style="padding: 24px; background: #f8fafc;">
            <p>Dear ${patientName},</p>
            <p>${content}</p>
            ${condition ? `<p><strong>Condition:</strong> ${condition}</p>` : ""}
            <p>If you have questions, reply to this email or call +91-9778280044.</p>
          </div>
          <div style="background: #1f2937; color: white; padding: 16px; text-align: center;">
            <p style="margin: 0; font-size: 12px;">© 2025 Dr. Sayuj Krishnan. All rights reserved.</p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('health reminder');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Health reminder sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send health reminder:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send emergency notification
  static async sendEmergencyNotification(
    emergencyType: string,
    patientInfo: any,
    severity: string
  ) {
    const emailData: EmailTemplate = {
      to: 'hellodr@drsayuj.info',
      from: this.fromEmail,
      subject: `🚨 EMERGENCY ALERT: ${emergencyType} - ${severity.toUpperCase()}`,
      text: `EMERGENCY ALERT - Dr. Sayuj Krishnan

Emergency Details:
Type: ${emergencyType}
Severity: ${severity.toUpperCase()}
Patient: ${patientInfo.name || 'Unknown'}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Immediate Actions Required:
- Contact patient immediately
- Review patient records
- Schedule emergency consultation if needed
- Notify hospital emergency department

Emergency Contact: +91-9778280044`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🚨 EMERGENCY ALERT</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #ef4444;">
              <h3 style="color: #dc2626; margin-top: 0;">Emergency Details</h3>
              <p><strong>Type:</strong> ${emergencyType}</p>
              <p><strong>Severity:</strong> ${severity.toUpperCase()}</p>
              <p><strong>Patient:</strong> ${patientInfo.name || 'Unknown'}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">Immediate Actions Required</h3>
              <ul style="color: #92400e;">
                <li>Contact patient immediately</li>
                <li>Review patient records</li>
                <li>Schedule emergency consultation if needed</li>
                <li>Notify hospital emergency department</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="tel:+919778280044" 
                 style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Call Emergency Line
              </a>
            </div>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('emergency notification');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Emergency notification sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send emergency notification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send feedback request
  static async sendFeedbackRequest(
    patientEmail: string,
    patientName: string,
    serviceType: string,
    appointmentDate: string,
    questions: string[],
    feedbackLink: string
  ) {
    const emailData: EmailTemplate = {
      to: patientEmail,
      from: this.fromEmail,
      subject: `How was your ${serviceType} with Dr. Sayuj Krishnan?`,
      text: `Feedback Request - Dr. Sayuj Krishnan

Dear ${patientName},

We hope you had a positive experience with your ${serviceType} on ${new Date(appointmentDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}.

Your feedback is very important to us. It helps us improve our services and provide better care for our patients.

Please take a moment to share your thoughts by visiting the link below:
${feedbackLink}

We would love to hear your thoughts on:
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Thank you for your trust in us.

Best regards,
Dr. Sayuj Krishnan

Contact Information:
Phone: +91-9778280044
Email: hellodr@drsayuj.info

© 2025 Dr. Sayuj Krishnan. All rights reserved.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8b5cf6, #a78bfa); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">We Value Your Feedback</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Dr. Sayuj Krishnan - Neurosurgeon</p>
          </div>

          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #6d28d9; margin-top: 0;">Dear ${patientName},</h2>

            <p>We hope you had a positive experience with your <strong>${serviceType}</strong> on ${new Date(appointmentDate).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}.</p>

            <p>Your feedback is very important to us. It helps us improve our services and provide better care for our patients.</p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #a78bfa;">
              <h3 style="color: #6d28d9; margin-top: 0;">We'd love to hear about:</h3>
              <ul style="color: #4b5563;">
                ${questions.map(q => `<li>${q}</li>`).join('')}
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${feedbackLink}"
                 style="background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Share Your Feedback
              </a>
            </div>

            <p style="font-size: 14px; color: #6b7280; text-align: center;">
              If the button above doesn't work, copy and paste this link into your browser:<br>
              <a href="${feedbackLink}" style="color: #7c3aed;">${feedbackLink}</a>
            </p>
          </div>

          <div style="background: #1f2937; color: white; padding: 20px; text-align: center;">
            <p><strong>Contact Us:</strong> +91-9778280044</p>
            <p style="margin-bottom: 0; font-size: 14px; color: #9ca3af;">
              © 2025 Dr. Sayuj Krishnan. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    try {
      const configError = requireResendConfig('feedback request');
      if (configError) {
        return configError;
      }

      const result = await resend!.emails.send(emailData);
      console.log('Feedback request sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send feedback request:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }
}

export default EmailService;
