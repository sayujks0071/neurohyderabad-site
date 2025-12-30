import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface ActivityLogEntry {
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'warning' | 'info';
  details: string;
  source?: string;
  metadata?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, status, details, source, metadata } = body;

    // Validate required fields
    if (!action || !status || !details) {
      return NextResponse.json(
        { error: 'Missing required fields: action, status, details' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['success', 'error', 'warning', 'info'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Create log entry
    const logEntry: ActivityLogEntry = {
      timestamp: new Date().toISOString(),
      action,
      status,
      details,
      source: source || 'unknown',
      metadata: metadata || {}
    };

    // Ensure logs directory exists
    const logsDir = join(process.cwd(), 'logs');
    try {
      await mkdir(logsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Append to daily log file
    const today = new Date().toISOString().split('T')[0];
    const logFile = join(logsDir, `bot-activity-${today}.json`);

    let existingLogs: ActivityLogEntry[] = [];
    try {
      const existingContent = await readFile(logFile, 'utf-8');
      existingLogs = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is empty, start fresh
    }

    // Add new entry
    existingLogs.push(logEntry);

    // Keep only last 1000 entries to prevent file from growing too large
    if (existingLogs.length > 1000) {
      existingLogs = existingLogs.slice(-1000);
    }

    // Write back to file
    await writeFile(logFile, JSON.stringify(existingLogs, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Activity logged successfully',
      logEntry
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const limit = parseInt(searchParams.get('limit') || '100');

    const logsDir = join(process.cwd(), 'logs');
    const logFile = join(logsDir, `bot-activity-${date}.json`);

    try {
      const content = await readFile(logFile, 'utf-8');
      const logs: ActivityLogEntry[] = JSON.parse(content);
      
      // Return most recent entries
      const recentLogs = logs.slice(-limit).reverse();
      
      return NextResponse.json({
        date,
        logs: recentLogs,
        total: logs.length
      });
    } catch (error) {
      return NextResponse.json({
        date,
        logs: [],
        total: 0,
        message: 'No logs found for this date'
      });
    }
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}