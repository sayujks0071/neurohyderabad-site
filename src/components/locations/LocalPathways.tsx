import React from 'react';
import Link from 'next/link';
import { LocationData } from '../../data/locations';

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
  location: LocationData;
  className?: string;
}

export const LocalPathways: React.FC<LocalPathwaysProps> = ({ location, className = "" }) => {
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
};
