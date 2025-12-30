# Telegram Bot Monitoring Setup Guide

## Overview

This guide explains how to integrate your Replit Telegram bot with the monitoring system and Statsig dashboard for comprehensive tracking of bot activity and content generation.

## 🎯 What's Been Set Up

### 1. Monitoring Dashboard
- **URL**: `/monitor` - Real-time monitoring dashboard
- **Features**: Bot status, file metrics, activity logs, performance tracking
- **Auto-refresh**: Every 30 seconds

### 2. API Endpoints
- `/api/monitor/telegram-bot` - Log bot events
- `/api/monitor/statsig-sync` - Sync events to Statsig
- `/api/monitor/metrics` - Get bot metrics
- `/api/monitor/health` - Health checks
- `/api/monitor/alerts` - Alert system

### 3. Statsig Integration
- Automatic event tracking for bot activity
- Custom events: `Telegram_Bot_Activity`, `Content_Generated`, `Bot_Error`, `Bot_Performance`
- User ID: `telegram-bot-{bot_id}`

## 🔧 Integration Steps

### Step 1: Update Your Replit Telegram Bot

Add these webhook calls to your bot when it generates content:

```python
import requests
import json
from datetime import datetime

def log_bot_activity(event_type, bot_id, content_type, file_count, total_size, processing_time_ms, success=True, error_message=None, metadata=None):
    """
    Log bot activity to the monitoring system
    """
    webhook_url = "https://your-domain.com/api/monitor/telegram-bot"
    
    payload = {
        "event_type": event_type,
        "bot_id": bot_id,
        "content_type": content_type,
        "file_count": file_count,
        "total_size": total_size,
        "processing_time_ms": processing_time_ms,
        "success": success,
        "error_message": error_message,
        "metadata": metadata or {}
    }
    
    try:
        response = requests.post(webhook_url, json=payload, timeout=10)
        if response.status_code == 200:
            print(f"✅ Bot activity logged: {event_type}")
        else:
            print(f"❌ Failed to log activity: {response.status_code}")
    except Exception as e:
        print(f"❌ Error logging activity: {e}")

# Example usage in your bot:
def generate_content():
    start_time = datetime.now()
    bot_id = "replit-seo-bot"
    
    try:
        # Your content generation logic here
        files_generated = 3
        total_size = 15000  # bytes
        
        # Log successful generation
        processing_time = (datetime.now() - start_time).total_seconds() * 1000
        log_bot_activity(
            event_type="content_generated",
            bot_id=bot_id,
            content_type="markdown",
            file_count=files_generated,
            total_size=total_size,
            processing_time_ms=processing_time,
            success=True,
            metadata={"topics": ["neurosurgery", "hyderabad"], "language": "en"}
        )
        
    except Exception as e:
        # Log error
        processing_time = (datetime.now() - start_time).total_seconds() * 1000
        log_bot_activity(
            event_type="error",
            bot_id=bot_id,
            content_type="markdown",
            file_count=0,
            total_size=0,
            processing_time_ms=processing_time,
            success=False,
            error_message=str(e)
        )
```

### Step 2: Sync with Statsig Dashboard

Add this function to sync events with Statsig:

```python
def sync_to_statsig(event_type, bot_id, content_type, file_count, total_size, processing_time_ms, success=True, error_message=None, metadata=None):
    """
    Sync bot events to Statsig dashboard
    """
    statsig_url = "https://your-domain.com/api/monitor/statsig-sync"
    
    payload = {
        "event_type": event_type,
        "bot_id": bot_id,
        "content_type": content_type,
        "file_count": file_count,
        "total_size": total_size,
        "processing_time_ms": processing_time_ms,
        "success": success,
        "error_message": error_message,
        "metadata": metadata or {}
    }
    
    try:
        response = requests.post(statsig_url, json=payload, timeout=10)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Statsig sync successful: {result['events_sent']} events sent")
        else:
            print(f"❌ Statsig sync failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Error syncing to Statsig: {e}")
```

### Step 3: Add Status Updates

Add periodic status updates to your bot:

```python
def send_status_update(bot_id, status_message):
    """
    Send status update to monitoring system
    """
    log_bot_activity(
        event_type="status_update",
        bot_id=bot_id,
        content_type="status",
        file_count=0,
        total_size=0,
        processing_time_ms=0,
        success=True,
        metadata={"status": status_message}
    )

# Example: Send status every hour
import schedule
import time

def hourly_status():
    send_status_update("replit-seo-bot", "Bot running normally")

schedule.every().hour.do(hourly_status)

# In your main loop:
while True:
    schedule.run_pending()
    time.sleep(60)
```

## 📊 Monitoring Dashboard Features

### Real-time Metrics
- **Bot Status**: Healthy/Warning/Error based on recent activity
- **Total Files**: Count of generated content files
- **Total Size**: Combined size of all generated content
- **Last Activity**: Time since last bot activity
- **Files Today**: Files generated in the last 24 hours

### Telegram Bot Specific Metrics
- **Bot Events Today**: Number of bot events logged today
- **Success Rate**: Percentage of successful operations
- **Avg Processing Time**: Average time to generate content
- **Statsig Integration**: Status of Statsig event tracking

### Activity Log
- Real-time log of all bot activities
- Success/error status for each event
- Detailed information about each operation
- Source tracking (telegram-bot vs other sources)

## 🚨 Alert System

The monitoring system automatically creates alerts for:

### Error Alerts
- Content directory not accessible
- Schema directory not accessible
- Bot errors and failures

### Warning Alerts
- No activity for 12+ hours
- No activity for 24+ hours
- Low file count
- No recent file activity

### Info Alerts
- Large files detected (>1MB)
- System status updates

## 📈 Statsig Dashboard Integration

### Events Tracked
1. **Telegram_Bot_Activity** - Main bot activity event
2. **Content_Generated** - Successful content generation
3. **Bot_Error** - Bot errors and failures
4. **Bot_Performance** - Processing time metrics
5. **Content_Size** - File size metrics

### User Properties
- `bot_type`: "telegram-seo"
- `bot_id`: Your bot identifier
- `platform`: "replit"
- `integration`: "statsig"

### Dashboard Queries
You can create custom dashboards in Statsig using these events:

```sql
-- Bot activity over time
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as events,
  SUM(CASE WHEN metadata.success = true THEN 1 ELSE 0 END) as successful_events
FROM events 
WHERE event_name = 'Telegram_Bot_Activity'
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Content generation performance
SELECT 
  AVG(metadata.processing_time_ms) as avg_processing_time,
  COUNT(*) as total_generations,
  SUM(metadata.file_count) as total_files_generated
FROM events 
WHERE event_name = 'Content_Generated'
AND timestamp >= NOW() - INTERVAL 7 DAY;
```

## 🔧 Configuration

### Environment Variables
Add these to your Replit environment:

```bash
# Optional: Webhook secret for security
WEBHOOK_SECRET=your-secret-key

# Statsig configuration (if you want direct integration)
NEXT_PUBLIC_STATSIG_CLIENT_KEY=your-statsig-key
```

### Webhook Security
If you set a `WEBHOOK_SECRET`, include it in your bot requests:

```python
headers = {
    "Authorization": f"Bearer {webhook_secret}",
    "Content-Type": "application/json"
}
response = requests.post(webhook_url, json=payload, headers=headers)
```

## 📱 Accessing the Monitoring Dashboard

1. **Direct URL**: `https://your-domain.com/monitor`
2. **Navigation**: Add a link in your site's admin area
3. **Mobile**: Dashboard is fully responsive

### Dashboard Sections
- **Status Overview**: Quick health check
- **Recent Files**: Latest generated content
- **Activity Log**: Detailed event history
- **Performance Metrics**: System performance
- **Telegram Bot Metrics**: Bot-specific data
- **Statsig Integration**: Integration status

## 🚀 Getting Started

1. **Deploy the monitoring system** (already done)
2. **Update your Replit bot** with the webhook calls above
3. **Test the integration** by generating some content
4. **Check the dashboard** at `/monitor`
5. **Verify Statsig events** in your Statsig dashboard

## 🔍 Troubleshooting

### Common Issues

1. **No bot events showing**
   - Check if your bot is calling the webhook endpoints
   - Verify the webhook URL is correct
   - Check for network connectivity from Replit

2. **Statsig events not appearing**
   - Verify the Statsig sync endpoint is being called
   - Check Statsig dashboard for the events
   - Ensure proper event naming

3. **Dashboard not updating**
   - Check browser console for errors
   - Verify API endpoints are responding
   - Clear browser cache

### Debug Mode
Enable debug logging in your bot:

```python
import logging
logging.basicConfig(level=logging.DEBUG)

# This will show detailed logs of webhook calls
```

## 📞 Support

For issues with the monitoring system:
1. Check the `/monitor` dashboard for current status
2. Review the activity log for recent events
3. Check the alerts section for any warnings
4. Verify your bot is calling the webhook endpoints correctly

The monitoring system is now ready to track your Telegram bot's activity and provide insights through both the custom dashboard and your existing Statsig setup!