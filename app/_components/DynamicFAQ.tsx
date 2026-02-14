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
      <div className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading FAQs about {topic}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
        <div className="p-4 bg-red-50/50 border border-red-200/50 rounded-lg">
          <p className="text-red-800 font-medium">Error: {error}</p>
          <p className="text-sm text-red-600 mt-2">
            Please try again later or contact us at +91-9778280044
          </p>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
        <div className="text-center text-gray-600">
          <p className="font-medium">No FAQs found for "{topic}".</p>
          <p className="text-sm mt-2">
            Please upload relevant documents to generate FAQs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Frequently Asked Questions: {topic}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white/40 border border-white/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full text-left p-4 font-semibold text-slate-800 flex justify-between items-center hover:bg-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={openId === faq.id}
              aria-controls={`faq-content-${componentId}-${faq.id}`}
              id={`faq-trigger-${componentId}-${faq.id}`}
            >
              <span className="pr-4">{faq.question}</span>
              <span className="text-blue-600 text-xl flex-shrink-0">
                {openId === faq.id ? '−' : '+'}
              </span>
            </button>
            
            {openId === faq.id && (
              <div
                className="px-4 pb-4 pt-2 border-t border-white/40 bg-white/20"
                id={`faq-content-${componentId}-${faq.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${componentId}-${faq.id}`}
              >
                <div className="prose prose-sm max-w-none text-slate-700">
                  {faq.answer.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-2 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {faq.sources && faq.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <p className="text-xs text-slate-500 mb-1">
                      <strong>Sources:</strong>
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {faq.sources.map((source, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-blue-400">•</span>
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

      <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl text-sm text-blue-800">
        <p>
          <strong>Note:</strong> These FAQs are automatically generated from our medical documents. 
          For personalized medical advice, please consult with Dr. Sayuj directly at +91-9778280044.
        </p>
      </div>
    </div>
  );
}
