import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface TelegramBotEvent {
  timestamp: string;
  event_type: 'content_generated' | 'content_published' | 'error' | 'status_update' | 'statsig_sync';
  bot_id: string;
  content_type: 'markdown' | 'schema' | 'both';
  file_count: number;
  total_size: number;
  processing_time_ms: number;
  success: boolean;
  error_message?: string;
  statsig_user_id?: string;
  metadata?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      event_type, 
      bot_id, 
      content_type, 
      file_count, 
      total_size, 
      processing_time_ms, 
      success, 
      error_message, 
      statsig_user_id,
      metadata 
    } = body;

    // Validate required fields
    if (!event_type || !bot_id) {
      return NextResponse.json(
        { error: 'Missing required fields: event_type, bot_id' },
        { status: 400 }
      );
    }

    // Create bot event
    const botEvent: TelegramBotEvent = {
      timestamp: new Date().toISOString(),
      event_type,
      bot_id,
      content_type: content_type || 'markdown',
      file_count: file_count || 0,
      total_size: total_size || 0,
      processing_time_ms: processing_time_ms || 0,
      success: success !== undefined ? success : true,
      error_message,
      statsig_user_id: statsig_user_id || 'telegram-bot',
      metadata: metadata || {}
    };

    // Ensure bot logs directory exists
    const botLogsDir = join(process.cwd(), 'logs', 'telegram-bot');
    try {
      await mkdir(botLogsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Append to daily bot log file
    const today = new Date().toISOString().split('T')[0];
    const botLogFile = join(botLogsDir, `telegram-bot-${today}.json`);

    let existingLogs: TelegramBotEvent[] = [];
    try {
      const existingContent = await readFile(botLogFile, 'utf-8');
      existingLogs = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is empty, start fresh
    }

    // Add new event
    existingLogs.push(botEvent);

    // Keep only last 1000 entries to prevent file from growing too large
    if (existingLogs.length > 1000) {
      existingLogs = existingLogs.slice(-1000);
    }

    // Write back to file
    await writeFile(botLogFile, JSON.stringify(existingLogs, null, 2));

    // Also log to general activity log for the monitoring dashboard
    const activityLogEntry = {
      action: `Telegram Bot: ${event_type}`,
      status: success ? 'success' : 'error',
      details: success ? 
        `Generated ${file_count} ${content_type} files (${formatFileSize(total_size)}) in ${processing_time_ms}ms` :
        `Error: ${error_message}`,
      source: 'telegram-bot',
      metadata: {
        bot_id,
        content_type,
        file_count,
        total_size,
        processing_time_ms,
        ...metadata
      }
    };

    // Log to activity log
    const logsDir = join(process.cwd(), 'logs');
    const logFile = join(logsDir, `bot-activity-${today}.json`);

    let existingLogs: any[] = [];
    try {
      const existingContent = await readFile(logFile, 'utf-8');
      existingLogs = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is empty, start fresh
    }

    existingLogs.push({
      timestamp: new Date().toISOString(),
      ...activityLogEntry
    });

    // Keep only last 1000 entries
    if (existingLogs.length > 1000) {
      existingLogs = existingLogs.slice(-1000);
    }

    await writeFile(logFile, JSON.stringify(existingLogs, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Telegram bot event logged successfully',
      event: botEvent
    });
  } catch (error) {
    console.error('Error logging telegram bot event:', error);
    return NextResponse.json(
      { error: 'Failed to log telegram bot event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const bot_id = searchParams.get('bot_id');
    const event_type = searchParams.get('event_type');
    const limit = parseInt(searchParams.get('limit') || '100');

    const botLogsDir = join(process.cwd(), 'logs', 'telegram-bot');
    const botLogFile = join(botLogsDir, `telegram-bot-${date}.json`);

    try {
      const content = await readFile(botLogFile, 'utf-8');
      let events: TelegramBotEvent[] = JSON.parse(content);
      
      // Filter by bot_id if specified
      if (bot_id) {
        events = events.filter(event => event.bot_id === bot_id);
      }
      
      // Filter by event_type if specified
      if (event_type) {
        events = events.filter(event => event.event_type === event_type);
      }
      
      // Return most recent events
      const recentEvents = events.slice(-limit).reverse();
      
      return NextResponse.json({
        date,
        bot_id: bot_id || 'all',
        event_type: event_type || 'all',
        events: recentEvents,
        total: events.length,
        summary: {
          total_events: events.length,
          successful_events: events.filter(e => e.success).length,
          failed_events: events.filter(e => !e.success).length,
          total_files_generated: events.reduce((sum, e) => sum + e.file_count, 0),
          total_size_generated: events.reduce((sum, e) => sum + e.total_size, 0),
          average_processing_time: events.length > 0 ? 
            events.reduce((sum, e) => sum + e.processing_time_ms, 0) / events.length : 0
        }
      });
    } catch (error) {
      return NextResponse.json({
        date,
        bot_id: bot_id || 'all',
        event_type: event_type || 'all',
        events: [],
        total: 0,
        summary: {
          total_events: 0,
          successful_events: 0,
          failed_events: 0,
          total_files_generated: 0,
          total_size_generated: 0,
          average_processing_time: 0
        },
        message: 'No telegram bot events found for this date'
      });
    }
  } catch (error) {
    console.error('Error fetching telegram bot events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch telegram bot events' },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}