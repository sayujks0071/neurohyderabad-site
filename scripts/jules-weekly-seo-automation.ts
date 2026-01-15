
import fs from 'fs';
import path from 'path';

/**
 * Jules Weekly SEO Automation Script
 *
 * This script generates the weekly SEO task prompt for Jules,
 * including a critical workaround for the pre-clone git config issue.
 */

async function generateWeeklySeoPrompt() {
  const currentDate = new Date().toISOString().split('T')[0];

  // The workaround instructions for the git config issue
  // This must be the very first thing in the prompt to ensure it's seen/executed
  const gitConfigFix = `
## PRE-TASK CRITICAL FIX

Before starting the SEO tasks, please execute the following command to fix the git configuration issue that prevents cloning/fetching:

\`\`\`bash
git config --global --unset-all url.http://git@192.168.0.1:8080/.insteadOf
\`\`\`

Verify the fix by running:
\`\`\`bash
git config --list | grep insteadOf
\`\`\`
(It should not show the 192.168.0.1 address).
`;

  const taskDescription = `
## Weekly SEO Automation Task for ${currentDate}

1. **Site Performance Analysis**
   - Run the site performance analysis script: \`pnpm analyze-performance\`
   - Check the generated reports in \`reports/performance/\`

2. **Broken Link Check**
   - Run the broken link checker: \`pnpm check-links\`
   - Investigate any 404s found.

3. **Sitemap Verification**
   - Verify sitemap submission status using: \`npx tsx scripts/google-seo-automation.ts --list\`
   - Ensure \`sitemap.xml\` and \`sitemap-blog.xml\` are healthy.

4. **Keyword Research Update**
   - Check for new keyword opportunities in \`seo/keyword-research/latest/\`.
   - Update \`seo/keyword-registry.json\` if needed.

5. **Content Gap Analysis**
   - Review \`seo/content-gaps.md\` (if available) and propose 3 new blog topics.

Please execute these steps and report the results.
`;

  const fullPrompt = `${gitConfigFix}\n${taskDescription}`;

  console.log(fullPrompt);

  // Also save to a specific file that the workflow might pick up
  // Ensuring the directory exists
  const promptDir = path.join(process.cwd(), 'jules-prompts');
  if (!fs.existsSync(promptDir)) {
    fs.mkdirSync(promptDir, { recursive: true });
  }

  const promptFile = path.join(promptDir, `weekly-seo-${currentDate}.md`);
  fs.writeFileSync(promptFile, fullPrompt);
  console.log(`\n✅ Prompt saved to: ${promptFile}`);
}

generateWeeklySeoPrompt().catch(console.error);
