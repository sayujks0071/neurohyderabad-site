import { SITE_URL } from "@/src/lib/seo";
import type { ConditionResource } from "@/src/data/conditionsIndex";

interface ConditionStructuredDataProps {
  condition: ConditionResource;
  canonicalPath: string;
}

export default function ConditionStructuredData({
  condition,
  canonicalPath,
}: ConditionStructuredDataProps) {
  const url = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${SITE_URL}${canonicalPath}`;

  const medicalConditionId = `${url}#condition`;

  const medicalCondition: Record<string, unknown> = {
    "@type": "MedicalCondition",
    "@id": medicalConditionId,
    name: condition.name,
    description: condition.summary,
    url,
  };

  if (condition.symptomHighlights?.length) {
    medicalCondition.signOrSymptom = condition.symptomHighlights.map(
      (symptom) => ({
        "@type": "MedicalSignOrSymptom",
        name: symptom,
      }),
    );
  }

  if (condition.treatmentHighlights?.length) {
    medicalCondition.possibleTreatment = condition.treatmentHighlights.map(
      (item) => ({
        "@type": "MedicalTherapy",
        name: item,
      }),
    );
  }

  // YMYL E-E-A-T Enhancement: MedicalWebPage Wrapper
  const medicalWebPage = {
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${condition.name} Treatment in Hyderabad | Dr. Sayuj Krishnan`,
    description: condition.summary,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
      url: SITE_URL,
    },
    mainEntity: {
      "@id": medicalConditionId,
    },
    about: {
      "@id": medicalConditionId,
    },
    author: {
      "@type": "Person",
      name: "Dr. Sayuj Krishnan",
      jobTitle: "Neurosurgeon",
      url: SITE_URL,
      worksFor: {
        "@type": "Hospital",
        name: "Yashoda Hospital",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Malakpet",
          addressRegion: "Hyderabad",
          addressCountry: "IN",
        },
      },
    },
    reviewedBy: {
      "@type": "Physician",
      name: "Dr. Sayuj Krishnan",
      url: SITE_URL,
    },
    lastReviewed: new Date().toISOString().split("T")[0],
    datePublished: "2024-01-01",
    specialty: {
      "@type": "MedicalSpecialty",
      name: "Neurosurgery",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Patients",
    },
  };

  const graph: Record<string, unknown>[] = [medicalWebPage, medicalCondition];

  if (condition.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: condition.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  // Add breadcrumb structured data
  graph.push({
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Conditions",
        item: `${SITE_URL}/conditions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: condition.name,
        item: url,
      },
    ],
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
