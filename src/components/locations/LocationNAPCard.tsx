import React from 'react';
import { LocationData } from '@/src/data/locations';
import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';

interface LocationNAPCardProps {
  location: LocationData;
  className?: string;
}

export const LocationNAPCard: React.FC<LocationNAPCardProps> = ({ location, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{location.name}</h3>

      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
          <div itemScope itemType="https://schema.org/PostalAddress">
            <p className="text-gray-700" itemProp="streetAddress">{location.address.streetAddress}</p>
            <p className="text-gray-700">
              <span itemProp="addressLocality">{location.address.addressLocality}</span>,{' '}
              <span itemProp="addressRegion">{location.address.addressRegion}</span> -{' '}
              <span itemProp="postalCode">{location.address.postalCode}</span>
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-blue-600 shrink-0" />
          <a
            href={`tel:${location.telephone}`}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            {location.telephone}
          </a>
        </div>

        {/* WhatsApp */}
        {location.whatsapp && (
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
            <a
              href={`https://wa.me/${location.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in a new tab)"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        )}

         {/* Directions Link (Text version) */}
         <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-blue-600 shrink-0" />
          <a
            href={location.directions_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${location.name} (opens in a new tab)`}
            className="text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300 hover:decoration-blue-800 transition-all"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};
