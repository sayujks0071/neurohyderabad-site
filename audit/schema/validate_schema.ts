
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const AUDIT_DIR = path.join(process.cwd(), 'audit', 'schema');
if (!fs.existsSync(AUDIT_DIR)) fs.mkdirSync(AUDIT_DIR, { recursive: true });

const targetUrls = [
  'http://localhost:3000/',
  'http://localhost:3000/services/minimally-invasive-spine-surgery',
  'http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad',
  'http://localhost:3000/neurosurgeon-hitech-city'
];

async function validateSchema() {
  const issues: string[] = ['URL,Schema Type,Missing Field/Issue'];
  const ymylGaps: string[] = [];

  for (const url of targetUrls) {
    try {
      console.log(`Validating Schema for ${url}...`);
      const res = await axios.get(url);
      const dom = new JSDOM(res.data);
      const schemas = Array.from(dom.window.document.querySelectorAll('script[type="application/ld+json"]'))
        .map(s => JSON.parse(s.textContent || '{}'));

      if (schemas.length === 0) {
        issues.push(`${url},All,No JSON-LD found`);
        ymylGaps.push(`- [ ] ${url}: Missing all schema (Physician, Breadcrumb)`);
        continue;
      }

      // Check Physician / MedicalClinic
      let foundPhysician = false;
      schemas.forEach(schema => {
        const graph = schema['@graph'] || [schema];
        graph.forEach((node: any) => {
          if (node['@type'] === 'Physician' || node['@type'] === 'MedicalClinic' || (Array.isArray(node['@type']) && node['@type'].includes('Physician'))) {
            foundPhysician = true;
            if (!node.name) issues.push(`${url},${node['@type']},Missing name`);
            if (!node.medicalSpecialty) issues.push(`${url},${node['@type']},Missing medicalSpecialty`);
            if (!node.address) issues.push(`${url},${node['@type']},Missing address`);
            if (!node.telephone) issues.push(`${url},${node['@type']},Missing telephone`);
            if (!node.image) issues.push(`${url},${node['@type']},Missing image`);
            if (!node.priceRange) issues.push(`${url},${node['@type']},Missing priceRange (Recommended)`);
          }

          if (node['@type'] === 'BreadcrumbList') {
             if (!node.itemListElement) issues.push(`${url},BreadcrumbList,Missing itemListElement`);
          }

          if (node['@type'] === 'FAQPage') {
             if (!node.mainEntity) issues.push(`${url},FAQPage,Missing mainEntity`);
          }
        });
      });

      if (!foundPhysician) {
         ymylGaps.push(`- [ ] ${url}: Missing Physician/MedicalClinic Schema`);
      }

      // Check Disclaimer (YMYL) - Simple Text Check
      const bodyText = dom.window.document.body.textContent || '';
      if (!bodyText.toLowerCase().includes('disclaimer') && !bodyText.toLowerCase().includes('medical advice')) {
         ymylGaps.push(`- [ ] ${url}: Missing visible Medical Disclaimer`);
      }

    } catch (e: any) {
      console.error(`Error ${url}: ${e.message}`);
    }
  }

  fs.writeFileSync(path.join(AUDIT_DIR, 'schema_issues.csv'), issues.join('\n'));
  fs.writeFileSync(path.join(AUDIT_DIR, 'ymyl_gap_list.md'), `# YMYL Gaps\n\n${ymylGaps.join('\n')}`);
  console.log('Schema validation complete.');
}

validateSchema();
