import { CLINIC } from '@/app/_lib/clinic';

// Use the most reliable Google Maps embed format
// This format is more stable than the pb= parameter format
const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(CLINIC.addr)}&output=embed`;

// Direct Google Maps link for fallback
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.addr)}`;

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm relative">
      <iframe
        title={`${CLINIC.name} on Google Maps`}
        src={GOOGLE_MAPS_EMBED_URL}
        width="100%"
        height="360"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-3 pointer-events-none">
        <div className="text-right pointer-events-auto">
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 bg-white/90 px-3 py-1.5 rounded-md shadow-sm transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>
      <noscript>
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-gray-600 mb-2">JavaScript is required to display the map.</p>
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View location on Google Maps
          </a>
        </div>
      </noscript>
    </div>
  );
}
