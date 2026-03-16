/**
 * GET /api/data/recent-patients
 *
 * Returns a list of recent patients for the review harvester cron.
 * Protected by a bearer token (REVIEW_PATIENTS_SECRET env var).
 *
 * Patient data is stored in RECENT_PATIENTS_JSON env var (set in Vercel dashboard)
 * as a JSON array: [{ "name": "...", "phone": "+91...", "visitDate": "2026-03-13" }]
 *
 * This endpoint is NEVER public — it requires a secret Authorization header.
 * Do NOT store patient data in source code or public files.
 */

import { NextRequest, NextResponse } from 'next/server'

interface Patient {
  name: string
  phone: string
  visitDate: string // ISO date string YYYY-MM-DD
}

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  // --- Auth ---
  const secret = process.env.REVIEW_PATIENTS_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.replace('Bearer ', '').trim()

  if (token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // --- Read patient data from env var (set in Vercel dashboard, not in code) ---
  const raw = process.env.RECENT_PATIENTS_JSON ?? '[]'
  let patients: Patient[] = []

  try {
    patients = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid patient data format' }, { status: 500 })
  }

  // --- Filter to patients whose visit was exactly 3 days ago ---
  const today = new Date()
  const threeDaysAgo = new Date(today)
  threeDaysAgo.setDate(today.getDate() - 3)
  const targetDate = threeDaysAgo.toISOString().split('T')[0]

  const eligible = patients.filter((p) => p.visitDate === targetDate)

  return NextResponse.json(
    {
      date: targetDate,
      count: eligible.length,
      patients: eligible,
    },
    {
      status: 200,
      headers: {
        // Never cache — always fresh
        'Cache-Control': 'no-store',
        // Don't expose in browser
        'X-Robots-Tag': 'noindex',
      },
    }
  )
}
