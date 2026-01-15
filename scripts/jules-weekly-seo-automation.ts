/**
 * Google Jules API Weekly SEO Automation
 * 
 * This script calls the Google Jules API to perform weekly SEO maintenance
 * based on the comprehensive weekly prompt.
 * 
 * Usage:
 *   npx tsx scripts/jules-weekly-seo-automation.ts
 * 
 * Required Environment Variables:
 *   - JULES_API_TOKEN: Your Google Jules API token
 *   - JULES_API_URL: (Optional) Custom API endpoint
 */

import * as fs from 'fs';
import * as path from 'path';

const JULES_API_TOKEN = process.env.JULES_API_TOKEN || process.env.GOOGLE_JULES_API_TOKEN;

if (!JULES_API_TOKEN) {
  console.error('❌ Error: JULES_API_TOKEN or GOOGLE_JULES_API_TOKEN environment variable is required');
  console.error('   Set it in GitHub Secrets or .env.local');
  process.exit(1);
}

// Read the weekly prompt from file if it exists, otherwise use inline
const PROMPT_FILE = path.join(process.cwd(), 'jules-prompts', 'weekly-seo-automation.md');
let WEEKLY_PROMPT = '';

if (fs.existsSync(PROMPT_FILE)) {
  WEEKLY_PROMPT = fs.readFileSync(PROMPT_FILE, 'utf-8');
} else {
  WEEKLY_PROMPT = `You are the weekly SEO + WebOps agent for \`www.drsayuj.info\`. You **must make meaningful changes** in the repo that improve rankings, CTR, and technical SEO health.

**Repo Context:**  
- Next.js App Router  
- Medical/YMYL (strict accuracy, no exaggerations)  
- No blog posts with "example/test/draft/sample/template/placeholder" in slug/title  
- TypeScript for new code  

---

## Weekly Actions (must complete all)

### 1) Site Health & Crawl
- Run \`npm run build\` (or closest test)  
- Fix any lint/type errors found  
- Check sitemap freshness & robots directives  

### 2) Deep Technical SEO
- Audit schema on 5–10 priority pages  
- Ensure: MedicalWebPage, Physician, Breadcrumb, FAQ where applicable  
- Fix canonical/OG URL mismatches  

### 3) Content Cluster Improvement
- Pick **one priority condition** (e.g., sciatica, brain tumor, trigeminal neuralgia).  
- Add **2–3 internal links** from relevant pages to the cluster hub.  
- Ensure meta descriptions are <155 chars and aligned with search intent.  

### 4) CTR Optimization
- Improve titles/descriptions for top 5 pages with high impressions + low CTR  
- Keep titles under 60 chars, descriptions under 155 chars  

### 5) Competitor Gap Scan (required)
Targets:
- \`drraveesh.com\`
- \`spinesurgeon.in\`

Deliver:
- New pages/topics they published
- 1–2 keyword gaps or content angles
- Implement **one counter‑change** in repo (title/meta/internal link/FAQ addition)

### 6) Backlinks & SERP
- Identify 3 backlink/citation opportunities  
- Add at least **one local citation improvement** (if any missing reference in structured data or clinic info)  

---

## Required Outputs
1. **Changes made** (file paths + why)  
2. **SEO impact hypothesis**  
3. **Competitor gap + response**  
4. **Tests run**  
5. **Next-week recommendations**

---

## Commit (required)
- Message: \`SEO: weekly maintenance <YYYY-MM-DD>\`
- Only relevant files  
- No secrets`;
}

async function callJulesAPI() {
  const today = new Date().toISOString().split('T')[0];
  
  console.log('🚀 Starting Google Jules Weekly SEO Automation');
  console.log(`📅 Date: ${today}`);
  console.log(`📝 Using prompt from: ${fs.existsSync(PROMPT_FILE) ? PROMPT_FILE : 'inline'}\n`);

  // Jules API uses Google Cloud API format
  const baseUrl = process.env.JULES_API_URL || 'https://jules.googleapis.com';
  const apiVersion = '/v1alpha';
  const sessionsEndpoint = `${baseUrl}${apiVersion}/sessions`;

  try {
    console.log(`🔗 Creating Jules session: ${sessionsEndpoint}`);
    
    // Try OAuth token first (as API expects OAuth 2), fallback to API key
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'neurohyderabad-site-automation/1.0',
    };
    
    // Use Authorization Bearer token (OAuth 2) as primary method
    headers['Authorization'] = `Bearer ${JULES_API_TOKEN}`;
    
    const response = await fetch(sessionsEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        prompt: `IMPORTANT: Before starting, if you encounter git config errors preventing clone:
1. Remove insteadOf redirects: git config --global --get-regexp 'url\\..*\\.insteadof' | while read line; do KEY=\$(echo "\$line" | cut -d' ' -f1); git config --global --unset-all "\$KEY" 2>/dev/null || true; done
2. Verify GitHub access: git ls-remote https://github.com/sayujks0071/neurohyderabad-site.git HEAD

${WEEKLY_PROMPT}`,
        sourceContext: {
          source: 'sources/github-sayujks0071-neurohyderabad-site',
          githubRepoContext: {
            startingBranch: 'main',
          },
        },
        title: `SEO: weekly maintenance ${today}`,
        requirePlanApproval: false, // Auto-approve for automation
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API returned ${response.status}: ${errorText}`);
      process.exit(1);
    }

    const result = await response.json();
    
    console.log('✅ Jules API Response:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.name) {
      console.log(`\n📝 Session created: ${result.name}`);
    }
    
    if (result.state) {
      console.log(`📊 Session state: ${result.state}`);
    }
    
    if (result.activities) {
      console.log(`\n📊 Activities: ${result.activities.length} found`);
    }
    
    console.log('\n✅ Weekly SEO automation session created!');
    console.log('💡 Note: Jules will process the session asynchronously.');
    console.log('   Check the session status using the session ID above.');
    
  } catch (error) {
    console.error('❌ Error calling Jules API:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

callJulesAPI();
