export default function TrustSignals() {
  return (
    <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
        <div className="flex items-center bg-white/80 border border-white/40 px-4 py-3 rounded-xl shadow-sm hover:shadow-md motion-safe:hover:scale-[1.02] transition-all duration-300">
          <span className="text-xl mr-3" role="img" aria-label="Globe">🌐</span>
          <span className="font-semibold text-slate-700">Multilingual Support</span>
          <span className="text-slate-500 ml-2 font-medium">English, Hindi, Telugu</span>
        </div>
        
        <div className="flex items-center bg-white/80 border border-white/40 px-4 py-3 rounded-xl shadow-sm hover:shadow-md motion-safe:hover:scale-[1.02] transition-all duration-300 group">
          <span className="text-xl mr-3" role="img" aria-label="Phone">📞</span>
          <span className="font-semibold text-slate-700">24/7 Helpline</span>
          <a
            href="tel:+919778280044"
            className="text-blue-600 ml-2 font-bold group-hover:text-blue-700 transition-colors"
            aria-label="Call 24/7 Helpline at +91 97782 80044"
          >
            +91 97782 80044
          </a>
        </div>
        
        <div className="flex items-center bg-white/80 border border-white/40 px-4 py-3 rounded-xl shadow-sm hover:shadow-md motion-safe:hover:scale-[1.02] transition-all duration-300">
          <span className="text-xl mr-3" role="img" aria-label="Hospital">🏥</span>
          <span className="font-semibold text-slate-700">Yashoda Hospital</span>
          <span className="text-slate-500 ml-2 font-medium">Malakpet</span>
        </div>
        
        <div className="flex items-center bg-white/80 border border-white/40 px-4 py-3 rounded-xl shadow-sm hover:shadow-md motion-safe:hover:scale-[1.02] transition-all duration-300">
          <span className="text-xl mr-3" role="img" aria-label="Lightning">⚡</span>
          <span className="font-semibold text-slate-700">Same-Day Discharge</span>
          <span className="text-slate-500 ml-2 font-medium">Many Procedures</span>
        </div>
      </div>
    </div>
  );
}
