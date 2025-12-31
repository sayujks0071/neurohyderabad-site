import { Resend } from 'resend';

// Initialize Resend with API key (with fallback for development)
const resend = new Resend(process.env.RESEND_API_KEY || 're_development_key');

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
  from: string;
}

export class EmailService {
  private static fromEmail = 'Dr. Sayuj Krishnan <hellodr@drsayuj.info>';

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
      // Check if we have a valid API key
      if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_development_key') {
        console.log('Development mode: Email not sent (no API key)');
        return { success: true, messageId: 'dev_mode', development: true };
      }
      
      const result = await resend.emails.send(emailData);
      console.log('Welcome email sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send welcome email:', error);
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
      // Check if we have a valid API key
      if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_development_key') {
        console.log('Development mode: Appointment confirmation not sent (no API key)');
        return { success: true, messageId: 'dev_mode', development: true };
      }
      
      const result = await resend.emails.send(emailData);
      console.log('Appointment confirmation sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send appointment confirmation:', error);
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
      // Check if we have a valid API key
      if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_development_key') {
        console.log('Development mode: Appointment reminder not sent (no API key)');
        return { success: true, messageId: 'dev_mode', development: true };
      }
      
      const result = await resend.emails.send(emailData);
      console.log('Appointment reminder sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send appointment reminder:', error);
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
      // Check if we have a valid API key
      if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_development_key') {
        console.log('Development mode: Emergency notification not sent (no API key)');
        return { success: true, messageId: 'dev_mode', development: true };
      }
      
      const result = await resend.emails.send(emailData);
      console.log('Emergency notification sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send emergency notification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  // Send conversion notification to team
  static async sendConversionNotification(notification: any) {
    const emailData: EmailTemplate = {
      to: process.env.ADMIN_EMAIL || 'hellodr@drsayuj.info',
      from: this.fromEmail,
      subject: `New Conversion: ${notification.conversionType} (Score: ${notification.score})`,
      text: `New Conversion Alert

Type: ${notification.conversionType}
Score: ${notification.score}
Page: ${notification.page}
Priority: ${notification.priority}
Timestamp: ${new Date(notification.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Check the analytics dashboard for more details.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">New Conversion Alert</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Analytics Notification</p>
          </div>

          <div style="padding: 30px; background: #f8fafc;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
              <p><strong>Type:</strong> ${notification.conversionType}</p>
              <p><strong>Score:</strong> ${notification.score}</p>
              <p><strong>Page:</strong> ${notification.page}</p>
              <p><strong>Priority:</strong> <span style="color: ${notification.priority === 'high' ? '#dc2626' : '#059669'}; font-weight: bold;">${notification.priority.toUpperCase()}</span></p>
              <p><strong>Time:</strong> ${new Date(notification.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </div>
      `
    };

    try {
      // Check if we have a valid API key
      if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_development_key') {
        console.log('Development mode: Conversion notification not sent (no API key)');
        return { success: true, messageId: 'dev_mode', development: true };
      }

      const result = await resend.emails.send(emailData);
      console.log('Conversion notification sent successfully:', result);
      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Failed to send conversion notification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }
}

export default EmailService;
