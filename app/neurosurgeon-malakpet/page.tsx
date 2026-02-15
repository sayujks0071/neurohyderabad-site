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
import CostTransparencySection from "@/src/components/CostTransparencySection";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Neurosurgeon Malakpet | Best Spine Surgeon Dilsukhnagar | Yashoda",
  description:
    "Dr. Sayuj Krishnan at Yashoda Hospital Malakpet offers Daycare Endoscopic Spine Surgery, brain tumor care, and 24/7 emergency neurosurgery. Book a visit.",
  keywords: "neurosurgeon malakpet, neurosurgeon dilsukhnagar, yashoda hospital malakpet neurosurgeon, spine surgeon malakpet, daycare spine surgery malakpet, endoscopic spine surgery malakpet, spine fracture treatment malakpet",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Neurosurgeon in Malakpet | Dr. Sayuj | Yashoda Hospitals",
    description: "Neurosurgeon at Yashoda Hospital Malakpet with endoscopic spine surgery and brain tumor expertise.",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    type: "website",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Malakpet patients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon in Malakpet | Dr. Sayuj Krishnan at Yashoda Hospital",
    description: "Expert neurosurgeon practicing at Yashoda Hospital Malakpet with endoscopic spine surgery and brain surgery expertise.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

export default function MalakpetNeurosurgeonPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const whatsappNumber = location.telephone.replace(/\D/g, '');

  const FAQ = [
    { q: "Where exactly is Dr. Sayuj's clinic in Malakpet?", a: "Dr. Sayuj Krishnan's clinic is at Room 317, OPD Block, Yashoda Hospital, Alexander Road, Malakpet, Hyderabad 500036. It's centrally located and easily accessible from all parts of Malakpet." },
    { q: "What services are available at the Malakpet clinic?", a: "Full range of neurosurgical services including endoscopic spine surgery, brain tumor surgery, trigeminal neuralgia treatment, cervical myelopathy decompression, and 24/7 emergency neurosurgical care." },
    { q: "Is parking available at Yashoda Hospital Malakpet?", a: "Yes, Yashoda Hospital has extensive on-site parking facilities with dedicated visitor parking. Valet service is also available during peak hours." },
    { q: "How do I book an appointment at the Malakpet clinic?", a: `Book instantly via WhatsApp (${location.telephone}), call directly, or use our online appointment system. Walk-in consultations are also available during OPD hours.` },
    { q: "Do you accept insurance at Yashoda Hospital Malakpet?", a: "Yes, we accept all major health insurance policies with cashless TPA approvals. Our team assists with pre-authorization and claims processing." },
  ];

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Malakpet", item: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  ];

  // Select relevant stories (Spine & Brain)
  const relevantStories = patientStories.filter(s =>
    s.tags.includes('spine') || s.tags.includes('brain')
  ).slice(0, 2);

  const MALAKPET_COSTS = [
    {
      procedure: "Neurosurgeon Consultation",
      range: "₹800 - ₹1,000",
      recovery: "Immediate",
      includes: ["Clinical Examination", "MRI Review", "Treatment Plan"]
    },
    {
      procedure: "Endoscopic Discectomy (Daycare)",
      range: "₹1,20,000 - ₹1,60,000",
      recovery: "1-2 Weeks",
      includes: ["Surgery Charges", "Consumables", "Daycare Stay"]
    },
    {
      procedure: "Spine Fixation Surgery (TLIF)",
      range: "₹2,50,000 - ₹3,50,000",
      recovery: "3-6 Weeks",
      includes: ["Implants (Screws/Cage)", "Hospital Stay (3-4 Days)", "OT Charges"]
    },
    {
      procedure: "Brain Tumor Surgery",
      range: "₹2,00,000 - ₹3,50,000",
      recovery: "2-4 Weeks",
      includes: ["Neuronavigation", "ICU Stay", "Ward Charges"]
    }
  ];

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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-100 font-semibold mb-2">
            Yashoda Hospital Malakpet · Hyderabad
          </p>
          <h1 className="text-3xl font-bold md:text-5xl leading-tight text-white">
            Dr. Sayuj Krishnan - Neurosurgeon in Malakpet <span className="opacity-80 font-light block text-2xl md:text-3xl mt-2">& Brain-Spine Specialist</span>
          </h1>
          <p className="mt-4 text-xl text-blue-50 max-w-3xl">
            Fellowship-trained Expert in <strong>Minimally Invasive Spine Surgery</strong> & <strong>Brain Tumor Removal</strong>.
            Practicing at Yashoda Hospital Malakpet with 24/7 Emergency Care.
          </p>
          <div className="mt-8">
             <LocationCTAs location={location} />
          </div>
        </div>
      </section>

      {/* Doctor Stats / At a Glance */}
      <section className="bg-blue-50 border-b border-blue-100 py-6">
        <div className="mx-auto max-w-5xl px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-blue-200/50">
              <div className="p-2">
                 <div className="text-2xl md:text-3xl font-bold text-blue-700">9+</div>
                 <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="p-2">
                 <div className="text-2xl md:text-3xl font-bold text-blue-700">1000+</div>
                 <div className="text-sm text-gray-600 font-medium">Successful Surgeries</div>
              </div>
               <div className="p-2">
                 <div className="text-2xl md:text-3xl font-bold text-blue-700">4.9/5</div>
                 <div className="text-sm text-gray-600 font-medium">Patient Rating</div>
              </div>
               <div className="p-2">
                 <div className="text-xl md:text-2xl font-bold text-blue-700">German</div>
                 <div className="text-sm text-gray-600 font-medium">Fellowship Trained</div>
              </div>
           </div>
        </div>
      </section>

      {/* Serving East Hyderabad Section */}
      <section className="bg-gray-50 py-10 border-b border-gray-200">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Serving Patients Across East Hyderabad</h2>
          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-blue-900 mb-2">Dilsukhnagar & LB Nagar</h3>
                <p className="text-sm text-gray-600">Just 5-10 mins drive via NH65. <strong>Metro Red Line:</strong> Direct access from Dilsukhnagar/LB Nagar to Malakpet Station (200m walk).</p>
             </div>
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-blue-900 mb-2">Saidabad & Santosh Nagar</h3>
                <p className="text-sm text-gray-600">Easy access via Champapet Road. 10-15 mins drive to Yashoda Malakpet OPD for spine & brain care.</p>
             </div>
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-blue-900 mb-2">Amberpet & Kachiguda</h3>
                <p className="text-sm text-gray-600">Connected via Chaderghat Bridge. 10 mins drive for emergency neurosurgery and trauma care.</p>
             </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column: Intro & Trust */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              World-Class Neurosurgical Care in Malakpet
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Residents of <strong>Malakpet, Dilsukhnagar, and LB Nagar</strong> no longer need to travel far for advanced brain and spine care.
              <strong>Dr. Sayuj Krishnan</strong> brings international expertise to the heart of Malakpet at Yashoda Hospitals, <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-600 underline font-semibold">specialising in endoscopic spine surgery with 90% same-day discharge</Link>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Using advanced <strong>Keyhole (Endoscopic) Spine Surgery</strong> techniques, Dr. Sayuj treats slip discs and sciatica without major open surgery.
              Most patients walk within hours and go home the same day. He is also a leading expert in <strong>Neuronavigation-guided Brain Tumor Surgery</strong>, ensuring maximum safety for delicate brain procedures.
            </p>
            
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3 text-lg">Why Choose Dr. Sayuj at Yashoda Malakpet?</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Fellowship Trained in Germany",
                  "Minimally Invasive Specialist",
                  "24/7 Trauma Availability",
                  "State-of-the-art ICU Backing",
                  "Advanced 4K Endoscopy Suite",
                  "Patient-First Approach"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-800 text-sm">
                    <span className="text-blue-500 mr-2 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Grid (Improved) */}
            <div className="mb-10">
               <h3 className="text-xl font-bold text-gray-900 mb-6">Specialized Services</h3>
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 mb-2">Endoscopic Spine Surgery</h4>
                     <p className="text-sm text-gray-600 mb-3">Stitchless "keyhole" surgery for Slip Disc & Sciatica. <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded">Daycare</span></p>
                     <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 mb-2">Brain Tumor Surgery</h4>
                     <p className="text-sm text-gray-600 mb-3">Safe removal of complex tumors using Neuronavigation & Microscope.</p>
                     <Link href="/services/brain-tumor-surgery-hyderabad" className="text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
                   <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 mb-2">Spine Fixation (TLIF)</h4>
                     <p className="text-sm text-gray-600 mb-3">Stabilization for Spondylolisthesis and Spine Fractures.</p>
                     <Link href="/services/spinal-fusion-surgery-hyderabad" className="text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
                   <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all bg-white group">
                     <h4 className="font-bold text-blue-900 group-hover:text-blue-700 mb-2">Emergency Neuro-Trauma</h4>
                     <p className="text-sm text-gray-600 mb-3">Immediate care for Head Injuries, EDH, SDH, and Spine Trauma.</p>
                     <Link href="/emergency-rehabilitation" className="text-blue-600 text-sm font-semibold hover:underline">Learn more →</Link>
                  </div>
               </div>
            </div>

            {/* Insurance Section (New) */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-700 p-1.5 rounded-lg mr-3">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </span>
                  Insurance & Cashless Treatment
               </h3>
               <p className="text-gray-700 mb-4 text-sm">
                  We accept all major health insurance providers and TPA services at Yashoda Hospitals Malakpet.
                  Our dedicated insurance desk assists with:
               </p>
               <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 font-medium">
                  <div className="flex items-center">✓ Star Health</div>
                  <div className="flex items-center">✓ HDFC Ergo</div>
                  <div className="flex items-center">✓ ICICI Lombard</div>
                  <div className="flex items-center">✓ Care Insurance</div>
                  <div className="flex items-center">✓ Bajaj Allianz</div>
                  <div className="flex items-center">✓ Govt. Schemes (EHS)</div>
               </div>
               <p className="text-xs text-gray-500 mt-4 border-t pt-3">
                  *Subject to policy terms and approval. Please carry your insurance card for cashless admission.
               </p>
            </div>

            {/* Daycare USP */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why Patients Prefer Daycare Spine Surgery</h3>
              <ul className="space-y-3">
                <li className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-green-500 mr-2 font-bold">✓</span>
                  <div>
                     <strong className="text-gray-900 block text-sm">Smallest Incision (6-8mm)</strong>
                     <span className="text-sm text-gray-600">No large cuts, minimal scarring.</span>
                  </div>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-green-500 mr-2 font-bold">✓</span>
                  <div>
                     <strong className="text-gray-900 block text-sm">Rapid Recovery</strong>
                     <span className="text-sm text-gray-600">Walk within 2 hours, discharge same/next day.</span>
                  </div>
                </li>
                 <li className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-green-500 mr-2 font-bold">✓</span>
                  <div>
                     <strong className="text-gray-900 block text-sm">No Muscle Cutting</strong>
                     <span className="text-sm text-gray-600">Muscles are dilated, not cut, preserving back strength.</span>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                 <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-blue-600 font-semibold hover:underline">
                    Explore Endoscopic Spine Surgery →
                 </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
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

      {/* NEW: Conditions Treated Grid */}
      <section className="bg-gray-50 py-12 border-y border-gray-100">
        <div className="mx-auto max-w-5xl px-4">
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Conditions We Treat</h2>
           <p className="text-gray-600 mb-8">Comprehensive care for common and complex neurological disorders.</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {commonConditions.map((condition, idx) => (
                  <Link key={idx} href={condition.url} className="bg-white px-4 py-3 rounded-lg border border-gray-200 flex items-center hover:border-blue-400 hover:shadow-sm transition-all group">
                      <span className="text-blue-500 mr-2 group-hover:text-blue-700">•</span>
                      <span className="font-medium text-gray-800 text-sm group-hover:text-blue-700">{condition.name}</span>
                  </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Second Opinion CTA */}
      <section className="bg-green-50 border-y border-green-100 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="text-2xl font-bold text-green-900">Advised Spine Surgery?</h2>
              <p className="mt-3 text-lg text-green-800">
                  Before you proceed, get a <strong>Second Opinion</strong> from Dr. Sayuj at Yashoda Malakpet.
                  Explore minimally invasive "Keyhole" options that may avoid open surgery.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                  <a href={`tel:${location.telephone}`} className="rounded-full bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 shadow-md transition-all">
                      Book Consultation
                  </a>
                  <a href={`https://wa.me/${whatsappNumber}?text=Hi%20Dr%20Sayuj,%20I%20am%20at%20Malakpet%20and%20need%20a%20second%20opinion`} className="rounded-full border-2 border-green-600 px-6 py-3 font-semibold text-green-700 hover:bg-green-100 transition-all">
                      WhatsApp Chat
                  </a>
              </div>
          </div>
      </section>

      <CostTransparencySection
        costs={MALAKPET_COSTS}
        disclaimer="*Approximate estimates for general ward/twin sharing at Yashoda Hospitals Malakpet. Final cost depends on room category, insurance approval, and specific implants required."
        showInsurance={true}
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
            Meet Dr. Sayuj Krishnan
          </h2>
          <div className="grid gap-8 items-center md:grid-cols-2">
             <div>
                <h3 className="mb-2 text-xl font-semibold text-blue-800">Consultant Neurosurgeon</h3>
                <p className="mb-4 text-gray-700 text-lg leading-relaxed">
                  With over <strong>9 years of experience</strong> and specialized <strong>German training</strong>,
                  Dr. Sayuj brings international standards of neurosurgical care to Malakpet. He has performed
                  over <strong>1,000 successful procedures</strong>, prioritizing patient safety and quick recovery.
                </p>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                   <h4 className="font-semibold text-blue-900 mb-3">Credentials</h4>
                   <ul className="space-y-2 text-sm text-gray-700">
                       <li className="flex items-start">
                          <span className="font-bold text-blue-600 w-24">MD</span>
                          <span>MBBS, DNB Neurosurgery (6-Year Direct Course)</span>
                       </li>
                       <li className="flex items-start">
                          <span className="font-bold text-blue-600 w-24">Fellowship</span>
                          <span>Minimally Invasive Spine Surgery</span>
                       </li>
                       <li className="flex items-start">
                          <span className="font-bold text-blue-600 w-24">Training</span>
                          <span>Full Endoscopic Spine Surgery (RIWOspine, Germany)</span>
                       </li>
                   </ul>
                </div>
             </div>
             <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                   TRUSTED EXPERT
                </div>
                <h4 className="mb-4 font-semibold text-gray-900 text-lg">Specialized Expertise</h4>
                <ul className="space-y-3 text-gray-700">
                   <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> Endoscopic Spine Surgery</li>
                   <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> Brain Tumor Microsurgery</li>
                   <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> Trigeminal Neuralgia MVD</li>
                   <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> Spinal Fixation & Trauma</li>
                   <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> Pediatric Neurosurgery</li>
                </ul>
                <div className="mt-6 border-t border-gray-100 pt-6">
                   <p className="mb-1 text-sm text-gray-500">Practicing at:</p>
                   <p className="font-bold text-blue-900 text-lg">Yashoda Hospitals, Malakpet</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">Visit Us</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
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
                      <span className="text-xs text-gray-500">Registration & Consultation fees apply.</span>
                   </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Frequently Asked Questions</h3>
               <div className="space-y-3">
                {FAQ.map(({ q, a }) => (
                    <details key={q} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm group">
                    <summary className="cursor-pointer font-semibold text-gray-800 text-sm flex justify-between items-center">
                        {q}
                        <span className="text-blue-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
                    </details>
                ))}
               </div>
            </div>
          </div>

          {/* Getting Here Section */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">How to Reach Us</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                <span className="text-2xl mr-3">🚇</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">By Metro</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Nearest Station: <strong>Malakpet Metro Station (Red Line)</strong>.<br/>
                    Just a 2-minute walk (200m) from the station exit.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                <span className="text-2xl mr-3">🚌</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">By Bus</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Alight at <strong>Nalgonda X Roads</strong> or Yashoda Hospital Bus Stop.<br/>
                    Direct buses available from Koti, Dilsukhnagar, and LB Nagar.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                <span className="text-2xl mr-3">🅿️</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Parking</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Ample parking available for patients.<br/>
                    <strong>Valet Parking</strong> service available at the main entrance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
               <h4 className="font-bold text-blue-900 mb-2 text-sm">Quick Directions</h4>
               <ul className="grid md:grid-cols-2 gap-2 text-xs text-gray-700">
                  <li><strong>From Dilsukhnagar:</strong> Take NH65 towards Koti → Nalgonda X Roads (Left) → Yashoda Hospital.</li>
                  <li><strong>From LB Nagar:</strong> Via Victoria Memorial → Chaderghat Road → Malakpet.</li>
                  <li><strong>From Kothapet:</strong> Via Dilsukhnagar Main Road → Malakpet Metro Station.</li>
                  <li><strong>From Charminar:</strong> Via Nayapul → Chaderghat Bridge → Malakpet.</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
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
