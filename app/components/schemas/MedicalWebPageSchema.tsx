import { SITE_URL } from '../../../src/lib/seo';

interface MedicalWebPageSchemaProps {
  pageType: 'service' | 'condition' | 'blog' | 'location' | 'about' | 'contact';
  pageSlug: string;
  title: string;
  description: string;
  lastReviewed?: string;
  author?: string;
  serviceOrCondition?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  medicalSpecialty?: string | string[];
  audience?: string;
}

export default function MedicalWebPageSchema({
  pageType,
  pageSlug,
  title,
  description,
  lastReviewed = new Date().toISOString().split('T')[0],
  author = 'Dr. Sayuj Krishnan',
  serviceOrCondition,
  breadcrumbs = [],
  medicalSpecialty,
  audience
}: MedicalWebPageSchemaProps) {
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${pageSlug}#webpage`,
    "url": `${SITE_URL}${pageSlug}`,
    "name": title,
    "description": description,
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
      "url": SITE_URL
    },
    "about": {
      "@id": `${SITE_URL}/#physician`
    },
    "reviewedBy": {
      "@id": `${SITE_URL}/#physician`
    },
    "lastReviewed": lastReviewed,
    "datePublished": "2024-01-01",
    "dateModified": lastReviewed,
    "creativeWorkStatus": "Published",
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient"
    },
    "author": {
      "@type": "Person",
      "name": author,
      "jobTitle": "Neurosurgeon",
      "sameAs": [
        "https://www.linkedin.com/in/drsayujkrishnan/",
        "https://scholar.google.com/citations?user=drsayujkrishnan",
        "https://www.practo.com/hyderabad/doctor/dr-sayuj-krishnan-1-neurosurgeon",
        "https://www.justdial.com/Hyderabad/Dr-Sayuj-Krishnan-Yashoda-Hospitals-Malakpet/040PXX40-XX40-190314164828-M7U7_BZDET"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "DNB Neurosurgery"
      },
      "worksFor": {
        "@type": "Hospital",
        "name": "Yashoda Hospital",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Malakpet",
          "addressRegion": "Hyderabad",
          "addressCountry": "IN"
        }
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Sayuj Krishnan",
      "url": SITE_URL
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable", "[data-speakable]"]
    }
  };

  if (medicalSpecialty) {
    baseSchema.specialty = Array.isArray(medicalSpecialty)
      ? medicalSpecialty.map(s => ({ "@type": "MedicalSpecialty", "name": s }))
      : { "@type": "MedicalSpecialty", "name": medicalSpecialty };
  }

  if (audience) {
    baseSchema.audience = {
      "@type": "Audience",
      "audienceType": audience
    };
  }

  // Add service-specific schema
  if (pageType === 'service' && serviceOrCondition) {
    baseSchema.mainEntity = {
      "@type": "MedicalService",
      "name": serviceOrCondition,
      "description": description,
      "provider": {
        "@id": `${SITE_URL}/#physician`
      },
      "availableAtOrFrom": {
        "@type": "Hospital",
        "@id": `${SITE_URL}/#hospital`,
        "name": "Yashoda Hospital"
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad",
        "containedInPlace": {
          "@type": "State",
          "name": "Telangana"
        }
      }
    };
  }

  // Add condition-specific schema
  if (pageType === 'condition' && serviceOrCondition) {
    baseSchema.mainEntity = {
      "@type": "MedicalCondition",
      "name": serviceOrCondition,
      "description": description,
      "possibleTreatment": {
        "@type": "MedicalTherapy",
        "name": "Neurosurgical Treatment",
        "provider": {
          "@id": `${SITE_URL}/#physician`
        }
      }
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}
