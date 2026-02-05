const http = require('http');
const fs = require('fs');
const path = require('path');

const URLS = [
  "http://localhost:3000/",
  "http://localhost:3000/services/endoscopic-spine-surgery-hyderabad",
  "http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad",
  "http://localhost:3000/locations/malakpet"
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
  });
}

async function run() {
  const schemaReport = [];

  for (const url of URLS) {
    console.log(`Extracting schema from ${url}...`);
    try {
      const html = await fetchUrl(url);
      const matches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

      const schemas = [];
      for (const m of matches) {
        try {
          const json = JSON.parse(m[1]);
          schemas.push(json);
        } catch (e) {
          console.error(`Error parsing JSON-LD in ${url}:`, e.message);
        }
      }

      schemaReport.push({
        url: url.replace('http://localhost:3000', ''),
        schemas: schemas
      });
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'schema_inventory.json'), JSON.stringify(schemaReport, null, 2));

  // Generate Markdown Report
  let md = '# Schema Validation Report\n\n';

  schemaReport.forEach(page => {
    md += `## Page: ${page.url}\n`;
    if (page.schemas.length === 0) {
      md += '- **No Schema Found**\n';
    } else {
      page.schemas.forEach((s, i) => {
        const type = s['@type'];
        md += `- **Schema ${i+1}**: ${Array.isArray(type) ? type.join(', ') : type}\n`;
        // Check specific fields
        if (type === 'FAQPage' || (Array.isArray(type) && type.includes('FAQPage'))) {
           md += `  - FAQ Count: ${s.mainEntity ? s.mainEntity.length : 0}\n`;
        }
        if (type === 'MedicalWebPage') {
           md += `  - Audience: ${s.audience || 'Missing'}\n`;
           md += `  - Specialty: ${s.medicalSpecialty || 'Missing'}\n`;
        }
      });
    }
    md += '\n';
  });

  fs.writeFileSync(path.join(__dirname, 'report.md'), md);
  console.log('Schema report saved.');
}

run();
