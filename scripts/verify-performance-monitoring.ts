import fs from 'fs';
import path from 'path';

async function verifyPerformanceMonitoring() {
  console.log('🔍 Verifying Performance Monitoring Setup...');
  const results: string[] = [];
  let success = true;

  // 1. Check ClientAnalytics.tsx for WebVitals import
  const clientAnalyticsPath = path.join(process.cwd(), 'app/_components/ClientAnalytics.tsx');
  if (fs.existsSync(clientAnalyticsPath)) {
    const content = fs.readFileSync(clientAnalyticsPath, 'utf8');
    // Flexible check for dynamic import
    if (content.includes('import("../../src/components/WebVitals")') || content.includes("import('../../src/components/WebVitals')")) {
      results.push('✅ ClientAnalytics.tsx imports WebVitals');
    } else {
      results.push('❌ ClientAnalytics.tsx MISSING WebVitals import');
      success = false;
    }
  } else {
    results.push('❌ ClientAnalytics.tsx not found');
    success = false;
  }

  // 2. Check analytics.ts for coreWebVitals method
  const analyticsPath = path.join(process.cwd(), 'src/lib/analytics.ts');
  if (fs.existsSync(analyticsPath)) {
    const content = fs.readFileSync(analyticsPath, 'utf8');
    if (content.includes('coreWebVitals: (metricName: string, value: number, pageSlug: string)')) {
      results.push('✅ analytics.ts has coreWebVitals method');
    } else {
      results.push('❌ analytics.ts MISSING coreWebVitals method');
      success = false;
    }
  } else {
    results.push('❌ analytics.ts not found');
    success = false;
  }

  // 3. Check package.json for web-vitals
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (content.dependencies['web-vitals']) {
      results.push(`✅ web-vitals dependency found (${content.dependencies['web-vitals']})`);
    } else {
      results.push('❌ web-vitals dependency MISSING');
      success = false;
    }
  } else {
    results.push('❌ package.json not found');
    success = false;
  }

  // 4. Check for deleted files (should NOT exist)
  const perfMonitorPath1 = path.join(process.cwd(), 'src/components/PerformanceMonitor.tsx');
  const perfMonitorPath2 = path.join(process.cwd(), 'app/_components/PerformanceMonitor.tsx');

  if (!fs.existsSync(perfMonitorPath1) && !fs.existsSync(perfMonitorPath2)) {
      results.push('✅ Unused PerformanceMonitor.tsx files correctly removed');
  } else {
      results.push('❌ Unused PerformanceMonitor.tsx files still exist');
      success = false;
  }

  console.log('\nResults:');
  results.forEach(r => console.log(r));

  if (!success) {
    console.error('\n❌ Verification Failed');
    process.exit(1);
  } else {
    console.log('\n✅ Verification Passed');
  }
}

verifyPerformanceMonitoring().catch(console.error);
