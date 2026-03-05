/**
 * Appointment Reminders Workflow
 *
 * POST — Called by booking workflow when appointment is confirmed.
 *        Registers patient in the Resend appointments audience for reminder scheduling.
 *
 * GET  — Vercel Cron: 30 2 * * * (Daily at 8:00 AM IST = 2:30 AM UTC)
 *        Lists contacts in the appointments audience, filters those with appointments
 *        tomorrow, sends pre-appointment briefing emails, then removes them from the queue.
 *
 * Required env vars:
 *   RESEND_API_KEY                    — Resend API key
 *   RESEND_APPOINTMENTS_AUDIENCE_ID   — Resend audience ID for pending appointment reminders
 *   CRON_SECRET                       — Shared secret for cron auth
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sendPreAppointmentBriefingEmail } from '@/lib/email';

const resend = new Resend(process.env.RESEND_API_KEY);

/** POST — Register a new appointment for reminder */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, preferredDate } = body;

    if (!name || !email || !preferredDate) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, preferredDate' },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_APPOINTMENTS_AUDIENCE_ID;
    if (!audienceId) {
      console.warn('[Appointments] RESEND_APPOINTMENTS_AUDIENCE_ID not configured — skipping reminder registration');
      return NextResponse.json({ success: true, stored: false, reason: 'audience_not_configured' });
    }

    // Store in Resend contacts audience.
    // Convention: firstName = patient name, lastName = appointment date (YYYY-MM-DD)
    // The daily cron filters contacts by this date to send reminders.
    const appointmentDate = new Date(preferredDate);
    const isoDate = appointmentDate.toISOString().split('T')[0]; // YYYY-MM-DD

    // lastName stores the appointment date (YYYY-MM-DD) for the daily cron filter
    const { data: contact, error } = await resend.contacts.create({
      audienceId,
      email,
      firstName: name,
      lastName: isoDate, // Appointment date used by the daily cron for filtering
      unsubscribed: false,
    });

    if (error) {
      // Contact may already exist — treat as non-fatal
      console.error('[Appointments] Failed to store contact (may already exist):', error);
    }

    console.log(`[Appointments] Registered reminder for ${email} on ${isoDate}`);
    return NextResponse.json({
      success: true,
      stored: !!contact,
      appointmentDate: isoDate,
      email,
    });
  } catch (error) {
    console.error('[Appointments] POST error:', error);
    return NextResponse.json({ error: 'Failed to register appointment reminder' }, { status: 500 });
  }
}

/** GET — Daily cron: send reminders for tomorrow's appointments */
export async function GET(request: NextRequest) {
  // Verify Vercel Cron authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const audienceId = process.env.RESEND_APPOINTMENTS_AUDIENCE_ID;
  if (!audienceId) {
    return NextResponse.json(
      { error: 'RESEND_APPOINTMENTS_AUDIENCE_ID not configured. Set it in Vercel environment variables.' },
      { status: 500 }
    );
  }

  try {
    // Calculate tomorrow's date in IST (UTC+5:30)
    const nowUTC = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const tomorrowIST = new Date(nowUTC.getTime() + istOffset + 24 * 60 * 60 * 1000);
    const tomorrowISO = tomorrowIST.toISOString().split('T')[0]; // YYYY-MM-DD

    console.log(`[Appointment Reminders] Running daily check for appointments on ${tomorrowISO}`);

    // Fetch all contacts in the appointments audience
    const { data: contactsData, error: listError } = await resend.contacts.list({ audienceId });
    if (listError) {
      throw new Error(`Failed to list contacts: ${listError.message}`);
    }

    const allContacts = contactsData?.data ?? [];

    // Filter contacts whose appointment date (stored in lastName) matches tomorrow
    const upcomingContacts = allContacts.filter(
      (c) => c.last_name === tomorrowISO && !c.unsubscribed
    );

    console.log(`[Appointment Reminders] ${upcomingContacts.length} appointments found for ${tomorrowISO}`);

    const results: Array<{ email: string; sent: boolean; error?: string }> = [];

    for (const contact of upcomingContacts) {
      try {
        const result = await sendPreAppointmentBriefingEmail({
          name: contact.firstName || 'Patient',
          email: contact.email,
          procedure: 'your upcoming neurosurgery consultation',
          date: tomorrowISO,
        });

        if (result.success) {
          results.push({ email: contact.email, sent: true });
          // Remove from pending audience after successful send
          await resend.contacts.remove({ audienceId, email: contact.email }).catch((e) => {
            console.error(`[Appointments] Failed to remove ${contact.email} post-reminder:`, e);
          });
        } else {
          results.push({ email: contact.email, sent: false, error: result.error });
        }
      } catch (emailError) {
        const msg = emailError instanceof Error ? emailError.message : 'Unknown error';
        console.error(`[Appointments] Reminder failed for ${contact.email}:`, msg);
        results.push({ email: contact.email, sent: false, error: msg });
      }
    }

    return NextResponse.json({
      success: true,
      date: tomorrowISO,
      total: allContacts.length,
      processed: results.length,
      sent: results.filter((r) => r.sent).length,
      failed: results.filter((r) => !r.sent).length,
      results,
    });
  } catch (error) {
    console.error('[Appointment Reminders] Cron failed:', error);
    return NextResponse.json(
      {
        error: 'Appointment reminders cron failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
