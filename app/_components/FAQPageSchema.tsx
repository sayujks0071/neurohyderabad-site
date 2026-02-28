import React from 'react';
import SchemaScript from './SchemaScript';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
  pageUrl: string;
}

export default function FAQPageSchema({ faqs, pageUrl }: FAQPageSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <SchemaScript data={faqSchema} />;
}
