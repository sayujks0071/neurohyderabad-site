
import fs from 'fs';
import path from 'path';
import sitemap from '../app/sitemap';

async function generateInventory() {
  try {
    console.log('Generating sitemap...');
    const urls = await sitemap();

    console.log(`Found ${urls.length} URLs.`);

    const inventory = urls.map(entry => {
      const urlPath = entry.url.replace('https://www.drsayuj.info', '');
      let type = 'other';

      if (urlPath === '/' || urlPath === '') type = 'home';
      else if (urlPath.startsWith('/services')) type = 'service';
      else if (urlPath.startsWith('/conditions')) type = 'condition';
      else if (urlPath.startsWith('/locations') || urlPath.startsWith('/neurosurgeon-')) type = 'location';
      else if (urlPath.startsWith('/blog')) type = 'blog';
      else if (urlPath.startsWith('/symptoms')) type = 'symptom';
      else if (urlPath.startsWith('/appointments')) type = 'appointment';

      // Basic file existence check (simplified)
      // This is tricky because of dynamic routes.
      // We will assume if it comes from sitemap it "should" exist.
      // We can try to map it to a file.

      let filePath = 'UNKNOWN';
      let status = '200'; // Optimistic

      // Heuristic mapping
      if (type === 'home') filePath = 'app/page.tsx';
      else if (urlPath.startsWith('/services/')) filePath = 'app/services/[slug]/page.tsx';
      else if (urlPath === '/services') filePath = 'app/services/page.tsx';
      else if (urlPath.startsWith('/conditions/')) filePath = 'app/conditions/[slug]/page.tsx';
      else if (urlPath === '/conditions') filePath = 'app/conditions/page.tsx';
      else if (urlPath.startsWith('/locations/')) {
          // Check if specific file exists first
          const specific = `app${urlPath}/page.tsx`;
          if (fs.existsSync(specific)) filePath = specific;
          else filePath = 'app/locations/[slug]/page.tsx';
      }
      else if (urlPath.startsWith('/blog/')) filePath = 'content/blog/' + urlPath.replace('/blog/', '') + '.mdx'; // or .md

      // Verify file existence for blog posts specifically as they are static files usually
      if (type === 'blog') {
        const mdxPath = path.join(process.cwd(), 'content/blog', urlPath.replace('/blog/', '') + '.mdx');
        if (!fs.existsSync(mdxPath)) {
            // Check if it's a legacy app/blog page
            const legacyPath = path.join(process.cwd(), 'app', urlPath, 'page.tsx');
             if (!fs.existsSync(legacyPath)) {
                status = '404 (File not found)';
             } else {
                 filePath = legacyPath;
             }
        } else {
            filePath = mdxPath;
        }
      }

      return {
        url: entry.url,
        path: urlPath,
        type,
        status,
        priority: entry.priority,
        changeFrequency: entry.changeFrequency,
        filePath
      };
    });

    // Write JSON
    fs.writeFileSync('audit/crawl/url_inventory.json', JSON.stringify(inventory, null, 2));

    // Write CSV
    const csvHeader = 'url,path,type,status,priority,changeFrequency,filePath\n';
    const csvRows = inventory.map(row =>
      `${row.url},${row.path},${row.type},${row.status},${row.priority},${row.changeFrequency},${row.filePath}`
    ).join('\n');
    fs.writeFileSync('audit/crawl/url_inventory.csv', csvHeader + csvRows);

    console.log('Inventory saved to audit/crawl/');

  } catch (error) {
    console.error('Error generating inventory:', error);
    process.exit(1);
  }
}

generateInventory();
