interface MapCardProps {
  area: string;
  mapUrl: string;
}

export default function MapCard({ area, mapUrl }: MapCardProps) {
  return (
    <div className="not-prose mt-8 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative h-64 md:h-full">
          <iframe
            title={`Map to Yashoda Hospital Malakpet from ${area}`}
            src={mapUrl}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="h-full w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900">Directions from {area}</h3>
            <p className="mt-2 text-sm text-gray-700">
              Use the map for live traffic updates. Set your destination to “Yashoda Hospital Malakpet OPD Block”. Parking is inside the campus; the OPD entrance is beside Malakpet Metro.
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
            <p>
              <strong>Tip:</strong> Share your arrival time over WhatsApp (+91 9778280044) so the team can coordinate imaging or admission in advance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
