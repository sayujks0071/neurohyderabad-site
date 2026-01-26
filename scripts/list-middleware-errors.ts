#!/usr/bin/env ts-node
/**
 * List all errors in Middleware
 * 
 * Usage: pnpm tsx scripts/list-middleware-errors.ts [options]
 * Options:
 *   --limit <number>    Limit number of results (default: 50)
 *   --offset <number>   Offset for pagination (default: 0)
 *   --hours <number>    Show errors from last N hours (default: 24)
 *   --fingerprint <id>  Get details for specific error fingerprint
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

async function listErrors() {
  const args = process.argv.slice(2);
  const limit = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '50');
  const offset = parseInt(args.find(a => a.startsWith('--offset='))?.split('=')[1] || '0');
  const hours = parseInt(args.find(a => a.startsWith('--hours='))?.split('=')[1] || '24');
  const fingerprint = args.find(a => a.startsWith('--fingerprint='))?.split('=')[1];

  try {
    if (fingerprint) {
      // Get specific error details
      console.log(`🔍 Fetching error details for fingerprint: ${fingerprint}\n`);
      const error = await middlewareApi.getErrorDetails(fingerprint);
      console.log(JSON.stringify(error, null, 2));
      return;
    }

    // List all errors
    const timeRange = {
      start: Date.now() - (hours * 60 * 60 * 1000),
      end: Date.now(),
    };

    console.log(`📋 Listing errors from the last ${hours} hours...\n`);
    console.log(`   Limit: ${limit}, Offset: ${offset}\n`);

    const errors = await middlewareApi.listErrors({
      limit,
      offset,
      timeRange,
    });

    if (!errors || errors.length === 0) {
      console.log('✅ No errors found in the specified time range');
      return;
    }

    console.log(`Found ${errors.length} error(s):\n`);
    console.log('='.repeat(80));

    errors.forEach((error: any, index: number) => {
      console.log(`\n${index + 1}. Error #${error.id || error.fingerprint || index + 1}`);
      console.log('-'.repeat(80));
      
      if (error.fingerprint) {
        console.log(`   Fingerprint: ${error.fingerprint}`);
      }
      
      if (error.message) {
        console.log(`   Message: ${error.message}`);
      }
      
      if (error.error_type) {
        console.log(`   Type: ${error.error_type}`);
      }
      
      if (error.count) {
        console.log(`   Count: ${error.count}`);
      }
      
      if (error.first_seen) {
        console.log(`   First Seen: ${new Date(error.first_seen).toLocaleString()}`);
      }
      
      if (error.last_seen) {
        console.log(`   Last Seen: ${new Date(error.last_seen).toLocaleString()}`);
      }
      
      if (error.issue_url) {
        console.log(`   Issue URL: ${error.issue_url}`);
      }
      
      if (error.severity) {
        console.log(`   Severity: ${error.severity}`);
      }
      
      if (error.service) {
        console.log(`   Service: ${error.service}`);
      }
      
      if (error.url) {
        console.log(`   URL: ${error.url}`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log(`\n💡 To get details for a specific error:`);
    console.log(`   pnpm tsx scripts/list-middleware-errors.ts --fingerprint=<fingerprint>`);
    console.log(`\n💡 To see more errors:`);
    console.log(`   pnpm tsx scripts/list-middleware-errors.ts --limit=100 --offset=50`);

  } catch (error: any) {
    console.error('❌ Error fetching errors:', error.message);
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('\n💡 Authentication error. Make sure:');
      console.error('   1. MIDDLEWARE_ACCESS_TOKEN is set in .env.local');
      console.error('   2. The token is valid and not expired');
      console.error('   3. The token has permissions to access errors');
    }
    process.exit(1);
  }
}

listErrors().catch(console.error);
