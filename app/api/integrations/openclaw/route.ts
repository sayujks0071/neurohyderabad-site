import { NextRequest, NextResponse } from 'next/server';
import { appointments, patients } from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.OPENCLAW_API_KEY;

    if (!validApiKey || apiKey !== validApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing API key' },
        { status: 401 }
      );
    }

    // 2. Tool Selection
    const searchParams = request.nextUrl.searchParams;
    const tool = searchParams.get('tool');

    if (!tool) {
      return NextResponse.json({
        message: 'OpenClaw Integration API',
        tools: ['dashboard', 'appointments', 'patients'],
        usage: '?tool=<tool_name>'
      });
    }

    // 3. Tool Execution
    switch (tool) {
      case 'dashboard': {
        const stats = await appointments.getStats();
        return NextResponse.json({
          tool: 'dashboard',
          data: stats
        });
      }

      case 'appointments': {
        const limit = parseInt(searchParams.get('limit') || '10');
        const recent = await appointments.getRecent(limit);

        // Mask sensitive data if needed, or return as is (assuming API key holder is trusted)
        return NextResponse.json({
          tool: 'appointments',
          count: recent.length,
          data: recent
        });
      }

      case 'patients': {
        const email = searchParams.get('email');
        if (!email) {
          return NextResponse.json(
            { error: 'Missing Parameter', message: 'Email is required for patient lookup' },
            { status: 400 }
          );
        }

        const patient = await patients.findByEmail(email);
        if (!patient) {
          return NextResponse.json(
            { error: 'Not Found', message: `No patient found with email: ${email}` },
            { status: 404 }
          );
        }

        return NextResponse.json({
          tool: 'patients',
          data: patient
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid Tool', message: `Tool '${tool}' not supported` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('OpenClaw API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
