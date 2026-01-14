/**
 * Setup Helper for Google Search Console Environment Variables
 * 
 * This script helps you set up the GOOGLE_INDEXING_KEY_JSON environment variable
 * by providing instructions and validating the format.
 * 
 * Usage:
 *   npx tsx scripts/setup-gsc-env.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ENV_LOCAL_PATH = path.join(__dirname, '..', '.env.local');
const SERVICE_ACCOUNT_EMAIL = 'google-indexing-automation@famous-momentum-469619-u4.iam.gserviceaccount.com';

function checkEnvFile() {
  if (!fs.existsSync(ENV_LOCAL_PATH)) {
    console.log('📝 Creating .env.local file...');
    fs.writeFileSync(ENV_LOCAL_PATH, '', 'utf8');
    return false;
  }
  return true;
}

function readEnvFile(): string {
  if (!fs.existsSync(ENV_LOCAL_PATH)) {
    return '';
  }
  return fs.readFileSync(ENV_LOCAL_PATH, 'utf8');
}

function hasGoogleKey(envContent: string): boolean {
  return envContent.includes('GOOGLE_INDEXING_KEY_JSON');
}

function validateJson(jsonString: string): { valid: boolean; error?: string; email?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    
    if (parsed.type !== 'service_account') {
      return { valid: false, error: 'JSON is not a service account type' };
    }
    
    if (!parsed.client_email) {
      return { valid: false, error: 'Missing client_email field' };
    }
    
    if (!parsed.private_key) {
      return { valid: false, error: 'Missing private_key field' };
    }
    
    if (parsed.client_email !== SERVICE_ACCOUNT_EMAIL) {
      return {
        valid: true,
        email: parsed.client_email,
        error: `Email mismatch. Expected ${SERVICE_ACCOUNT_EMAIL}, got ${parsed.client_email}`
      };
    }
    
    return { valid: true, email: parsed.client_email };
  } catch (e: any) {
    return { valid: false, error: `Invalid JSON: ${e.message}` };
  }
}

function main() {
  console.log('🔧 Google Search Console Environment Setup Helper\n');
  console.log('='.repeat(60) + '\n');
  
  const envExists = checkEnvFile();
  const envContent = readEnvFile();
  const hasKey = hasGoogleKey(envContent);
  
  if (hasKey) {
    console.log('✅ Found GOOGLE_INDEXING_KEY_JSON in .env.local\n');
    
    // Try to extract and validate
    const lines = envContent.split('\n');
    let jsonValue = '';
    let inJson = false;
    
    for (const line of lines) {
      if (line.trim().startsWith('GOOGLE_INDEXING_KEY_JSON')) {
        const match = line.match(/GOOGLE_INDEXING_KEY_JSON=(.+)/);
        if (match) {
          jsonValue = match[1].replace(/^["']|["']$/g, '');
          break;
        }
      }
    }
    
    if (jsonValue) {
      const validation = validateJson(jsonValue);
      if (validation.valid) {
        console.log(`✅ JSON is valid`);
        if (validation.email) {
          console.log(`   Service Account: ${validation.email}`);
          if (validation.email === SERVICE_ACCOUNT_EMAIL) {
            console.log(`   ✅ Email matches expected Service Account\n`);
            console.log('🎉 Setup looks good! You can now run:');
            console.log('   npm run gsc:verify');
          } else {
            console.log(`   ⚠️  Email doesn't match expected Service Account\n`);
            console.log(`   Expected: ${SERVICE_ACCOUNT_EMAIL}`);
            console.log(`   Found: ${validation.email}`);
          }
        }
      } else {
        console.log(`❌ JSON validation failed: ${validation.error}\n`);
        console.log('Please check your GOOGLE_INDEXING_KEY_JSON value.');
      }
    } else {
      console.log('⚠️  Found GOOGLE_INDEXING_KEY_JSON but couldn\'t extract value');
      console.log('   Make sure it\'s on a single line or properly formatted.\n');
    }
  } else {
    console.log('❌ GOOGLE_INDEXING_KEY_JSON not found in .env.local\n');
    console.log('📋 Setup Instructions:\n');
    console.log('1. Download your Service Account JSON key from Google Cloud Console:');
    console.log('   https://console.cloud.google.com/iam-admin/serviceaccounts');
    console.log(`   Service Account: ${SERVICE_ACCOUNT_EMAIL}\n`);
    console.log('2. Add this line to your .env.local file:\n');
    console.log('   GOOGLE_INDEXING_KEY_JSON=\'{"type":"service_account","project_id":"famous-momentum-469619-u4",...}\'\n');
    console.log('   Or use a file path (alternative method):');
    console.log('   GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account-key.json\n');
    console.log('3. The JSON should be on a single line, or you can use:');
    console.log('   GOOGLE_INDEXING_KEY_JSON=$(cat path/to/key.json | tr -d \'\\n\')\n');
    console.log('⚠️  SECURITY: Never commit .env.local to Git!\n');
    console.log('4. After adding the variable, run:');
    console.log('   npm run gsc:verify\n');
  }
  
  console.log('='.repeat(60));
  console.log('\n💡 Tip: You can also set the variable inline:');
  console.log('   GOOGLE_INDEXING_KEY_JSON=\'...\' npm run gsc:verify\n');
}

main();
