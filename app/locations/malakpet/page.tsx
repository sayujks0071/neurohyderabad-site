import Link from "next/link";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan | Yashoda Hospitals",
  description: "Dr. Sayuj Krishnan is the leading Neurosurgeon at Yashoda Hospitals, Malakpet. Specialist in Endoscopic Spine Surgery, Brain Tumors & Trauma. Book Appointment.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan",
    description: "Expert Neurosurgeon at Yashoda Hospitals, Malakpet. Advanced Endoscopic Spine & Brain Surgery Centre.",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon in Malakpet",
      },
    ],
  },
};

const FAQ = [
  { q: "Where is Dr. Sayuj's clinic in Malakpet?", a: "Dr. Sayuj Krishnan consults at Yashoda Hospitals, Malakpet, in Room No 317, OPD Block. The hospital is located near Nalgonda X Roads." },
  { q: "What are the OPD timings?", a: "Mon-Sat: 10:00 AM - 4:00 PM. Emergency neurosurgery services are available 24x7." },
  { q: "Is endoscopic spine surgery available at Malakpet?", a: "Yes, the Malakpet branch is equipped with a dedicated 4K Endoscopic Suite for keyhole spine surgeries (stitchless)." },
  { q: "Do you treat head injuries and spine fractures?", a: "Yes, as a Tier-1 Trauma Centre, we manage complex head injuries and traumatic spine fractures around the clock." },
];

// Selected stories sourced from src/content/stories.ts to ensure content is accurate
// and to avoid direct imports that might cause circular dependency or build issues in some CI environments.
const SELECTED_STORIES = [
  {
    id: 'brain-001',
    slug: 'minimal-invasive-meningioma-resection',
    title: 'Back to Work After Meningioma Surgery',
    quote: '“I was speaking normally the next day and felt safe throughout the awake mapping.”',
    summary: 'A 39-year-old teacher with progressive word-finding difficulty underwent awake craniotomy with mapping. She returned to the classroom in four weeks with no residual tumour on follow-up MRI.',
    tags: ['brain', 'awake-surgery', 'meningioma'],
  },
  {
    id: 'spine-002',
    slug: 'lumbar-miss-tlif-recovery',
    title: 'Walking Pain-Free After TLIF',
    quote: '“I could stand straight the very next morning and walked the corridor with the physio.”',
    summary: 'A 52-year-old operations manager with refractory spondylolisthesis pain underwent single-level TLIF with navigation. She resumed desk work in three weeks and remains symptom-free.',
    tags: ['spine', 'fusion', 'tlif'],
  },
  {
    id: 'epilepsy-003',
    slug: 'temporal-lobe-epilepsy-control',
    title: 'Seizure-Free After Epilepsy Surgery',
    quote: '“The team prepared me for every step; I have been seizure-free since the operation.”',
    summary: 'A 27-year-old software engineer with weekly seizures despite triple therapy underwent comprehensive evaluation followed by resection. He is seizure-free and back to work.',
    tags: ['epilepsy', 'brain'],
  }
];

export default function MalakpetLocationPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
     { name: "Neurosurgeon in Malakpet", item: `https://www.drsayuj.info/${location.slug}` },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      {/* Hero Section */}
      <div className="mb-10 text-center md:text-left">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
          At Yashoda Hospitals, Malakpet
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Best Neurosurgeon in Malakpet, Hyderabad
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl">
          Dr. Sayuj Krishnan is a fellowship-trained neurosurgeon specializing in <strong>Endoscopic Spine Surgery</strong> and <strong>Brain Tumor Removal</strong>.
          <br className="hidden md:block" />
          Visit the advanced neurosurgery centre at Yashoda Hospitals, Malakpet for world-class care near Nalgonda X Roads.
        </p>

        <div className="mt-8">
           <LocationCTAs location={location} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          {/* Services Block */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Neurosurgery Services in Malakpet</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/services/endoscopic-spine-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Endoscopic Spine Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Stitchless "keyhole" surgery for slip disc and sciatica. Walk same day.</p>
              </Link>
              <Link href="/services/brain-tumor-surgery-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Brain Tumor Surgery</h3>
                <p className="text-sm text-gray-600 mt-2">Neuronavigation-guided removal of tumors with maximal safety.</p>
              </Link>
              <Link href="/conditions/osteoporotic-spine-fracture-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Spine Fracture & Trauma</h3>
                <p className="text-sm text-gray-600 mt-2">24x7 emergency care for spine fractures and head injuries.</p>
              </Link>
              <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="group p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <h3 className="font-semibold text-blue-900 group-hover:text-blue-700">Sciatica & Back Pain</h3>
                <p className="text-sm text-gray-600 mt-2">Comprehensive management from medication to minimally invasive options.</p>
              </Link>
            </div>
          </section>

          {/* Why Choose Block */}
          <section className="mb-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Choose Dr. Sayuj at Yashoda Malakpet?</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Advanced Technology:</strong> Equipped with 4K Endoscopes, Pentero Microscopes, and Neuronavigation.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Expertise:</strong> Fellowship-trained in Full Endoscopic Spine Surgery (Germany).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Convenient Location:</strong> Easily accessible from Dilsukhnagar, LB Nagar, Charminar, and Koti.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-gray-800"><strong>Comprehensive Care:</strong> From OPD consultation to ICU and Rehabilitation under one roof.</span>
              </li>
            </ul>
          </section>

          {/* Inline TrustProof */}
          <section className="mb-12 bg-white border-2 border-blue-100 rounded-xl p-6 shadow-sm">
             <h3 className="text-xl font-semibold text-blue-900 mb-4">Why Patients Trust Dr. Sayuj Krishnan</h3>
             <div className="space-y-3 mb-6">
                <div className="flex items-start">
                   <Link href="/about" className="flex-1 group">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                         <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">Meet Dr. Sayuj Krishnan</h4>
                            <p className="text-sm text-gray-600">9+ years experience • AO Spine Member • German training</p>
                         </div>
                         <span className="text-blue-600 ml-3">→</span>
                      </div>
                   </Link>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2 pt-2">Patient Success Stories:</h4>
                {SELECTED_STORIES.map(story => (
                   <Link key={story.id} href={`/patient-stories/${story.slug}`} className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                      <div className="flex items-start justify-between">
                         <div className="flex-1">
                            <h5 className="font-medium text-gray-900 group-hover:text-blue-700 text-sm mb-1">{story.title}</h5>
                            <p className="text-xs text-gray-600 line-clamp-2">{story.quote}</p>
                         </div>
                      </div>
                   </Link>
                ))}
             </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Patient FAQs</h2>
            <div className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-gray-200 p-4 open:bg-gray-50 transition-colors">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {q}
                    <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <LocationNAPCard location={location} />

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
             <h3 className="font-semibold text-gray-900 mb-3">OPD Timings</h3>
             <ul className="space-y-2 text-sm text-gray-700">
               <li className="flex justify-between"><span>Monday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Tuesday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Wednesday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Thursday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Friday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></li>
               <li className="pt-2 border-t mt-2 font-semibold text-red-600">Sunday: Closed</li>
             </ul>
             <p className="text-xs text-gray-500 mt-3">*Emergency services available 24x7</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Clinic Location</h3>
            <LocationMapEmbed location={location} />
            <p className="text-sm text-gray-500 mt-2 text-center">Near Nalgonda X Roads, Malakpet</p>
          </div>
        </div>
      </div>

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
