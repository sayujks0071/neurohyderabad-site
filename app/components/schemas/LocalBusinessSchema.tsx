import { SITE_URL } from '../../../src/lib/seo';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    "name": "Dr. Sayuj Krishnan - Neurosurgery Practice",
    "description": "Expert neurosurgery and spine surgery practice in Hyderabad offering minimally invasive procedures, endoscopic spine surgery, brain tumor surgery, and advanced neurosurgical care.",
    "url": SITE_URL,
    "image": `${SITE_URL}/images/og-default.jpg`,
    "telephone": "+91-9778280044",
    "email": "hellodr@drsayuj.info",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room No 317, OPD Block, Yashoda Hospital",
      "addressLocality": "Malakpet",
      "addressRegion": "Telangana",
      "postalCode": "500036",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.3850,
      "longitude": 78.4867
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
    "hasMap": "https://www.google.com/maps/place/Dr+Sayuj+Krishnan"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

