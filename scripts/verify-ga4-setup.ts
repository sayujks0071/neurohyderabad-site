import { GA4Client } from '../src/lib/ga4-client';

async function main() {
  console.log('🔍 GA4 Data Fetching Method - Verification & Setup');
  console.log('==================================================');

  // Check for credentials
  if (!process.env.GOOGLE_INDEXING_KEY_JSON) {
    console.error('❌ Error: GOOGLE_INDEXING_KEY_JSON environment variable is missing.');
    console.error('   Please add your Service Account JSON key to .env.local');
    process.exit(1);
  }

  // Check for Property ID
  const propertyId = process.env.GA4_PROPERTY_ID;
  const client = new GA4Client(propertyId);

  console.log('✅ Client initialized with Service Account credentials.');

  // Step 1: List Accessible Properties
  console.log('\n📡 Scanning for accessible GA4 Properties...');
  try {
    const properties = await client.listAccessibleProperties();

    if (properties.length === 0) {
      console.log('⚠️  No properties found.');
      console.log('   Action Required:');
      console.log('   1. Go to Google Analytics Admin > Property Settings > Property Access Management');
      console.log('   2. Add the Service Account email (from your JSON key) as a user.');

      // Try to extract email from key for user convenience
      try {
        const key = JSON.parse(process.env.GOOGLE_INDEXING_KEY_JSON || '{}');
        if (key.client_email) {
          console.log(`   📧 Service Account Email: ${key.client_email}`);
        }
      } catch (e) {}
    } else {
      console.log(`✅ Found ${properties.length} accessible properties:`);
      properties.forEach(p => {
        const id = p.name.replace('properties/', '');
        console.log(`   - ${p.displayName} (ID: ${id})`);
      });
      console.log('\n💡 To use one of these, set GA4_PROPERTY_ID=[ID] in your .env.local');
    }
  } catch (error: any) {
    console.error('❌ Error listing properties:', error.message);
  }

  // Step 2: Try Data Fetching (if ID is present)
  if (propertyId) {
    console.log(`\n📊 Attempting to fetch data for Property ID: ${propertyId}...`);
    try {
      const popularPages = await client.getMostPopularPages({ limit: 5 });
      console.log('✅ Success! Data fetched successfully.');
      console.log('   Top 5 Most Visited Pages (Last 30 Days):');
      popularPages.forEach((page, index) => {
        console.log(`   ${index + 1}. ${page.path} (${page.views} views)`);
      });
    } catch (error: any) {
      console.error('❌ Error fetching report:', error.message);
    }
  } else {
    console.log('\n⚠️  Skipping data fetch test because GA4_PROPERTY_ID is not set.');
  }

  console.log('\n==================================================');
  console.log('🏁 Verification Complete');
}

main().catch(console.error);
