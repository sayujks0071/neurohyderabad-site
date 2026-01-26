import { SITE_URL } from '../../../src/lib/seo';

interface MedicalWebPageSchemaProps {
  pageType: 'service' | 'condition' | 'blog' | 'location';
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
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": "Dr. Sayuj Krishnan"
    },
    "reviewedBy": {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      "name": "Dr. Sayuj Krishnan"
    },
    "datePublished": "2024-01-01",
    "dateModified": lastReviewed,
    "author": {
      "@type": "Person",
      "name": author,
      "jobTitle": "Neurosurgeon",
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
        "name": "Dr. Sayuj Krishnan"
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
          "@type": "Physician",
          "@id": `${SITE_URL}/#physician`,
          "name": "Dr. Sayuj Krishnan"
        }
      }
    };
  }

  // Add breadcrumb schema
  if (breadcrumbs.length > 0) {
    baseSchema.breadcrumb = {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${SITE_URL}${crumb.path}`
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  );
}
