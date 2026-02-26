import fs from 'fs';
import path from 'path';

interface InventoryItem {
  url: string;
  priority: number;
  changeFrequency: string;
}

interface CrawlResult {
  url: string;
  status: number;
  finalUrl: string;
  redirected: boolean;
  title?: string;
  metaDescription?: string;
  canonical?: string;
  h1?: string;
  robots?: string;
  wordCount?: number;
  error?: string;
}

const inventoryPath = path.join(process.cwd(), 'audit', 'crawl', 'url_inventory.json');
const inventory: InventoryItem[] = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

const results: CrawlResult[] = [];

// Helper to extract meta tags
const extractMeta = (html: string, name: string): string | undefined => {
  const regex = new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`, 'i');
  const match = html.match(regex);
  return match ? match[1] : undefined;
};

// Helper to extract title
const extractTitle = (html: string): string | undefined => {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1] : undefined;
};

// Helper to extract canonical
const extractCanonical = (html: string): string | undefined => {
  const match = html.match(/<link\\s+rel=["']canonical["']\\s+href=["']([^"']*)["']/i);
  return match ? match[1] : undefined;
};

// Helper to extract H1
const extractH1 = (html: string): string | undefined => {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  // Strip tags but keep text
  return match ? match[1].replace(/<[^>]*>/g, '').trim() : undefined;
};

// Helper to count words (very rough)
const countWords = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').length;
};

async function crawl() {
  console.log(`Starting crawl of ${inventory.length} URLs...`);

  // Process in chunks to avoid overwhelming the server/rate limits
  const CHUNK_SIZE = 5;
  for (let i = 0; i < inventory.length; i += CHUNK_SIZE) {
    const chunk = inventory.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(item => processUrl(item)));
    console.log(`Processed ${Math.min(i + CHUNK_SIZE, inventory.length)}/${inventory.length}`);

    // Slight delay to be polite
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const outputPath = path.join(process.cwd(), 'audit', 'crawl', 'crawl_results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Crawl complete. Results saved to ${outputPath}`);

  generateSummary();
}

async function processUrl(item: InventoryItem) {
  const result: CrawlResult = {
    url: item.url,
    status: 0,
    finalUrl: '',
    redirected: false
  };

  try {
    const response = await fetch(item.url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'SayujSEOAudit/1.0'
      }
    });

    result.status = response.status;
    result.finalUrl = response.url;
    result.redirected = response.redirected;

    if (response.ok) {
        const html = await response.text();
        parseHtml(html, result);
    }

  } catch (error: any) {
    result.error = error.message;
    console.error(`Error crawling ${item.url}:`, error.message);
  }

  results.push(result);
}

function parseHtml(html: string, result: CrawlResult) {
  result.title = extractTitle(html);
  result.metaDescription = extractMeta(html, 'description');
  result.canonical = extractCanonical(html);
  result.h1 = extractH1(html);
  result.robots = extractMeta(html, 'robots');
  result.wordCount = countWords(html);
}

function generateSummary() {
  const total = results.length;
  const status200 = results.filter(r => r.status === 200).length;
  const status3xx = results.filter(r => r.redirected).length; // redirected is captured via response.redirected
  const status404 = results.filter(r => r.status === 404).length;
  const status5xx = results.filter(r => r.status >= 500).length;
  const errors = results.filter(r => r.error).length;

  const missingTitle = results.filter(r => !r.title && r.status === 200).length;
  const missingDescription = results.filter(r => !r.metaDescription && r.status === 200).length;
  const missingH1 = results.filter(r => !r.h1 && r.status === 200).length;
  const missingCanonical = results.filter(r => !r.canonical && r.status === 200).length;

  let summary = `# Crawl Summary
Run Date: ${new Date().toISOString()}

## Overview
- **Total URLs Processed:** ${total}
- **200 OK:** ${status200}
- **Redirected:** ${status3xx}
- **404 Not Found:** ${status404}
- **5xx Errors:** ${status5xx}
- **Fetch Errors:** ${errors}

## Issues (Indexable Pages)
- **Missing Title:** ${missingTitle}
- **Missing Description:** ${missingDescription}
- **Missing H1:** ${missingH1}
- **Missing Canonical:** ${missingCanonical}

## 404s
${results.filter(r => r.status === 404).map(r => `- ${r.url}`).join('\n') || 'None'}

## 500s
${results.filter(r => r.status >= 500).map(r => `- ${r.url}`).join('\n') || 'None'}

## Redirects
${results.filter(r => r.redirected).map(r => `- ${r.url} -> ${r.finalUrl}`).join('\n') || 'None'}

## Errors
${results.filter(r => r.error).map(r => `- ${r.url}: ${r.error}`).join('\n') || 'None'}
`;

  fs.writeFileSync(path.join(process.cwd(), 'audit', 'crawl', 'crawl_summary.md'), summary);
}

crawl();
