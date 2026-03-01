import React from 'react';
import Link from 'next/link';
import { LocationData, locations, getLocationById, SERVICES_PATHWAY_AREAS, CONDITIONS_PATHWAY_AREAS } from '@/src/data/locations';
import { ChevronRight, MapPin, Activity, Stethoscope } from 'lucide-react';

type Mode = 'location' | 'service' | 'condition';

interface LocalPathwaysProps {
  mode?: Mode;
  locationId?: string; // For mode='location'
  currentSlug?: string; // For mode='service' or 'condition' (to exclude current page?)
  className?: string;
  location?: LocationData; // Legacy support
}

// Improved formatter for slugs
const formatSlug = (slug: string) => {
  // Remove common suffixes and prefixes
  const cleanSlug = slug
    .replace(/-hyderabad$/, '')
    .replace(/^best-/, '')
    .replace(/-treatment$/, '')
    .replace(/-surgery$/, ' Surgery'); // Preserve 'Surgery' if it was part of the slug context

  return cleanSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

// Helper to construct href safely
const getHref = (type: 'service' | 'condition', slug: string) => {
  if (slug.startsWith('/')) return slug;
  return `/${type}s/${slug}`; // Note plural 'services' / 'conditions'
};

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
                 const title = formatSlug(slug);
                 return (
                  <Link key={slug} href={getHref('service', slug)} className={linkClass}>
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
                 const title = formatSlug(slug);
                 return (
                  <Link key={slug} href={getHref('condition', slug)} className={linkClass}>
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
    // Exclude 'hyderabad' as it's the main location, we want local areas
    // Show curated list of major areas to avoid link farming

    // Use centralized configuration for pathways
    const targetAreas = effectiveMode === 'service' ? SERVICES_PATHWAY_AREAS : CONDITIONS_PATHWAY_AREAS;

    // Filter by target areas and exclude the current area if currentSlug maps to an area
    let displayLocations = locations
        .filter(l => targetAreas.includes(l.id as any))
        .sort((a, b) => a.areaServedName.localeCompare(b.areaServedName));

    // Exclude current location page if rendered on one, though mode is service/condition
    if (currentSlug) {
      displayLocations = displayLocations.filter(loc => {
        const cleanLocSlug = loc.slug.startsWith('/') ? loc.slug.slice(1) : loc.slug;
        const cleanCurrentSlug = currentSlug.startsWith('/') ? currentSlug.slice(1) : currentSlug;
        return cleanLocSlug !== cleanCurrentSlug;
      });
    }

    const title = effectiveMode === 'service'
      ? 'Visit Our Neurosurgery Clinics in Hyderabad'
      : 'Consult Dr. Sayuj Near You';

    const subtitle = effectiveMode === 'service'
      ? 'Expert neurosurgical care available at multiple convenient locations across Hyderabad.'
      : 'Find specialized treatment for your condition at a clinic near you.';

    return (
      <div className={containerClass}>
        <h3 className={headingClass}>
          <MapPin className="w-6 h-6 text-blue-600" />
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
            {subtitle}
        </p>
        <div className={gridClass}>
          {displayLocations.map(loc => {
             // Handle slugs that might be nested or simple
             const href = loc.slug.startsWith('/') ? loc.slug : `/${loc.slug}`;
             return (
                <Link key={loc.id} href={href} className={linkClass}>
                  <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{loc.areaServedName}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </Link>
             );
          })}
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
