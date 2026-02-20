import { SITE_URL } from '../../../src/lib/seo';

/**
 * AEO-optimized WebSite schema.
 * 
 * Includes:
 * - Speakable property for voice search / AI assistants
 * - Publisher linkage to Physician entity
 * - Knowledge graph ID for entity disambiguation
 */
export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
    "alternateName": [
      "Dr. Sayuj Krishnan Neurosurgery",
      "Sayuj Krishnan Spine Surgeon",
      "drsayuj.info"
    ],
    "description": "Expert neurosurgeon in Hyderabad specializing in minimally invasive brain & spine surgery. German-trained with 1,000+ endoscopic procedures. Same-day discharge available at Yashoda Hospital, Malakpet.",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": "Dr. Sayuj Krishnan S"
    },
    // AEO: Speakable property for voice assistants
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".home-hero__title",
        ".home-hero__subtitle",
        ".home-hero__lead"
      ]
    },
    // AEO: Knowledge graph disambiguation
    "potentialAction": {
      "@type": "ReadAction",
      "target": [
        `${SITE_URL}/about`,
        `${SITE_URL}/services`,
        `${SITE_URL}/conditions`
      ]
    }
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
