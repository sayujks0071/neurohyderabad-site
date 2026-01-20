import { NextResponse } from 'next/server';
import { db, appointments, workflowRuns } from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get appointment stats
    const appointmentStats = await appointments.getStats();

    // Get workflow stats
    const workflowStats = await db.queryOne<{
      total: string;
      running: string;
      failed: string;
    }>(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'running') as running,
        COUNT(*) FILTER (WHERE status = 'failed') as failed
      FROM workflow_runs
      WHERE started_at > NOW() - INTERVAL '7 days'
    `);

    // Health check
    const health = await db.healthCheck();

    return NextResponse.json({
      appointments: {
        total: parseInt(appointmentStats?.total ?? '0'),
        pending: parseInt(appointmentStats?.pending ?? '0'),
        confirmed: parseInt(appointmentStats?.confirmed ?? '0'),
      },
      workflows: {
        total: parseInt(workflowStats?.total ?? '0'),
        running: parseInt(workflowStats?.running ?? '0'),
        failed: parseInt(workflowStats?.failed ?? '0'),
      },
      health: {
        status: health.ok ? 'healthy' : 'unhealthy',
        latency: health.latencyMs,
      },
    });
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json(
      {
        appointments: { total: 0, pending: 0, confirmed: 0 },
        workflows: { total: 0, running: 0, failed: 0 },
        health: { status: 'error', latency: 0 },
      },
      { status: 500 }
    );
  }
}
