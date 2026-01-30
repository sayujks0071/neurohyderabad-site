
import fs from 'fs';
import path from 'path';

const ISSUES_FILE = path.join(process.cwd(), 'audit/tech/tech_issues.csv');
const SITEMAP_FILES = [
  path.join(process.cwd(), 'app/sitemap-conditions.ts'),
  path.join(process.cwd(), 'app/sitemap-services.ts'),
  path.join(process.cwd(), 'app/sitemap-locations.ts'),
  path.join(process.cwd(), 'app/sitemap.ts')
];

if (fs.existsSync(ISSUES_FILE)) {
  const content = fs.readFileSync(ISSUES_FILE, 'utf-8');
  const lines = content.split('\n');
  const ghosts = lines
    .filter(l => l.includes('Status 404'))
    .map(l => {
      const match = l.match(/"([^"]+)"/);
      return match ? match[1] : null;
    })
    .filter(u => u && !u.includes('${')); // Filter out template literal artifacts

  console.log(`Found ${ghosts.length} ghost URLs.`);

  ghosts.forEach(url => {
    if (!url) return;
    // We search for the partial path in the sitemap files
    // e.g. /conditions/xyz
    // The sitemap files have: { url: '/conditions/xyz', priority: ... }
    // We want to replace it with: // { url: '/conditions/xyz', ... }

    SITEMAP_FILES.forEach(file => {
      if (fs.existsSync(file)) {
        let fileContent = fs.readFileSync(file, 'utf-8');
        // Escape regex special chars in url
        const safeUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Regex to match the line containing this URL
        const regex = new RegExp(`^(\\s*)({.*url:\\s*['"]${safeUrl}['"].*})`, 'gm');

        if (regex.test(fileContent)) {
          console.log(`Commenting out ${url} in ${path.basename(file)}`);
          fileContent = fileContent.replace(regex, '$1// $2');
          fs.writeFileSync(file, fileContent);
        }

        // Also handle simple string arrays in app/sitemap.ts
        const regexString = new RegExp(`^(\\s*)(['"]${safeUrl}['"],)`, 'gm');
        if (regexString.test(fileContent)) {
             console.log(`Commenting out ${url} string in ${path.basename(file)}`);
             fileContent = fileContent.replace(regexString, '$1// $2');
             fs.writeFileSync(file, fileContent);
        }
      }
    });
  });
}
