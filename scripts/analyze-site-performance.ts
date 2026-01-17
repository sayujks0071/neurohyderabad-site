import { GA4Client } from '../src/lib/ga4-client';

async function main() {
  console.log('📊 Site Performance Analysis');
  console.log('============================');

  if (!process.env.GA4_PROPERTY_ID) {
    console.error('❌ Error: GA4_PROPERTY_ID is not set in .env.local');
    console.log('   Please run `npx tsx scripts/verify-ga4-setup.ts` to find your ID.');
    process.exit(1);
  }

  const client = new GA4Client();

  try {
    // 1. Realtime Active Users
    console.log('\n⏳ Realtime Active Users (Last 30 mins)');
    const realtimeReport = await client.runRealtimeReport({
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
    });

    const activeUsers = realtimeReport.rows?.reduce((sum, row) => sum + parseInt(row.metricValues?.[0]?.value || '0'), 0) || 0;
    console.log(`   Total Active Users: ${activeUsers}`);
    if (realtimeReport.rows && realtimeReport.rows.length > 0) {
      console.log('   By Country:');
      realtimeReport.rows.forEach(row => {
        console.log(`   - ${row.dimensionValues?.[0]?.value}: ${row.metricValues?.[0]?.value}`);
      });
    }

    // 2. Top Pages (Last 7 Days)
    console.log('\n📄 Top Pages (Last 7 Days)');
    const topPagesReport = await client.runReport({
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'userEngagementDuration' }
      ],
      orderBys: [{ desc: true, metric: { metricName: 'screenPageViews' } }],
      limit: "10" as any
    });

    console.log(pad('Page Path', 40) + pad('Views', 10) + pad('Users', 10) + 'Avg Time');
    console.log('-'.repeat(80));

    topPagesReport.rows?.forEach(row => {
        const path = truncate(row.dimensionValues?.[0]?.value || '', 38);
        const views = row.metricValues?.[0]?.value || '0';
        const users = row.metricValues?.[1]?.value || '0';
        const duration = parseInt(row.metricValues?.[2]?.value || '0'); // Total seconds
        const avgTime = duration / (parseInt(users) || 1); // Approx avg

        console.log(
            pad(path, 40) +
            pad(views, 10) +
            pad(users, 10) +
            formatDuration(avgTime)
        );
    });

    // 3. User Acquisition (Source/Medium)
    console.log('\n🔗 Top Acquisition Sources (Last 28 Days)');
    const acquisitionReport = await client.runReport({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionSourceMedium' }],
        metrics: [{ name: 'sessions' }, { name: 'bounceRate' }],
        orderBys: [{ desc: true, metric: { metricName: 'sessions' } }],
        limit: "5" as any
    });

    console.log(pad('Source / Medium', 40) + pad('Sessions', 10) + 'Bounce Rate');
    console.log('-'.repeat(70));

    acquisitionReport.rows?.forEach(row => {
        const source = truncate(row.dimensionValues?.[0]?.value || '', 38);
        const sessions = row.metricValues?.[0]?.value || '0';
        const bounceRate = parseFloat(row.metricValues?.[1]?.value || '0').toFixed(1) + '%';

        console.log(pad(source, 40) + pad(sessions, 10) + bounceRate);
    });

    // 4. Metadata Check
    console.log('\n🛠️  Property Metadata (Custom Definitions)');
    const metadata: any = await client.getMetadata();
    const customDims = metadata.customDimensions || [];
    const customMets = metadata.customMetrics || [];

    console.log(`   Custom Dimensions: ${customDims.length}`);
    customDims.forEach((d: any) => console.log(`   - ${d.apiName} (${d.scope})`));

    console.log(`   Custom Metrics: ${customMets.length}`);
    customMets.forEach((m: any) => console.log(`   - ${m.apiName} (${m.scope})`));


  } catch (error: any) {
    console.error('\n❌ Error running analysis:', error.message);
  }
}

// Helper functions for formatting
function pad(str: string, length: number): string {
    return str.padEnd(length);
}

function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.substring(0, length - 3) + '...';
}

function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
}

main().catch(console.error);
