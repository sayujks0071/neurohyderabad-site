import { NextRequest, NextResponse } from 'next/server';
import tracker from '@middleware.io/agent-apm-nextjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, message, data } = body;

    // Log based on level
    switch (level) {
      case 'warn':
        tracker.warn(message, data);
        break;
      case 'error':
        tracker.error(message, data);
        break;
      case 'info':
        tracker.info(message, data);
        break;
      default:
        tracker.info(message, data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    tracker.error('APM log handler error', { error: errorMessage });
    return NextResponse.json({ error: 'Failed to log' }, { status: 500 });
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({ 
    status: 'healthy',
    service: 'neurosurgery-nextjs-site',
    timestamp: new Date().toISOString()
  });
}
