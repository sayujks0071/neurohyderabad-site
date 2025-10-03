import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat, readFile } from 'fs/promises';
import { join } from 'path';

interface BotActivity {
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'warning';
  details: string;
}

export async function GET(request: NextRequest) {
  try {
    const activities: BotActivity[] = [];
    
    // First, try to load from log files
    const logsDir = join(process.cwd(), 'logs');
    const today = new Date().toISOString().split('T')[0];
    const logFile = join(logsDir, `bot-activity-${today}.json`);
    
    try {
      const logContent = await readFile(logFile, 'utf-8');
      const logEntries = JSON.parse(logContent);
      
      // Convert log entries to BotActivity format
      for (const entry of logEntries.slice(-50)) { // Last 50 entries
        activities.push({
          timestamp: entry.timestamp,
          action: entry.action,
          status: entry.status,
          details: entry.details
        });
      }
    } catch (error) {
      // Log file doesn't exist or is empty, continue with file-based activity
    }
    
    // Check content directory for recent activity
    const contentDir = join(process.cwd(), 'geo-bot', 'output');
    const schemaDir = join(process.cwd(), 'schemas');
    
    let allFiles: Array<{ name: string; mtime: Date; size: number; type: string }> = [];

    // Get content files
    try {
      const contentFiles = await readdir(contentDir);
      for (const file of contentFiles) {
        if (file.endsWith('.md') && file !== 'latest.json') {
          const filePath = join(contentDir, file);
          const stats = await stat(filePath);
          allFiles.push({
            name: file,
            mtime: stats.mtime,
            size: stats.size,
            type: 'content'
          });
        }
      }
    } catch (error) {
      activities.push({
        timestamp: new Date().toISOString(),
        action: 'Directory Check',
        status: 'error',
        details: `Content directory not found: ${contentDir}`
      });
    }

    // Get schema files
    try {
      const schemaFiles = await readdir(schemaDir);
      for (const file of schemaFiles) {
        if (file.endsWith('.jsonld')) {
          const filePath = join(schemaDir, file);
          const stats = await stat(filePath);
          allFiles.push({
            name: file,
            mtime: stats.mtime,
            size: stats.size,
            type: 'schema'
          });
        }
      }
    } catch (error) {
      activities.push({
        timestamp: new Date().toISOString(),
        action: 'Directory Check',
        status: 'error',
        details: `Schema directory not found: ${schemaDir}`
      });
    }

    // Generate activity log from file timestamps
    allFiles.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    
    for (const file of allFiles.slice(0, 50)) { // Limit to 50 most recent
      const hoursAgo = (Date.now() - file.mtime.getTime()) / (1000 * 60 * 60);
      
      let status: 'success' | 'error' | 'warning' = 'success';
      if (hoursAgo > 24) {
        status = 'warning';
      }
      
      activities.push({
        timestamp: file.mtime.toISOString(),
        action: `File ${file.type === 'content' ? 'Generated' : 'Schema Created'}`,
        status,
        details: `${file.name} (${formatFileSize(file.size)})`
      });
    }

    // Add system health activities
    const totalFiles = allFiles.length;
    const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
    
    activities.push({
      timestamp: new Date().toISOString(),
      action: 'System Status',
      status: 'success',
      details: `Monitoring ${totalFiles} files (${formatFileSize(totalSize)} total)`
    });

    // Add recent activity summary
    const recentFiles = allFiles.filter(file => {
      const hoursAgo = (Date.now() - file.mtime.getTime()) / (1000 * 60 * 60);
      return hoursAgo < 24;
    });

    if (recentFiles.length > 0) {
      activities.push({
        timestamp: new Date().toISOString(),
        action: 'Recent Activity',
        status: 'success',
        details: `${recentFiles.length} files modified in last 24 hours`
      });
    } else {
      activities.push({
        timestamp: new Date().toISOString(),
        action: 'Recent Activity',
        status: 'warning',
        details: 'No files modified in last 24 hours'
      });
    }

    // Sort activities by timestamp (newest first)
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ logs: activities });
  } catch (error) {
    console.error('Error fetching activity log:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity log' },
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