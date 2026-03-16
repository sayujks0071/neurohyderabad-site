/**
 * POST /api/webhooks/whatsapp-booking
 *
 * Called by the OpenClaw WhatsApp agent when a patient completes the booking flow.
 * Stores the patient in Vercel KV for the 3-day review harvester cron.
 */

import { NextResponse } from 'next/server'
import { storePatientVisit } from '@/src/lib/patient-kv'

interface BookingPayload {
  name: string
  date: string       // Patient's preferred appointment date
  complaint: string
  phone: string      // "from-whatsapp" or actual E.164 number
}

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body: BookingPayload = await request.json()

    if (!body.name || !body.complaint) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Store the patient with today as visitDate (confirmation day)
    const visitDate = new Date().toISOString().split('T')[0]

    await storePatientVisit({
      name: body.name,
      phone: body.phone ?? 'unknown',
      visitDate,
      complaint: body.complaint,
      source: 'whatsapp',
    })

    console.log(`[WhatsApp Booking] Stored patient: ${body.name} (${visitDate})`)

    return NextResponse.json({
      success: true,
      message: `Booking received for ${body.name}. Team will call to confirm.`,
    })
  } catch (error) {
    console.error('[WhatsApp Booking] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
