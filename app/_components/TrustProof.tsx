import Link from 'next/link';
import { patientStories } from '@/src/content/stories';

interface TrustProofProps {
  serviceType?: 'spine' | 'brain' | 'epilepsy' | 'all';
  className?: string;
}

export default function TrustProof({ serviceType = 'all', className = '' }: TrustProofProps) {
  // Filter patient stories based on service type
  const relevantStories = serviceType === 'all' 
    ? patientStories.slice(0, 2)
    : patientStories.filter(story => {
        const tags = story.tags.join(' ').toLowerCase();
        if (serviceType === 'spine') return tags.includes('spine') || tags.includes('tlif');
        if (serviceType === 'brain') return tags.includes('brain') || tags.includes('meningioma');
        if (serviceType === 'epilepsy') return tags.includes('epilepsy');
        return true;
      }).slice(0, 2);

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
          >
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">Meet Dr. Sayuj Krishnan</h4>
                <p className="text-sm text-gray-600">15+ years experience • German training • MBBS, DNB Neurosurgery</p>
              </div>
              <span className="text-blue-600 ml-3">→</span>
            </div>
          </Link>
        </div>

        {relevantStories.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Patient Success Stories:</h4>
            {relevantStories.map((story) => (
              <Link
                key={story.id}
                href={`/patient-stories/${story.slug}`}
                className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
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
          >
            View all patient stories →
          </Link>
        </div>
      </div>
    </section>
  );
}

