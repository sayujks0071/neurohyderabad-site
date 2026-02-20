import { SITE_URL } from '../../../src/lib/seo';
import { CANONICAL_PHYSICIAN_NAME, getLocationById, LocationId } from '../../../src/data/locations';

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
  locationId?: LocationId;
  symptoms?: string[];
  treatments?: string[];
  riskFactors?: string[];
}

export default function MedicalWebPageSchema({
  pageType,
  pageSlug,
  title,
  description,
  lastReviewed = new Date().toISOString().split('T')[0],
  author = CANONICAL_PHYSICIAN_NAME,
  serviceOrCondition,
  breadcrumbs = [],
  medicalSpecialty,
  audience,
  locationId = 'malakpet',
  symptoms,
  treatments,
  riskFactors
}: MedicalWebPageSchemaProps) {
  const location = getLocationById(locationId) || getLocationById('malakpet');

  if (!location) return null;

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
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": CANONICAL_PHYSICIAN_NAME
    },
    "reviewedBy": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": CANONICAL_PHYSICIAN_NAME,
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "DNB Neurosurgery"
      }
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
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "DNB Neurosurgery"
      },
      "worksFor": {
        "@type": "Hospital",
        "@id": `${SITE_URL}/#hospital`,
        "name": "Yashoda Hospital, Malakpet",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location.address.addressLocality,
          "addressRegion": location.address.addressRegion,
          "addressCountry": location.address.addressCountry
        }
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": CANONICAL_PHYSICIAN_NAME,
      "url": SITE_URL
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
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        "name": CANONICAL_PHYSICIAN_NAME
      },
      "availableAtOrFrom": {
        "@type": "Hospital",
        "@id": `${SITE_URL}/#hospital`,
        "name": "Yashoda Hospital, Malakpet"
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
    const treatmentsSchema = treatments && treatments.length > 0
      ? treatments.map(t => ({
          "@type": "MedicalTherapy",
          "name": t,
          "provider": {
            "@type": "Physician",
            "@id": `${SITE_URL}/#physician`,
            "name": CANONICAL_PHYSICIAN_NAME
          }
        }))
      : {
          "@type": "MedicalTherapy",
          "name": "Neurosurgical Treatment",
          "provider": {
            "@type": "Physician",
            "@id": `${SITE_URL}/#physician`,
            "name": CANONICAL_PHYSICIAN_NAME
          }
        };

    const conditionSchema: any = {
      "@type": "MedicalCondition",
      "name": serviceOrCondition,
      "description": description,
      "possibleTreatment": treatmentsSchema
    };

    if (symptoms && symptoms.length > 0) {
      conditionSchema.signOrSymptom = symptoms.map(s => ({
        "@type": "MedicalSymptom",
        "name": s
      }));
    }

    if (riskFactors && riskFactors.length > 0) {
      conditionSchema.riskFactor = riskFactors.map(r => ({
        "@type": "MedicalRiskFactor",
        "name": r
      }));
    }

    baseSchema.mainEntity = conditionSchema;
  }

  // Generate BreadcrumbSchema if items are provided
  // This replaces the global BreadcrumbSchema for service/condition pages
  let breadcrumbSchema = null;
  if (breadcrumbs && breadcrumbs.length > 0) {
    const itemListElement = breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path.startsWith('http') ? item.path : `${SITE_URL}${item.path}`
    }));

    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}
