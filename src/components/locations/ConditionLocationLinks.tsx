import React from 'react';
import Link from 'next/link';
import { locations } from '../../data/locations';

interface ConditionLocationLinksProps {
  className?: string;
  conditionName?: string;
}

export const ConditionLocationLinks: React.FC<ConditionLocationLinksProps> = ({ className = "", conditionName }) => {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {conditionName ? `Where to Consult for ${conditionName}` : "Where to Consult in Hyderabad"}
      </h3>
      <p className="text-gray-700 mb-4">
        Get expert opinion and treatment for {conditionName ? conditionName.toLowerCase() : "your condition"} from Dr. Sayuj Krishnan.
        Serving patients from across the city:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {locations.map(location => (
          <Link
            key={location.id}
            href={`/${location.slug}`}
            className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            {location.areaServedName}
          </Link>
        ))}
      </div>
      <Link
        href="/appointments"
        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Book Consultation &rarr;
      </Link>
    </div>
  );
};
