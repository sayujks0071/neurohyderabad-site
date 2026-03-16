/**
 * src/lib/patient-kv.ts
 *
 * Stores and retrieves recent patient records in Vercel KV (Redis).
 * Called by booking webhooks on confirmation; read by the review harvester.
 *
 * KV key format:  patient:<YYYY-MM-DD>:<phone>
 * KV set for TTL: 30 days (patients older than 30 days pruned automatically)
 */

import Redis from 'ioredis'

export interface PatientRecord {
  name: string
  phone: string     // E.164 format e.g. +919778280044
  visitDate: string // YYYY-MM-DD
  complaint?: string
  source?: string   // e.g. 'whatsapp', 'web'
  // --- UTM Tracking ---
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  // --- Clinical Metadata ---
  procedureType?: 'consultation' | 'surgery' | 'follow-up'
  status?: 'confirmed' | 'cancelled' | 'post-op'
}

const REDIS_URL = process.env.openclaw_REDIS_URL || process.env.REDIS_URL || process.env.KV_URL
const TTL_SECONDS = 30 * 24 * 60 * 60 // 30 days

// Initialize Redis client lazily
let redis: Redis | null = null

function getRedis() {
  if (!redis && REDIS_URL) {
    redis = new Redis(REDIS_URL)
  }
  return redis
}

/**
 * Store a patient visit in Redis after a confirmed booking.
 */
export async function storePatientVisit(record: PatientRecord): Promise<void> {
  const client = getRedis()
  if (!client) throw new Error('Redis connection not configured')

  const key = `patient:${record.visitDate}:${record.phone.replace(/\D/g, '')}`
  await client.set(key, JSON.stringify(record), 'EX', TTL_SECONDS)
}

/**
 * Return all patients whose visitDate was exactly `daysAgo` days ago.
 */
export async function getPatientsByDaysAgo(daysAgo: number): Promise<PatientRecord[]> {
  const client = getRedis()
  if (!client) return []

  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const targetDate = date.toISOString().split('T')[0]

  const pattern = `patient:${targetDate}:*`
  const keys = await client.keys(pattern)

  if (!keys.length) return []

  const records = await Promise.all(
    keys.map(async (key) => {
      const raw = await client.get(key)
      if (!raw) return null
      try {
        return JSON.parse(raw) as PatientRecord
      } catch {
        return null
      }
    })
  )

  return records.filter((r): r is PatientRecord => r !== null)
}

/**
 * --- Slot Availability Helpers ---
 */

export interface ClinicSlot {
  nextSlot: string // ISO string
  isUrgent: boolean
  availableCount: number
}

const SLOT_KEY = 'clinic:availability:next'

/**
 * Update the next available slot displayed on the website widget.
 */
export async function updateNextAvailableSlot(slot: ClinicSlot): Promise<void> {
  const client = getRedis()
  if (!client) return
  await client.set(SLOT_KEY, JSON.stringify(slot))
}

/**
 * Get the next available slot for the frontend widget.
 * Falls back to a mock slot if no data is found (ensures widget always shows something).
 */
export async function getNextAvailableSlot(): Promise<ClinicSlot> {
  const client = getRedis()
  const raw = client ? await client.get(SLOT_KEY) : null
  
  if (raw) {
    try {
      return JSON.parse(raw) as ClinicSlot
    } catch {
      // Fall through to mock
    }
  }

  // Smart Mock: Next working day at 10:00 AM if no data exists
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)
  
  return {
    nextSlot: tomorrow.toISOString(),
    isUrgent: true,
    availableCount: 3
  }
}
