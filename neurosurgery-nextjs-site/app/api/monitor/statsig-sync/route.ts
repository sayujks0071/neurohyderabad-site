import { NextRequest, NextResponse } from 'next/server';

interface StatsigEvent {
  eventName: string;
  userID: string;
  value?: number;
  metadata?: Record<string, any>;
  time?: number;
}

interface TelegramBotStatsigEvent {
  event_type: string;
  bot_id: string;
  content_type: string;
  file_count: number;
  total_size: number;
  processing_time_ms: number;
  success: boolean;
  error_message?: string;
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
      metadata 
    } = body;

    // Validate required fields
    if (!event_type || !bot_id) {
      return NextResponse.json(
        { error: 'Missing required fields: event_type, bot_id' },
        { status: 400 }
      );
    }

    // Create Statsig events based on bot activity
    const statsigEvents: StatsigEvent[] = [];

    // Main bot activity event
    statsigEvents.push({
      eventName: 'Telegram_Bot_Activity',
      userID: `telegram-bot-${bot_id}`,
      value: file_count || 0,
      metadata: {
        bot_id,
        event_type,
        content_type: content_type || 'markdown',
        file_count: file_count || 0,
        total_size: total_size || 0,
        processing_time_ms: processing_time_ms || 0,
        success: success !== undefined ? success : true,
        error_message,
        ...metadata
      },
      time: Date.now()
    });

    // Content generation event
    if (event_type === 'content_generated' && success) {
      statsigEvents.push({
        eventName: 'Content_Generated',
        userID: `telegram-bot-${bot_id}`,
        value: file_count || 0,
        metadata: {
          bot_id,
          content_type: content_type || 'markdown',
          file_count: file_count || 0,
          total_size: total_size || 0,
          processing_time_ms: processing_time_ms || 0,
          ...metadata
        },
        time: Date.now()
      });
    }

    // Error event
    if (!success && error_message) {
      statsigEvents.push({
        eventName: 'Bot_Error',
        userID: `telegram-bot-${bot_id}`,
        metadata: {
          bot_id,
          event_type,
          error_message,
          content_type: content_type || 'markdown',
          ...metadata
        },
        time: Date.now()
      });
    }

    // Performance metrics
    if (processing_time_ms && processing_time_ms > 0) {
      statsigEvents.push({
        eventName: 'Bot_Performance',
        userID: `telegram-bot-${bot_id}`,
        value: processing_time_ms,
        metadata: {
          bot_id,
          event_type,
          content_type: content_type || 'markdown',
          file_count: file_count || 0,
          total_size: total_size || 0,
          ...metadata
        },
        time: Date.now()
      });
    }

    // File size metrics
    if (total_size && total_size > 0) {
      statsigEvents.push({
        eventName: 'Content_Size',
        userID: `telegram-bot-${bot_id}`,
        value: total_size,
        metadata: {
          bot_id,
          event_type,
          content_type: content_type || 'markdown',
          file_count: file_count || 0,
          ...metadata
        },
        time: Date.now()
      });
    }

    // Send events to Statsig (in a real implementation, you would use the Statsig SDK)
    // For now, we'll return the events that should be sent
    const statsigPayload = {
      events: statsigEvents,
      user: {
        userID: `telegram-bot-${bot_id}`,
        customProperties: {
          bot_type: 'telegram-seo',
          bot_id,
          platform: 'replit',
          integration: 'statsig'
        }
      }
    };

    // Log the Statsig events for debugging
    console.log('Statsig events to be sent:', JSON.stringify(statsigPayload, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Statsig events prepared successfully',
      events_sent: statsigEvents.length,
      statsig_payload: statsigPayload,
      events: statsigEvents.map(event => ({
        eventName: event.eventName,
        userID: event.userID,
        value: event.value,
        metadata_keys: Object.keys(event.metadata || {})
      }))
    });
  } catch (error) {
    console.error('Error preparing Statsig events:', error);
    return NextResponse.json(
      { error: 'Failed to prepare Statsig events' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bot_id = searchParams.get('bot_id');
    const event_type = searchParams.get('event_type');
    const hours = parseInt(searchParams.get('hours') || '24');

    // This would typically query Statsig for recent events
    // For now, we'll return a summary of what would be available
    const summary = {
      bot_id: bot_id || 'all',
      event_type: event_type || 'all',
      time_range_hours: hours,
      available_events: [
        'Telegram_Bot_Activity',
        'Content_Generated',
        'Bot_Error',
        'Bot_Performance',
        'Content_Size'
      ],
      sample_queries: {
        telegram_bot_activity: `/api/monitor/statsig-sync?bot_id=${bot_id}&event_type=Telegram_Bot_Activity`,
        content_generation: `/api/monitor/statsig-sync?bot_id=${bot_id}&event_type=Content_Generated`,
        bot_errors: `/api/monitor/statsig-sync?bot_id=${bot_id}&event_type=Bot_Error`,
        performance_metrics: `/api/monitor/statsig-sync?bot_id=${bot_id}&event_type=Bot_Performance`
      }
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching Statsig sync info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Statsig sync info' },
      { status: 500 }
    );
  }
}