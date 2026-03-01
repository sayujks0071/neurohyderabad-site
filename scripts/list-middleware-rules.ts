#!/usr/bin/env ts-node
/**
 * List Middleware Alert Rules
 *
 * Helper script to list all existing alert rules and their IDs.
 * Use this to find the ruleId needed for setup-middleware-alerts.ts
 */

import { middlewareApi } from '../src/lib/middleware/api-client';

async function listRules() {
  console.log('📡 Fetching Middleware alert rules...\n');

  try {
    const rules = await middlewareApi.getRules();

    if (rules.length === 0) {
      console.log('⚠️  No rules found.');
      console.log('   You can create a rule in the Middleware dashboard.');
      return;
    }

    console.log('📋 Existing Rules:');
    console.log('----------------------------------------');

    rules.forEach((rule: any) => {
      console.log(`ID:   ${rule.id}`);
      console.log(`Name: ${rule.name}`);
      console.log(`Type: ${rule.type || 'N/A'}`);
      console.log('----------------------------------------');
    });

  } catch (error: any) {
    console.error('❌ Failed to list rules:', error.message);
    console.error('\n💡 Make sure you have:');
    console.error('  1. Set MIDDLEWARE_ACCESS_TOKEN in .env.local');
    process.exit(1);
  }
}

// Run setup
listRules().catch(console.error);
