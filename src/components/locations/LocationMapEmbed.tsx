import React from 'react';
import { LocationData } from '../../data/locations';

interface LocationMapEmbedProps {
  location: LocationData;
  className?: string;
}

export const LocationMapEmbed: React.FC<LocationMapEmbedProps> = ({ location, className = "" }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border bg-gray-100 ${className}`}>
      <iframe
        title={`Map to clinic for ${location.areaServedName} patients`}
        src={location.embed_url}
        className="w-full h-full min-h-[300px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};
