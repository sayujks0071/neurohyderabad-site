#!/usr/bin/env node

/**
 * Performance Dashboard for drsayuj.info
 * Comprehensive performance monitoring with historical tracking
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';
const API_KEY = process.env.PAGESPEED_API_KEY || 'AIzaSyByITvJ5OqZLlirrezg3ho_neh92d13JpM';

class PerformanceDashboard {
  constructor() {
    this.reportsDir = path.join(__dirname, '..', 'reports', 'performance');
    this.ensureReportsDir();
  }

  ensureReportsDir() {
    if (!fs.existsSync(this.reportsDir)) {
      fs.mkdirSync(this.reportsDir, { recursive: true });
    }
  }

  async fetchPageSpeedData() {
    const apiEndpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const url = new URL(apiEndpoint);
    url.searchParams.set('url', SITE_URL);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('strategy', 'mobile');
    url.searchParams.set('category', 'performance');

    try {
      console.log('🚀 Fetching PageSpeed Insights data...');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Failed to fetch PageSpeed data:', error.message);
      return null;
    }
  }

  extractMetrics(data) {
    if (!data || !data.lighthouseResult) return null;

    const lighthouse = data.lighthouseResult;
    const audits = lighthouse.audits;

    return {
      timestamp: new Date().toISOString(),
      url: SITE_URL,
      performance: {
        score: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
        metrics: {
          fcp: audits['first-contentful-paint']?.numericValue,
          lcp: audits['largest-contentful-paint']?.numericValue,
          si: audits['speed-index']?.numericValue,
          tbt: audits['total-blocking-time']?.numericValue,
          tti: audits['interactive']?.numericValue,
          cls: audits['cumulative-layout-shift']?.numericValue,
        },
        displayValues: {
          fcp: audits['first-contentful-paint']?.displayValue,
          lcp: audits['largest-contentful-paint']?.displayValue,
          si: audits['speed-index']?.displayValue,
          tbt: audits['total-blocking-time']?.displayValue,
          tti: audits['interactive']?.displayValue,
          cls: audits['cumulative-layout-shift']?.displayValue,
        }
      },
      crux: {
        fcp: data.loadingExperience?.metrics?.FIRST_CONTENTFUL_PAINT_MS?.category,
        lcp: data.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.category,
        cls: data.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category,
        inp: data.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.category,
      }
    };
  }

  saveReport(metrics) {
    if (!metrics) return;

    const filename = `performance-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(this.reportsDir, filename);
    
    // Load existing data or create new
    let reports = [];
    if (fs.existsSync(filepath)) {
      try {
        const existingData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        reports = Array.isArray(existingData) ? existingData : [];
      } catch (error) {
        console.warn('⚠️ Could not parse existing report, creating new one');
        reports = [];
      }
    }

    // Add new report
    reports.push(metrics);

    // Keep only last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    reports = reports.filter(report => new Date(report.timestamp) > thirtyDaysAgo);

    fs.writeFileSync(filepath, JSON.stringify(reports, null, 2));
    console.log(`📄 Report saved to: ${filepath}`);
  }

  displayDashboard(metrics) {
    if (!metrics) {
      console.log('❌ No metrics available to display');
      return;
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 DR. SAYUJ KRISHNAN - PERFORMANCE DASHBOARD');
    console.log('='.repeat(60));
    console.log(`🌐 URL: ${metrics.url}`);
    console.log(`🕐 Timestamp: ${new Date(metrics.timestamp).toLocaleString()}`);
    console.log('='.repeat(60));

    // Performance Score
    const score = metrics.performance.score;
    const scoreEmoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
    console.log(`\n${scoreEmoji} PERFORMANCE SCORE: ${score}/100`);

    // Core Web Vitals
    console.log('\n⚡ CORE WEB VITALS');
    console.log('-'.repeat(40));
    
    const lcp = metrics.performance.metrics.lcp;
    const fcp = metrics.performance.metrics.fcp;
    const cls = metrics.performance.metrics.cls;
    
    const lcpStatus = lcp <= 2500 ? '✅' : lcp <= 4000 ? '⚠️' : '❌';
    const fcpStatus = fcp <= 1800 ? '✅' : fcp <= 3000 ? '⚠️' : '❌';
    const clsStatus = cls <= 0.1 ? '✅' : cls <= 0.25 ? '⚠️' : '❌';
    
    console.log(`${lcpStatus} LCP: ${Math.round(lcp)}ms (${metrics.performance.displayValues.lcp})`);
    console.log(`${fcpStatus} FCP: ${Math.round(fcp)}ms (${metrics.performance.displayValues.fcp})`);
    console.log(`${clsStatus} CLS: ${cls?.toFixed(3) || 'N/A'} (${metrics.performance.displayValues.cls})`);

    // Additional Metrics
    console.log('\n📈 ADDITIONAL METRICS');
    console.log('-'.repeat(40));
    console.log(`📊 Speed Index: ${metrics.performance.displayValues.si}`);
    console.log(`⏱️  Total Blocking Time: ${metrics.performance.displayValues.tbt}`);
    console.log(`🔄 Time to Interactive: ${metrics.performance.displayValues.tti}`);

    // CrUX Data (if available)
    if (metrics.crux.fcp || metrics.crux.lcp) {
      console.log('\n👥 REAL USER DATA (CrUX)');
      console.log('-'.repeat(40));
      if (metrics.crux.fcp) console.log(`📱 FCP: ${metrics.crux.fcp}`);
      if (metrics.crux.lcp) console.log(`📱 LCP: ${metrics.crux.lcp}`);
      if (metrics.crux.cls) console.log(`📱 CLS: ${metrics.crux.cls}`);
      if (metrics.crux.inp) console.log(`📱 INP: ${metrics.crux.inp}`);
    }

    // Performance Assessment
    this.displayAssessment(metrics);
  }

  displayAssessment(metrics) {
    console.log('\n🎯 PERFORMANCE ASSESSMENT');
    console.log('-'.repeat(40));
    
    const lcp = metrics.performance.metrics.lcp;
    const fcp = metrics.performance.metrics.fcp;
    const cls = metrics.performance.metrics.cls;
    const score = metrics.performance.score;
    
    const lcpGood = lcp <= 2500;
    const fcpGood = fcp <= 1800;
    const clsGood = cls <= 0.1;
    const scoreGood = score >= 90;
    
    const allGood = lcpGood && fcpGood && clsGood && scoreGood;
    
    if (allGood) {
      console.log('🎉 EXCELLENT! All Core Web Vitals are in the "Good" range');
      console.log('✅ Your site should rank well in Google search results');
    } else {
      console.log('⚠️  Some metrics need improvement:');
      if (!lcpGood) console.log(`   • LCP (${Math.round(lcp)}ms) should be ≤ 2.5s`);
      if (!fcpGood) console.log(`   • FCP (${Math.round(fcp)}ms) should be ≤ 1.8s`);
      if (!clsGood) console.log(`   • CLS (${cls?.toFixed(3)}) should be ≤ 0.1`);
      if (!scoreGood) console.log(`   • Performance score (${score}) should be ≥ 90`);
    }
  }

  async run() {
    console.log('🚀 Starting Performance Dashboard...\n');
    
    const data = await this.fetchPageSpeedData();
    const metrics = this.extractMetrics(data);
    
    this.displayDashboard(metrics);
    this.saveReport(metrics);
    
    console.log('\n✨ Dashboard complete!');
  }
}

// Run the dashboard
if (require.main === module) {
  const dashboard = new PerformanceDashboard();
  dashboard.run().catch(console.error);
}

module.exports = PerformanceDashboard;
