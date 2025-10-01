import { Metadata } from 'next';
import { JsonLd, loadJsonLd } from '../../../src/lib/seo/jsonld';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: 'endoscopic-spine-surgery-hyderabad | Dr. Sayuj Krishnan - Brain & Spine Surgeon',
  description: 'Expert neurosurgery services for endoscopic-spine-surgery-hyderabad in Hyderabad by Dr. Sayuj Krishnan',
  keywords: ['endoscopic, spine, surgery, hyderabad', 'neurosurgery', 'hyderabad', 'dr sayuj krishnan'],
  openGraph: {
    title: 'endoscopic-spine-surgery-hyderabad | Dr. Sayuj Krishnan',
    description: 'Expert neurosurgery services for endoscopic-spine-surgery-hyderabad in Hyderabad by Dr. Sayuj Krishnan',
    type: 'website',
    locale: 'en_IN',
  },
};

export default async function Page() {
  // Load JSON-LD schema
  const jsonld = await loadJsonLd('endoscopic-spine-surgery-hyderabad');

  // Process markdown content (remove title and meta description)
  const content = `
`;

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
