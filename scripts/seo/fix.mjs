#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const pagePatterns = [
  path.join(repoRoot, 'app', '**/*.{js,jsx,ts,tsx,mdx}'),
  path.join(repoRoot, 'pages', '**/*.{js,jsx,ts,tsx,mdx}')
];

function extractImageSrc(tag) {
  const srcMatch = tag.match(/\bsrc\s*=\s*(?:{\s*['"]([^'"]+)['"]\s*}|['"]([^'"]+)['"])/);
  if (!srcMatch) return null;
  return srcMatch[1] || srcMatch[2];
}

async function getImageDimensions(src) {
  if (!src || !src.startsWith('/')) return null;
  const filePath = path.join(repoRoot, 'public', src);
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    if (metadata.width && metadata.height) {
      return { width: metadata.width, height: metadata.height };
    }
  } catch (error) {
    return null;
  }
  return null;
}

function ensureImageImport(content) {
  if (/from\s+['"]next\/image['"]/g.test(content)) {
    return content;
  }
  const lines = content.split('\n');
  const importIndex = lines.findIndex((line) => line.startsWith('import'));
  if (importIndex === -1) {
    return `import Image from "next/image";\n${content}`;
  }
  lines.splice(importIndex, 0, 'import Image from "next/image";');
  return lines.join('\n');
}

async function addDimensions(content) {
  let updated = content;
  const matches = [...content.matchAll(/<Image\b[^>]*>/g)];
  for (const match of matches) {
    const tag = match[0];
    if (/\bwidth\s*=/.test(tag) && /\bheight\s*=/.test(tag) && /loading\s*=/.test(tag)) {
      continue;
    }
    const src = extractImageSrc(tag);
    const dims = await getImageDimensions(src);
    let replacement = tag;
    if (dims) {
      if (!/\bwidth\s*=/.test(replacement)) {
        replacement = replacement.replace(/<Image/, `<Image width={${dims.width}}`);
      }
      if (!/\bheight\s*=/.test(replacement)) {
        replacement = replacement.replace(/<Image/, `<Image height={${dims.height}}`);
      }
    }
    if (!/\bloading\s*=/.test(replacement) && !/\bpriority\s*=/.test(replacement)) {
      replacement = replacement.replace(/<Image/, '<Image loading="lazy"');
    }
    if (replacement !== tag) {
      updated = updated.replace(tag, replacement);
    }
  }
  return updated;
}

async function convertImgTags(content) {
  let updated = content;
  const regex = /<img\b[^>]*>/gi;
  let match;
  while ((match = regex.exec(content))) {
    const tag = match[0];
    const src = extractImageSrc(tag);
    if (!src || !src.startsWith('/')) continue;
    const dims = await getImageDimensions(src);
    const alt = tag.match(/\balt\s*=\s*(?:['"]([^'"]*)['"]|{['"]([^'"]*)['"]})/i);
    const altValue = alt ? alt[1] || alt[2] || '' : '';
    const classNameMatch = tag.match(/\bclass(Name)?\s*=\s*("[^"]+"|{[^}]+})/i);
    const classAttribute = classNameMatch ? ` className=${classNameMatch[2]}` : '';
    const widthAttr = dims ? ` width={${dims.width}}` : '';
    const heightAttr = dims ? ` height={${dims.height}}` : '';
    const altAttr = altValue ? ` alt="${altValue}"` : ' alt=""';
    const loadingAttr = /loading\s*=/.test(tag) ? '' : ' loading="lazy"';
    const newTag = `<Image src="${src}"${altAttr}${widthAttr}${heightAttr}${loadingAttr}${classAttribute} />`;
    updated = updated.replace(tag, newTag);
    updated = ensureImageImport(updated);
  }
  return updated;
}

async function processFile(file) {
  let content = await fs.readFile(file, 'utf8');
  let updated = content;
  updated = await addDimensions(updated);
  updated = await convertImgTags(updated);
  if (updated !== content) {
    await fs.writeFile(file, updated, 'utf8');
    console.log(`Updated ${path.relative(repoRoot, file)}`);
  }
}

async function ensureLayoutCanonical() {
  const layoutPath = path.join(repoRoot, 'app', 'layout.tsx');
  try {
    let content = await fs.readFile(layoutPath, 'utf8');
    if (!/<link\s+rel="canonical"/i.test(content)) {
      content = content.replace(
        /<head[^>]*>/i,
        (match) =>
          `${match}\n    <link rel="canonical" href="https://www.drsayuj.info" />`
      );
      await fs.writeFile(layoutPath, content, 'utf8');
      console.log('Injected canonical hint into app/layout.tsx');
    }
  } catch (error) {
    console.warn('Unable to ensure canonical in layout:', error.message);
  }
}

(async () => {
  try {
    const patterns = await Promise.all(pagePatterns.map((pattern) => glob(pattern, { nodir: true, ignore: ['**/node_modules/**', '**/.next/**'] })));
    const files = patterns.flat();
    for (const file of files) {
      await processFile(file);
    }
    await ensureLayoutCanonical();
  } catch (error) {
    console.error('seo:fix failed', error);
    process.exitCode = 1;
  }
})();
