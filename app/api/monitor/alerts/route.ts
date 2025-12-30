import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

interface AlertRule {
  name: string;
  condition: string;
  threshold: number;
  enabled: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const alerts: Alert[] = [];
    
    // Check for various alert conditions
    const contentDir = join(process.cwd(), 'geo-bot', 'output');
    const schemaDir = join(process.cwd(), 'schemas');
    
    let allFiles: Array<{ mtime: Date; name: string; size: number }> = [];
    let latestActivity = new Date(0);

    // Get all files and their timestamps
    try {
      const contentFiles = await readdir(contentDir);
      for (const file of contentFiles) {
        if (file.endsWith('.md') && file !== 'latest.json') {
          const filePath = join(contentDir, file);
          const stats = await stat(filePath);
          allFiles.push({
            mtime: stats.mtime,
            name: file,
            size: stats.size
          });
          
          if (stats.mtime > latestActivity) {
            latestActivity = stats.mtime;
          }
        }
      }
    } catch (error) {
      alerts.push({
        id: 'content-dir-error',
        type: 'error',
        title: 'Content Directory Error',
        message: `Cannot access content directory: ${contentDir}`,
        timestamp: new Date().toISOString(),
        resolved: false,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }

    try {
      const schemaFiles = await readdir(schemaDir);
      for (const file of schemaFiles) {
        if (file.endsWith('.jsonld')) {
          const filePath = join(schemaDir, file);
          const stats = await stat(filePath);
          allFiles.push({
            mtime: stats.mtime,
            name: file,
            size: stats.size
          });
          
          if (stats.mtime > latestActivity) {
            latestActivity = stats.mtime;
          }
        }
      }
    } catch (error) {
      alerts.push({
        id: 'schema-dir-error',
        type: 'error',
        title: 'Schema Directory Error',
        message: `Cannot access schema directory: ${schemaDir}`,
        timestamp: new Date().toISOString(),
        resolved: false,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }

    // Check for inactivity alerts
    if (latestActivity.getTime() > 0) {
      const hoursSinceLastActivity = (Date.now() - latestActivity.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastActivity > 48) {
        alerts.push({
          id: 'inactivity-critical',
          type: 'error',
          title: 'Critical Inactivity',
          message: `No bot activity for ${hoursSinceLastActivity.toFixed(1)} hours`,
          timestamp: new Date().toISOString(),
          resolved: false,
          metadata: { 
            hoursSinceLastActivity: hoursSinceLastActivity,
            lastActivity: latestActivity.toISOString()
          }
        });
      } else if (hoursSinceLastActivity > 24) {
        alerts.push({
          id: 'inactivity-warning',
          type: 'warning',
          title: 'Inactivity Warning',
          message: `No bot activity for ${hoursSinceLastActivity.toFixed(1)} hours`,
          timestamp: new Date().toISOString(),
          resolved: false,
          metadata: { 
            hoursSinceLastActivity: hoursSinceLastActivity,
            lastActivity: latestActivity.toISOString()
          }
        });
      }
    } else {
      alerts.push({
        id: 'no-activity-ever',
        type: 'error',
        title: 'No Activity Detected',
        message: 'No bot activity has been detected',
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    // Check for file count alerts
    if (allFiles.length === 0) {
      alerts.push({
        id: 'no-files',
        type: 'error',
        title: 'No Files Found',
        message: 'No content or schema files found in monitored directories',
        timestamp: new Date().toISOString(),
        resolved: false
      });
    } else if (allFiles.length < 3) {
      alerts.push({
        id: 'low-file-count',
        type: 'warning',
        title: 'Low File Count',
        message: `Only ${allFiles.length} files found in monitored directories`,
        timestamp: new Date().toISOString(),
        resolved: false,
        metadata: { fileCount: allFiles.length }
      });
    }

    // Check for recent file activity
    const recentFiles = allFiles.filter(file => {
      const hoursAgo = (Date.now() - file.mtime.getTime()) / (1000 * 60 * 60);
      return hoursAgo < 24;
    });

    if (recentFiles.length === 0 && allFiles.length > 0) {
      alerts.push({
        id: 'no-recent-files',
        type: 'warning',
        title: 'No Recent File Activity',
        message: 'No files have been modified in the last 24 hours',
        timestamp: new Date().toISOString(),
        resolved: false,
        metadata: { totalFiles: allFiles.length }
      });
    }

    // Check for unusually large files
    const largeFiles = allFiles.filter(file => file.size > 1024 * 1024); // > 1MB
    if (largeFiles.length > 0) {
      alerts.push({
        id: 'large-files',
        type: 'info',
        title: 'Large Files Detected',
        message: `${largeFiles.length} files are larger than 1MB`,
        timestamp: new Date().toISOString(),
        resolved: false,
        metadata: { 
          largeFiles: largeFiles.map(f => ({ name: f.name, size: f.size }))
        }
      });
    }

    // Sort alerts by severity and timestamp
    const severityOrder = { error: 0, warning: 1, info: 2 };
    alerts.sort((a, b) => {
      if (severityOrder[a.type] !== severityOrder[b.type]) {
        return severityOrder[a.type] - severityOrder[b.type];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return NextResponse.json({
      alerts,
      summary: {
        total: alerts.length,
        errors: alerts.filter(a => a.type === 'error').length,
        warnings: alerts.filter(a => a.type === 'warning').length,
        info: alerts.filter(a => a.type === 'info').length,
        unresolved: alerts.filter(a => !a.resolved).length
      }
    });
  } catch (error) {
    console.error('Error checking alerts:', error);
    return NextResponse.json(
      { error: 'Failed to check alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId, action } = body;

    if (!alertId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: alertId, action' },
        { status: 400 }
      );
    }

    if (action === 'resolve') {
      // In a real implementation, you would store resolved alerts in a database
      // For now, we'll just return success
      return NextResponse.json({
        success: true,
        message: `Alert ${alertId} marked as resolved`,
        alertId,
        action
      });
    } else if (action === 'dismiss') {
      return NextResponse.json({
        success: true,
        message: `Alert ${alertId} dismissed`,
        alertId,
        action
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Must be "resolve" or "dismiss"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing alert action:', error);
    return NextResponse.json(
      { error: 'Failed to process alert action' },
      { status: 500 }
    );
  }
}