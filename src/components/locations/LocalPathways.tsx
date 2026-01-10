import React from 'react';
import Link from 'next/link';
import { LocationData, locations } from '../../data/locations';

const SERVICE_MAP: Record<string, string> = {
  "endoscopic-spine-surgery-hyderabad": "Endoscopic Spine Surgery",
  "brain-tumor-surgery-hyderabad": "Brain Tumor Surgery",
  "minimally-invasive-spine-surgery": "Minimally Invasive Spine Surgery",
  "sciatica-treatment-hyderabad": "Sciatica Treatment",
  "spine-surgery-hyderabad": "Comprehensive Spine Surgery",
  "epilepsy-surgery-hyderabad": "Epilepsy Surgery"
};

const CONDITION_MAP: Record<string, string> = {
  "sciatica-pain-treatment": "Sciatica Pain",
  "slipped-disc": "Slipped Disc",
  "brain-tumor": "Brain Tumor",
  "trigeminal-neuralgia": "Trigeminal Neuralgia"
};

interface LocalPathwaysProps {
  location?: LocationData; // Optional for non-location modes
  mode?: 'location' | 'service' | 'condition';
  className?: string;
}

export const LocalPathways: React.FC<LocalPathwaysProps> = ({ location, mode = 'location', className = "" }) => {

  if (mode === 'location' && location) {
    return (
      <section className={`mt-12 space-y-8 ${className}`}>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Top Treatments near {location.areaServedName}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {location.top_services_slugs.map(slug => (
              <li key={slug}>
                <Link href={`/services/${slug}/`} className="text-blue-700 hover:underline flex items-center">
                  <span className="mr-2">→</span>
                  {SERVICE_MAP[slug] || slug.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Common Conditions Treated</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {location.top_conditions_slugs.map(slug => (
              <li key={slug}>
                <Link href={`/conditions/${slug}/`} className="text-blue-700 hover:underline flex items-center">
                  <span className="mr-2">→</span>
                  {CONDITION_MAP[slug] || slug.replace(/-/g, ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

         <div className="pt-4">
          <Link
            href="/appointments"
            className="inline-flex items-center text-lg font-medium text-blue-800 hover:text-blue-900"
          >
            Book Consultation for {location.areaServedName} residents &rarr;
          </Link>
        </div>
      </section>
    );
  }

  if (mode === 'service') {
    // Show "Visit in Hyderabad areas" linking to 2–6 location pages
    const topLocations = locations.slice(0, 6);
    return (
      <section className={`mt-12 ${className}`}>
        <h2 className="text-2xl font-semibold mb-4">Visit Our Clinics in Hyderabad</h2>
        <p className="mb-6 text-gray-700">Expert neurosurgical care available for patients from:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
           {topLocations.map(loc => (
             <li key={loc.id}>
               <Link href={`/${loc.slug}`} className="text-blue-700 hover:underline flex items-center">
                 <span className="mr-2">📍</span>
                 {loc.areaServedName}
               </Link>
             </li>
           ))}
        </ul>
        <Link
            href="/appointments"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Appointment
        </Link>
      </section>
    );
  }

  if (mode === 'condition') {
      // Show "Where to consult" linking to 2–4 location pages + appointment
      const topLocations = locations.slice(0, 4);
      return (
        <section className={`mt-12 ${className}`}>
          <h2 className="text-2xl font-semibold mb-4">Where to Consult in Hyderabad</h2>
          <p className="mb-6 text-gray-700">Accessible clinics for patients residing in:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
             {topLocations.map(loc => (
               <li key={loc.id}>
                 <Link href={`/${loc.slug}`} className="text-blue-700 hover:underline flex items-center">
                   <span className="mr-2">📍</span>
                   {loc.areaServedName}
                 </Link>
               </li>
             ))}
          </ul>
          <Link
              href="/appointments"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Schedule Consultation
          </Link>
        </section>
      );
  }

  return null;
};
