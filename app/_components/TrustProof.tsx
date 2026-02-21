'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { analytics } from '@/src/lib/analytics';
import type { PatientStory } from '@/src/content/stories';

interface TrustProofProps {
  serviceType?: 'spine' | 'brain' | 'epilepsy' | 'all';
  className?: string;
  stories: PatientStory[];
}

export default function TrustProof({ serviceType = 'all', className = '', stories = [] }: TrustProofProps) {
  const pathname = usePathname();
  
  // Use passed stories prop instead of importing large data file

  // Track TrustProof component view (on mount) - use useEffect for proper client-side behavior
  useEffect(() => {
    analytics.trustSignalView(
      pathname || '/',
      'trust_proof_component',
      serviceType
    );
  }, [pathname, serviceType]);

  return (
    <section className={`bg-white border-2 border-blue-100 rounded-xl p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        Why Patients Trust Dr. Sayuj Krishnan
      </h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <Link 
            href="/about" 
            className="flex-1 group"
            onClick={() => {
              analytics.trustSignalClick(
                pathname || '/',
                'about_credentials',
                '/about',
                serviceType
              );
              analytics.trustPathwayStart(pathname || '/', 'service_page_trust_proof');
            }}
          >
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">Meet Dr. Sayuj Krishnan</h4>
                <p className="text-sm text-gray-600">9+ years experience • AO Spine Member • German training • MBBS, DNB Neurosurgery</p>
              </div>
              <span className="text-blue-600 ml-3">→</span>
            </div>
          </Link>
        </div>

        {stories.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Patient Success Stories:</h4>
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/patient-stories/${story.slug}`}
                className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                onClick={() => {
                  analytics.trustSignalClick(
                    pathname || '/',
                    'patient_story',
                    `/patient-stories/${story.slug}`,
                    serviceType
                  );
                  analytics.track('Patient_Story_Click', {
                    page_slug: pathname || '/',
                    story_id: story.id,
                    story_slug: story.slug,
                    story_procedure: story.procedure,
                    service_type: serviceType,
                    source: 'trust_proof_component'
                  });
                  analytics.trustPathwayStart(pathname || '/', 'service_page_trust_proof');
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 group-hover:text-blue-700 text-sm mb-1">
                      {story.title}
                    </h5>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      "{story.quote}"
                    </p>
                    <span className="text-xs text-blue-600 mt-1 inline-block">
                      Read full story →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/patient-stories"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
            onClick={() => {
              analytics.trustSignalClick(
                pathname || '/',
                'all_patient_stories',
                '/patient-stories',
                serviceType
              );
              analytics.trustPathwayStart(pathname || '/', 'service_page_trust_proof');
            }}
          >
            View all patient stories →
          </Link>
        </div>
      </div>
    </section>
  );
}
