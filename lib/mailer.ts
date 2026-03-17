import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const CONTACT_EMAIL = process.env.CONTACT_FORM_TO || 'hellodr@drsayuj.info';

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is missing, skipping email to", to);
    return { success: false, error: 'RESEND_API_KEY missing' };
  }

  try {
    const fromEmail = 'Dr. Sayuj Krishnan S <hellodr@drsayuj.info>';
    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      replyTo,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Email sending failed", error);
    return { success: false, error };
  }
}
