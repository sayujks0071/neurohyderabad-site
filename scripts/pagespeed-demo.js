/**
 * PageSpeed Insights API Demo for drsayuj.info
 * Fetches and displays comprehensive performance metrics
 */

async function run() {
  const apiEndpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const targetUrl = 'https://www.drsayuj.info';
  const apiKey = process.env.PAGESPEED_API_KEY || 'AIzaSyByITvJ5OqZLlirrezg3ho_neh92d13JpM';

  const url = new URL(apiEndpoint);
  url.searchParams.set('url', targetUrl);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('strategy', 'mobile');
  url.searchParams.set('category', 'performance');

  try {
    console.log('🚀 Fetching PageSpeed Insights data for drsayuj.info...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    
    // Display initial content
    showInitialContent(json.id, targetUrl);
    
    // Display CrUX metrics (real user data)
    const cruxMetrics = {
      'First Contentful Paint': json.loadingExperience?.metrics?.FIRST_CONTENTFUL_PAINT_MS?.category || 'N/A',
      'Interaction to Next Paint': json.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.category || 'N/A',
      'Largest Contentful Paint': json.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.category || 'N/A',
      'Cumulative Layout Shift': json.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category || 'N/A',
    };
    showCruxContent(cruxMetrics);
    
    // Display Lighthouse metrics (lab data)
    const lighthouse = json.lighthouseResult;
    const lighthouseMetrics = {
      'Performance Score': `${Math.round((lighthouse.categories?.performance?.score || 0) * 100)}/100`,
      'First Contentful Paint': lighthouse.audits['first-contentful-paint']?.displayValue || 'N/A',
      'Speed Index': lighthouse.audits['speed-index']?.displayValue || 'N/A',
      'Largest Contentful Paint': lighthouse.audits['largest-contentful-paint']?.displayValue || 'N/A',
      'Total Blocking Time': lighthouse.audits['total-blocking-time']?.displayValue || 'N/A',
      'Time To Interactive': lighthouse.audits['interactive']?.displayValue || 'N/A',
      'Cumulative Layout Shift': lighthouse.audits['cumulative-layout-shift']?.displayValue || 'N/A',
    };
    showLighthouseContent(lighthouseMetrics);
    
    // Display Core Web Vitals assessment
    showCoreWebVitalsAssessment(lighthouse);
    
    // Display optimization opportunities
    showOptimizationOpportunities(lighthouse);
    
  } catch (error) {
    console.error('❌ Fetching PageSpeed Insights failed:', error);
    console.log('💡 Make sure you have a valid API key set in PAGESPEED_API_KEY environment variable');
  }
}

/**
 * Displays initial content, including the page ID and URL.
 * @param {string} id The ID of the page being tested.
 * @param {string} url The URL being tested.
 */
function showInitialContent(id, url) {
  console.log('\n📊 PageSpeed Insights API Demo');
  console.log('=' .repeat(50));
  console.log(`🌐 Page tested: ${url}`);
  console.log(`🆔 Page ID: ${id}`);
  console.log('=' .repeat(50));
}

/**
 * Displays CrUX metrics (real user data).
 * @param {!Object} cruxMetrics The CrUX metrics to display.
 */
function showCruxContent(cruxMetrics) {
  console.log('\n📈 Chrome User Experience Report (CrUX) - Real User Data');
  console.log('-'.repeat(50));
  
  for (const [key, value] of Object.entries(cruxMetrics)) {
    const status = getStatusEmoji(value);
    console.log(`${status} ${key}: ${value}`);
  }
}

/**
 * Displays Lighthouse metrics (lab data).
 * @param {!Object} lighthouseMetrics The Lighthouse metrics to display.
 */
function showLighthouseContent(lighthouseMetrics) {
  console.log('\n🔬 Lighthouse Lab Data');
  console.log('-'.repeat(50));
  
  for (const [key, value] of Object.entries(lighthouseMetrics)) {
    const status = getStatusEmoji(value);
    console.log(`${status} ${key}: ${value}`);
  }
}

/**
 * Displays Core Web Vitals assessment.
 * @param {!Object} lighthouse The Lighthouse result object.
 */
function showCoreWebVitalsAssessment(lighthouse) {
  console.log('\n⚡ Core Web Vitals Assessment');
  console.log('-'.repeat(50));
  
  const lcp = lighthouse.audits['largest-contentful-paint']?.numericValue;
  const fid = lighthouse.audits['max-potential-fid']?.numericValue;
  const cls = lighthouse.audits['cumulative-layout-shift']?.numericValue;
  
  const lcpStatus = lcp <= 2500 ? '✅' : lcp <= 4000 ? '⚠️' : '❌';
  const fidStatus = fid <= 100 ? '✅' : fid <= 300 ? '⚠️' : '❌';
  const clsStatus = cls <= 0.1 ? '✅' : cls <= 0.25 ? '⚠️' : '❌';
  
  console.log(`${lcpStatus} LCP: ${lcp ? Math.round(lcp) + 'ms' : 'N/A'} (Good: ≤2.5s)`);
  console.log(`${fidStatus} FID: ${fid ? Math.round(fid) + 'ms' : 'N/A'} (Good: ≤100ms)`);
  console.log(`${clsStatus} CLS: ${cls ? cls.toFixed(3) : 'N/A'} (Good: ≤0.1)`);
  
  const allGood = lcp <= 2500 && fid <= 100 && cls <= 0.1;
  console.log(`\n${allGood ? '🎉 All Core Web Vitals are GOOD!' : '⚠️ Some Core Web Vitals need improvement'}`);
}

/**
 * Displays optimization opportunities.
 * @param {!Object} lighthouse The Lighthouse result object.
 */
function showOptimizationOpportunities(lighthouse) {
  console.log('\n🔧 Optimization Opportunities');
  console.log('-'.repeat(50));
  
  const opportunities = lighthouse.categories?.performance?.auditRefs
    ?.filter(audit => audit.group === 'load-opportunities')
    ?.slice(0, 5) || [];
  
  if (opportunities.length === 0) {
    console.log('✅ No major optimization opportunities found!');
    return;
  }
  
  opportunities.forEach((opportunity, index) => {
    const audit = lighthouse.audits[opportunity.id];
    if (audit && audit.score < 0.9) {
      const impact = audit.details?.overallSavingsMs ? 
        ` (Potential savings: ${Math.round(audit.details.overallSavingsMs)}ms)` : '';
      console.log(`${index + 1}. ${audit.title}${impact}`);
    }
  });
}

/**
 * Gets status emoji based on metric value.
 * @param {string|number} value The metric value.
 * @return {string} Status emoji.
 */
function getStatusEmoji(value) {
  if (typeof value === 'string') {
    if (value.includes('FAST') || value.includes('GOOD') || value.includes('100')) return '✅';
    if (value.includes('AVERAGE') || value.includes('NEEDS IMPROVEMENT')) return '⚠️';
    if (value.includes('SLOW') || value.includes('POOR')) return '❌';
  }
  if (typeof value === 'number') {
    if (value >= 90) return '✅';
    if (value >= 50) return '⚠️';
    return '❌';
  }
  return '📊';
}

// Run the demo
if (typeof window === 'undefined') {
  // Node.js environment
  run().catch(console.error);
} else {
  // Browser environment
  run();
}

module.exports = { run };
