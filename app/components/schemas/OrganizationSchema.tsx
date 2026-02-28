import { SITE_URL } from '../../../src/lib/seo';
import {
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS,
  SOCIAL_PROFILES
} from '@/src/data/locations';

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${SITE_URL}/#organization`,
    "name": CANONICAL_PHYSICIAN_NAME,
    "alternateName": "Dr Sayuj Krishnan Neurosurgery Practice",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/images/og-default.jpg`,
      "width": 1200,
      "height": 630
    },
    "image": `${SITE_URL}/images/og-default.jpg`,
    "description": "German-trained neurosurgeon in Hyderabad specializing in minimally invasive endoscopic spine surgery, brain tumor surgery, and awake craniotomy. Over 1,000 endoscopic procedures performed at Yashoda Hospital, Malakpet.",
    "email": "hellodr@drsayuj.info",
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
      "contactType": "appointments",
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "availableLanguage": ["English", "Hindi", "Telugu", "Malayalam"]
    },
    "medicalSpecialty": [
      "Neurosurgery",
      "Spine Surgery",
      "Endoscopic Spine Surgery",
      "Brain Surgery"
    ],
    "founder": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": CANONICAL_PHYSICIAN_NAME
    },
    "parentOrganization": {
      "@type": "Hospital",
      "@id": `${SITE_URL}/#hospital`,
      "name": "Yashoda Hospital, Malakpet"
    },
    "sameAs": SOCIAL_PROFILES
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
