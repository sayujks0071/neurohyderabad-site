const fs = require('fs');
const path = require('path');

function getFiles(dir, matchStr, fileList = []) {
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

const locationPages = getFiles('app/locations', 'page.tsx');
const rootPages = fs.readdirSync('app')
  .filter(d => d.startsWith('neurosurgeon-'))
  .map(d => path.join('app', d, 'page.tsx'))
  .filter(p => fs.existsSync(p));

const files = [...locationPages, ...rootPages];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Clean up LocationSchema Breadcrumb prop
  const oldContent1 = content;
  content = content.replace(/(\<LocationSchema[^>]+)breadcrumb=\{[^}]+\}/g, '$1');
  if (content !== oldContent1) { changed = true; }

  // 2. Replace BreadcrumbSchema with Breadcrumbs if it exists
  const oldContent2 = content;
  content = content.replace(/<BreadcrumbSchema/g, '<Breadcrumbs');
  content = content.replace(/import BreadcrumbSchema from ['"]@\/app\/components\/schemas\/BreadcrumbSchema['"];/, 'import Breadcrumbs from "@/app/components/Breadcrumbs";');
  if (content !== oldContent2) { changed = true; }

  // 3. Instead of defining `breadcrumb` array dynamically, ensure Breadcrumbs is used.
  // We'll leave the array definitions if they're used by Breadcrumbs component.

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
