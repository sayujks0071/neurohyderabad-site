import React from 'react';

interface YMYLAttributionProps {
  lastReviewed: string;
  authoredBy?: boolean;
  className?: string;
}

export default function YMYLAttribution({ 
  lastReviewed, 
  authoredBy = true,
  className = '' 
}: YMYLAttributionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="text-sm text-gray-700">
        {authoredBy && (
          <p className="mb-2">
            <strong>Authored by:</strong> Dr. Sayuj Krishnan S, Neurosurgeon
          </p>
        )}
        <p className="mb-2">
          <strong>Reviewed by:</strong> Dr. Sayuj Krishnan S, Board Certified Neurosurgeon
        </p>
        <p className="mb-2">
          <strong>Last reviewed:</strong> {formatDate(lastReviewed)}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Disclaimer:</strong> This content is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}
