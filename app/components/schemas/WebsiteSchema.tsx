import { SITE_URL } from '../../../src/lib/seo';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
    "description": "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery. German-trained with 1,000+ endoscopic procedures. Same-day discharge available at Yashoda Hospital, Malakpet.",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": "Dr. Sayuj Krishnan S"
    }
    // Note: SearchAction removed - no search page implemented yet
    // Can be re-added when /search route is created
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
