import React from 'react';
import Link from 'next/link';
import { locations } from '../../data/locations';

export const ServiceLocationLinks: React.FC = () => {
  // Use a stable subset or random based on build?
  // For static generation, this will be fixed at build time which is fine.
  // We'll pick 6 locations.
  const featuredLocations = locations.slice(0, 6);

  return (
    <section className="mt-12 py-8 border-t border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Visit Neurosurgeon in Hyderabad Areas</h2>
      <p className="mb-4 text-gray-600">
        Dr. Sayuj Krishnan provides expert consultation for this condition to patients from across Hyderabad:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {featuredLocations.map(loc => (
          <Link
            key={loc.id}
            href={`/${loc.slug}/`}
            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
            aria-label={`Visit neurosurgeon consultation page for ${loc.areaServedName} area`}
          >
            Neurosurgeon in {loc.areaServedName}
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href="/appointments"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Book Appointment
        </Link>
      </div>
    </section>
  );
};
