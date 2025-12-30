import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat, readFile } from 'fs/promises';
import { join } from 'path';

interface BotMetrics {
  totalFiles: number;
  totalSize: number;
  lastActivity: string;
  filesToday: number;
  averageFileSize: number;
  healthStatus: 'healthy' | 'warning' | 'error';
  uptime: string;
  responseTime: number;
  telegramBotEvents: number;
  telegramBotSuccessRate: number;
  telegramBotAvgProcessingTime: number;
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const metrics: BotMetrics = {
      totalFiles: 0,
      totalSize: 0,
      lastActivity: '',
      filesToday: 0,
      averageFileSize: 0,
      healthStatus: 'healthy',
      uptime: '',
      responseTime: 0,
      telegramBotEvents: 0,
      telegramBotSuccessRate: 0,
      telegramBotAvgProcessingTime: 0
    };

    // Check content directory
    const contentDir = join(process.cwd(), 'geo-bot', 'output');
    const schemaDir = join(process.cwd(), 'schemas');
    
    let allFiles: Array<{ path: string; mtime: Date; size: number }> = [];
    let latestActivity = new Date(0);

    // Get content files
    try {
      const contentFiles = await readdir(contentDir);
      for (const file of contentFiles) {
        if (file.endsWith('.md') && file !== 'latest.json') {
          const filePath = join(contentDir, file);
          const stats = await stat(filePath);
          allFiles.push({
            path: filePath,
            mtime: stats.mtime,
            size: stats.size
          });
          
          if (stats.mtime > latestActivity) {
            latestActivity = stats.mtime;
          }
        }
      }
    } catch (error) {
      console.log('Content directory not found:', contentDir);
    }

    // Get schema files
    try {
      const schemaFiles = await readdir(schemaDir);
      for (const file of schemaFiles) {
        if (file.endsWith('.jsonld')) {
          const filePath = join(schemaDir, file);
          const stats = await stat(filePath);
          allFiles.push({
            path: filePath,
            mtime: stats.mtime,
            size: stats.size
          });
          
          if (stats.mtime > latestActivity) {
            latestActivity = stats.mtime;
          }
        }
      }
    } catch (error) {
      console.log('Schema directory not found:', schemaDir);
    }

    // Calculate metrics
    metrics.totalFiles = allFiles.length;
    metrics.totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
    metrics.lastActivity = latestActivity.toISOString();
    
    // Files created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    metrics.filesToday = allFiles.filter(file => file.mtime >= today).length;
    
    // Average file size
    metrics.averageFileSize = metrics.totalFiles > 0 ? metrics.totalSize / metrics.totalFiles : 0;
    
    // Health status based on activity
    const hoursSinceLastActivity = (Date.now() - latestActivity.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastActivity > 24) {
      metrics.healthStatus = 'error';
    } else if (hoursSinceLastActivity > 12) {
      metrics.healthStatus = 'warning';
    } else {
      metrics.healthStatus = 'healthy';
    }
    
    // Calculate uptime (simplified - time since first file)
    if (allFiles.length > 0) {
      const oldestFile = allFiles.reduce((oldest, file) => 
        file.mtime < oldest.mtime ? file : oldest
      );
      const uptimeMs = Date.now() - oldestFile.mtime.getTime();
      const uptimeDays = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
      metrics.uptime = `${uptimeDays} days`;
    } else {
      metrics.uptime = '0 days';
    }
    
    // Response time
    metrics.responseTime = Date.now() - startTime;

    // Calculate Telegram bot metrics
    try {
      const botLogsDir = join(process.cwd(), 'logs', 'telegram-bot');
      const today = new Date().toISOString().split('T')[0];
      const botLogFile = join(botLogsDir, `telegram-bot-${today}.json`);
      
      const botLogContent = await readFile(botLogFile, 'utf-8');
      const botEvents = JSON.parse(botLogContent);
      
      metrics.telegramBotEvents = botEvents.length;
      
      if (botEvents.length > 0) {
        const successfulEvents = botEvents.filter((event: any) => event.success);
        metrics.telegramBotSuccessRate = (successfulEvents.length / botEvents.length) * 100;
        
        const processingTimes = botEvents
          .filter((event: any) => event.processing_time_ms > 0)
          .map((event: any) => event.processing_time_ms);
        
        if (processingTimes.length > 0) {
          metrics.telegramBotAvgProcessingTime = processingTimes.reduce((sum: number, time: number) => sum + time, 0) / processingTimes.length;
        }
      }
    } catch (error) {
      // No bot logs found or error reading them
      console.log('No telegram bot logs found for today');
    }

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error calculating metrics:', error);
    return NextResponse.json(
      { error: 'Failed to calculate metrics' },
      { status: 500 }
    );
  }
}