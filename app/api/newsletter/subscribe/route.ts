import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sendNewsletterSubscriptionEmail } from '@/lib/email';
import { rateLimit } from '@/src/lib/rate-limit';
import { slack } from '@/src/lib/slack';

export async function POST(request: NextRequest) {
  // 🛡️ Sentinel: Rate limiting - 5 requests per 60 seconds per IP to prevent email spam/DoS
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 5, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Send confirmation email
    const result = await sendNewsletterSubscriptionEmail({
      email: body.email,
      name: body.name || 'Subscriber'
    });

    if (result.success) {
      // Notify Slack
      await slack.notify(`📬 *New Newsletter Subscriber*
*Email:* ${body.email}
*Name:* ${body.name || 'Not provided'}`).catch(e => console.error('Slack notify failed:', e));

      // Store subscription in Resend contacts audience
      const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
      if (audienceId && process.env.RESEND_API_KEY) {
        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          const nameParts = ((body.name as string) || '').trim().split(' ');
          const first_name = nameParts[0] || '';
          const last_name = nameParts.slice(1).join(' ') || '';
          await resend.contacts.create({
            audienceId,
            email: body.email,
            first_name,
            last_name,
            unsubscribed: false,
          });
          console.log(`[Newsletter] Added ${body.email} to Resend audience ${audienceId}`);
        } catch (contactError) {
          // Non-fatal: contact may already exist or audience not yet set up
          console.error('[Newsletter] Failed to add contact to Resend audience:', contactError);
        }
      } else {
        console.warn('[Newsletter] RESEND_NEWSLETTER_AUDIENCE_ID not configured — skipping contact storage');
      }

      const messageId = "messageId" in result ? result.messageId : undefined;
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        ...(messageId ? { messageId } : {}),
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to subscribe'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process subscription'
    }, { status: 500 });
  }
}
