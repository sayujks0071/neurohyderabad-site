import React from 'react';
import { LocationData, getLocationById } from '@/src/data/locations';
import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';

interface LocationNAPCardProps {
  location?: LocationData;
  locationId?: string;
  mode?: 'location'; // Optional, for prop compatibility
  className?: string;
}

export const LocationNAPCard: React.FC<LocationNAPCardProps> = ({ location: legacyLocation, locationId, className = '' }) => {
  const location = legacyLocation || (locationId ? getLocationById(locationId) : null);

  if (!location) return null;

  return (
    <div className={`bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{location.canonical_display_name}</h3>
        <p className="text-sm text-[var(--color-primary-800)] font-medium mt-1">
          Serving {location.areaServedName}
        </p>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[var(--color-primary-500)] mt-1 shrink-0" aria-hidden="true" />
          <div itemScope itemType="https://schema.org/PostalAddress">
            <p className="text-[var(--color-text-secondary)]" itemProp="streetAddress">{location.address.streetAddress}</p>
            <p className="text-[var(--color-text-secondary)]">
              <span itemProp="addressLocality">{location.address.addressLocality}</span>,{' '}
              <span itemProp="addressRegion">{location.address.addressRegion}</span> -{' '}
              <span itemProp="postalCode">{location.address.postalCode}</span>
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-[var(--color-primary-500)] shrink-0" aria-hidden="true" />
          <a
            href={`tel:${location.telephone}`}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-500)] font-medium transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2"
            aria-label={`Call ${location.telephone}`}
          >
            {location.telephone}
          </a>
        </div>

        {/* WhatsApp */}
        {location.whatsapp && (
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-[var(--color-success-700)] shrink-0" aria-hidden="true" />
            <a
              href={`https://wa.me/${location.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in a new tab)"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-success-700)] font-medium transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-success)] focus:ring-offset-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        )}

         {/* Directions Link (Text version) */}
         <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-[var(--color-primary-500)] shrink-0" aria-hidden="true" />
          <a
            href={location.directions_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${location.name} (opens in a new tab)`}
            className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium underline decoration-blue-300 hover:decoration-blue-800 transition-all rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};
