import React from "react";
import Link from "next/link";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import TrustProof from "@/app/_components/TrustProof";
import { patientStories } from "@/src/content/stories";
import { notFound } from "next/navigation";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan | Yashoda Hospitals",
  description:
    "Dr. Sayuj Krishnan is a Senior Consultant Neurosurgeon at Yashoda Hospital Malakpet. Expert in Endoscopic Spine Surgery, Brain Tumors & Trauma. Free MRI Review available.",
  keywords: "neurosurgeon malakpet, best neurosurgeon in malakpet, yashoda hospital malakpet neurosurgeon, spine surgeon malakpet, endoscopic spine surgery malakpet, spine fracture treatment malakpet, brain tumor surgery malakpet",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan | Yashoda Hospitals",
    description: "Senior Consultant Neurosurgeon at Yashoda Hospital Malakpet. Specializing in Endoscopic Spine Surgery and Brain Tumor removal. Book an appointment.",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    type: "website",
    images: [
      {
        url: "https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Best Neurosurgeon in Malakpet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Neurosurgeon in Malakpet | Dr. Sayuj Krishnan",
    description: "Expert neurosurgeon at Yashoda Hospital Malakpet. Specialist in Endoscopic Spine Surgery and Brain Surgery.",
    images: ["https://www.drsayuj.info/images/dr-sayuj-krishnan-portrait-v2.jpg"],
  },
};

export default function MalakpetNeurosurgeonPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const whatsappNumber = location.telephone.replace(/\D/g, '');

  const FAQ = [
    { q: "Where exactly is Dr. Sayuj's clinic in Malakpet?", a: "Dr. Sayuj Krishnan's clinic is located at Room 317, OPD Block, Yashoda Hospital, Alexander Road, Malakpet, Hyderabad 500036. It is a landmark hospital easily accessible from Dilsukhnagar and LB Nagar." },
    { q: "What are Dr. Sayuj's OPD timings at Yashoda Malakpet?", a: "Dr. Sayuj is available for consultation Monday to Saturday, from 10:00 AM to 4:00 PM. For emergency neuro-trauma cases, the team is available 24/7." },
    { q: "What services are available at the Malakpet clinic?", a: "Comprehensive neurosurgical care including Endoscopic Spine Surgery (Keyhole), Brain Tumor Microsurgery, Spinal Fixation, Trigeminal Neuralgia treatment, and Head Injury management." },
    { q: "Is parking available at Yashoda Hospital Malakpet?", a: "Yes, the hospital provides extensive on-site parking with valet services for patients and visitors." },
    { q: "How do I book an appointment at the Malakpet clinic?", a: `You can book instantly via WhatsApp (${location.telephone}), call our appointment line, or book online. Walk-ins are accepted but prior booking is recommended to reduce wait time.` },
    { q: "Do you accept insurance at Yashoda Hospital Malakpet?", a: "Yes, we accept all major health insurance policies (Star, HDFC, ICICI, etc.) and state government schemes (EHS) with cashless TPA approvals." },
  ];

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Malakpet", item: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  ];

  // Select relevant stories (Spine & Brain)
  const relevantStories = patientStories.filter(s =>
    s.tags.includes('spine') || s.tags.includes('brain')
  ).slice(0, 2);

  const commonConditions = [
      { name: "Sciatica & Leg Pain", url: "/conditions/sciatica-pain-treatment-hyderabad" },
      { name: "Slip Disc (Herniated Disc)", url: "/conditions/slip-disc-treatment-hyderabad" },
      { name: "Spinal Stenosis", url: "/conditions/spinal-stenosis-treatment-hyderabad" },
      { name: "Brain Tumors", url: "/services/brain-tumor-surgery-hyderabad" },
      { name: "Head Injuries (Trauma)", url: "/emergency-rehabilitation" },
      { name: "Spondylolisthesis", url: "/conditions/spondylolisthesis-treatment-hyderabad" },
      { name: "Neck Pain (Cervical Spondylosis)", url: "/conditions/cervical-radiculopathy-treatment-hyderabad" },
      { name: "Trigeminal Neuralgia", url: "/conditions/trigeminal-neuralgia-treatment-hyderabad" },
      { name: "Osteoporotic Fracture", url: "/conditions/osteoporotic-spine-fracture-hyderabad" }
  ];

  return (
    <main className="bg-white">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-16 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')]"></div>

        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="inline-block bg-blue-600/50 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1 mb-4">
             <span className="text-sm font-semibold tracking-wide text-blue-50">
               Yashoda Hospitals, Malakpet · Room 317
             </span>
          </div>

          <h1 className="text-4xl font-bold md:text-6xl leading-tight text-white mb-4">
            Best Neurosurgeon in Malakpet
            <span className="opacity-90 font-light block text-2xl md:text-4xl mt-3 text-blue-100">
              Dr. Sayuj Krishnan
            </span>
          </h1>

          <p className="mt-6 text-xl text-blue-50 max-w-3xl leading-relaxed">
            <strong>Senior Consultant Neurosurgeon</strong> specializing in <span className="text-white font-bold border-b border-blue-400">Endoscopic Spine Surgery</span> and <span className="text-white font-bold border-b border-blue-400">Brain Tumor Removal</span>.
            Providing world-class neurosurgical care at Yashoda Malakpet for over 9 years.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
             <LocationCTAs location={location} />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-100 py-8 shadow-sm relative z-20 -mt-2">
        <div className="mx-auto max-w-6xl px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
              <div className="p-2">
                 <div className="text-3xl font-bold text-blue-700">9+</div>
                 <div className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">Years Experience</div>
              </div>
              <div className="p-2">
                 <div className="text-3xl font-bold text-blue-700">1000+</div>
                 <div className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">Successful Surgeries</div>
              </div>
               <div className="p-2">
                 <div className="text-3xl font-bold text-blue-700">4.9<span className="text-lg">/5</span></div>
                 <div className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">Patient Rating</div>
              </div>
               <div className="p-2">
                 <div className="text-xl md:text-2xl font-bold text-blue-700">Germany</div>
                 <div className="text-sm text-gray-600 font-medium uppercase tracking-wide mt-1">Fellowship Trained</div>
              </div>
           </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">

          {/* Left Column: Main Content */}
          <div>
            {/* Intro Block */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  World-Class Brain & Spine Care in Malakpet
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Residents of <strong>Malakpet, Dilsukhnagar, LB Nagar, and Koti</strong> have access to advanced neurosurgical expertise right in their neighborhood.
                  As a Senior Consultant at Yashoda Hospitals, <strong>Dr. Sayuj Krishnan</strong> leads a specialized team focused on minimally invasive solutions for complex brain and spine conditions.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Whether it's a <Link href="/conditions/slip-disc-treatment-hyderabad" className="text-blue-600 font-medium hover:underline">slipped disc</Link> causing sciatica or a complex brain tumor, Dr. Sayuj utilizes state-of-the-art technology like <strong>Neuronavigation</strong> and <strong>4K Endoscopy</strong> to ensure precision and safety.
                </p>
            </div>

            {/* Second Opinion / MRI Review Block - High Priority */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>

               <div className="relative z-10">
                   <div className="flex items-center mb-4">
                       <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mr-3">Limited Offer</span>
                       <h3 className="text-xl font-bold text-blue-900">Advised Spine Surgery? Get a Free MRI Review</h3>
                   </div>
                   <p className="text-gray-700 mb-6">
                       Before you proceed with open surgery, find out if you are a candidate for <strong>Keyhole (Endoscopic) Spine Surgery</strong>.
                       Dr. Sayuj offers a complimentary MRI review for patients seeking a second opinion at Malakpet.
                   </p>
                   <div className="flex flex-wrap gap-4">
                       <a href={`https://wa.me/${whatsappNumber}?text=Hi%20Dr%20Sayuj,%20I%20want%20a%20free%20MRI%20review%20at%20Malakpet`}
                          className="flex items-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-green-700 transition">
                           <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.446-.967-.446-.495 0-.89.149-1.336.694-.446.545-1.71 1.673-1.71 4.08 0 2.406 1.758 4.734 2.006 5.08.247.347 3.46 5.29 8.381 7.42 2.95 1.278 4.075 1.026 5.567.877 1.486-.149 3.402-1.387 3.897-2.724.495-1.338.495-2.484.347-2.732l-.001.001z"/></svg>
                           WhatsApp MRI
                       </a>
                       <a href={`tel:${location.telephone}`}
                          className="flex items-center bg-white text-blue-700 font-bold py-3 px-6 rounded-lg border border-blue-200 hover:bg-blue-50 transition">
                           Call for Appointment
                       </a>
                   </div>
               </div>
            </div>

            {/* Split Services Section: Spine vs Brain */}
            <div className="mb-12">
               <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                   Center for Excellence: Spine Surgery
               </h3>
               <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 text-lg mb-2">Endoscopic Spine Surgery</h4>
                     <p className="text-sm text-gray-600 mb-3">Stitchless "keyhole" surgery for Slip Disc & Sciatica using 4K camera.</p>
                     <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-3">Daycare Procedure</span>
                     <Link href="/services/endoscopic-spine-surgery-hyderabad" className="block text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 text-lg mb-2">Spine Fixation (TLIF)</h4>
                     <p className="text-sm text-gray-600 mb-3">Advanced stabilization for Spondylolisthesis and Spine Fractures.</p>
                     <Link href="/services/spinal-fusion-surgery-hyderabad" className="block text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
               </div>

               <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                   Advanced Brain Surgery
               </h3>
               <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 text-lg mb-2">Brain Tumor Surgery</h4>
                     <p className="text-sm text-gray-600 mb-3">Microsurgical removal of complex tumors with Neuronavigation guidance.</p>
                     <Link href="/services/brain-tumor-surgery-hyderabad" className="block text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 text-lg mb-2">Neuro-Trauma & Emergency</h4>
                     <p className="text-sm text-gray-600 mb-3">24/7 Rapid response for Head Injuries, EDH, SDH, and accidents.</p>
                     <Link href="/emergency-rehabilitation" className="block text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
               </div>
            </div>

            {/* Why Choose Yashoda Malakpet Block */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-10 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Dr. Sayuj at Yashoda Malakpet?</h3>
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="ml-3">
                        <h4 className="text-md font-bold text-gray-900">Senior Consultant Expertise</h4>
                        <p className="text-sm text-gray-600">Leading the neurosurgery department with over 9 years of specialized experience.</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <div className="ml-3">
                        <h4 className="text-md font-bold text-gray-900">Advanced Technology</h4>
                        <p className="text-sm text-gray-600">Equipped with 4K Endoscopy, Neuronavigation, and CUSA for precise tumor removal.</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="ml-3">
                        <h4 className="text-md font-bold text-gray-900">24/7 Emergency Care</h4>
                        <p className="text-sm text-gray-600">Round-the-clock availability for stroke, head injury, and spine trauma.</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div className="ml-3">
                        <h4 className="text-md font-bold text-gray-900">Patient-First Approach</h4>
                        <p className="text-sm text-gray-600">Honest advice, ethical practice, and focus on non-surgical options first.</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Insurance Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-700 p-1.5 rounded-lg mr-3">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </span>
                  Insurance & Cashless Treatment
               </h3>
               <p className="text-gray-700 mb-4 text-sm">
                  We accept all major health insurance providers and TPA services at Yashoda Hospitals Malakpet.
                  Our dedicated insurance desk assists with cashless approvals.
               </p>
               <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 font-medium">
                  <div className="flex items-center">✓ Star Health</div>
                  <div className="flex items-center">✓ HDFC Ergo</div>
                  <div className="flex items-center">✓ ICICI Lombard</div>
                  <div className="flex items-center">✓ Care Insurance</div>
                  <div className="flex items-center">✓ Bajaj Allianz</div>
                  <div className="flex items-center">✓ Govt. Schemes (EHS)</div>
               </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">

            {/* Meet Doctor Profile Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="text-center mb-4">
                    <img
                      src="/images/dr-sayuj-krishnan-portrait-v2.jpg"
                      alt="Dr Sayuj Krishnan Neurosurgeon"
                      className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-blue-500"
                    />
                    <h3 className="text-lg font-bold text-gray-900">Dr. Sayuj Krishnan</h3>
                    <p className="text-blue-600 text-sm font-medium">Senior Consultant Neurosurgeon</p>
                    <p className="text-gray-500 text-xs mt-1">MBBS, DNB (Neurosurgery)</p>
                </div>
                <hr className="border-gray-100 my-4"/>
                <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex justify-between">
                        <span className="text-gray-500">Experience</span>
                        <span className="font-semibold">9+ Years</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-gray-500">Surgeries</span>
                        <span className="font-semibold">1000+</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-gray-500">Fellowship</span>
                        <span className="font-semibold text-right">Minimally Invasive Spine (Germany)</span>
                    </li>
                </ul>
                <div className="mt-6">
                    <Link href="/about" className="block w-full text-center border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                        View Full Profile
                    </Link>
                </div>
            </div>

            {/* Emergency Alert Section */}
            <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-5 shadow-sm">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-base font-bold text-red-800">24/7 Emergency</h3>
                        <p className="mt-1 text-sm text-red-700 font-medium">
                            Yashoda Hospital Malakpet
                        </p>
                        <p className="text-xs text-red-800 mt-1">Trauma • Stroke • Spine Fracture</p>
                        <a href={`tel:${location.telephone}`} className="block mt-3 text-center bg-red-600 text-white text-sm font-bold py-2 rounded shadow hover:bg-red-700 transition">
                           Call Emergency
                        </a>
                    </div>
                </div>
            </div>

            <TrustProof stories={relevantStories} className="border-blue-100 shadow-md" />

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-bold text-gray-900 mb-3">Clinic Location</h3>
                <LocationMapEmbed location={location} className="rounded-lg shadow-sm mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                   <strong>Yashoda Hospitals</strong><br/>
                   Room 317, OPD Block<br/>
                   Nalgonda X Roads, Malakpet<br/>
                   Hyderabad, Telangana 500036
                </p>
                <a href={location.directions_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-semibold hover:underline flex items-center">
                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                   Get Directions
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions Chips */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Conditions Treated</h2>
           <p className="text-gray-600 mb-6">Expert care for a wide range of neurological disorders.</p>
           <div className="flex flex-wrap gap-3">
              {commonConditions.map((condition, idx) => (
                  <Link key={idx} href={condition.url} className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-700 transition shadow-sm">
                      {condition.name}
                  </Link>
              ))}
           </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Patient Information</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <LocationNAPCard location={location} />
                
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">OPD Timings</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex justify-between"><span>Mon - Sat:</span> <span className="font-medium">10:00 AM – 4:00 PM</span></li>
                    <li className="flex justify-between text-red-600"><span>Emergency:</span> <span className="font-bold">24×7 Available</span></li>
                  </ul>
                </div>

                <div className="mt-4 border-t pt-4">
                   <h4 className="font-semibold text-gray-900 mb-2">Consultation & Payments</h4>
                   <p className="text-sm text-gray-700">
                      <strong>Accepted:</strong> Cash, Credit/Debit Cards, UPI, Insurance Cashless.<br/>
                      <span className="text-xs text-gray-500">Registration & Consultation fees apply as per hospital norms.</span>
                   </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Frequently Asked Questions</h3>
               <div className="space-y-3">
                {FAQ.map(({ q, a }) => (
                    <details key={q} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm group">
                    <summary className="cursor-pointer font-semibold text-gray-800 text-sm flex justify-between items-center list-none">
                        {q}
                        <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t pt-2 border-gray-50">{a}</p>
                    </details>
                ))}
               </div>
            </div>
          </div>

          {/* Getting Here Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">How to Reach Yashoda Hospital Malakpet</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-2xl mr-3">🚇</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">By Metro</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Nearest Station: <strong>Malakpet Metro Station (Red Line)</strong>.<br/>
                    Just a 2-minute walk (200m) from the station exit.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-2xl mr-3">🚌</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">By Bus</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Alight at <strong>Nalgonda X Roads</strong> or Yashoda Hospital Bus Stop.<br/>
                    Direct buses from Koti, Dilsukhnagar, and LB Nagar.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-2xl mr-3">🅿️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Parking</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Ample parking available within hospital premises.<br/>
                    <strong>Valet Parking</strong> available at main entrance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Book Your Appointment</h2>
          <p className="mb-8 text-blue-200 text-lg">
            Skip the waiting time. Book your slot online or via WhatsApp.
          </p>
          <div className="flex justify-center">
             <LocationCTAs location={location} />
          </div>
        </div>
      </section>

       <LocalPathways mode="location" locationId={location.id} />
    </main>
  );
}
