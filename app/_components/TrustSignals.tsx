export default function TrustSignals() {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-8" role="region" aria-label="Key features and contact information">
      <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
          <span className="text-green-600 mr-2">🌐</span>
          <span className="font-semibold text-gray-700">Multilingual Support</span>
          <span className="text-gray-500 ml-2">English, Hindi, Telugu</span>
        </div>
        
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
          <span className="text-red-600 mr-2">📞</span>
          <span className="font-semibold text-gray-700">24/7 Helpline</span>
          <a href="tel:+919778280044" className="text-blue-600 ml-2 font-semibold" aria-label="Call 24/7 helpline at +91 97782 80044">
            +91 97782 80044
          </a>
        </div>
        
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
          <span className="text-blue-600 mr-2">🏥</span>
          <span className="font-semibold text-gray-700">Yashoda Hospital</span>
          <span className="text-gray-500 ml-2">Malakpet</span>
        </div>
        
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
          <span className="text-purple-600 mr-2">⚡</span>
          <span className="font-semibold text-gray-700">Same-Day Discharge</span>
          <span className="text-gray-500 ml-2">Many Procedures</span>
        </div>
      </div>
    </div>
  );
}
