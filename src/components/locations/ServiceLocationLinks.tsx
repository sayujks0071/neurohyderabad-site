import React from 'react';
import Link from 'next/link';
import { locations } from '../../data/locations';

interface ServiceLocationLinksProps {
  className?: string;
  serviceName?: string;
}

export const ServiceLocationLinks: React.FC<ServiceLocationLinksProps> = ({
  className = '',
  serviceName
}) => {
  // Limit to 6 locations as per requirements
  const displayedLocations = locations.slice(0, 6);

  return (
    <div className={`rounded-xl border border-blue-100 bg-blue-50/50 p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        {serviceName
          ? `Visit Dr. Sayuj for ${serviceName} in Hyderabad`
          : 'Visit Dr. Sayuj in Hyderabad Areas'}
      </h3>
      <p className="text-gray-700 mb-4">
        Dr. Sayuj Krishnan is accessible to patients across Hyderabad. Our clinic at Yashoda Hospital
        Malakpet is centrally located with easy access from major residential areas.
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 mb-6">
        {displayedLocations.map((location) => (
          <Link
            key={location.id}
            href={`/${location.slug}`}
            className="flex items-center text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
          >
            <span className="mr-1">&bull;</span>
            {location.areaServedName}
          </Link>
        ))}
      </div>
      <Link
        href="/appointments"
        className="block w-full text-center bg-white border border-blue-600 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
      >
        Book Appointment
      </Link>
    </div>
  );
};
