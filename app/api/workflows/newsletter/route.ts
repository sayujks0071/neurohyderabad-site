/**
 * Weekly Newsletter Broadcast Workflow
 *
 * Triggered by Vercel Cron: 30 3 * * 1 (Mondays at 9:00 AM IST = 3:30 AM UTC)
 * Sends a newsletter broadcast to all subscribers in the Resend audience.
 *
 * Required env vars:
 *   RESEND_API_KEY                 — Resend API key
 *   RESEND_NEWSLETTER_AUDIENCE_ID  — Resend audience ID for newsletter subscribers
 *   CRON_SECRET                    — Shared secret for cron auth (set in Vercel dashboard)
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function getNewsletterHtml(dateStr: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NeuroHyderabad Insights</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a; background: #f9fafb;">
  <div style="background: linear-gradient(135deg, #005EB8 0%, #0073E6 100%); padding: 36px 32px; border-radius: 12px; text-align: center; margin-bottom: 32px;">
    <h1 style="color: #ffffff; margin: 0 0 8px; font-size: 26px; letter-spacing: -0.5px;">NeuroHyderabad Insights</h1>
    <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 15px;">${dateStr}</p>
  </div>

  <div style="background: #ffffff; border-radius: 12px; padding: 32px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
    <p style="font-size: 16px; line-height: 1.7; margin-top: 0;">Dear Patient,</p>
    <p style="font-size: 16px; line-height: 1.7;">Welcome to this edition of NeuroHyderabad Insights. Dr. Sayuj Krishnan shares the latest in neurosurgery, spine care, and patient wellbeing.</p>

    <div style="background: #f0f7ff; border-left: 4px solid #005EB8; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 28px 0;">
      <h2 style="color: #005EB8; margin: 0 0 14px; font-size: 18px;">&#x1F9E0; This Month's Highlights</h2>
      <ul style="margin: 0; padding-left: 20px; line-height: 2.0; font-size: 15px; color: #374151;">
        <li>Advances in minimally invasive spine surgery</li>
        <li>Recovery tips after neurosurgical procedures</li>
        <li>Understanding MRI reports for spine conditions</li>
        <li>When to seek immediate neurological care</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="https://www.drsayuj.info/blog" style="background: #005EB8; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">Read Latest Articles &#x2192;</a>
    </div>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px;">
    <p style="margin: 0 0 10px; font-size: 15px; font-weight: 600; color: #92400e;">&#x1F4C5; Need a Consultation?</p>
    <p style="margin: 0 0 12px; font-size: 14px; color: #78350f; line-height: 1.6;">Book an appointment with Dr. Sayuj Krishnan — Consultant Neurosurgeon at Yashoda Hospital, Malakpet, Hyderabad. Expert in endoscopic spine surgery, brain tumors, and awake craniotomy.</p>
    <a href="https://www.drsayuj.info/appointments" style="color: #005EB8; font-size: 14px; font-weight: 600; text-decoration: none;">Schedule Your Consultation &#x2192;</a>
  </div>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;">

  <p style="font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.8; margin: 0;">
    Dr. Sayuj Krishnan | Neurosurgeon | Yashoda Hospital, Malakpet, Hyderabad<br>
    <a href="https://www.drsayuj.info" style="color: #9ca3af; text-decoration: none;">www.drsayuj.info</a> &nbsp;|&nbsp;
    <a href="https://www.drsayuj.info/unsubscribe" style="color: #9ca3af; text-decoration: none;">Unsubscribe</a>
  </p>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  // Verify Vercel Cron authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
    if (!audienceId || !resend) {
    console.error('[Newsletter] RESEND_NEWSLETTER_AUDIENCE_ID not configured');
    return NextResponse.json(
      { error: 'Newsletter audience not configured. Set RESEND_NEWSLETTER_AUDIENCE_ID in Vercel environment variables.' },
      { status: 500 }
    );
  }

  try {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    });

    // Create broadcast
    const { data: broadcast, error: createError } = await resend.broadcasts.create({
      audienceId,
      from: 'Dr. Sayuj Krishnan <newsletter@drsayuj.info>',
      replyTo: 'hellodr@drsayuj.info',
      subject: `NeuroHyderabad Insights — ${dateStr}`,
      html: getNewsletterHtml(dateStr),
    });

    if (createError || !broadcast?.id) {
      throw new Error(createError?.message || 'Failed to create broadcast');
    }

    // Send the broadcast
    const { error: sendError } = await resend.broadcasts.send(broadcast.id);
    if (sendError) {
      throw new Error(sendError.message);
    }

    console.log(`[Newsletter] Broadcast ${broadcast.id} sent to audience ${audienceId}`);
    return NextResponse.json({
      success: true,
      broadcastId: broadcast.id,
      audience: audienceId,
      sentAt: now.toISOString(),
    });
  } catch (error) {
    console.error('[Newsletter workflow] Failed:', error);
    return NextResponse.json(
      {
        error: 'Newsletter broadcast failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
