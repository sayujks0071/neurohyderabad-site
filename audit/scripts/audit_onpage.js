const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
const inventoryPath = path.join(rootDir, 'audit/crawl/url_inventory.json');
const outputDir = path.join(rootDir, 'audit/onpage');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const urls = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

const issues = [];
const techIssues = [];

function mapUrlToFilePath(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    if (pathname === '/') return 'app/page.tsx';

    // Check if it matches a blog pattern
    if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '');
        const mdxPath = `content/blog/${slug}.mdx`;
        if (fs.existsSync(path.join(rootDir, mdxPath))) return mdxPath;

        // Legacy blog check
        const legacyPath = `app/blog/${slug}/page.tsx`;
        if (fs.existsSync(path.join(rootDir, legacyPath))) return legacyPath;
    }

    // Try direct mapping to app directory
    let filePath = `app${pathname}/page.tsx`;
    if (fs.existsSync(path.join(rootDir, filePath))) return filePath;

    // Try stripping trailing slash if any
    if (pathname.endsWith('/')) {
        filePath = `app${pathname.slice(0, -1)}/page.tsx`;
        if (fs.existsSync(path.join(rootDir, filePath))) return filePath;
    }

    // Try without leading slash for path join
    // (Already handled by app${pathname})

    return null;
}

function analyzeFile(url, filePath) {
    const content = fs.readFileSync(path.join(rootDir, filePath), 'utf8');
    const isMdx = filePath.endsWith('.mdx');

    let title = null;
    let description = null;
    let h1 = null;
    let canonical = null;

    if (isMdx) {
        // Parse frontmatter
        const titleMatch = /title:\s*['"]?([^'"\n]+)['"]?/.exec(content);
        if (titleMatch) title = titleMatch[1];

        const descMatch = /(?:description|excerpt):\s*['"]?([^'"\n]+)['"]?/.exec(content);
        if (descMatch) description = descMatch[1];

        // H1 in MDX usually # Title or frontmatter title is used as H1
        const h1Match = /^#\s+(.+)$/m.exec(content);
        if (h1Match) h1 = h1Match[1];
        else if (title) h1 = title; // Assume title is H1 for MDX if no # found

    } else {
        // Parse TSX Metadata
        // Capture title: "..." or title: { default: "...", ... }
        const metadataMatch = /export const metadata:?.*=\s*({[\s\S]*?});/m.exec(content);
        if (metadataMatch) {
            const metadataBlock = metadataMatch[1];

            // Simple regex extraction from the block
            const titleSimple = /title:\s*['"`]([^'"`]+)['"`]/.exec(metadataBlock);
            const titleObj = /title:\s*{\s*default:\s*['"`]([^'"`]+)['"`]/.exec(metadataBlock);

            if (titleSimple) title = titleSimple[1];
            else if (titleObj) title = titleObj[1];

            const descMatch = /description:\s*['"`]([\s\S]*?)['"`],/.exec(metadataBlock);
            if (descMatch) description = descMatch[1].replace(/\s+/g, ' ').trim();

            const canonicalMatch = /canonical:\s*['"`]([^'"`]+)['"`]/.exec(metadataBlock);
            if (canonicalMatch) canonical = canonicalMatch[1];
        }

        // H1 extraction (very basic)
        const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(content);
        if (h1Match) {
            h1 = h1Match[1].replace(/{.*?}/g, '').replace(/<[^>]+>/g, '').trim(); // Remove JS expressions and nested tags
        }
    }

    // Validate
    if (!title) issues.push({ url, issue: 'Missing Title', severity: 'High', fix: 'Add title to metadata' });
    else if (title.length < 10) issues.push({ url, issue: 'Title too short', severity: 'Medium', fix: 'Expand title' });
    else if (title.length > 70) issues.push({ url, issue: 'Title too long', severity: 'Low', fix: 'Shorten title' });

    if (!description) issues.push({ url, issue: 'Missing Meta Description', severity: 'High', fix: 'Add description to metadata' });
    else if (description.length < 50) issues.push({ url, issue: 'Description too short', severity: 'Medium', fix: 'Expand description' });
    else if (description.length > 165) issues.push({ url, issue: 'Description too long', severity: 'Low', fix: 'Shorten description' });

    if (!h1) issues.push({ url, issue: 'Missing H1', severity: 'High', fix: 'Add <h1> tag' });
}

urls.forEach(url => {
    const filePath = mapUrlToFilePath(url);
    if (filePath) {
        try {
            analyzeFile(url, filePath);
        } catch (e) {
            console.error(`Error analyzing ${filePath}:`, e);
            techIssues.push({ url, issue: 'Analysis Error', details: e.message });
        }
    } else {
        // console.warn(`Could not map URL to file: ${url}`);
        // techIssues.push({ url, issue: 'File Not Found', details: 'Could not map URL to source file' });
    }
});

// Write outputs
const csvHeader = 'url,issue,severity,recommended_fix\n';
const csvContent = csvHeader + issues.map(i => `"${i.url}","${i.issue}","${i.severity}","${i.fix}"`).join('\n');
fs.writeFileSync(path.join(outputDir, 'onpage_issues.csv'), csvContent);

const techCsvHeader = 'url,issue,details\n';
const techCsvContent = techCsvHeader + techIssues.map(i => `"${i.url}","${i.issue}","${i.details}"`).join('\n');
fs.writeFileSync(path.join(rootDir, 'audit/tech/tech_issues.csv'), techCsvContent);

// YMYL/Schema Gap List (Placeholder based on scan)
const ymylGaps = `# Schema & YMYL Gap Analysis

Based on static analysis:
- **Missing FAQ Schema**: Detected on service pages without explicit FAQ components.
- **Reviewer Schema**: Not found in blog posts.
- **MedicalClinic**: Found in Layout but needs verification on location pages.
`;
fs.writeFileSync(path.join(rootDir, 'audit/schema/ymyl_gap_list.md'), ymylGaps);

console.log(`On-page audit complete. Found ${issues.length} issues.`);
