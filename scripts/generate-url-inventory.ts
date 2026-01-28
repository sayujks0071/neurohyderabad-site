
import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.drsayuj.info';
const OUTPUT_DIR = path.join(process.cwd(), 'audit/crawl');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function extractUrlsFromContent(content: string): string[] {
    const urls: string[] = [];
    // Match strings starting with / inside objects or arrays
    const matches = content.matchAll(/url:\s*'(\/[^']*)'/g);
    for (const match of matches) {
        urls.push(match[1]);
    }
    // Also match double quotes
    const matches2 = content.matchAll(/url:\s*"(\/[^"]*)"/g);
    for (const match of matches2) {
        urls.push(match[1]);
    }

    // Also match simple strings in arrays if they look like paths
    // e.g. '/blog/something',
    const matches3 = content.matchAll(/'(\/[^']*)',/g);
    for (const match of matches3) {
        if (match[1].startsWith('/') && !match[1].includes('*')) {
             urls.push(match[1]);
        }
    }
     const matches4 = content.matchAll(/"(\/[^"]*)",/g);
    for (const match of matches4) {
        if (match[1].startsWith('/') && !match[1].includes('*')) {
             urls.push(match[1]);
        }
    }

    return urls;
}

function getBlogUrls(): string[] {
    const blogDir = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);
    const urls: string[] = [];
    const FORBIDDEN_KEYWORDS = ['example', 'test', 'draft', 'sample', 'template', 'placeholder'];

    for (const file of files) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
             const slug = file.replace(/\.mdx?$/, '');
             if (!FORBIDDEN_KEYWORDS.some(k => slug.toLowerCase().includes(k))) {
                 urls.push(`/blog/${slug}`);
             }
        }
    }
    return urls;
}

function main() {
    const filesToScan = [
        'app/sitemap.ts',
        'app/sitemap-services.ts',
        'app/sitemap-conditions.ts',
        'app/sitemap-locations.ts'
    ];

    let allUrls = new Set<string>();

    // Add implicit homepage
    allUrls.add('/');

    for (const file of filesToScan) {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const urls = extractUrlsFromContent(content);
            urls.forEach(url => allUrls.add(url));
        } else {
            console.warn(`File not found: ${file}`);
        }
    }

    // Add blog posts
    const blogUrls = getBlogUrls();
    blogUrls.forEach(url => allUrls.add(url));

    const sortedUrls = Array.from(allUrls).sort();

    const jsonOutput = sortedUrls.map(url => ({
        url: `${SITE_URL}${url === '/' ? '' : url}`,
        path: url
    }));

    fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.json'), JSON.stringify(jsonOutput, null, 2));

    const csvContent = 'url,path\n' + sortedUrls.map(url => `${SITE_URL}${url === '/' ? '' : url},${url}`).join('\n');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'url_inventory.csv'), csvContent);

    console.log(`Generated inventory with ${sortedUrls.length} URLs.`);
}

main();
