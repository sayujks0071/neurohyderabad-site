
import fs from 'fs';
import path from 'path';

interface UrlEntry {
    url: string;
    path: string;
}

interface PageAnalysis {
    url: string;
    filePath: string | null;
    title: string | null;
    description: string | null;
    h1: string[];
    h2: string[];
    wordCount: number;
    issues: string[];
}

const INVENTORY_PATH = path.join(process.cwd(), 'audit/crawl/url_inventory.json');
const OUTPUT_DIR = path.join(process.cwd(), 'audit/onpage');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function findFilePath(urlPath: string): string | null {
    if (urlPath === '/') return 'app/page.tsx';

    // Check direct match in app directory
    const cleanPath = urlPath.replace(/^\//, '');
    const directPath = path.join('app', cleanPath, 'page.tsx');
    if (fs.existsSync(directPath)) return directPath;

    // Check blog
    if (urlPath.startsWith('/blog/')) {
        const slug = urlPath.replace('/blog/', '');
        const mdxPath = path.join('content/blog', `${slug}.mdx`);
        if (fs.existsSync(mdxPath)) return mdxPath;
        const mdPath = path.join('content/blog', `${slug}.md`);
        if (fs.existsSync(mdPath)) return mdPath;
    }

    return null;
}

function analyzeFile(filePath: string): { title: string | null, description: string | null, h1: string[], h2: string[], wordCount: number } {
    const content = fs.readFileSync(filePath, 'utf-8');

    let title: string | null = null;
    let description: string | null = null;

    // Try to extract metadata from export const metadata
    const metadataMatch = content.match(/export const metadata\s*=\s*{([\s\S]*?)};/);
    if (metadataMatch) {
        const metadataBody = metadataMatch[1];
        const titleMatch = metadataBody.match(/title:\s*['"](.*?)['"]/);
        const descMatch = metadataBody.match(/description:\s*['"](.*?)['"]/);
        if (titleMatch) title = titleMatch[1];
        if (descMatch) description = descMatch[1];
    }

    // Try frontmatter for MDX
    if (!title) {
        const titleMatch = content.match(/^title:\s*['"]?(.*?)['"]?$/m);
        if (titleMatch) title = titleMatch[1];
    }
    if (!description) {
        const descMatch = content.match(/^description:\s*['"]?(.*?)['"]?$/m);
        if (descMatch) description = descMatch[1];
        else {
             const descMatch2 = content.match(/^excerpt:\s*['"]?(.*?)['"]?$/m);
             if (descMatch2) description = descMatch2[1];
        }
    }

    // Extract H1
    const h1: string[] = [];
    // Markdown #
    const mdH1Matches = content.matchAll(/^#\s+(.*)$/gm);
    for (const m of mdH1Matches) h1.push(m[1].trim());
    // JSX <h1>
    const jsxH1Matches = content.matchAll(/<h1[^>]*>(.*?)<\/h1>/g);
    for (const m of jsxH1Matches) h1.push(m[1].replace(/<[^>]+>/g, '').trim());

    // Extract H2
    const h2: string[] = [];
    // Markdown ##
    const mdH2Matches = content.matchAll(/^##\s+(.*)$/gm);
    for (const m of mdH2Matches) h2.push(m[1].trim());
    // JSX <h2>
    const jsxH2Matches = content.matchAll(/<h2[^>]*>(.*?)<\/h2>/g);
    for (const m of jsxH2Matches) h2.push(m[1].replace(/<[^>]+>/g, '').trim());

    // Word count (rough)
    const cleanContent = content.replace(/<[^>]+>/g, ' ').replace(/[#*_`]/g, '');
    const wordCount = cleanContent.split(/\s+/).filter(w => w.length > 0).length;

    return { title, description, h1, h2, wordCount };
}

function main() {
    if (!fs.existsSync(INVENTORY_PATH)) {
        console.error('Inventory not found');
        return;
    }

    const inventory: UrlEntry[] = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf-8'));
    const results: PageAnalysis[] = [];

    const titleMap = new Map<string, string[]>();
    const descMap = new Map<string, string[]>();

    for (const entry of inventory) {
        const filePath = findFilePath(entry.path);
        const analysis: PageAnalysis = {
            url: entry.url,
            filePath,
            title: null,
            description: null,
            h1: [],
            h2: [],
            wordCount: 0,
            issues: []
        };

        if (filePath) {
            const data = analyzeFile(filePath);
            analysis.title = data.title;
            analysis.description = data.description;
            analysis.h1 = data.h1;
            analysis.h2 = data.h2;
            analysis.wordCount = data.wordCount;

            // Checks
            if (!analysis.title) analysis.issues.push('Missing Title');
            else if (analysis.title.length < 10) analysis.issues.push('Title too short');
            else if (analysis.title.length > 70) analysis.issues.push('Title too long');

            if (!analysis.description) analysis.issues.push('Missing Description');
            else if (analysis.description.length < 50) analysis.issues.push('Description too short');
            else if (analysis.description.length > 160) analysis.issues.push('Description too long');

            if (analysis.h1.length === 0) analysis.issues.push('Missing H1');
            if (analysis.h1.length > 1) analysis.issues.push('Multiple H1');

            if (analysis.wordCount < 200) analysis.issues.push('Thin Content');

            if (analysis.title) {
                const existing = titleMap.get(analysis.title) || [];
                existing.push(entry.url);
                titleMap.set(analysis.title, existing);
            }
             if (analysis.description) {
                const existing = descMap.get(analysis.description) || [];
                existing.push(entry.url);
                descMap.set(analysis.description, existing);
            }

        } else {
            // Cannot find file (dynamic route?)
             // analysis.issues.push('Cannot analyze (Dynamic Route?)');
        }

        results.push(analysis);
    }

    // Check duplicates
    for (const result of results) {
        if (result.title && (titleMap.get(result.title)?.length || 0) > 1) {
            result.issues.push('Duplicate Title');
        }
         if (result.description && (descMap.get(result.description)?.length || 0) > 1) {
            result.issues.push('Duplicate Description');
        }
    }

    // Output CSV
    const csvHeader = 'url,file_path,title,description,h1_count,h2_count,word_count,issues\n';
    const csvRows = results.map(r => {
        const issues = r.issues.join('; ');
        const title = r.title ? `"${r.title.replace(/"/g, '""')}"` : '';
        const description = r.description ? `"${r.description.replace(/"/g, '""')}"` : '';
        return `${r.url},${r.filePath || ''},${title},${description},${r.h1.length},${r.h2.length},${r.wordCount},"${issues}"`;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'onpage_issues.csv'), csvHeader + csvRows.join('\n'));
    console.log(`Analyzed ${results.length} URLs. Output to audit/onpage/onpage_issues.csv`);
}

main();
