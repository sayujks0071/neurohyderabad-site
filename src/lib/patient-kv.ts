/**
 * src/lib/patient-kv.ts
 *
 * Stores and retrieves recent patient records in Vercel KV (Redis).
 * Called by booking webhooks on confirmation; read by the review harvester.
 *
 * KV key format:  patient:<YYYY-MM-DD>:<phone>
 * KV set for TTL: 30 days (patients older than 30 days pruned automatically)
 */

import { kv } from '@vercel/kv'

export interface PatientRecord {
  name: string
  phone: string     // E.164 format e.g. +919778280044
  visitDate: string // YYYY-MM-DD
  complaint?: string
  source?: string
}

const TTL_SECONDS = 30 * 24 * 60 * 60 // 30 days

/**
 * Store a patient visit in KV after a confirmed booking.
 * Idempotent — safe to call multiple times for the same booking.
 */
export async function storePatientVisit(record: PatientRecord): Promise<void> {
  const key = `patient:${record.visitDate}:${record.phone.replace(/\D/g, '')}`
  await kv.set(key, JSON.stringify(record), { ex: TTL_SECONDS })
}

/**
 * Return all patients whose visitDate was exactly `daysAgo` days ago.
 * Used by the review harvester (daysAgo = 3).
 */
export async function getPatientsByDaysAgo(daysAgo: number): Promise<PatientRecord[]> {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const targetDate = date.toISOString().split('T')[0]

  const pattern = `patient:${targetDate}:*`
  const keys = await kv.keys(pattern)

  if (!keys.length) return []

  const records = await Promise.all(
    keys.map(async (key) => {
      const raw = await kv.get<string>(key)
      if (!raw) return null
      try {
        return typeof raw === 'string' ? (JSON.parse(raw) as PatientRecord) : (raw as PatientRecord)
      } catch {
        return null
      }
    })
  )

  return records.filter((r): r is PatientRecord => r !== null)
}
