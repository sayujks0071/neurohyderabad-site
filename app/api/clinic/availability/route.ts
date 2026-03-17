/**
 * GET /api/clinic/availability
 * 
 * Public endpoint to fetch real-time clinic slot availability.
 * Data is managed via Redis and updated by OpenClaw or manual admin triggers.
 */

import { NextResponse } from 'next/server';
import { getNextAvailableSlot } from '@/src/lib/patient-kv';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const availability = await getNextAvailableSlot();
    
    return NextResponse.json(availability, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('[Availability API] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
