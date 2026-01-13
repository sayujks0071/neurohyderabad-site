/**
 * Verify Google Search Console Setup
 * 
 * This script verifies that the Service Account is properly configured
 * and can access Google Search Console.
 * 
 * Usage:
 *   npx tsx scripts/verify-gsc-setup.ts
 */

// Load environment variables from .env.local if it exists
try {
  const fs = require('fs');
  const path = require('path');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    const lines = envContent.split('\n');
    let currentKey = '';
    let currentValue = '';
    let inQuotedValue = false;
    let quoteChar = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }
      
      // Check if line starts a new key=value pair
      const keyMatch = trimmed.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (keyMatch) {
        // Save previous key-value if exists
        if (currentKey && !process.env[currentKey]) {
          process.env[currentKey] = currentValue.replace(/^["']|["']$/g, '');
        }
        
        currentKey = keyMatch[1];
        const valuePart = keyMatch[2];
        
        // Check if value starts with a quote
        if (valuePart.startsWith("'") || valuePart.startsWith('"')) {
          inQuotedValue = true;
          quoteChar = valuePart[0];
          currentValue = valuePart;
          
          // Check if it ends on the same line
          if (valuePart.endsWith(quoteChar) && valuePart.length > 1) {
            inQuotedValue = false;
            currentValue = valuePart.slice(1, -1);
          }
        } else {
          currentValue = valuePart;
          inQuotedValue = false;
        }
      } else if (inQuotedValue && currentKey) {
        // Continue reading multi-line quoted value
        currentValue += '\n' + line;
        
        // Check if this line ends the quoted value
        if (line.trim().endsWith(quoteChar)) {
          inQuotedValue = false;
          currentValue = currentValue.slice(1, -1); // Remove quotes
        }
      }
    }
    
    // Save last key-value
    if (currentKey && !process.env[currentKey]) {
      process.env[currentKey] = currentValue.replace(/^["']|["']$/g, '');
    }
  }
} catch (e) {
  // Ignore errors loading .env.local
  console.warn('Warning: Could not load .env.local:', (e as Error).message);
}

import { google } from 'googleapis';

const SERVICE_ACCOUNT_EMAIL = 'google-indexing-automation@famous-momentum-469619-u4.iam.gserviceaccount.com';
const EXPECTED_SITE_URL = 'https://www.drsayuj.info';

interface VerificationResult {
  step: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

const results: VerificationResult[] = [];

function logResult(step: string, status: 'pass' | 'fail' | 'warning', message: string) {
  results.push({ step, status, message });
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} ${step}: ${message}`);
}

/**
 * Get authenticated Google Auth client
 */
async function getAuthClient() {
  const keyJson = process.env.GOOGLE_INDEXING_KEY_JSON;
  if (!keyJson) {
    throw new Error('GOOGLE_INDEXING_KEY_JSON environment variable is missing.');
  }

  let credentials;
  try {
    credentials = JSON.parse(keyJson);
  } catch (e) {
    throw new Error('Failed to parse GOOGLE_INDEXING_KEY_JSON. Ensure it is valid JSON.');
  }

  // Verify the credentials match the expected service account
  if (credentials.client_email !== SERVICE_ACCOUNT_EMAIL) {
    logResult(
      'Service Account Email Check',
      'warning',
      `Expected ${SERVICE_ACCOUNT_EMAIL}, but credentials show ${credentials.client_email}`
    );
  } else {
    logResult(
      'Service Account Email Check',
      'pass',
      `Credentials match: ${credentials.client_email}`
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  return auth;
}

/**
 * Verify authentication works
 */
async function verifyAuthentication() {
  try {
    const auth = await getAuthClient();
    const searchConsole = google.webmasters({ version: 'v3', auth });
    
    // Try to list sites (this requires authentication)
    const sites = await searchConsole.sites.list();
    
    if (sites.data.siteEntry) {
      const siteUrls = sites.data.siteEntry.map(site => site.siteUrl || 'unknown');
      logResult(
        'Authentication',
        'pass',
        `Successfully authenticated. Found ${sites.data.siteEntry.length} property/properties`
      );
      
      // Check if our expected site is in the list
      const hasExpectedSite = sites.data.siteEntry.some(
        site => site.siteUrl === EXPECTED_SITE_URL || site.siteUrl === EXPECTED_SITE_URL + '/'
      );
      
      if (hasExpectedSite) {
        logResult(
          'Property Access',
          'pass',
          `Property ${EXPECTED_SITE_URL} is accessible`
        );
      } else {
        logResult(
          'Property Access',
          'warning',
          `Property ${EXPECTED_SITE_URL} not found in accessible properties. Found: ${siteUrls.join(', ')}`
        );
      }
      
      return searchConsole;
    } else {
      logResult(
        'Authentication',
        'fail',
        'Authentication succeeded but no properties found. Check Service Account permissions in GSC.'
      );
      return null;
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      logResult(
        'Authentication',
        'fail',
        '403 Forbidden: Service Account not added to GSC or insufficient permissions'
      );
    } else if (error.response?.status === 401) {
      logResult(
        'Authentication',
        'fail',
        '401 Unauthorized: Invalid credentials or expired token'
      );
    } else {
      logResult(
        'Authentication',
        'fail',
        `Authentication failed: ${error.message}`
      );
    }
    return null;
  }
}

/**
 * Verify sitemap listing works
 */
async function verifySitemapListing(searchConsole: any) {
  if (!searchConsole) {
    logResult('Sitemap Listing', 'fail', 'Skipped - authentication failed');
    return;
  }

  try {
    const siteUrl = process.env.SITE_URL || EXPECTED_SITE_URL;
    const formattedSiteUrl = siteUrl.replace(/\/$/, '');
    const targetSiteUrl = process.env.GSC_SITE_URL || formattedSiteUrl;

    const sitemaps = await searchConsole.sitemaps.list({
      siteUrl: targetSiteUrl,
    });

    if (sitemaps.data.sitemap) {
      logResult(
        'Sitemap Listing',
        'pass',
        `Successfully listed ${sitemaps.data.sitemap.length} sitemap(s)`
      );
      
      // Show first few sitemaps
      const firstFew = sitemaps.data.sitemap.slice(0, 3);
      firstFew.forEach((sitemap: any) => {
        console.log(`   - ${sitemap.path} (${sitemap.type})`);
      });
      if (sitemaps.data.sitemap.length > 3) {
        console.log(`   ... and ${sitemaps.data.sitemap.length - 3} more`);
      }
    } else {
      logResult(
        'Sitemap Listing',
        'warning',
        'No sitemaps found. This is normal if you haven\'t submitted any yet.'
      );
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
      logResult(
        'Sitemap Listing',
        'warning',
        '404 Not Found: Property may not exist or siteUrl format incorrect'
      );
    } else {
      logResult(
        'Sitemap Listing',
        'fail',
        `Failed to list sitemaps: ${error.message}`
      );
    }
  }
}

/**
 * Verify sitemap submission capability
 */
async function verifySitemapSubmission(searchConsole: any) {
  if (!searchConsole) {
    logResult('Sitemap Submission Test', 'fail', 'Skipped - authentication failed');
    return;
  }

  try {
    const siteUrl = process.env.SITE_URL || EXPECTED_SITE_URL;
    const formattedSiteUrl = siteUrl.replace(/\/$/, '');
    const targetSiteUrl = process.env.GSC_SITE_URL || formattedSiteUrl;
    const testSitemapUrl = `${formattedSiteUrl}/sitemap.xml`;

    // Try to submit (this will queue it, not cause issues if already submitted)
    const res = await searchConsole.sitemaps.submit({
      siteUrl: targetSiteUrl,
      feedpath: testSitemapUrl,
    });

    if (res.status === 204 || res.status === 200) {
      logResult(
        'Sitemap Submission Test',
        'pass',
        `Successfully submitted test sitemap (status: ${res.status})`
      );
    } else {
      logResult(
        'Sitemap Submission Test',
        'warning',
        `Submission returned unexpected status: ${res.status}`
      );
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      logResult(
        'Sitemap Submission Test',
        'fail',
        '403 Forbidden: Service Account needs "Full User" or "Owner" permissions (not "Restricted")'
      );
    } else if (error.response?.status === 404) {
      logResult(
        'Sitemap Submission Test',
        'warning',
        '404 Not Found: Sitemap URL may not exist yet (this is OK for testing)'
      );
    } else {
      logResult(
        'Sitemap Submission Test',
        'fail',
        `Submission test failed: ${error.message}`
      );
    }
  }
}

/**
 * Main verification function
 */
async function verifySetup() {
  console.log('🔍 Verifying Google Search Console Setup\n');
  console.log(`Service Account: ${SERVICE_ACCOUNT_EMAIL}`);
  console.log(`Expected Property: ${EXPECTED_SITE_URL}\n`);
  console.log('=' .repeat(60) + '\n');

  try {
    // Step 1: Verify authentication
    const searchConsole = await verifyAuthentication();
    
    // Step 2: Verify sitemap listing
    await verifySitemapListing(searchConsole);
    
    // Step 3: Verify sitemap submission capability
    await verifySitemapSubmission(searchConsole);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Verification Summary:\n');
    
    const passed = results.filter(r => r.status === 'pass').length;
    const warnings = results.filter(r => r.status === 'warning').length;
    const failed = results.filter(r => r.status === 'fail').length;

    console.log(`✅ Passed: ${passed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    console.log(`❌ Failed: ${failed}\n`);

    if (failed === 0 && passed > 0) {
      console.log('🎉 Setup verification PASSED! Your Service Account is properly configured.');
      console.log('\nNext steps:');
      console.log('  - Submit sitemaps: npx tsx scripts/google-seo-automation.ts --sitemap');
      console.log('  - List sitemaps: npx tsx scripts/google-seo-automation.ts --list');
      console.log('  - Submit all: npx tsx scripts/submit-all-sitemaps.ts');
    } else if (failed > 0) {
      console.log('❌ Setup verification FAILED. Please check the errors above.');
      console.log('\nTroubleshooting:');
      console.log('  1. Verify Service Account is added to GSC with "Full User" or "Owner" permissions');
      console.log('  2. Check that GOOGLE_INDEXING_KEY_JSON environment variable is set correctly');
      console.log('  3. Ensure Search Console API is enabled in GCP project');
      process.exit(1);
    } else {
      console.log('⚠️  Setup verification completed with warnings. Review above.');
    }
  } catch (error: any) {
    console.error('\n❌ Fatal error during verification:', error.message);
    process.exit(1);
  }
}

// Run verification
verifySetup().catch(console.error);
