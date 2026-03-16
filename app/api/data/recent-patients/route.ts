/**
 * GET /api/data/recent-patients
 *
 * Returns patients whose booking was confirmed 3 days ago.
 * Data comes from Vercel KV (auto-populated by booking webhooks).
 * Protected by bearer token — never publicly accessible.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getPatientsByDaysAgo } from '@/src/lib/patient-kv'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const secret = process.env.REVIEW_PATIENTS_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '').trim()
  if (token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const patients = await getPatientsByDaysAgo(3)

  const today = new Date()
  today.setDate(today.getDate() - 3)
  const targetDate = today.toISOString().split('T')[0]

  return NextResponse.json(
    { date: targetDate, count: patients.length, patients },
    { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } }
  )
}
