import { getLocationById } from '@/src/data/locations';

const BOOK_URL = "https://www.drsayuj.info/appointments?utm_source=site&utm_medium=cta&utm_campaign=nap_block";

export default function LocalNAP() {
  // Use Malakpet as the source of truth for the main NAP block
  const location = getLocationById('malakpet');

  if (!location) return null;

  return (
    <section
      aria-label="Clinic contact details"
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {location.canonical_display_name}
      </h2>
      <p className="mt-2 text-gray-700">
        {location.address.streetAddress}, {location.address.addressLocality}, {location.address.addressRegion} {location.address.postalCode}
      </p>
      <p className="mt-1 text-gray-700">
        Phone:{" "}
        <a className="text-blue-700 underline" href={`tel:${location.telephone}`}>
          {location.telephone}
        </a>{" "}
        · Email:{" "}
        <a className="text-blue-700 underline" href="mailto:hellodr@drsayuj.info">
          hellodr@drsayuj.info
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          href={BOOK_URL}
        >
          Book Consultation
        </a>
        {location.whatsapp && (
          <a
            className="rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
            href={`https://wa.me/${location.whatsapp.replace('+', '')}`}
          >
            WhatsApp
          </a>
        )}
        <a
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          href={location.directions_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}
