'use client';

import { CONTACT_INFO, MapPinIcon } from "./constants";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.641618776899!2d78.5028532759132!3d17.38243308350516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb984104279939%3A0x255b667230911b34!2sYashoda%20Hospitals%20-%20Malakpet!5e0!3m2!1sen!2sin!4v1721321743284!5m2!1sen!2sin";

export default function MapSection() {
  return (
    <section className="max-w-4xl mx-auto py-12 md:py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Our Location</h2>
        <p className="text-slate-500 mt-2">
          Visit us at Yashoda Hospital, Malakpet. Use the map for directions.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-2 sm:p-4 overflow-hidden">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Yashoda Hospital, Malakpet Location"
          className="rounded-xl"
        />
      </div>
      <div className="mt-8 text-center">
        <a
          href={CONTACT_INFO.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 transform bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 focus:ring-cyan-500 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:shadow-md"
        >
          <MapPinIcon className="w-5 h-5 mr-2" />
          Get Directions
        </a>
      </div>
    </section>
  );
}
