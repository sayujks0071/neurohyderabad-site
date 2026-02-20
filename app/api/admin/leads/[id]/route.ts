import { NextRequest, NextResponse } from 'next/server';
import { patients } from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { lead_status } = body;

    if (!lead_status) {
      return NextResponse.json(
        { error: 'Missing lead_status' },
        { status: 400 }
      );
    }

    // Pass undefined for score, so only status is updated
    await patients.updateLeadScore(id, undefined, lead_status);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return NextResponse.json(
      { error: 'Failed to update lead status' },
      { status: 500 }
    );
  }
}
