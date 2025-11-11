import fs from 'fs';
import path from 'path';

interface InternalLinkMapping {
  url: string;
  linkTo: string[];
  linkFrom: string[];
}

const INTERNAL_LINKS_PATH = path.join(process.cwd(), 'seo', 'internal-links.json');
let cache: InternalLinkMapping[] | null = null;

function loadInternalLinks(): InternalLinkMapping[] {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(INTERNAL_LINKS_PATH, 'utf8');
    cache = JSON.parse(raw);
  } catch (error) {
    console.warn('[seo/internal-links] Unable to read internal-links.json.');
    cache = [];
  }
  return cache;
}

export function getInternalLinksFor(url: string) {
  const mappings = loadInternalLinks();
  const entry = mappings.find((item) => item.url === url);
  return entry ?? { url, linkTo: [], linkFrom: [] };
}
