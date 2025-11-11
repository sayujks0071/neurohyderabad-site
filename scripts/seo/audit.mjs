#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

function formatDateIST(date = new Date()) {
  const utcMillis = date.getTime();
  const istOffsetMillis = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utcMillis + istOffsetMillis);
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const TODAY = formatDateIST();
const reportDir = path.join(repoRoot, 'seo', 'reports');
const auditReportPath = path.join(reportDir, `AUDIT-${TODAY}.md`);

const thresholdLargeAssetBytes = 350 * 1024; // 350 KB

const pageGlobs = [
  path.join(repoRoot, 'app', '**/page.@(js|jsx|ts|tsx|mdx)'),
  path.join(repoRoot, 'pages', '**/*.@(js|jsx|ts|tsx|mdx)')
];

function toRoute(filePath) {
  const rel = path.relative(repoRoot, filePath).replaceAll('\\', '/');
  if (rel.startsWith('app/')) {
    const segments = rel.split('/');
    const file = segments.pop();
    if (!file?.startsWith('page.')) {
      return null;
    }
    const filtered = segments.slice(1).filter(Boolean).filter(seg => !seg.startsWith('('));
    const route = `/${filtered.join('/')}`.replace(/\/+/g, '/');
    return route === '/' ? '/' : route.replace(/\/$/, '') || '/';
  }
  if (rel.startsWith('pages/')) {
    const withoutExt = rel.replace(/^pages\//, '').replace(/\.(jsx?|tsx?|mdx)$/, '');
    if (withoutExt === 'index') return '/';
    return `/${withoutExt.replace(/index$/, '').replace(/\/$/, '')}`;
  }
  return null;
}

function extractH1(content) {
  const matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
}

function extractMetadataTitle(content) {
  const metadataMatch = content.match(/metadata\s*=\s*{[\s\S]*?title\s*:\s*([^,}]+)/i);
  if (metadataMatch) {
    return metadataMatch[1].replace(/[`'"]/g, '').trim();
  }
  const makeMetadataMatch = content.match(/makeMetadata\(\{[\s\S]*?title:\s*([^,}]+)/i);
  if (makeMetadataMatch) {
    return makeMetadataMatch[1].replace(/[`'"]/g, '').trim();
  }
  return null;
}

function extractCanonical(content) {
  if (/canonical/i.test(content)) return true;
  return false;
}

function hasJsonLd(content) {
  return /application\/ld\+json|@type\s*:\s*['"][A-Za-z]/i.test(content);
}

function hasFaq(content) {
  return /FAQPage|FaqSection|Frequently\s+Asked\s+Questions/i.test(content);
}

function extractImageIssues(content) {
  const images = [...content.matchAll(/<Image\b[^>]*>/g)];
  const missingDims = [];
  const missingAlt = [];
  const sources = [];
  for (const match of images) {
    const tag = match[0];
    const hasWidth = /\bwidth\s*=/.test(tag);
    const hasHeight = /\bheight\s*=/.test(tag);
    const hasAlt = /\balt\s*=/.test(tag);
    const srcMatch = tag.match(/\bsrc\s*=\s*(?:{\s*['"]([^'"]+)['"]\s*}|['"]([^'"]+)['"])/);
    const src = srcMatch ? (srcMatch[1] || srcMatch[2]) : null;
    if (!hasWidth || !hasHeight) {
      missingDims.push({ tag, src });
    }
    if (!hasAlt) {
      missingAlt.push({ tag, src });
    }
    if (src) {
      sources.push(src);
    }
  }
  const rawImgs = [...content.matchAll(/<img\b[^>]*>/gi)];
  for (const match of rawImgs) {
    const tag = match[0];
    const srcMatch = tag.match(/\bsrc\s*=\s*(?:['"]([^'"]+)['"]|{['"]([^'"]+)['"]})/i);
    const src = srcMatch ? (srcMatch[1] || srcMatch[2]) : null;
    missingDims.push({ tag, src, legacy: true });
    if (!/\balt\s*=/.test(tag)) {
      missingAlt.push({ tag, src });
    }
    if (src) {
      sources.push(src);
    }
  }
  return { missingDims, missingAlt, sources };
}

async function detectLargeAssets(sources) {
  const unique = Array.from(new Set(sources.filter(Boolean)));
  const large = [];
  for (const src of unique) {
    if (!src.startsWith('/')) continue;
    const filePath = path.join(repoRoot, 'public', src);
    try {
      const stats = await fs.stat(filePath);
      if (stats.size >= thresholdLargeAssetBytes) {
        large.push({ src, size: stats.size });
      }
    } catch (err) {
      // Ignore missing files, but note them as large to flag broken references.
      large.push({ src, size: 0, missing: true });
    }
  }
  return large;
}

function extractInternalLinks(content) {
  const links = new Set();
  const patterns = [
    /<Link[^>]*href\s*=\s*"([^"]+)"/g,
    /<Link[^>]*href\s*=\s*{\s*['"]([^'"]+)['"]\s*}/g,
    /<a[^>]*href\s*=\s*"([^"]+)"/gi,
    /<a[^>]*href\s*=\s*{\s*['"]([^'"]+)['"]\s*}/gi
  ];
  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(content))) {
      const href = match[1];
      if (href && href.startsWith('/')) {
        links.add(href.split('#')[0]);
      }
    }
  }
  return Array.from(links);
}

async function analyzePages() {
  const files = (await Promise.all(pageGlobs.map(pattern => glob(pattern, { nodir: true, ignore: ['**/node_modules/**', '**/.next/**'] }))))
    .flat();

  const analyses = [];
  for (const file of files) {
    const route = toRoute(file);
    if (!route) continue;
    const content = await fs.readFile(file, 'utf8');
    const h1s = extractH1(content);
    const metadataTitle = extractMetadataTitle(content);
    const canonical = extractCanonical(content);
    const jsonLd = hasJsonLd(content);
    const faq = hasFaq(content);
    const { missingDims, missingAlt, sources } = extractImageIssues(content);
    const largeAssets = await detectLargeAssets(sources);
    const internalLinks = extractInternalLinks(content);

    analyses.push({
      file: path.relative(repoRoot, file),
      route,
      h1s,
      metadataTitle,
      canonical,
      jsonLd,
      faq,
      missingDims,
      missingAlt,
      largeAssets,
      internalLinks,
    });
  }
  return analyses;
}

function computeDuplicateTitles(pages) {
  const titleMap = new Map();
  for (const page of pages) {
    if (!page.metadataTitle) continue;
    const key = page.metadataTitle.toLowerCase();
    const entry = titleMap.get(key) ?? [];
    entry.push(page.route);
    titleMap.set(key, entry);
  }
  return Array.from(titleMap.entries())
    .filter(([, routes]) => routes.length > 1)
    .map(([title, routes]) => ({ title, routes }));
}

function computeDuplicateH1(pages) {
  const map = new Map();
  for (const page of pages) {
    for (const h1 of page.h1s) {
      if (!h1) continue;
      const key = h1.toLowerCase();
      const entry = map.get(key) ?? [];
      entry.push(page.route);
      map.set(key, entry);
    }
  }
  return Array.from(map.entries())
    .filter(([, routes]) => routes.length > 1)
    .map(([h1, routes]) => ({ h1, routes }));
}

function buildInternalGraph(pages) {
  const graph = new Map();
  for (const page of pages) {
    graph.set(page.route, {
      from: new Set(),
      to: new Set(page.internalLinks),
      file: page.file,
    });
  }
  for (const page of pages) {
    for (const target of page.internalLinks) {
      const node = graph.get(target);
      if (node) {
        node.from.add(page.route);
      }
    }
  }
  const orphans = [];
  for (const [route, data] of graph.entries()) {
    if (route === '/' || route.startsWith('/api')) continue;
    if (data.from.size === 0) {
      orphans.push({ route, file: data.file });
    }
  }
  const graphSnapshot = Array.from(graph.entries()).map(([route, data]) => ({
    route,
    incoming: Array.from(data.from).sort(),
    outgoing: Array.from(data.to).sort(),
  }));
  return { graph: graphSnapshot, orphans };
}

function summariseIssues(pages) {
  const missingCanonical = pages.filter(page => !page.canonical);
  const missingJsonLd = pages.filter(page => !page.jsonLd);
  const missingFaq = pages.filter(page => !page.faq);
  const missingDims = pages.filter(page => page.missingDims.length > 0);
  const missingAlt = pages.filter(page => page.missingAlt.length > 0);
  const largeAssets = pages.flatMap(page => page.largeAssets.map(asset => ({ ...asset, route: page.route })));
  return { missingCanonical, missingJsonLd, missingFaq, missingDims, missingAlt, largeAssets };
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function hashObject(obj) {
  return crypto.createHash('sha1').update(JSON.stringify(obj)).digest('hex').slice(0, 8);
}

async function writeReport(pages) {
  await fs.mkdir(reportDir, { recursive: true });
  const duplicatesTitle = computeDuplicateTitles(pages);
  const duplicatesH1 = computeDuplicateH1(pages);
  const { graph, orphans } = buildInternalGraph(pages);
  const issues = summariseIssues(pages);

  const checks = [
    {
      label: 'All Next/Image components include width & height',
      status: issues.missingDims.length === 0 ? '✅' : '❌',
      detail: issues.missingDims.length === 0
        ? 'No missing dimensions detected.'
        : `${issues.missingDims.length} routes missing width/height attributes.`,
    },
    {
      label: 'All media tagged with descriptive alt text',
      status: issues.missingAlt.length === 0 ? '✅' : '❌',
      detail: issues.missingAlt.length === 0
        ? 'All images include alt text.'
        : `${issues.missingAlt.length} routes missing alt text on one or more images.`,
    },
    {
      label: 'Canonical tags configured',
      status: issues.missingCanonical.length === 0 ? '✅' : '❌',
      detail: issues.missingCanonical.length === 0
        ? 'All pages contain canonical hints.'
        : `${issues.missingCanonical.length} routes missing canonical configuration.`,
    },
    {
      label: 'Structured data (JSON-LD) present',
      status: issues.missingJsonLd.length === 0 ? '✅' : '❌',
      detail: issues.missingJsonLd.length === 0
        ? 'All templates include JSON-LD.'
        : `${issues.missingJsonLd.length} routes missing JSON-LD blocks.`,
    },
    {
      label: 'FAQ schema or section available',
      status: issues.missingFaq.length === 0 ? '✅' : '⚠️',
      detail: issues.missingFaq.length === 0
        ? 'FAQ coverage confirmed.'
        : `${issues.missingFaq.length} routes missing FAQ coverage.`,
    },
    {
      label: 'Large assets (>350KB) optimised',
      status: issues.largeAssets.length === 0 ? '✅' : '⚠️',
      detail: issues.largeAssets.length === 0
        ? 'No large image assets detected.'
        : `${issues.largeAssets.length} image assets exceed budget.`,
    },
  ];

  const reportLines = [];
  reportLines.push(`# Technical SEO + Performance Audit — ${TODAY}`);
  reportLines.push('');
  reportLines.push('> Automated crawl of App Router & Pages Router templates. Review critical fails before publishing.');
  reportLines.push('');
  reportLines.push('## Core Web Vitals Snapshot (Field/Estimated)');
  reportLines.push('- **LCP:** TODO — capture via Lighthouse CI');
  reportLines.push('- **INP:** TODO — capture via Web Vitals script');
  reportLines.push('- **CLS:** TODO — capture via Lighthouse CI');
  reportLines.push('- **Bundle Size:** TODO — integrate `next build --profile` output');
  reportLines.push('- **Hydration/Route Metrics:** TODO — measure using React profiler & Next.js analyser');
  reportLines.push('');
  reportLines.push('## Automated Checklist');
  reportLines.push('');
  reportLines.push('| Check | Status | Notes |');
  reportLines.push('| --- | :---: | --- |');
  for (const check of checks) {
    reportLines.push(`| ${check.label} | ${check.status} | ${check.detail} |`);
  }
  reportLines.push('');

  if (duplicatesTitle.length > 0) {
    reportLines.push('### Duplicate Titles');
    for (const dup of duplicatesTitle) {
      reportLines.push(`- **${dup.title}** → ${dup.routes.join(', ')}`);
    }
    reportLines.push('');
  }

  if (duplicatesH1.length > 0) {
    reportLines.push('### Duplicate H1 Headings');
    for (const dup of duplicatesH1) {
      reportLines.push(`- **${dup.h1}** → ${dup.routes.join(', ')}`);
    }
    reportLines.push('');
  }

  reportLines.push('## Routes Missing Critical Elements');
  reportLines.push('');
  const issueSections = [
    ['Missing Canonical', issues.missingCanonical],
    ['Missing JSON-LD', issues.missingJsonLd],
    ['Missing FAQ Coverage', issues.missingFaq],
    ['Images Missing Width/Height', issues.missingDims],
    ['Images Missing Alt Text', issues.missingAlt],
  ];

  for (const [label, list] of issueSections) {
    reportLines.push(`### ${label}`);
    if (list.length === 0) {
      reportLines.push('- ✅ None');
    } else {
      for (const page of list) {
        const identifier = page.route ?? page.file;
        reportLines.push(`- ❌ ${identifier} (${page.file})`);
      }
    }
    reportLines.push('');
  }

  if (issues.largeAssets.length > 0) {
    reportLines.push('### Oversized Assets (>350KB)');
    for (const asset of issues.largeAssets) {
      const sizeLabel = asset.missing ? 'missing' : formatBytes(asset.size);
      reportLines.push(`- ⚠️ ${asset.route} → ${asset.src} (${sizeLabel})`);
    }
    reportLines.push('');
  }

  reportLines.push('## Internal Linking Graph');
  reportLines.push('');
  reportLines.push('```json');
  reportLines.push(JSON.stringify(graph, null, 2));
  reportLines.push('```');
  reportLines.push('');

  reportLines.push('### Orphan Routes (No Internal Links In)');
  if (orphans.length === 0) {
    reportLines.push('- ✅ None');
  } else {
    for (const orphan of orphans) {
      reportLines.push(`- ❌ ${orphan.route} (${orphan.file})`);
    }
  }
  reportLines.push('');

  reportLines.push('## Content Signals Review');
  reportLines.push('- Title/H1 alignment: pending manual verification for tonal consistency.');
  reportLines.push('- Entity coverage: ensure inclusion of procedure, risk, recovery, and Hyderabad locality data.');
  reportLines.push('- FAQs: auto-detected coverage summary above.');
  reportLines.push('- Internal links: see graph + recommendations.');
  reportLines.push('- Thin/duplicate content: TODO — connect to content quality pipeline.');
  reportLines.push('');

  reportLines.push('## Image & Font Hygiene');
  reportLines.push('- Ensure hero images preloaded via `<link rel="preload" as="image">`.');
  reportLines.push('- Prefer AVIF/WebP output for images above 300KB — see oversized assets list.');
  reportLines.push('- Validate `next/font` preloading (Inter) and fallback stack.');
  reportLines.push('');

  reportLines.push('## Action Items');
  reportLines.push('- [ ] Run `npm run seo:fix` to auto-add missing width/height and canonical tags.');
  reportLines.push('- [ ] Review FAQ gaps for priority service pages.');
  reportLines.push('- [ ] Convert flagged images to AVIF/WebP and update references.');
  reportLines.push('- [ ] Update metadata via `src/seo/metadata.ts` helper for consistency.');
  reportLines.push('');

  const hash = hashObject({ pages, orphans });
  reportLines.push(`_Report checksum: ${hash}_`);

  await fs.writeFile(auditReportPath, reportLines.join('\n'), 'utf8');
  console.log(`SEO audit report written to ${path.relative(repoRoot, auditReportPath)}`);
}

(async () => {
  try {
    const pages = await analyzePages();
    await writeReport(pages);
  } catch (error) {
    console.error('Failed to generate SEO audit report:', error);
    process.exitCode = 1;
  }
})();
