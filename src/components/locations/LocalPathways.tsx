import React from 'react';
import Link from 'next/link';
import { LocationData, locations, getLocationById } from '@/src/data/locations';
import { ChevronRight, MapPin, Activity, Stethoscope } from 'lucide-react';

type Mode = 'location' | 'service' | 'condition';

interface LocalPathwaysProps {
  mode?: Mode; // Optional because legacy usage doesn't provide it
  locationId?: string;
  currentSlug?: string;
  className?: string;
  location?: LocationData; // Legacy support
}

export const LocalPathways: React.FC<LocalPathwaysProps> = ({
  mode,
  locationId,
  currentSlug,
  className = '',
  location: legacyLocation // Destructure legacy prop
}) => {
  const containerClass = `bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 sm:p-8 ${className}`;
  const headingClass = "text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2";
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
  const linkClass = "group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all";

  // Determine effective mode and data
  let effectiveMode = mode;
  let effectiveLocation = null;

  if (legacyLocation) {
    effectiveMode = 'location';
    effectiveLocation = legacyLocation;
  } else if (mode === 'location' && locationId) {
    effectiveLocation = getLocationById(locationId);
  }

  // Mode: Location
  if (effectiveMode === 'location') {
    if (!effectiveLocation) return null;

    return (
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Available Services
            </h3>
            <div className="space-y-3">
              {effectiveLocation.top_services_slugs.map(slug => {
                 const title = slug.replace(/-hyderabad$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                 return (
                  <Link key={slug} href={`/services/${slug}`} className={linkClass}>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{title}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                 );
              })}
            </div>
          </div>

          {/* Top Conditions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              Conditions Treated
            </h3>
            <div className="space-y-3">
              {effectiveLocation.top_conditions_slugs.map(slug => {
                 const title = slug.replace(/-hyderabad$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                 const href = `/conditions/${slug}`;
                 return (
                  <Link key={slug} href={href} className={linkClass}>
                    <span className="font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">{title}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                  </Link>
                 );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
           <Link
             href="/appointments"
             className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105"
           >
             Book Appointment at {effectiveLocation.areaServedName}
           </Link>
        </div>
      </div>
    );
  }

  // Mode: Service or Condition (showing locations)
  if (effectiveMode === 'service' || effectiveMode === 'condition') {
    const displayLocations = locations
        .filter(l => l.id !== 'hyderabad')
        .slice(0, 6);

    const title = effectiveMode === 'service' ? 'Available at these Locations' : 'Where to Consult';

    return (
      <div className={containerClass}>
        <h3 className={headingClass}>
          <MapPin className="w-6 h-6 text-blue-600" />
          {title}
        </h3>
        <div className={gridClass}>
          {displayLocations.map(loc => (
            <Link key={loc.id} href={`/${loc.slug}`} className={linkClass}>
              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{loc.areaServedName}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
             <Link
             href="/appointments"
             className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
           >
             Schedule Consultation
           </Link>
        </div>
      </div>
    );
  }

  return null;
};
