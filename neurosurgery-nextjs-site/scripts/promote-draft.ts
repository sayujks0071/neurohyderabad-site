import fs from "fs/promises";
import path from "path";

const slug = process.argv[2]; // e.g. "endoscopic-spine-surgery-hyderabad"
if (!slug) {
  console.error("Usage: ts-node scripts/promote-draft.ts <slug>");
  console.error("Example: ts-node scripts/promote-draft.ts endoscopic-spine-surgery-hyderabad");
  process.exit(1);
}

async function promoteDraft() {
  console.log(`🚀 Promoting draft: ${slug}`);
  
  const mdSrc = path.join("geo-bot/output", `${slug}.md`);
  const schemaSrc = path.join("schemas", `${slug}.jsonld`);

  // Check if source files exist
  try {
    await fs.access(mdSrc);
    console.log(`✅ Found content: ${mdSrc}`);
  } catch {
    console.error(`❌ Content file not found: ${mdSrc}`);
    process.exit(1);
  }

  try {
    await fs.access(schemaSrc);
    console.log(`✅ Found schema: ${schemaSrc}`);
  } catch {
    console.warn(`⚠️  Schema file not found: ${schemaSrc}`);
  }

  // Create page directory
  const pageDir = path.join("app", "(marketing)", slug);
  const pageFile = path.join(pageDir, "page.tsx");
  
  await fs.mkdir(pageDir, { recursive: true });
  console.log(`📁 Created directory: ${pageDir}`);

  // Read and process markdown content
  const md = await fs.readFile(mdSrc, "utf8");
  
  // Extract title and meta description from markdown
  const titleMatch = md.match(/^# (.+?)(?:\s*\|\s*Dr\. Sayuj Krishnan)?$/m);
  const metaMatch = md.match(/\*\*Meta Description:\*\*\s*(.+?)$/m);
  
  const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const metaDescription = metaMatch ? metaMatch[1] : `Expert neurosurgery services for ${title} in Hyderabad by Dr. Sayuj Krishnan`;

  // Create Next.js page component
  const pageContent = `import { Metadata } from 'next';
import { JsonLd, loadJsonLd } from '@/lib/seo/jsonld';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: '${title} | Dr. Sayuj Krishnan - Brain & Spine Surgeon',
  description: '${metaDescription}',
  keywords: ['${slug.replace(/-/g, ', ')}', 'neurosurgery', 'hyderabad', 'dr sayuj krishnan'],
  openGraph: {
    title: '${title} | Dr. Sayuj Krishnan',
    description: '${metaDescription}',
    type: 'website',
    locale: 'en_IN',
  },
};

export default async function Page() {
  // Load JSON-LD schema
  const jsonld = await loadJsonLd('${slug}');

  // Process markdown content (remove title and meta description)
  const content = \`${md.replace(/^# .+$/m, '').replace(/\*\*Meta Description:\*\* .+$/m, '').replace(/^\\n+/, '')}\`;

  return (
    <>
      {jsonld && <JsonLd json={jsonld} />}
      <div className="container mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold text-gray-900 mb-4 mt-8">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-medium text-gray-900 mb-3 mt-6">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="mb-1">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-800">{children}</em>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
`;

  // Write the page file
  await fs.writeFile(pageFile, pageContent);
  console.log(`✅ Created page: ${pageFile}`);

  // Create a simple layout if it doesn't exist
  const layoutFile = path.join(pageDir, "layout.tsx");
  try {
    await fs.access(layoutFile);
  } catch {
    const layoutContent = `export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
`;
    await fs.writeFile(layoutFile, layoutContent);
    console.log(`✅ Created layout: ${layoutFile}`);
  }

  console.log(`\\n🎉 Successfully promoted: ${slug}`);
  console.log(`📄 Page available at: /${slug}`);
  console.log(`🔍 Schema: ${schemaSrc}`);
  console.log(`\\nNext steps:`);
  console.log(`1. Test the page: http://localhost:3000/${slug}`);
  console.log(`2. Check schema validation: https://search.google.com/test/rich-results`);
  console.log(`3. Add to navigation if needed`);
}

promoteDraft().catch(console.error);





