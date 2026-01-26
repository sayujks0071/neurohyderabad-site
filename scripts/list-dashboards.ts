#!/usr/bin/env ts-node
/**
 * List all Middleware dashboards
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

async function listDashboards() {
  try {
    console.log('📊 Fetching Middleware dashboards...\n');
    
    const dashboards = await middlewareApi.getDashboards();
    
    if (!dashboards || dashboards.length === 0) {
      console.log('📭 No dashboards found');
      console.log('\n💡 Create your first dashboard:');
      console.log('   pnpm middleware:setup');
      return;
    }

    console.log(`✅ Found ${dashboards.length} dashboard(s):\n`);
    console.log('='.repeat(80));

    dashboards.forEach((dashboard: any, index: number) => {
      console.log(`\n${index + 1}. ${dashboard.name || dashboard.id || 'Unnamed Dashboard'}`);
      console.log('-'.repeat(80));
      
      if (dashboard.id) {
        console.log(`   ID: ${dashboard.id}`);
      }
      
      if (dashboard.description) {
        console.log(`   Description: ${dashboard.description}`);
      }
      
      if (dashboard.createdAt) {
        console.log(`   Created: ${new Date(dashboard.createdAt).toLocaleString()}`);
      }
      
      if (dashboard.updatedAt) {
        console.log(`   Updated: ${new Date(dashboard.updatedAt).toLocaleString()}`);
      }
      
      if (dashboard.widgets && Array.isArray(dashboard.widgets)) {
        console.log(`   Widgets: ${dashboard.widgets.length}`);
      }
      
      if (dashboard.favorite !== undefined) {
        console.log(`   Favorite: ${dashboard.favorite ? '⭐' : ''}`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log(`\n💡 To view a specific dashboard:`);
    console.log(`   Visit: https://hjptv.middleware.io`);
    console.log(`\n💡 To create a new dashboard:`);
    console.log(`   pnpm middleware:setup`);

  } catch (error: any) {
    console.error('❌ Error fetching dashboards:', error.message);
    
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('\n💡 Authentication error. Make sure:');
      console.error('   1. MIDDLEWARE_ACCESS_TOKEN is set in .env.local');
      console.error('   2. The token is valid and not expired');
      console.error('   3. You have an Access Token (not Agent API Key)');
      console.error('\n   Get Access Token from: https://hjptv.middleware.io → Settings → API Keys');
    } else if (error.message.includes('404')) {
      console.error('\n💡 API endpoint not found. Check:');
      console.error('   1. MIDDLEWARE_API_URL is correct');
      console.error('   2. The API version is supported');
    }
    
    process.exit(1);
  }
}

listDashboards().catch(console.error);
