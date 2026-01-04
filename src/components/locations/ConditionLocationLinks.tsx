import React from 'react';
import Link from 'next/link';
import { locations } from '../../data/locations';

// Allow optional props to prevent TypeScript errors in consuming pages
interface ConditionLocationLinksProps {
  conditionName?: string;
  className?: string;
}

export const ConditionLocationLinks: React.FC<ConditionLocationLinksProps> = ({ conditionName, className }) => {
  // Pick 4 locations for condition pages
  const featuredLocations = locations.slice(0, 4);

  return (
    <section className={`mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100 ${className || ''}`}>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">
        {conditionName ? `${conditionName} Consultations in Hyderabad` : 'Where to Consult in Hyderabad'}
      </h3>
      <p className="mb-4 text-sm text-gray-600">
        Expert diagnosis and treatment available for patients near:
      </p>
      <ul className="grid grid-cols-2 gap-3 mb-6">
        {featuredLocations.map(loc => (
          <li key={loc.id}>
            <Link
              href={`/${loc.slug.startsWith('locations/') ? loc.slug : loc.slug}/`}
              className="text-blue-700 hover:underline text-sm font-medium"
            >
              {loc.areaServedName}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/appointments"
        className="block w-full text-center bg-white border border-blue-600 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        Schedule Consultation
      </Link>
    </section>
  );
};
