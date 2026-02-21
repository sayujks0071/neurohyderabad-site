'use client';

import React, { useState } from 'react';
import { LocationData, getLocationById } from '@/src/data/locations';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationMapEmbedProps {
  location?: LocationData;
  locationId?: string;
  mode?: 'location'; // Optional
  className?: string;
  height?: string;
}

export const LocationMapEmbed: React.FC<LocationMapEmbedProps> = ({
  location: legacyLocation,
  locationId,
  className = '',
  height = '450px'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const location = legacyLocation || (locationId ? getLocationById(locationId) : null);

  if (!location) return null;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100 ${className}`} style={{ height }}>
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
          <MapPin className="w-12 h-12 text-blue-600 mb-4 animate-bounce" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">View Location on Map</h3>
          <p className="text-gray-500 mb-6 text-center max-w-md px-4">
            Click below to load the interactive Google Map for {location.name}
          </p>
          <button
            onClick={() => setIsLoaded(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
            aria-label={`Load interactive map for ${location.name}`}
          >
            Load Map
          </button>
        </div>
      )}

      {isLoaded && !isIframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="sr-only">Loading map...</span>
        </div>
      )}

      {isLoaded && (
        <iframe
          src={location.embed_url}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Google Map for ${location.name}`}
          className="animate-in fade-in duration-500"
          onLoad={() => setIsIframeLoaded(true)}
        />
      )}
    </div>
  );
};
