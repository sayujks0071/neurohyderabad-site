import React from 'react';
import { LocationData } from '@/src/data/locations';
import { Phone, MessageCircle, Map, Calendar } from 'lucide-react';
import Link from 'next/link';

interface LocationCTAsProps {
  location: LocationData;
  className?: string;
}

export const LocationCTAs: React.FC<LocationCTAsProps> = ({ location, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* Call */}
      <a
        href={`tel:${location.telephone}`}
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:scale-[1.02] transition-transform"
      >
        <Phone className="w-5 h-5" />
        <span>Call Now</span>
      </a>

      {/* WhatsApp */}
      {location.whatsapp && (
        <a
          href={`https://wa.me/${location.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#25D366] text-white font-semibold shadow-lg shadow-green-500/30 hover:scale-[1.02] transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      )}

      {/* Directions */}
      <a
        href={location.directions_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${location.name} (opens in a new tab)`}
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
      >
        <Map className="w-5 h-5" />
        <span>Get Directions</span>
      </a>

      {/* Book Appointment */}
      <Link
        href="/appointments"
        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-transform"
      >
        <Calendar className="w-5 h-5" />
        <span>Book Appointment</span>
      </Link>
    </div>
  );
};
