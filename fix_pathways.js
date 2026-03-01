const fs = require('fs');
const path = require('path');

function getFiles(dir, matchStr, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, matchStr, fileList);
    } else if (filePath.endsWith(matchStr)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const servicePages = getFiles('app/services', 'page.tsx');
const conditionPages = getFiles('app/conditions', 'page.tsx');

function ensureLocalPathways(files, mode) {
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Extract slug from filename. E.g., 'app/services/slip-disc/page.tsx' -> 'slip-disc'
    const parts = file.split(path.sep);
    const slug = parts[parts.length - 2];

    // Skip root index pages like app/services/page.tsx
    if (slug === 'services' || slug === 'conditions') {
       if (content.includes('<LocalPathways mode=')) {
           content = content.replace(/<LocalPathways mode="[^"]+" \/>/g, `<LocalPathways mode="${mode}" />`);
           changed = true;
       }
       continue;
    }

    // Check if LocalPathways is imported
    if (!content.includes('LocalPathways')) {
        content = content.replace(/(import[^;]+;)/, '$1\nimport { LocalPathways } from "@/src/components/locations/LocalPathways";');
        changed = true;
    }

    // Check if LocalPathways component is used
    if (content.includes('<LocalPathways')) {
       // Update existing one to ensure correct mode and currentSlug
       const regex = new RegExp(`<LocalPathways[^>]*mode="${mode}"[^>]*>`, 'g');
       if (content.match(regex)) {
           // It exists, maybe update it? Let's just ensure it has currentSlug if it doesn't
           const newTag = `<LocalPathways mode="${mode}" currentSlug="${slug}" />`;
           content = content.replace(/<LocalPathways[^>]*mode="[^"]+"[^>]*\/>/g, newTag);
           changed = true;
       } else {
           // Might be missing mode, or wrong mode.
           const newTag = `<LocalPathways mode="${mode}" currentSlug="${slug}" />`;
           content = content.replace(/<LocalPathways[^>]*\/>/g, newTag);
           changed = true;
       }
    } else {
       // Add it before the closing </main> or </div> tag
       const insertTag = `\n      <div className="mt-12">\n        <LocalPathways mode="${mode}" currentSlug="${slug}" />\n      </div>\n`;
       if (content.includes('</main>')) {
           content = content.replace('</main>', `${insertTag}</main>`);
           changed = true;
       } else if (content.lastIndexOf('</div>') !== -1) {
           const lastDiv = content.lastIndexOf('</div>');
           content = content.substring(0, lastDiv) + insertTag + content.substring(lastDiv);
           changed = true;
       }
    }

    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
}

ensureLocalPathways(servicePages, 'service');
ensureLocalPathways(conditionPages, 'condition');
