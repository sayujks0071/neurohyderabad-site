import { NextRequest, NextResponse } from 'next/server';
import { db, appointments } from '@/src/lib/db';
import { verifyAdminAccess } from '@/src/lib/security';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/appointments
 * Fetch all appointments from the database
 */
export async function GET(request: NextRequest) {
  // 🛡️ Sentinel: Verify admin access
  const { isAuthorized, response } = verifyAdminAccess(request);
  if (!isAuthorized) {
    return response!;
  }

  try {
    const result = await appointments.getRecent(100);
    
    return NextResponse.json({
      appointments: result,
      count: result.length,
    });
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments', appointments: [] },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/appointments
 * Update appointment status
 */
export async function PATCH(request: NextRequest) {
  // 🛡️ Sentinel: Verify admin access
  const { isAuthorized, response } = verifyAdminAccess(request);
  if (!isAuthorized) {
    return response!;
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status', validStatuses },
        { status: 400 }
      );
    }

    const updated = await appointments.updateStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment: updated,
    });
  } catch (error) {
    console.error('Failed to update appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}
