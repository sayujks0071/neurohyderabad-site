import React from 'react';
import FAQSchema from "../../app/components/schemas/FAQSchema";
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  emphasis?: string;
}

interface ExpandedFAQProps {
  faqs?: FAQItem[];
  title?: string;
  className?: string;
  disableSchema?: boolean;
}

export default function ExpandedFAQ({
  // Default to empty array to avoid including unused default content in bundle
  faqs = [],
  title = 'Frequently Asked Questions',
  className = '',
  disableSchema = false
}: ExpandedFAQProps) {
  const groupedByCategory = faqs.reduce<Record<string, FAQItem[]>>((acc, item) => {
    const key = item.category || 'General Guidance';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section className={`py-16 ${className}`} aria-labelledby="faq-section-title">
      {/* FAQ Schema for SEO */}
      {!disableSchema && (
        <FAQSchema
          faqs={faqs.map(faq => ({
            question: faq.question,
            answer: faq.answer
          }))}
          pageTitle={title}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 
            id="faq-section-title"
            className="text-3xl font-bold text-center mb-12 text-blue-800"
          >
            {title}
          </h2>
          <ul className="space-y-12" aria-label="Frequently asked questions">
            {Object.entries(groupedByCategory).map(([category, items]) => (
              <li key={category} className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-700">
                  {category}
                </h3>
                <ul className="space-y-4" aria-label={`${category} questions`}>
                  {items.map((faq, index) => {
                    const faqId = faq.question
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');

                    return (
                      <li key={`${faqId}-${index}`}>
                        <details
                          data-faq-item
                          data-faq-id={faqId}
                          className="group bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                          <summary
                            className="flex items-start justify-between px-6 py-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg hover:bg-white/50 transition-colors duration-300"
                            aria-controls={`faq-answer-${faqId}-${index}`}
                          >
                            <div className="pr-6">
                              <span
                                id={`faq-question-${faqId}-${index}`}
                                className="font-semibold text-lg text-blue-900 block"
                              >
                                {faq.question}
                              </span>
                              {faq.emphasis && (
                                <span className="text-sm text-emerald-700 font-medium">
                                  {faq.emphasis}
                                </span>
                              )}
                            </div>
                            <span
                              aria-hidden="true"
                              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/50 text-blue-600 transition-transform duration-300 group-open:rotate-180"
                            >
                              <ChevronDown className="w-5 h-5" />
                            </span>
                          </summary>
                          <div
                            id={`faq-answer-${faqId}-${index}`}
                            className="px-6 pb-5 text-gray-700 leading-relaxed space-y-3 border-t border-white/20"
                            role="region"
                            aria-labelledby={`faq-question-${faqId}-${index}`}
                          >
                            {faq.answer.split('\n').map((paragraph, paragraphIndex) => (
                              <p key={paragraphIndex}>{paragraph}</p>
                            ))}
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
