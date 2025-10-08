import Link from 'next/link';

export default function TeamStrip() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-blue-800 mb-4 text-center">Our Expert Team</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-blue-600">👨‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-800">Dr. Sayuj Krishnan</h4>
          <p className="text-xs text-gray-600">Neurosurgeon</p>
          <p className="text-xs text-gray-500">15+ years</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-green-600">👩‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-800">Dr. Priya Sharma</h4>
          <p className="text-xs text-gray-600">Neuro Anesthesiologist</p>
          <p className="text-xs text-gray-500">12+ years</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-purple-600">👨‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-800">Dr. Rajesh Kumar</h4>
          <p className="text-xs text-gray-600">Neuro Physiotherapist</p>
          <p className="text-xs text-gray-500">10+ years</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-2xl text-orange-600">👩‍⚕️</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-800">Dr. Anjali Patel</h4>
          <p className="text-xs text-gray-600">Neuro Psychologist</p>
          <p className="text-xs text-gray-500">8+ years</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Comprehensive Care Team:</strong> From surgery to recovery, our multidisciplinary team ensures optimal outcomes.
        </p>
        <Link 
          href="/contact" 
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
        >
          Meet Our Full Team →
        </Link>
      </div>
    </div>
  );
}
