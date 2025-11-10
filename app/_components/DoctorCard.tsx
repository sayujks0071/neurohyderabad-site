import Link from 'next/link';
import OptimizedImage from './OptimizedImage';

export default function DoctorCard() {
  return (
    <article className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto" aria-labelledby="doctor-name">
      <div className="text-center">
        {/* Doctor Photo - Professional Portrait */}
        <div className="w-32 h-32 rounded-full mx-auto mb-4 relative overflow-hidden shadow-lg">
          <OptimizedImage
            src="/images/dr-sayuj-krishnan-portrait.jpg"
            alt="Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad"
            width={128}
            height={128}
            className="object-cover w-full h-full rounded-full"
            quality={75}
            sizes="128px"
            placeholder="blur"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        <h2 id="doctor-name" className="text-2xl font-bold text-blue-800 mb-2">Dr. Sayuj Krishnan</h2>
        <p className="text-lg text-blue-600 mb-3">Neurosurgeon & Spine Surgeon</p>
        
        <ul className="space-y-2 text-sm text-gray-600 mb-4" aria-label="Qualifications and experience">
          <li>• 15+ Years Experience</li>
          <li>• MBBS, DNB Neurosurgery</li>
          <li>• Fellowship in Minimally Invasive Surgery</li>
          <li>• Advanced Training in Germany</li>
        </ul>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/appointments" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors"
            aria-label="Book consultation with Dr. Sayuj Krishnan"
          >
            Book Consultation
          </Link>
          <a 
            href="tel:+919778280044" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-center transition-colors"
            aria-label="Call Dr. Sayuj Krishnan at +91 97782 80044"
          >
            Call Now
          </a>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-center space-x-4 text-sm text-gray-500" aria-label="Patient ratings and reviews">
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
    </article>
  );
}
