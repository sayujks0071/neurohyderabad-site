const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  try {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files);
      } else {
        files.push(name);
      }
    }
  } catch (e) {
    // ignore
  }
  return files;
}

const allFiles = getFiles('app');
const components = getFiles('components');
const srcComponents = getFiles('src/components');

console.log('file,type,check,status,details');

// 1. Performance Checks
for (const file of [...allFiles, ...components, ...srcComponents]) {
  if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) continue;
  const content = fs.readFileSync(file, 'utf8');

  // Check for <img> instead of <Image> or OptimizedImage
  // exclude svg files or trivial usages
  const imgTag = /<img\s/g;
  if (imgTag.test(content) && !file.includes('OptimizedImage')) {
    console.log(`${file},perf,img_tag,warn,"Using <img> tag directly. Check if next/image is possible."`);
  }

  // Check for Google Fonts in Head (legacy)
  if (content.includes('googleapis.com/css')) {
    console.log(`${file},perf,google_fonts_link,warn,"Using Google Fonts via link tag. Use next/font."`);
  }

  // Check for sync scripts
  if (content.includes('<script src=')) {
     console.log(`${file},perf,sync_script,warn,"Synchronous script tag detected."`);
  }
}

// 2. On-Page Checks (Metadata)
const pageFiles = allFiles.filter(f => f.endsWith('/page.tsx'));
for (const file of pageFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const hasMetadata = content.includes('export const metadata');
  const hasGenerateMetadata = content.includes('export async function generateMetadata');
  const hasNextSeo = content.includes('NextSeo');

  if (!hasMetadata && !hasGenerateMetadata && !hasNextSeo) {
    console.log(`${file},onpage,metadata_missing,error,"No metadata export found."`);
  }

  // Check H1
  if (!content.includes('<h1')) {
      // It might be in a component, but good to flag
      console.log(`${file},onpage,h1_missing,warn,"No <h1> tag found in page file."`);
  }
}

// 3. Schema Checks
for (const file of pageFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const hasSchema = content.includes('json-ld') || content.includes('JsonLd') || content.includes('schema');

  if (!hasSchema) {
     // Check if it imports a schema component
     const importsSchema = /import.*Schema.*from/.test(content);
     if (!importsSchema) {
         console.log(`${file},schema,schema_missing,warn,"No Schema detected."`);
     }
  }
}
