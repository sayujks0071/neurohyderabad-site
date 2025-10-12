import React from "react";
import { SITE_URL, physicianJsonLd, contactPointJsonLd, idFor } from "../../src/lib/seo";

export default function SitewideSchemas() {
  // Stable @id references
  const WEB_ID = idFor(SITE_URL, "website");
  const ORG_ID = idFor(SITE_URL, "organization");
  const PHYS_ID = idFor(SITE_URL, "physician");
  const CONTACT_ID = idFor(SITE_URL, "contact");

  // Social profiles (sameAs) for Organization and Physician
  const sameAs = [
    "https://g.co/kgs/9366939683880052414",
    "https://x.com/drsayuj",
    "https://www.facebook.com/drsayuj/",
    "https://in.linkedin.com/in/dr-sayuj-krishnan-s-275baa66",
    "https://www.youtube.com/channel/UCc-KQY7cjePPy0p49W3SZFQ",
    "https://www.instagram.com/thespinedoc/?hl=en"
  ];

  // WebSite with SearchAction and ScheduleAction; publisher is the Person (personal brand)
  const website = {
    "@type": "WebSite",
    "@id": WEB_ID,
    name: "Dr. Sayuj Krishnan",
    url: SITE_URL,
    publisher: { "@id": PHYS_ID },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ScheduleAction",
        target: `${SITE_URL}/appointments`,
        name: "Book an appointment"
      }
    ]
  };

  // MedicalOrganization with PostalAddress and sitewide ContactPoint
  const organization = {
    "@type": "MedicalOrganization",
    "@id": ORG_ID,
    name: "Dr. Sayuj Krishnan",
    url: SITE_URL,
    telephone: "+91 9778280044",
    sameAs,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
      contentUrl: `${SITE_URL}/images/logo.png`
    },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/og-default.jpg`,
      width: 1200,
      height: 630
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room No 317, OPD Block, Yashoda Hospital, Malakpet",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN"
    },
    areaServed: [
      "Jubilee Hills",
      "Banjara Hills", 
      "Hi-Tech City",
      "Gachibowli",
      "Madhapur",
      "Kondapur",
      "Hyderabad"
    ],
    hasMap: "https://maps.google.com/?q=Yashoda+Hospital+Malakpet",
    contactPoint: [{ "@id": CONTACT_ID }]
  };

  // Physician (Person) linked to the MedicalOrganization via worksFor
  const physician: any = physicianJsonLd();
  physician["@id"] = PHYS_ID;
  physician.worksFor = { "@id": ORG_ID };
  physician.sameAs = sameAs;
  physician.description = "MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and Advanced Spine Surgery, Observer-ship in Full Endoscopic Spine Surgery (Germany).";
  physician.areaServed = [
    "Jubilee Hills",
    "Banjara Hills", 
    "Hi-Tech City",
    "Gachibowli",
    "Madhapur",
    "Kondapur",
    "Hyderabad"
  ];
  physician.hasMap = "https://maps.google.com/?q=Yashoda+Hospital+Malakpet";
  physician.potentialAction = {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/appointments`,
      "inLanguage": "en-IN"
    }
  };

  // Unified ContactPoint for the site
  const contact = contactPointJsonLd({
    phone: "+91 9778280044",
    contactType: "appointments",
    areaServed: "IN",
    languages: ["en", "hi", "te"],
    id: CONTACT_ID
  });

  const graph = [website, organization, physician, contact];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph
        })
      }}
    />
  );
}
