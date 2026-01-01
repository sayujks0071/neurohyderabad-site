import Link from 'next/link';
import OptimizedImage from './OptimizedImage';

interface DoctorCardProps {
  priority?: boolean;
}

export default function DoctorCard({ priority = false }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        {/* Doctor Photo - Professional Portrait */}
        <div className="w-32 h-32 rounded-full mx-auto mb-4 relative overflow-hidden shadow-lg">
          <OptimizedImage
            src="/images/dr-sayuj-krishnan-portrait.webp"
            alt="Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad"
            width={128}
            height={128}
            className="object-cover w-full h-full rounded-full max-w-[128px]"
            quality={75}
            sizes="128px"
            placeholder="blur"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding="async"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Dr. Sayuj Krishnan</h2>
        <p className="text-lg text-blue-600 mb-3">Neurosurgeon & Spine Surgeon</p>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p>• 9+ Years Experience</p>
          <p>• MBBS, DNB Neurosurgery</p>
          <p>• Fellowship in Minimally Invasive Surgery</p>
          <p>• Advanced Training in Germany</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/appointments" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors"
          >
            Book Consultation
          </Link>
          <a 
            href="tel:+919778280044" 
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors"
          >
            Call Now
          </a>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="text-yellow-500 mr-1">⭐</span>
              4.9/5 Rating
            </span>
            <span className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              1000+ Patients
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
