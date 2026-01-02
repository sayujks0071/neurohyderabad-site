import React from 'react';
import { LocationData } from '../../data/locations';

interface LocationNAPCardProps {
  location: LocationData;
  className?: string;
}

export const LocationNAPCard: React.FC<LocationNAPCardProps> = ({ location, className = "" }) => {
  return (
    <div className={`p-6 rounded-xl border bg-gray-50/50 ${className}`}>
      <h3 className="text-xl font-bold mb-3">{location.canonical_display_name}</h3>
      <address className="not-italic space-y-2 text-gray-700">
        <p>{location.address.streetAddress}</p>
        <p>{location.address.addressLocality}, {location.address.addressRegion} {location.address.postalCode}</p>
      </address>
      <div className="mt-4 space-y-1">
        <p><strong>Phone:</strong> <a href={`tel:${location.telephone}`} className="text-blue-700 hover:underline">{location.telephone}</a></p>
        {location.whatsapp && (
           <p><strong>WhatsApp:</strong> <a href={`https://wa.me/${location.whatsapp}`} className="text-green-700 hover:underline">Chat Now</a></p>
        )}
      </div>
    </div>
  );
};
