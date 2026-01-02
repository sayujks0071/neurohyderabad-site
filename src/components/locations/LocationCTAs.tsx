import React from 'react';
import Link from 'next/link';
import { LocationData } from '../../data/locations';

interface LocationCTAsProps {
  location: LocationData;
  className?: string;
}

export const LocationCTAs: React.FC<LocationCTAsProps> = ({ location, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {location.whatsapp && (
        <a
          href={`https://wa.me/${location.whatsapp}`}
          className="rounded-2xl px-6 py-3 bg-green-600 text-white hover:bg-green-700 transition-colors"
          aria-label={`WhatsApp booking for ${location.areaServedName} patients`}
        >
          WhatsApp Booking
        </a>
      )}
      <a
        href={`tel:${location.telephone}`}
        className="rounded-2xl px-6 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label={`Call ${location.telephone}`}
      >
        Call: {location.telephone}
      </a>
      <Link
        href="/appointments"
        className="rounded-2xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label={`Book an appointment near ${location.areaServedName}`}
      >
        Book Appointment
      </Link>
      <a
        href={location.directions_url}
        className="rounded-2xl px-6 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label={`Directions to clinic from ${location.areaServedName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Directions
      </a>
    </div>
  );
};
