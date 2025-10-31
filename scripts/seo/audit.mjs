#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { globby } from 'globby';

async function run() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const projectRoot = resolve(__dirname, '..', '..');

  const dateSlug = new Date().toISOString().split('T')[0];
  const outputDir = join(projectRoot, 'reports', 'seo');
  const outputFile = join(outputDir, `${dateSlug}.json`);

  await mkdir(outputDir, { recursive: true });

  const pageGlobs = [
    'app/**/*.{tsx,ts,mdx,md}',
    'src/pages/**/*.{tsx,ts,mdx,md}',
    'pages/**/*.{tsx,ts,mdx,md}',
  ];

  const pageFiles = await globby(pageGlobs, {
    cwd: projectRoot,
    gitignore: true,
    onlyFiles: true,
  });

  const summary = {
    generatedAt: new Date().toISOString(),
    totals: {
      pageCount: pageFiles.length,
    },
    samples: pageFiles.slice(0, 25),
  };

  await writeFile(outputFile, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`[seo:audit] Wrote ${outputFile}`);
}

run().catch((error) => {
  console.error('[seo:audit] Failed to generate audit report');
  console.error(error);
  process.exitCode = 1;
});
