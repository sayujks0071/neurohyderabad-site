const BOOK_URL =
  "https://www.drsayuj.info/appointments?utm_source=site&utm_medium=cta&utm_campaign=nap_block";
const WHATSAPP_URL = "https://wa.me/919778280044";
const DIRECTIONS_URL =
  "https://www.drsayuj.info/locations?utm_source=site&utm_medium=cta&utm_campaign=nap_block";

export default function LocalNAP() {
  return (
    <section
      aria-label="Clinic contact details"
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        Dr. Sayuj Krishnan, Neurosurgeon
      </h2>
      <p className="mt-2 text-gray-700">
        Room 317, OPD Block, Yashoda Hospital, Malakpet, Hyderabad, Telangana
        500036
      </p>
      <p className="mt-1 text-gray-700">
        Phone:{" "}
        <a className="text-blue-700 underline" href="tel:+919778280044">
          +91 9778280044
        </a>{" "}
        · Email:{" "}
        <a className="text-blue-700 underline" href="mailto:neurospinehyd@drsayuj.com">
          neurospinehyd@drsayuj.com
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          href={BOOK_URL}
        >
          Book Consultation
        </a>
        <a
          className="rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          href={WHATSAPP_URL}
        >
          WhatsApp
        </a>
        <a
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          href={DIRECTIONS_URL}
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}
