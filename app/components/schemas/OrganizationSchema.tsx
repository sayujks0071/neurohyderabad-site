import { SITE_URL } from '../../../src/lib/seo';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": "Dr. Sayuj Krishnan - Neurosurgeon",
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/og-default.jpg`,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "description": "Premier neurosurgery practice in Hyderabad specializing in minimally invasive brain and spine surgery. German-trained neurosurgeon with 1,000+ endoscopic procedures.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room No 317, OPD Block, Yashoda Hospital",
      "addressLocality": "Malakpet",
      "addressRegion": "Telangana",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9778280044",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "te"]
    },
    "sameAs": [
      "https://www.yashodahospitals.com/doctor/dr-sayuj-krishnan/",
      "https://www.linkedin.com/in/dr-sayuj-krishnan",
      "https://g.co/kgs/9366939683880052414"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

