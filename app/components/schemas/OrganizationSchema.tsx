import { SITE_URL } from '../../../src/lib/seo';
import {
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS,
  SOCIAL_PROFILES
} from '@/src/data/locations';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": CANONICAL_PHYSICIAN_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/og-default.jpg`,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "description": "Premier neurosurgery practice in Hyderabad specializing in minimally invasive brain and spine surgery. German-trained neurosurgeon with 1,000+ endoscopic procedures.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": YASHODA_MALAKPET_ADDRESS.streetAddress,
      "addressLocality": YASHODA_MALAKPET_ADDRESS.addressLocality,
      "addressRegion": YASHODA_MALAKPET_ADDRESS.addressRegion,
      "postalCode": YASHODA_MALAKPET_ADDRESS.postalCode,
      "addressCountry": YASHODA_MALAKPET_ADDRESS.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CANONICAL_TELEPHONE,
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "te"]
    },
    "sameAs": SOCIAL_PROFILES
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
