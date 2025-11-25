import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_YJVHwSAs_PxKJHrCFidkmuFAkvNuQL1by');

// Email configuration
const FROM_EMAIL = 'Dr. Sayuj Krishnan <noreply@drsayuj.info>';
const TO_EMAIL = 'dr.sayujkrishnan@gmail.com';
const ADMIN_EMAIL = 'neurospinehyd@drsayuj.com';

// Email templates
export const emailTemplates = {
  contactForm: (data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    subject?: string;
  }) => ({
    subject: `New Contact Form Submission - ${data.subject || 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
          <p>This message was sent from the contact form on <a href="https://www.drsayuj.info">drsayuj.info</a></p>
          <p>Reply directly to this email to respond to the patient.</p>
        </div>
      </div>
    `
  }),

  appointmentRequest: (data: {
    name: string;
    email: string;
    phone: string;
    preferredDate?: string;
    condition?: string;
    urgency?: string;
    message?: string;
  }) => ({
    subject: `New Appointment Request - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Appointment Request</h2>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <h3 style="color: #1e40af; margin-top: 0;">Patient Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Appointment Details</h3>
          ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
          ${data.condition ? `<p><strong>Condition:</strong> ${data.condition}</p>` : ''}
          ${data.urgency ? `<p><strong>Urgency:</strong> ${data.urgency}</p>` : ''}
        </div>
        
        ${data.message ? `
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
          <h3 style="color: #1e40af; margin-top: 0;">Additional Information</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
          <p style="color: #92400e; margin: 0;">Please contact the patient to confirm the appointment and provide further instructions.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
          <p>This appointment request was sent from <a href="https://www.drsayuj.info/appointments">drsayuj.info/appointments</a></p>
          <p>Reply directly to this email to respond to the patient.</p>
        </div>
      </div>
    `
  }),

  patientConfirmation: (data: {
    name: string;
    email: string;
    appointmentDate?: string;
  }) => ({
    subject: 'Appointment Request Received - Dr. Sayuj Krishnan',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Dr. Sayuj Krishnan</h1>
          <p style="color: #64748b; margin: 5px 0;">Neurosurgeon - Hyderabad</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 30px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <h2 style="color: #1e40af; margin-top: 0;">Thank you for your appointment request!</h2>
          <p>Dear ${data.name},</p>
          <p>We have received your appointment request and will contact you within 24 hours to confirm your consultation.</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">What happens next?</h3>
          <ul style="color: #374151;">
            <li>Our team will review your request</li>
            <li>We'll contact you to confirm the appointment</li>
            <li>You'll receive preparation instructions</li>
            <li>Please bring your medical reports and MRI scans</li>
          </ul>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">Emergency Contact</h3>
          <p style="color: #92400e; margin: 0;">For urgent medical concerns, please call <strong>+91 9778280044</strong> or visit the emergency department.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; text-align: center;">
          <p>Dr. Sayuj Krishnan - Neurosurgeon</p>
          <p>Yashoda Hospital, Malakpet, Hyderabad</p>
          <p>Phone: +91 9778280044 | Email: neurospinehyd@drsayuj.com</p>
          <p><a href="https://www.drsayuj.info">www.drsayuj.info</a></p>
        </div>
      </div>
    `
  }),

  newsletterSubscription: (data: {
    email: string;
    name?: string;
  }) => ({
    subject: 'Welcome to Dr. Sayuj Krishnan\'s Health Insights',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">Dr. Sayuj Krishnan</h1>
          <p style="color: #64748b; margin: 5px 0;">Neurosurgeon - Hyderabad</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 30px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #2563eb;">
          <h2 style="color: #1e40af; margin-top: 0;">Thank you for subscribing!</h2>
          <p>Dear ${data.name || 'Subscriber'},</p>
          <p>Thank you for subscribing to our health insights newsletter. You'll now receive:</p>
          <ul style="color: #374151;">
            <li>Expert neurosurgical insights and patient education</li>
            <li>Latest advances in minimally invasive spine surgery</li>
            <li>Recovery tips and health maintenance guides</li>
            <li>Updates on new treatment options and technologies</li>
          </ul>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">What to Expect</h3>
          <p style="color: #374151;">We send valuable health information monthly, focusing on brain and spine health, recovery strategies, and patient success stories.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px; text-align: center;">
          <p>Dr. Sayuj Krishnan - Neurosurgeon</p>
          <p>Yashoda Hospital, Malakpet, Hyderabad</p>
          <p>Phone: +91 9778280044 | Email: neurospinehyd@drsayuj.com</p>
          <p><a href="https://www.drsayuj.info">www.drsayuj.info</a></p>
          <p style="margin-top: 20px; font-size: 12px;">
            <a href="https://www.drsayuj.info/newsletter/unsubscribe?email=${encodeURIComponent(data.email)}">Unsubscribe</a>
          </p>
        </div>
      </div>
    `
  }),

  preAppointmentBriefing: (data: {
    patientName: string;
    condition: string;
    procedureType: string;
    appointmentDate?: string;
    briefingContent: string;
    sections?: {
      preparation?: string;
      whatToExpect?: string;
      recovery?: string;
      questionsToAsk?: string;
    };
    sources?: string[];
  }) => {
    const {
      patientName,
      condition,
      procedureType,
      appointmentDate,
      briefingContent,
      sections,
      sources,
    } = data;

    const renderSection = (title: string, content?: string) =>
      content
        ? `
        <div style="padding: 16px; border-radius: 8px; background: #f8fafc; margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px; color: #1e40af;">${title}</h3>
          <p style="margin: 0; color: #334155; white-space: pre-wrap;">${content}</p>
        </div>
      `
        : '';

    return {
      subject: `Pre-Appointment Briefing - ${procedureType} (${condition})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="margin: 0; color: #2563eb;">Dr. Sayuj Krishnan</h1>
            <p style="margin: 4px 0; color: #475569;">Neurosurgeon • Hyderabad</p>
          </div>

          <div style="background: #e0f2fe; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 0; color: #0f172a;">Hi ${patientName || 'there'},</p>
            <p style="margin: 8px 0 0; color: #0f172a;">
              Here is your personalized briefing to help you prepare for your upcoming ${procedureType.toLowerCase()}.
            </p>
            ${
              appointmentDate
                ? `<p style="margin: 8px 0 0; color: #0f172a;"><strong>Appointment:</strong> ${appointmentDate}</p>`
                : ''
            }
          </div>

          ${renderSection('How to Prepare', sections?.preparation)}
          ${renderSection('What to Expect', sections?.whatToExpect)}
          ${renderSection('Recovery Tips', sections?.recovery)}
          ${renderSection('Questions to Ask Your Surgeon', sections?.questionsToAsk)}

          <div style="padding: 20px; background: #fefce8; border-radius: 12px; border: 1px solid #fde68a; margin-bottom: 20px;">
            <h3 style="margin: 0 0 8px; color: #92400e;">Important</h3>
            <p style="margin: 0; color: #7c2d12;">
              This information is sourced directly from Dr. Sayuj's verified medical documents to make sure you receive accurate, evidence-based guidance.
            </p>
          </div>

          <div style="padding: 20px; background: #f8fafc; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px; color: #1e40af;">Full Briefing</h3>
            <div style="color: #0f172a;">${briefingContent}</div>
          </div>

          ${
            sources && sources.length
              ? `
            <div style="padding: 16px; background: #f1f5f9; border-radius: 8px; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px; color: #1e293b;">Sources</h4>
              <ul style="margin: 0; padding-left: 18px; color: #334155;">
                ${sources.map((source) => `<li>${source}</li>`).join('')}
              </ul>
            </div>
          `
              : ''
          }

          <div style="text-align: center; color: #475569; font-size: 14px;">
            <p style="margin: 0;">Questions? Call +91 9778280044 or email neurospinehyd@drsayuj.com</p>
            <p style="margin: 8px 0 0;">Yashoda Hospital, Malakpet, Hyderabad</p>
          </div>
        </div>
      `,
    };
  }
};

// Email sending functions
export const sendContactFormEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}) => {
  try {
    const template = emailTemplates.contactForm(data);
    
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL, ADMIN_EMAIL],
      replyTo: data.email,
      subject: template.subject,
      html: template.html,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const sendAppointmentRequestEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  condition?: string;
  urgency?: string;
  message?: string;
}) => {
  try {
    const template = emailTemplates.appointmentRequest(data);
    
    // Send to admin
    const adminResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL, ADMIN_EMAIL],
      replyTo: data.email,
      subject: template.subject,
      html: template.html,
    });

    // Send confirmation to patient
    const patientTemplate = emailTemplates.patientConfirmation(data);
    const patientResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: patientTemplate.subject,
      html: patientTemplate.html,
    });

    return { 
      success: true, 
      adminMessageId: adminResult.data?.id,
      patientMessageId: patientResult.data?.id 
    };
  } catch (error) {
    console.error('Error sending appointment request email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const sendPreAppointmentBriefingEmail = async (data: {
  patientEmail: string;
  patientName: string;
  condition: string;
  procedureType: string;
  appointmentDate?: string;
  briefingContent: string;
  sections?: {
    preparation?: string;
    whatToExpect?: string;
    recovery?: string;
    questionsToAsk?: string;
  };
  sources?: string[];
}) => {
  try {
    const template = emailTemplates.preAppointmentBriefing({
      patientName: data.patientName,
      condition: data.condition,
      procedureType: data.procedureType,
      appointmentDate: data.appointmentDate,
      briefingContent: data.briefingContent,
      sections: data.sections,
      sources: data.sources,
    });

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.patientEmail,
      bcc: ADMIN_EMAIL,
      subject: template.subject,
      html: template.html,
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending pre-appointment briefing email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const sendNewsletterSubscriptionEmail = async (data: {
  email: string;
  name?: string;
}) => {
  try {
    const template = emailTemplates.newsletterSubscription(data);
    
    // Send confirmation to subscriber
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: template.subject,
      html: template.html,
    });

    // Also notify admin (optional)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Newsletter Subscription - ${data.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending newsletter subscription email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Test email function
export const sendTestEmail = async () => {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'Test Email - Dr. Sayuj Krishnan Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Email System Test</h2>
          <p>This is a test email to verify that the email system is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Website:</strong> <a href="https://www.drsayuj.info">drsayuj.info</a></p>
        </div>
      `
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
