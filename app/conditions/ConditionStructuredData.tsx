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

  const medicalCondition: Record<string, unknown> = {
    "@type": "MedicalCondition",
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

  const graph: Record<string, unknown>[] = [medicalCondition];

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
