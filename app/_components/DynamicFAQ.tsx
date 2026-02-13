'use client';

import { useState, useEffect, useId } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sources?: Array<{ fileName?: string; uri?: string }>;
}

interface DynamicFAQProps {
  topic: string;
  numQuestions?: number;
  className?: string;
}

export default function DynamicFAQ({ 
  topic, 
  numQuestions = 10,
  className = '' 
}: DynamicFAQProps) {
  const componentId = useId();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    async function loadFAQs() {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/faq/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, numQuestions })
        });

        if (!response.ok) {
          throw new Error(`Failed to load FAQs: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.faqs) {
          setFaqs(data.faqs);
        } else {
          throw new Error(data.error || 'Failed to generate FAQs');
        }
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    }

    if (topic) {
      loadFAQs();
    }
  }, [topic, numQuestions]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading FAQs about {topic}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} p-4 bg-red-50 border border-red-200 rounded-lg`}>
        <p className="text-red-800">Error: {error}</p>
        <p className="text-sm text-red-600 mt-2">
          Please try again later or contact us at +91-9778280044
        </p>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className={`${className} p-4 text-center text-gray-600`}>
        <p>No FAQs found for "{topic}".</p>
        <p className="text-sm mt-2">
          Please upload relevant documents to generate FAQs.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-6">
        Frequently Asked Questions: {topic}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full text-left p-4 font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              aria-expanded={openId === faq.id}
              aria-controls={`faq-content-${componentId}-${faq.id}`}
              id={`faq-trigger-${componentId}-${faq.id}`}
            >
              <span className="pr-4">{faq.question}</span>
              <span className="text-primary-600 text-xl flex-shrink-0">
                {openId === faq.id ? '−' : '+'}
              </span>
            </button>
            
            {openId === faq.id && (
              <div
                className="px-4 pb-4 pt-2 border-t border-gray-100"
                id={`faq-content-${componentId}-${faq.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${componentId}-${faq.id}`}
              >
                <div className="prose prose-sm max-w-none text-gray-700">
                  {faq.answer.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {faq.sources && faq.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">
                      <strong>Sources:</strong>
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {faq.sources.map((source, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{source.fileName || source.uri || 'Medical document'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These FAQs are automatically generated from our medical documents. 
          For personalized medical advice, please consult with Dr. Sayuj directly at +91-9778280044.
        </p>
      </div>
    </div>
  );
}

