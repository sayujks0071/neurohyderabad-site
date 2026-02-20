// @ts-ignore
import { JSDOM } from 'jsdom';
import { unstable_cache } from 'next/cache';

/**
 * Scrapes content from a given URL.
 * Includes SSRF protection and basic content extraction heuristics.
 */
async function performScrape(url: string): Promise<string> {
  const urlObj = new URL(url);
  if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
    throw new Error('Invalid URL protocol. Only http and https are allowed.');
  }

  // Basic SSRF protection
  const hostname = urlObj.hostname;

  // Check for obvious local/private hostnames
  if (hostname === 'localhost' || hostname === '::1' || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    throw new Error('Restricted URL access.');
  }

  // Check for IPv4 private ranges if hostname is an IP
  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIP) {
    const parts = hostname.split('.').map(Number);
    if (
      parts[0] === 10 ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      parts[0] === 127 ||
      (parts[0] === 169 && parts[1] === 254)
    ) {
      throw new Error('Restricted URL access (Private IP).');
    }
  }

  const response = await fetch(url, {
    redirect: 'error', // Prevent redirects to avoid bypassing initial checks
    headers: {
      'User-Agent': 'DrSayuj-Summarizer/1.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Extract content (prioritize article, then main, then body)
  // Remove scripts and styles first
  const scripts = doc.querySelectorAll('script, style, noscript, iframe, svg');
  scripts.forEach((script: any) => script.remove());

  const article = doc.querySelector('article') || doc.querySelector('main') || doc.body;
  const content = article?.textContent || '';

  // Clean up content (remove excessive whitespace)
  const cleanContent = content.replace(/\s+/g, ' ').trim().substring(0, 15000); // Limit to reasonable size

  if (!cleanContent) {
    throw new Error('Could not extract meaningful content from the URL');
  }

  return cleanContent;
}

/**
 * Cached version of scrapeContent.
 * Caches results for 1 hour to prevent redundant fetching.
 */
export const scrapeContent = unstable_cache(
  performScrape,
  ['scraped-content-v1'],
  {
    revalidate: 3600, // 1 hour
    tags: ['scraping']
  }
);
