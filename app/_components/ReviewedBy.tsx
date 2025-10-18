import React from 'react';

interface ReviewedByProps {
  lastReviewed?: string;
  className?: string;
}

export default function ReviewedBy({ lastReviewed = '2025-01-15', className = '' }: ReviewedByProps) {
  return (
    <div className={`bg-blue-50 border-l-4 border-blue-400 p-4 my-6 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            <strong>
              Medically reviewed by{" "}
              <a
                href="/about-dr-sayuj"
                rel="author"
                className="underline decoration-blue-300 hover:text-blue-900 transition-colors"
              >
                Dr. Sayuj Krishnan S
              </a>
            </strong>{" "}
            – Last reviewed {lastReviewed}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            This information is for educational purposes only and should not replace professional medical advice. 
            Please consult with Dr. Sayuj for personalized medical guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
