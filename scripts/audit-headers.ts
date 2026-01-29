
import fs from 'fs';
import { performance } from 'perf_hooks';

const BASE_URL = 'http://localhost:3000';

const targets = [
  { url: '/', type: 'home' },
  { url: '/services/minimally-invasive-spine-surgery', type: 'service' },
  { url: '/conditions/sciatica-pain-treatment-hyderabad', type: 'condition' },
  { url: '/locations/malakpet', type: 'location' },
  { url: '/blog/sciatica-pain-management-hyderabad', type: 'blog' }, // Using a legacy one as dynamic blog might need content
  { url: '/appointments', type: 'appointment' }
];

async function checkHeaders() {
  console.log('Checking headers and TTFB...');

  // Wait for server to start roughly
  await new Promise(resolve => setTimeout(resolve, 5000));

  const results = [];

  for (const target of targets) {
    const start = performance.now();
    try {
      const response = await fetch(`${BASE_URL}${target.url}`, {
        method: 'GET',
        headers: { 'User-Agent': 'SEO-Audit-Bot' }
      });
      const end = performance.now();
      const ttfb = Math.round(end - start);

      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      results.push({
        url: target.url,
        type: target.type,
        status: response.status,
        ttfb,
        headers
      });

      console.log(`Checked ${target.url}: ${response.status} (${ttfb}ms)`);

    } catch (error: any) {
      console.error(`Failed to fetch ${target.url}: ${error.message}`);
      results.push({
        url: target.url,
        type: target.type,
        status: 'ERROR',
        ttfb: 0,
        headers: {}
      });
    }
  }

  // Generate CSV
  const csv = 'url,type,status,ttfb_ms,cache-control,content-type,server\n' +
    results.map(r => `${r.url},${r.type},${r.status},${r.ttfb},"${r.headers['cache-control'] || ''}","${r.headers['content-type'] || ''}","${r.headers['server'] || ''}"`).join('\n');

  fs.writeFileSync('audit/headers/ttfb_table.csv', csv);

  // Generate MD Report
  const md = `# Headers & Performance Report

**Run Time:** ${new Date().toISOString()}

${results.map(r => `
## ${r.url} (${r.type})
- **Status:** ${r.status}
- **TTFB:** ${r.ttfb} ms
- **Cache-Control:** \`${r.headers['cache-control'] || 'MISSING'}\`
- **Content-Type:** \`${r.headers['content-type'] || 'MISSING'}\`
- **All Headers:**
\`\`\`json
${JSON.stringify(r.headers, null, 2)}
\`\`\`
`).join('\n')}
`;

  fs.writeFileSync('audit/headers/headers_report.md', md);
  console.log('Headers report saved.');
}

checkHeaders();
