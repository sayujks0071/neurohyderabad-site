import { SITE_URL } from '../../../src/lib/seo';
import {
  CANONICAL_PHYSICIAN_NAME,
  CANONICAL_TELEPHONE,
  YASHODA_MALAKPET_ADDRESS,
  YASHODA_GEO,
  CANONICAL_MAPS_URL
} from '@/src/data/locations';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    "name": CANONICAL_PHYSICIAN_NAME,
    "description": "Expert neurosurgery and spine surgery practice in Hyderabad offering minimally invasive procedures, endoscopic spine surgery, brain tumor surgery, and advanced neurosurgical care.",
    "url": SITE_URL,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "telephone": CANONICAL_TELEPHONE,
    "email": "hellodr@drsayuj.info",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": YASHODA_MALAKPET_ADDRESS.streetAddress,
      "addressLocality": YASHODA_MALAKPET_ADDRESS.addressLocality,
      "addressRegion": YASHODA_MALAKPET_ADDRESS.addressRegion,
      "postalCode": YASHODA_MALAKPET_ADDRESS.postalCode,
      "addressCountry": YASHODA_MALAKPET_ADDRESS.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": YASHODA_GEO.latitude,
      "longitude": YASHODA_GEO.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": ["Cash", "Credit Card", "Insurance", "UPI"],
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad",
      "containedInPlace": {
        "@type": "State",
        "name": "Telangana"
      }
    },
    "hasMap": CANONICAL_MAPS_URL
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
