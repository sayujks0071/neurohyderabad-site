import React from "react";
import Link from "next/link";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import TrustProof from "@/app/_components/TrustProof";
import CostTransparencySection from "@/src/components/CostTransparencySection";
import AuthorByline from "@/app/_components/AuthorByline";
import { patientStories } from "@/src/content/stories";
import { notFound } from "next/navigation";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Best Neurosurgeon Hyderabad | Dr Sayuj | Spine & Brain Specialist",
  description:
    "Consult Dr. Sayuj, top Neurosurgeon in Hyderabad. Expert in Endoscopic Spine & Brain Tumor Surgery. 1000+ Success Stories. Book at Yashoda Malakpet.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-hyderabad" },
  openGraph: {
    title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
    description:
      "Consult Dr. Sayuj Krishnan for advanced Endoscopic Spine and Brain Surgery in Hyderabad. 9+ Years Exp, German Fellowship. Book Appointment.",
    url: "https://www.drsayuj.info/neurosurgeon-hyderabad",
    type: "website",
    images: [
      {
        url: "https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Best Neurosurgeon in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
    description:
      "Expert neurosurgeon in Hyderabad for endoscopic spine and brain tumor surgery. 1000+ successful cases.",
    images: ["https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg"],
  },
};

const FAQ = [
  {
    q: "Who is the best neurosurgeon for spine surgery in Hyderabad?",
    a: "Dr. Sayuj Krishnan is highly recommended for spine surgery in Hyderabad, specifically for Endoscopic (Keyhole) Spine Surgery. He is fellowship-trained in Germany and has performed over 1000 successful procedures with a focus on same-day discharge.",
  },
  {
    q: "Do you treat brain tumors using minimally invasive techniques?",
    a: "Yes. Dr. Sayuj specializes in Neuronavigation-guided Microsurgery and Awake Craniotomy. These advanced techniques allow for precise tumor removal through smaller openings, preserving critical brain function and speeding up recovery.",
  },
  {
    q: "Where can I consult Dr. Sayuj Krishnan in Hyderabad?",
    a: "Dr. Sayuj consults at Yashoda Hospitals, Malakpet. He serves patients from across Hyderabad including Dilsukhnagar, LB Nagar, Jubilee Hills, and Secunderabad. Online video consultations are also available for outstation patients.",
  },
  {
    q: "What is the cost of neurosurgery consultation in Hyderabad?",
    a: "The initial consultation fee is typically between ₹800 - ₹1000. For surgical procedures, we provide a transparent cost estimate after reviewing your MRI scans. We also accept all major insurance providers for cashless treatment.",
  },
  {
    q: "Is robotic spine surgery available?",
    a: "We offer Advanced Endoscopic Spine Surgery, which is often superior to robotic surgery for disc herniations as it is less invasive (7mm incision vs larger ports) and allows for direct visualization of the nerve root.",
  },
  {
    q: "How quickly can I get an appointment for a second opinion?",
    a: "We prioritize second opinion cases. You can typically get an appointment within 24-48 hours. You can also share your MRI reports via WhatsApp for a preliminary review before your visit.",
  },
  {
    q: "Do you treat Trigeminal Neuralgia?",
    a: "Yes, Dr. Sayuj is an expert in Microvascular Decompression (MVD) surgery for Trigeminal Neuralgia, offering a permanent cure for facial pain with a high success rate.",
  }
];

const HYDERABAD_COSTS = [
  {
    procedure: "Neurosurgeon Consultation",
    range: "₹800 - ₹1,000",
    recovery: "Immediate",
    includes: ["Clinical Assessment", "MRI/CT Review", "Treatment Planning"]
  },
  {
    procedure: "Endoscopic Spine Surgery",
    range: "₹1,20,000 - ₹1,60,000",
    recovery: "1-2 Days",
    includes: ["Keyhole Surgery", "Daycare Stay", "Medications"]
  },
  {
    procedure: "Brain Tumor Surgery",
    range: "₹2,50,000 - ₹4,00,000",
    recovery: "5-7 Days",
    includes: ["Neuronavigation", "ICU Stay", "Microsurgery"]
  },
  {
    procedure: "Microvascular Decompression",
    range: "₹2,00,000 - ₹3,00,000",
    recovery: "3-4 Days",
    includes: ["MVD Surgery", "Facial Pain Relief", "Hospital Stay"]
  }
];

export default function HyderabadNeurosurgeonPage() {
  const location = getLocationById("hyderabad");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Hyderabad", item: "https://www.drsayuj.info/neurosurgeon-hyderabad" },
  ];

  // Select relevant stories (Mix of Brain & Spine)
  const relevantStories = patientStories.slice(0, 3);

  return (
    <main className="bg-white">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-600/30 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                <span className="text-blue-100 text-sm font-semibold tracking-wide uppercase">
                  Hyderabad's Trusted Neurosurgeon
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Advanced Brain & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Spine Care
                </span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
                <strong>Dr. Sayuj Krishnan</strong> brings <strong>German-trained expertise</strong> to Hyderabad.
                Specializing in minimally invasive <strong>Endoscopic Spine Surgery</strong> and
                <strong> Complex Brain Tumor</strong> removal with a focus on safety and rapid recovery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <LocationCTAs location={location} />
              </div>

          <h2 className="text-2xl font-semibold">OPD Timings & Location</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Yashoda Hospitals – Malakpet, Hyderabad</li>
            <li>OPD: Mon–Sat, 10:00–16:00 (IST) • By appointment</li>
            <li>Emergency: 24×7 via hospital triage</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Conditions & Procedures</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Endoscopic cervical & lumbar discectomy, foraminotomy, ULBD</li>
            <li>Cervical/lumbar radiculopathy, <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="text-blue-600 hover:underline">Sciatica Treatment</Link>, spinal stenosis, disc herniation</li>
            <li>Trigeminal neuralgia (MVD), epilepsy surgery pathways</li>
            <li><Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 hover:underline">Advanced Brain Tumor Surgery</Link> (Neuronavigation)</li>
          </ul>
        </div>
        </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
         <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
               <div>
                  <div className="text-3xl font-bold text-blue-600">MBBS, DNB</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Neurosurgery (6 Yrs)</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-blue-600">Fellowship</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Endoscopic Spine (Germany)</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-blue-600">AO Spine</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Global Member</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-blue-600">4.9/5</div>
                  <div className="text-sm text-gray-500 font-medium mt-1">Patient Rating</div>
               </div>
            </div>
         </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1fr_350px] gap-12">

           {/* Left Column */}
           <div>
              <AuthorByline publishedOn="2024-01-15" updatedOn="2025-05-20" className="mb-8" />

              <h2 className="text-3xl font-bold text-gray-900 mb-6"> Comprehensive Neurosurgical Care in Hyderabad</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                 As a Consultant Neurosurgeon at Yashoda Hospitals, Dr. Sayuj Krishnan is dedicated to providing
                 world-class care for complex brain and spine conditions. His approach combines
                 <strong> international surgical standards</strong> with a patient-first philosophy, ensuring that
                 every patient receives a personalized treatment plan—whether it involves advanced surgery or conservative management.
              </p>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                 <Link href="/services/endoscopic-spine-surgery-hyderabad" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                       <span className="text-2xl">🦴</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">Endoscopic Spine Surgery</h3>
                    <p className="text-sm text-gray-600">Minimally invasive "Keyhole" surgery for slip disc and sciatica. Walk same day.</p>
                 </Link>

                 <Link href="/services/brain-tumor-surgery-hyderabad" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                       <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">Brain Tumor Surgery</h3>
                    <p className="text-sm text-gray-600">Neuronavigation-guided precision removal of complex brain tumors.</p>
                 </Link>

                 <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                       <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">Sciatica Treatment</h3>
                    <p className="text-sm text-gray-600">Non-surgical nerve blocks and therapy for severe leg pain.</p>
                 </Link>

                 <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                       <span className="text-2xl">😖</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">Trigeminal Neuralgia</h3>
                    <p className="text-sm text-gray-600">Expert Microvascular Decompression (MVD) for facial pain relief.</p>
                 </Link>
              </div>

              {/* Red Flags / Emergency Section */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8 mb-12">
                 <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                    <span className="mr-2">🚨</span> When to See a Neurosurgeon Immediately
                 </h2>
                 <p className="text-gray-800 mb-6">
                    Some neurological symptoms require urgent attention. Do not delay if you experience:
                 </p>
                 <ul className="grid md:grid-cols-2 gap-4">
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-red-50 flex items-start">
                       <span className="text-red-500 font-bold mr-2">!</span>
                       <span className="text-sm text-gray-700">Sudden, severe "thunderclap" headache</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-red-50 flex items-start">
                       <span className="text-red-500 font-bold mr-2">!</span>
                       <span className="text-sm text-gray-700">Loss of bowel or bladder control</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-red-50 flex items-start">
                       <span className="text-red-500 font-bold mr-2">!</span>
                       <span className="text-sm text-gray-700">Sudden weakness in arm or leg</span>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow-sm border border-red-50 flex items-start">
                       <span className="text-red-500 font-bold mr-2">!</span>
                       <span className="text-sm text-gray-700">New onset of seizures (fits)</span>
                    </li>
                 </ul>
                 <div className="mt-6 text-center">
                    <a href={`tel:${location.telephone}`} className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-colors">
                       Call Emergency: {location.telephone}
                    </a>
                 </div>
              </div>

              {/* Trust Section */}
              <div className="mb-12">
                 <TrustProof stories={relevantStories} className="border-blue-200 shadow-md" />
              </div>

              {/* Cost Transparency */}
              <CostTransparencySection
                 costs={HYDERABAD_COSTS}
                 showInsurance={true}
                 disclaimer="Costs are estimates for general ward at Yashoda Hospitals. Final pricing depends on room category and medical complexity."
              />

              {/* Locations Grid */}
              <div className="mb-12">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Serving Patients Across Hyderabad</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Link href="/locations/neurosurgeon-malakpet" className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium text-gray-700 border border-gray-100">
                       Malakpet
                    </Link>
                    <Link href="/locations/neurosurgeon-dilsukhnagar" className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium text-gray-700 border border-gray-100">
                       Dilsukhnagar
                    </Link>
                    <Link href="/locations/neurosurgeon-hitech-city" className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium text-gray-700 border border-gray-100">
                       Hitech City
                    </Link>
                    <Link href="/locations/neurosurgeon-jubilee-hills" className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium text-gray-700 border border-gray-100">
                       Jubilee Hills
                    </Link>
                    <Link href="/locations/neurosurgeon-secunderabad" className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium text-gray-700 border border-gray-100">
                       Secunderabad
                    </Link>
                    <Link href="/locations/neurosurgeon-gachibowli" className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-center font-medium text-gray-700 border border-gray-100">
                       Gachibowli
                    </Link>
                 </div>
              </div>

              {/* FAQs */}
              <div className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                 <div className="space-y-4">
                    {FAQ.map(({ q, a }, index) => (
                       <details key={index} className="group bg-white border border-gray-200 rounded-xl p-4 shadow-sm open:border-blue-300 open:ring-1 open:ring-blue-100">
                          <summary className="font-semibold text-gray-900 cursor-pointer flex justify-between items-center">
                             {q}
                             <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                          </summary>
                          <p className="mt-3 text-gray-700 leading-relaxed text-sm pl-1">{a}</p>
                       </details>
                    ))}
                 </div>
              </div>

           </div>

           {/* Right Sidebar */}
           <div className="space-y-8">
              {/* Sticky Card */}
              <div className="sticky top-24 space-y-6">
                 <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Book Appointment</h3>
                    <LocationNAPCard location={location} className="mb-4 shadow-none border-0 bg-gray-50 p-4" />

                    <div className="space-y-3">
                       <a href={`tel:${location.telephone}`} className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                          Call Now
                       </a>
                       <a href={`https://wa.me/919778280044?text=Hi%20Dr%20Sayuj,%20I%20need%20an%20appointment`} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                          <span>WhatsApp</span>
                       </a>
                    </div>
                 </div>

                 <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-900 mb-3">Clinic Location</h3>
                    <LocationMapEmbed location={location} className="rounded-xl shadow-sm h-48 mb-3" />
                    <p className="text-xs text-center text-gray-500">
                       Yashoda Hospitals, Malakpet<br/>Hyderabad, Telangana
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}