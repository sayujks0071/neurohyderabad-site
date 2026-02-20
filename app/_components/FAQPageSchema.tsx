import React from 'react';
import SchemaScript from './SchemaScript';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
  pageUrl: string;
  /** Optional: About entity for AEO - links FAQs to the physician */
  aboutEntity?: {
    '@type': string;
    '@id': string;
    name: string;
  };
}

/**
 * AEO-optimized FAQPage schema component.
 * 
 * Best practices for AEO (Answer Engine Optimization):
 * - Answers should be 40-60 words (ideal for AI extraction)
 * - Questions should match natural language queries
 * - Include specific data (numbers, dates) in answers
 * - Self-contained answers that make sense without context
 */
export default function FAQPageSchema({ faqs, pageUrl, aboutEntity }: FAQPageSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "url": pageUrl,
    "inLanguage": "en-IN",
    ...(aboutEntity && {
      "about": aboutEntity
    }),
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `${pageUrl}#faq-${index + 1}`,
      "name": faq.question,
      "position": index + 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "dateCreated": new Date().toISOString().split('T')[0]
      }
    }))
  };

  return <SchemaScript data={faqSchema} />;
}
