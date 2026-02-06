import { getLocationById } from '@/src/data/locations';
import { Calendar, MessageCircle, MapPin } from 'lucide-react';

const BOOK_URL = "https://www.drsayuj.info/appointments?utm_source=site&utm_medium=cta&utm_campaign=nap_block";

export default function LocalNAP() {
  // Use Malakpet as the source of truth for the main NAP block
  const location = getLocationById('malakpet');

  if (!location) return null;

  return (
    <section
      aria-label="Clinic contact details"
      className="relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        {location.canonical_display_name}
      </h2>
      <p className="text-slate-700 mb-2">
        {location.address.streetAddress}, {location.address.addressLocality}, {location.address.addressRegion} {location.address.postalCode}
      </p>
      <p className="text-slate-700 mb-6">
        Phone:{" "}
        <a className="text-blue-600 font-medium hover:text-blue-800 transition-colors" href={`tel:${location.telephone}`}>
          {location.telephone}
        </a>{" "}
        · Email:{" "}
        <a className="text-blue-600 font-medium hover:text-blue-800 transition-colors" href="mailto:hellodr@drsayuj.info">
          hellodr@drsayuj.info
        </a>
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        {/* Primary Action Button */}
        <a
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          href={BOOK_URL}
        >
          <Calendar className="w-5 h-5" />
          Book Consultation
        </a>

        {/* Secondary Buttons */}
        {location.whatsapp && (
          <a
            className="flex-1 sm:flex-none bg-white border border-slate-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center gap-2"
            href={`https://wa.me/${location.whatsapp.replace('+', '')}`}
          >
             <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        )}
        <a
          className="flex-1 sm:flex-none bg-white border border-slate-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center gap-2"
          href={location.directions_url}
          target="_blank"
          rel="noopener noreferrer"
        >
           <MapPin className="w-5 h-5" />
          Get Directions
        </a>
      </div>
    </section>
  );
}
