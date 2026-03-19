#!/usr/bin/env ts-node
/**
 * Automate Weekly Performance Reports from Middleware
 */

import { middlewareApi } from '../src/lib/middleware/api-client';
import * as fs from 'fs';
import * as path from 'path';

async function generateWeeklyReport() {
  console.log('Generating weekly performance report...');
  try {
    const end = Date.now();
    const start = end - 7 * 24 * 60 * 60 * 1000;

    const metrics = await middlewareApi.getMetrics({
      metrics: ['web_vitals.lcp', 'error.rate', 'http.response_time', 'form.success_rate'],
      timeRange: { start, end },
      filters: []
    }).catch(e => {
      console.error('Failed to get metrics:', e.message);
      return null;
    });

    const report = {
      timestamp: new Date().toISOString(),
      period: 'Last 7 Days',
      summary: 'Middleware Weekly Performance Report',
      data: metrics || 'No data available or API error'
    };

    const reportPath = path.join(process.cwd(), 'reports', 'middleware-weekly.json');
    if (!fs.existsSync(path.dirname(reportPath))) {
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Report generated successfully at ${reportPath}`);
  } catch (error: any) {
    console.error('Error generating report:', error.message);
  }
}

generateWeeklyReport();
