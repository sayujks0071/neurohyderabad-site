'use client';

import React, { useState } from 'react';
import { LocationData } from '../../data/locations';

interface LocationMapEmbedProps {
  location: LocationData;
  className?: string;
}

export const LocationMapEmbed: React.FC<LocationMapEmbedProps> = ({ location, className = "" }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border bg-gray-100 relative ${className}`}
      style={{ minHeight: '300px' }}
    >
      {!showMap ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="mb-4 text-4xl" role="img" aria-label="Map icon">🗺️</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">View Clinic Location</h3>
          <p className="mb-6 text-sm text-gray-600 max-w-xs">
            See {location.canonical_display_name} on Google Maps
          </p>
          <button
            onClick={() => setShowMap(true)}
            className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label={`Load Google Map for ${location.canonical_display_name}`}
          >
            Load Map
          </button>
        </div>
      ) : (
        <iframe
          title={`Map to clinic for ${location.areaServedName} patients`}
          src={location.embed_url}
          className="w-full h-full min-h-[300px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
};
