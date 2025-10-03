import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface HealthCheck {
  status: 'healthy' | 'warning' | 'error';
  timestamp: string;
  checks: {
    contentDirectory: boolean;
    schemaDirectory: boolean;
    recentActivity: boolean;
    fileAccess: boolean;
  };
  metrics: {
    totalFiles: number;
    lastActivity: string;
    hoursSinceLastActivity: number;
  };
  errors: string[];
}

export async function GET(request: NextRequest) {
  try {
    const healthCheck: HealthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        contentDirectory: false,
        schemaDirectory: false,
        recentActivity: false,
        fileAccess: false
      },
      metrics: {
        totalFiles: 0,
        lastActivity: '',
        hoursSinceLastActivity: 0
      },
      errors: []
    };

    let allFiles: Array<{ mtime: Date }> = [];
    let latestActivity = new Date(0);

    // Check content directory
    const contentDir = join(process.cwd(), 'geo-bot', 'output');
    try {
      const contentFiles = await readdir(contentDir);
      healthCheck.checks.contentDirectory = true;
      
      for (const file of contentFiles) {
        if (file.endsWith('.md') && file !== 'latest.json') {
          try {
            const filePath = join(contentDir, file);
            const stats = await stat(filePath);
            allFiles.push({ mtime: stats.mtime });
            
            if (stats.mtime > latestActivity) {
              latestActivity = stats.mtime;
            }
          } catch (error) {
            healthCheck.errors.push(`Cannot access file ${file}: ${error}`);
          }
        }
      }
    } catch (error) {
      healthCheck.errors.push(`Content directory not accessible: ${error}`);
      healthCheck.checks.contentDirectory = false;
    }

    // Check schema directory
    const schemaDir = join(process.cwd(), 'schemas');
    try {
      const schemaFiles = await readdir(schemaDir);
      healthCheck.checks.schemaDirectory = true;
      
      for (const file of schemaFiles) {
        if (file.endsWith('.jsonld')) {
          try {
            const filePath = join(schemaDir, file);
            const stats = await stat(filePath);
            allFiles.push({ mtime: stats.mtime });
            
            if (stats.mtime > latestActivity) {
              latestActivity = stats.mtime;
            }
          } catch (error) {
            healthCheck.errors.push(`Cannot access schema file ${file}: ${error}`);
          }
        }
      }
    } catch (error) {
      healthCheck.errors.push(`Schema directory not accessible: ${error}`);
      healthCheck.checks.schemaDirectory = false;
    }

    // Check file access
    healthCheck.checks.fileAccess = allFiles.length > 0;

    // Check recent activity
    const hoursSinceLastActivity = latestActivity.getTime() > 0 ? 
      (Date.now() - latestActivity.getTime()) / (1000 * 60 * 60) : 999;
    
    healthCheck.checks.recentActivity = hoursSinceLastActivity < 24;
    
    // Set metrics
    healthCheck.metrics.totalFiles = allFiles.length;
    healthCheck.metrics.lastActivity = latestActivity.toISOString();
    healthCheck.metrics.hoursSinceLastActivity = hoursSinceLastActivity;

    // Determine overall status
    if (!healthCheck.checks.contentDirectory || !healthCheck.checks.schemaDirectory) {
      healthCheck.status = 'error';
    } else if (!healthCheck.checks.recentActivity || !healthCheck.checks.fileAccess) {
      healthCheck.status = 'warning';
    } else {
      healthCheck.status = 'healthy';
    }

    // Add status-specific errors
    if (healthCheck.status === 'error') {
      if (!healthCheck.checks.contentDirectory) {
        healthCheck.errors.push('Content directory is not accessible');
      }
      if (!healthCheck.checks.schemaDirectory) {
        healthCheck.errors.push('Schema directory is not accessible');
      }
    }

    if (healthCheck.status === 'warning') {
      if (!healthCheck.checks.recentActivity) {
        healthCheck.errors.push(`No activity in last 24 hours (last activity: ${hoursSinceLastActivity.toFixed(1)} hours ago)`);
      }
      if (!healthCheck.checks.fileAccess) {
        healthCheck.errors.push('No files found in monitored directories');
      }
    }

    return NextResponse.json(healthCheck);
  } catch (error) {
    console.error('Error performing health check:', error);
    return NextResponse.json(
      { 
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}