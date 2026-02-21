#!/usr/bin/env ts-node
/**
 * List Middleware Rules
 *
 * Lists all available alert rules in Middleware.
 * Use this to find the rule ID required for setup-middleware-alerts.ts.
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

async function listRules() {
  console.log('📋 Listing Middleware Alert Rules...\n');

  if (!process.env.MIDDLEWARE_ACCESS_TOKEN) {
    console.warn('⚠️  Warning: MIDDLEWARE_ACCESS_TOKEN is not set.');
    console.warn('   You need to set this environment variable to access the API.\n');
  }

  try {
    const rules = await middlewareApi.getRules();

    if (!rules || !Array.isArray(rules) || rules.length === 0) {
      console.log('No rules found.');
      console.log('You can create a new rule using the dashboard or via API (if supported).');
      return;
    }

    console.log(`Found ${rules.length} rules:\n`);

    // Assuming rule object structure based on API
    rules.forEach((rule: any) => {
      console.log(`ID: ${rule.id}`);
      console.log(`Name: ${rule.name}`);
      console.log(`Description: ${rule.description || 'N/A'}`);
      console.log('-------------------');
    });

  } catch (error: any) {
    console.error('❌ Failed to list rules:', error.message);
    if (error.message.includes('401')) {
      console.error('   Authentication failed. Check your MIDDLEWARE_ACCESS_TOKEN.');
    }
  }
}

// Run the function
listRules().catch(console.error);
