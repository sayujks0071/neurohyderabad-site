import { BigQuery } from '@google-cloud/bigquery';
import { generateInsights, AnalyticsData } from '../src/lib/ai/analytics';
import * as fs from 'fs/promises';
import * as path from 'path';

// Configuration from Environment Variables
const DATASET_ID = process.env.GA4_BQ_DATASET;
const PROJECT_ID = process.env.GA4_BQ_PROJECT_ID;
const DAYS_BACK = parseInt(process.env.GA4_BQ_DAYS_BACK || '30', 10);

// Ensure required config is present
if (!DATASET_ID) {
  console.error('Error: GA4_BQ_DATASET environment variable is required.');
  console.error('Example: GA4_BQ_DATASET=analytics_123456789');
  process.exit(1);
}

const bigquery = new BigQuery({
  projectId: PROJECT_ID,
  // Credentials are automatically loaded from GOOGLE_APPLICATION_CREDENTIALS or default environment
});

async function runAnalysis() {
  console.log(`Running GA4 BigQuery Analysis...`);
  console.log(`Dataset: ${DATASET_ID}`);
  console.log(`Time Range: Last ${DAYS_BACK} days`);

  // Calculate date range for query parameters
  // Use T-1 (yesterday) as the end date because GA4 exports are usually delayed by 1 day
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);

  const startDate = new Date();
  startDate.setDate(endDate.getDate() - DAYS_BACK);

  const startDateStr = startDate.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
  const endDateStr = endDate.toISOString().split('T')[0].replace(/-/g, '');   // YYYYMMDD

  const query = `
    DECLARE start_date STRING DEFAULT @startDate;
    DECLARE end_date STRING DEFAULT @endDate;

    WITH base_events AS (
      SELECT
        event_name,
        event_date,
        event_timestamp,
        user_pseudo_id,
        (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as page_location,
        (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') as session_id,
        device.category as device_category
      FROM \`${DATASET_ID}.events_*\`
      WHERE _TABLE_SUFFIX BETWEEN start_date AND end_date
    ),

    session_metrics AS (
      SELECT
        session_id,
        user_pseudo_id,
        ANY_VALUE(device_category) as device_category,
        COUNT(1) as event_count,
        COUNTIF(event_name = 'page_view') as page_views,
        (MAX(event_timestamp) - MIN(event_timestamp)) / 1000000 as session_duration_seconds,
        LOGICAL_OR(event_name = 'Appointment_Success') as converted
      FROM base_events
      GROUP BY session_id, user_pseudo_id
    ),

    overall_metrics AS (
      SELECT
        SUM(page_views) as total_page_views,
        COUNTIF(converted) as total_conversions,
        SAFE_DIVIDE(COUNTIF(page_views = 1), COUNT(1)) * 100 as bounce_rate,
        AVG(session_duration_seconds) as avg_session_duration
      FROM session_metrics
    ),

    top_pages AS (
      SELECT
        page_location as path,
        COUNT(1) as views
      FROM base_events
      WHERE event_name = 'page_view' AND page_location IS NOT NULL
      GROUP BY 1
      ORDER BY 2 DESC
      LIMIT 10
    ),

    funnel_counts AS (
      SELECT
        COUNT(DISTINCT session_id) as step_1, -- Total Sessions (Proxy for "Entered Site" / Page View)
        COUNT(DISTINCT CASE WHEN event_name = 'Appointment_Start' THEN session_id END) as step_2,
        COUNT(DISTINCT CASE WHEN event_name = 'Appointment_Submit' THEN session_id END) as step_3,
        COUNT(DISTINCT CASE WHEN event_name = 'Appointment_Success' THEN session_id END) as step_4
      FROM base_events
    ),

    segments AS (
      SELECT
        device_category as segment,
        COUNT(DISTINCT user_pseudo_id) as count
      FROM base_events
      WHERE device_category IS NOT NULL
      GROUP BY 1
      ORDER BY 2 DESC
    )

    SELECT
      (SELECT AS STRUCT * FROM overall_metrics) as overall,
      ARRAY(SELECT AS STRUCT * FROM top_pages) as top_pages,
      (SELECT AS STRUCT * FROM funnel_counts) as funnel,
      ARRAY(SELECT AS STRUCT * FROM segments) as segments
  `;

  try {
    const [job] = await bigquery.createQueryJob({
      query,
      params: { startDate: startDateStr, endDate: endDateStr },
    });

    console.log(`Query submitted. Job ID: ${job.id}`);
    const [rows] = await job.getQueryResults();

    if (rows.length === 0) {
      console.warn('No data returned from BigQuery.');
      return;
    }

    const result = rows[0];
    const overall = result.overall;
    const funnel = result.funnel;

    // Process Funnel Data
    const funnelData = [
      { stage: 'Sessions (Page View)', count: funnel.step_1, dropOffRate: 0 },
      { stage: 'Appointment Start', count: funnel.step_2, dropOffRate: calculateDropOff(funnel.step_1, funnel.step_2) },
      { stage: 'Appointment Submit', count: funnel.step_3, dropOffRate: calculateDropOff(funnel.step_2, funnel.step_3) },
      { stage: 'Appointment Success', count: funnel.step_4, dropOffRate: calculateDropOff(funnel.step_3, funnel.step_4) },
    ];

    // Map to AnalyticsData interface
    const analyticsData: AnalyticsData = {
      pageViews: overall.total_page_views || 0,
      conversions: overall.total_conversions || 0,
      bounceRate: parseFloat((overall.bounce_rate || 0).toFixed(2)),
      avgSessionDuration: parseFloat((overall.avg_session_duration || 0).toFixed(2)),
      topPages: result.top_pages.map((p: any) => ({ path: p.path || 'unknown', views: p.views })),
      conversionFunnel: funnelData,
      userSegments: result.segments.map((s: any) => ({
        segment: s.segment,
        count: s.count,
        characteristics: [`Device: ${s.segment}`]
      })),
      timeRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      },
    };

    console.log('Analytics data processed. Generating AI insights...');

    // Generate AI Insights
    const insights = await generateInsights(analyticsData);

    // Prepare Final Report
    const report = {
      generatedAt: new Date().toISOString(),
      config: {
        dataset: DATASET_ID,
        daysBack: DAYS_BACK,
      },
      data: analyticsData,
      insights: insights,
    };

    // Ensure output directory exists
    const reportDir = path.join(process.cwd(), 'reports', 'analytics');
    await fs.mkdir(reportDir, { recursive: true });

    const filename = `ga4-bigquery-insights-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(reportDir, filename);

    await fs.writeFile(filepath, JSON.stringify(report, null, 2));

    console.log(`✅ Report generated successfully: ${filepath}`);

  } catch (error: any) {
    console.error('❌ Error running BigQuery insights pipeline:', error.message);
    if (error.errors) {
      console.error('Details:', JSON.stringify(error.errors, null, 2));
    }
  }
}

function calculateDropOff(previous: number, current: number): number {
  if (previous === 0) return 0;
  return parseFloat((((previous - current) / previous) * 100).toFixed(2));
}

// Run the script
runAnalysis().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
