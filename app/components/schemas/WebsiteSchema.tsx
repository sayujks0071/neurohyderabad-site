import { SITE_URL } from '../../../src/lib/seo';

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
    "description": "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery"
    // Note: SearchAction removed - no search page implemented yet
    // Can be re-added when /search route is created
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
