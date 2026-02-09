import { notFound } from 'next/navigation';
import SchemaScript from '@/app/_schema/Script';
import StandardCTA from '@/app/_components/StandardCTA';
import MapCard from '@/app/_components/MapCard';
import { getLocationById } from '@/src/data/locations';
import { Metadata } from 'next';
import { makeMetadata } from '@/app/_lib/meta';
import { SITE_URL } from '@/src/lib/seo';
import { LocalPathways } from '@/src/components/locations/LocalPathways';
import { LocationSchema } from '@/src/components/locations/LocationSchema';
import { LocationNAPCard } from '@/src/components/locations/LocationNAPCard';

// Ensure this route is fully statically generated (no dynamic fallback SSR).
export const dynamic = 'force-static';
export const dynamicParams = false;

const AREAS = {
  'banjara-hills': {
    name: 'Banjara Hills',
    travelTime: '25–35 minutes by car (9 km via NH65)',
    metro: 'Metro: Jubilee Hills Check Post → Ameerpet interchange → Malakpet (≈35 minutes)',
    cab: 'Cab/Auto: Request drop at Yashoda Hospital, OPD Block entrance.',
    description:
      'If you stay in Banjara Hills and need brain or spine care, you can consult Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet. Appointments are coordinated so your travel is planned with minimal waiting.',
  },
  'jubilee-hills': {
    name: 'Jubilee Hills',
    travelTime: '30–40 minutes by car (11 km via Road No. 36 and NH65)',
    metro: 'Metro: Jubilee Hills Check Post → Ameerpet → Malakpet (≈35 minutes)',
    cab: 'Cab/Auto: Head towards Malakpet Circle, ask for Yashoda Hospital OPD Block.',
    description:
      'Patients from Jubilee Hills often choose the Malakpet OPD for minimally invasive spine and brain surgery consultations with Dr. Sayuj. Tele-consults are available before your visit.',
  },
  'hitech-city': {
    name: 'HITEC City',
    travelTime: '40–55 minutes by car (16 km via PV Narasimha Rao Expressway)',
    metro: 'Metro: HITEC City → Ameerpet → Malakpet (≈45 minutes)',
    cab: 'Cab/Auto: Early-morning slots help skip peak traffic; request drop at OPD entrance.',
    description:
      'Commuters from HITEC City can plan early OPD slots or hybrid tele-consults. Dr. Sayuj’s team guides you through imaging and admission planning when needed.',
  },
  'madhapur': {
    name: 'Madhapur',
    travelTime: '40–50 minutes by car (14 km via Hitec City Main Rd and NH65)',
    metro: 'Metro: Durgam Cheruvu → Ameerpet → Malakpet (≈45 minutes)',
    cab: 'Cab/Auto: Follow NH65 to Malakpet; OPD parking is on the right side of the block.',
    description:
      'Madhapur patients rely on day-care endoscopic spine procedures and nerve surgeries. Coordinate imaging and post-op physiotherapy through the clinic.',
  },
  'gachibowli': {
    name: 'Gachibowli',
    travelTime: '45–60 minutes by car (20 km via Outer Ring Road/PVNR Expressway)',
    metro: 'Metro: Raidurg → Ameerpet → Malakpet (≈50 minutes)',
    cab: 'Cab/Auto: Plan buffer during peak IT corridor hours; drop at OPD Block.',
    description:
      'Professionals from Gachibowli often use the tele-consult triage before travelling for OPD. Dr. Sayuj focuses on minimally invasive spine and complex brain surgeries.',
  },
  'secunderabad': {
    name: 'Secunderabad',
    travelTime: '20–30 minutes by car (8 km via Chaderghat Road)',
    metro: 'Metro: Secunderabad East → Parade Grounds → Malakpet (≈25 minutes)',
    cab: 'Cab/Auto: Travel via Chaderghat or Musarambagh corridors; hospital is beside Malakpet metro.',
    description:
      'Patients from Secunderabad can reach Malakpet quickly for OPD or emergency consultations. Same-day discharge options are available for endoscopic spine cases.',
  },
  'kondapur': {
    name: 'Kondapur',
    travelTime: '35–45 minutes by car (14 km via PV Narasimha Rao Expressway)',
    metro: 'Metro: Kondapur → Ameerpet → Malakpet (≈40 minutes)',
    cab: 'Cab/Auto: Take PVNR Expressway; request drop at Yashoda Hospital OPD Block.',
    description:
      'Kondapur residents can easily reach Dr. Sayuj\'s neurosurgery consultations at Yashoda Hospital Malakpet. The expressway provides a smooth route during off-peak hours.',
  },
  'malakpet': {
    name: 'Malakpet',
    travelTime: '5–10 minutes by car (2 km via local roads)',
    metro: 'Metro: Malakpet station is 500m from Yashoda Hospital',
    cab: 'Cab/Auto: Very short distance; ask for Yashoda Hospital OPD Block.',
    description:
      'Malakpet residents have the most convenient access to Dr. Sayuj\'s neurosurgery consultations at Yashoda Hospital. The hospital is within walking distance from the metro station.',
  },
} as const;

type AreaKey = keyof typeof AREAS;

const AREA_LIST = Object.keys(AREAS) as AreaKey[];

export function generateStaticParams() {
  return AREA_LIST.map((area) => ({ area }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const data = AREAS[area as AreaKey];
  if (!data) {
    return {};
  }

  const title = `Brain & Spine Care near ${data.name} | Dr. Sayuj Krishnan`;
  const description = `Consult neurosurgeon Dr. Sayuj Krishnan at Yashoda Hospital Malakpet. Travel from ${data.name} takes ${data.travelTime}.`;
  const canonicalPath = `/near/${area}`;

  return {
    ...makeMetadata({
      title,
      description,
      canonicalPath,
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const data = AREAS[area as AreaKey];
  if (!data) {
    notFound();
  }

  // Use the specific location data
  const location = getLocationById(area);
  if (!location) throw new Error(`Critical: Location data missing for area: ${area}`);

  const pageUrl = `${SITE_URL}/near/${area}`;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${pageUrl}#travel`,
    name: `How to reach Yashoda Hospital Malakpet from ${data.name}`,
    totalTime: 'PT45M',
    supply: [{ '@type': 'HowToTool', name: 'Metro or Cab' }],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Plan your appointment',
        text: `Call or WhatsApp ${location.telephone} to confirm OPD slot with Dr. Sayuj Krishnan.`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Travel to Malakpet',
        text: data.travelTime,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Arrive at OPD Block',
        text: 'Use the OPD Block entrance beside Malakpet Metro; parking is available inside the hospital campus.',
      },
    ],
  };

  const breadcrumb = [
      { name: 'Neighbourhoods', item: `${SITE_URL}/near` },
      { name: data.name, item: pageUrl },
  ];

  return (
    <main className="prose max-w-3xl mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <h1>Brain &amp; Spine Care near {data.name}</h1>

      <section className="not-prose mb-8 rounded-xl border border-emerald-100 bg-emerald-50 p-5 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-emerald-900">Quick facts</h2>
        <ul className="list-disc pl-5 text-emerald-900">
          <li>Consultations and surgeries are performed at {location.address.streetAddress} (OPD Block).</li>
          <li>Travel from {data.name} typically takes {data.travelTime.split(' (')[0]} — plan buffer for peak hours.</li>
          <li>Tele-consult triage helps review MRI and plan admission before you travel in.</li>
          <li>On-site parking and Malakpet Metro station make OPD visits convenient.</li>
        </ul>
      </section>

      <p>{data.description}</p>

      <section>
        <h2>Plan your visit</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold text-emerald-900">Travel time</h3>
            <p>{data.travelTime}</p>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900">Metro option</h3>
            <p>{data.metro}</p>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900">Cab / auto</h3>
            <p>{data.cab}</p>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900">Parking & facilities</h3>
            <p>Visitor parking is available at the OPD Block. After-hours access is coordinated via the hospital security desk.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>What we treat</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Endoscopic spine surgery for slip disc, spinal stenosis, and cervical radiculopathy</li>
          <li>Brain tumor evaluation with neuronavigation, neuromonitoring, and awake craniotomy when required</li>
          <li>Peripheral nerve surgery including carpal tunnel and ulnar nerve decompression</li>
          <li>Epilepsy surgery and trigeminal neuralgia treatment</li>
        </ul>
      </section>

      <StandardCTA className="my-8" />

      <section>
        <h2>Directions</h2>
        <p>Set your navigation to “Yashoda Hospital Malakpet OPD Block”. Use the map below for live traffic updates.</p>
        <MapCard area={data.name} mapUrl={location.embed_url} />
      </section>

      <LocationNAPCard location={location} />

      {/* Added Local Pathways */}
      <div className="not-prose mt-12">
        <LocalPathways mode="location" locationId={location.id} />
      </div>

      <SchemaScript data={howToSchema} />
    </main>
  );
}
