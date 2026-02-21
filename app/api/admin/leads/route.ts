import { NextResponse } from 'next/server';
import { patients } from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // In a real app, you should check for authentication here
    // For now, we assume this is protected by middleware or similar mechanism
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const leads = await patients.getRecent(100);
    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
