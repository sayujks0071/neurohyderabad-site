import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from '@/components/SmartImage';
// import { HeroCTA } from "../../src/components/Experiments";
// import SocialProofBand from "../../src/components/Experiments/SocialProofBand";
import { analytics } from "../../src/lib/analytics";
import ScrollDepthTracker from "../../src/components/ScrollDepthTracker";

export const metadata: Metadata = {
  title: "Best Neurosurgeon in Hyderabad 2025 | Dr. Sayuj Krishnan",
  description: "German-trained neurosurgeon at Yashoda Hospital, Malakpet. 1,000+ endoscopic brain & spine surgeries, 4.9★ rating, insurance-friendly same-day discharge.",
  keywords: [
    "best neurosurgeon in hyderabad",
    "best spine surgeon hyderabad",
    "yashoda hospital neurosurgeon",
    "malakpet neurosurgeon",
    "endoscopic spine surgeon hyderabad",
    "brain tumor surgeon hyderabad",
    "awake brain surgery hyderabad"
  ],
  alternates: {
    canonical: `${SITE_URL}/best-neurosurgeon-in-hyderabad/`,
    languages: {
      'en-IN': `${SITE_URL}/best-neurosurgeon-in-hyderabad/`,
      'x-default': `${SITE_URL}/best-neurosurgeon-in-hyderabad/`
    }
  },
  openGraph: {
    title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan, German-Trained Spine & Brain Surgeon",
    description: "Trusted 4.9★ neurosurgeon with 1,000+ endoscopic spine/brain procedures and fast recovery protocols at Yashoda Hospital, Malakpet.",
    url: `${SITE_URL}/best-neurosurgeon-in-hyderabad/`,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Best Neurosurgeon in Hyderabad")}&subtitle=${encodeURIComponent("German-trained brain & spine surgeon at Yashoda Hospital")}`,
        width: 1200,
        height: 630,
        alt: "Best Neurosurgeon in Hyderabad — Dr. Sayuj Krishnan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
    description: "German-trained, 1,000+ endoscopic brain & spine surgeries with 4.9★ patient rating at Yashoda Hospital, Malakpet.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Best Neurosurgeon in Hyderabad")}&subtitle=${encodeURIComponent("German-trained brain & spine surgeon at Yashoda Hospital")}`,
        alt: "Best Neurosurgeon in Hyderabad — Dr. Sayuj Krishnan",
      },
    ],
  },
};

export const revalidate = 86400; // ISR: Revalidate every 24 hours

export default function BestNeurosurgeonPage() {
  // Track page view
  if (typeof window !== 'undefined') {
    analytics.pageView('/best-neurosurgeon-in-hyderabad/', 'landing', 'neurosurgery');
  }

  const heroImageUrl = 'https://images.unsplash.com/photo-1624297463486-356c388adb22?auto=format&fit=crop&w=900&q=80';

  return (
    <>
      <ScrollDepthTracker pageSlug="/best-neurosurgeon-in-hyderabad/" />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Best Neurosurgeon in Hyderabad — Evidence-Based Brain & Spine Care
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Dr. Sayuj Krishnan — Leading Expert in Minimally Invasive Neurosurgery
                <br />
                Specializing in Endoscopic Spine Surgery, Brain Tumor Surgery & Epilepsy Treatment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/appointments" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Book Consultation
                </Link>
                <Link 
                  href="/services" 
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Social Proof Section */}
        <section className="bg-gray-50 border-t border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden>🏥</span>
                <span>Yashoda Hospital Affiliation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden>🎓</span>
                <span>9+ Years Neurosurgical Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden>🔬</span>
                <span>Neuronavigation & Intraoperative Monitoring</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Choosing the Right Neurosurgeon
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                Choosing a neurosurgeon is a big decision. You want a specialist who explains options clearly, 
                prioritizes safety, and works with a multidisciplinary team. Dr. Sayuj Krishnan focuses on 
                minimally invasive and endoscopic techniques when appropriate, and always starts with a 
                conservative-first approach if that's safest for your condition.
              </p>
            </div>
          </div>
        </section>

        {/* Why Patients Choose Dr. Sayuj */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Why Patients Choose Dr. Sayuj
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Advanced Training</h3>
                    <p className="text-gray-700">
                      Minimally Invasive and Advanced Spine Surgery; observer-ship in Full Endoscopic Spine Surgery (Germany)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">9+ Years Experience</h3>
                    <p className="text-gray-700">
                      Across brain and spine procedures with a focus on patient safety and optimal outcomes
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Safety-First Decisions</h3>
                    <p className="text-gray-700">
                      Guided by MRI and clinical exam with clear recovery timelines and return-to-work plans
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">Multidisciplinary Care</h3>
                    <p className="text-gray-700">
                      Coordination with neurology, oncology, radiology, and physiotherapy for comprehensive treatment
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <SmartImage
                  src={heroImageUrl}
                  width={900}
                  height={900}
                  className="w-full max-w-md rounded-lg shadow-xl"
                  alt="Dr Sayuj Krishnan consulting a patient in Hyderabad"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Specialized Areas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic/MISS Spine Surgery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Discectomy for herniated discs</li>
                  <li>• Foraminotomy for nerve compression</li>
                  <li>• ULBD (lumbar stenosis decompression)</li>
                  <li>• Cervical radiculopathy/myelopathy pathways</li>
                </ul>
                <Link href="/services/minimally-invasive-spine-surgery/" className="text-blue-600 hover:underline mt-3 block">
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Brain Tumor Surgery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Neuronavigation-guided microsurgery</li>
                  <li>• Neuromonitoring for safety</li>
                  <li>• Awake craniotomy when needed</li>
                  <li>• Multidisciplinary tumor board coordination</li>
                </ul>
                <Link href="/services/brain-tumor-surgery-hyderabad/" className="text-blue-600 hover:underline mt-3 block">
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Trigeminal Neuralgia</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Medical therapy (first-line treatment)</li>
                  <li>• Microvascular decompression (MVD)</li>
                  <li>• Radiosurgery options</li>
                  <li>• Percutaneous procedures</li>
                </ul>
                <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="text-blue-600 hover:underline mt-3 block">
                  Learn More →
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Epilepsy Surgery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Comprehensive evaluation</li>
                  <li>• Laser interstitial thermal therapy (LITT)</li>
                  <li>• Resection surgery</li>
                  <li>• Vagus nerve stimulation (VNS)</li>
                </ul>
                <Link href="/services/epilepsy-surgery-hyderabad/" className="text-blue-600 hover:underline mt-3 block">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              How We Decide the Safest Approach
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700">Careful Clinical Exam and MRI Review</h3>
                  <p className="text-gray-700">Thorough assessment of your condition, symptoms, and imaging to understand the full picture.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700">Conservative-First Approach</h3>
                  <p className="text-gray-700">Medicines, physiotherapy, posture/ergonomics when appropriate and safe for your condition.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700">Interventional Options</h3>
                  <p className="text-gray-700">Only if function remains limited or neurological deficits progress despite conservative care.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                <div>
                  <h3 className="font-semibold text-lg text-blue-700">Technique Tailored to Your Anatomy</h3>
                  <p className="text-gray-700">Endoscopic, microscopic, or fusion as needed for the safest and most effective outcome.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Recovery and Return to Work
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6">
                <strong>Typical ranges (individualized for each patient):</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-700 mb-3">Early Recovery</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Day 0:</strong> Early walking for most MISS/endoscopic procedures</li>
                    <li>• <strong>Week 1:</strong> Light home activity; wound care</li>
                    <li>• <strong>Weeks 2–4:</strong> Desk work restart with micro-breaks</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-3">Progressive Recovery</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Weeks 4–8:</strong> Progressive activity; graded return for manual roles</li>
                    <li>• <strong>Guided rehab:</strong> Begins after review and assessment</li>
                    <li>• <strong>Red flags:</strong> Fever, worsening weakness, wound drainage</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Important:</strong> Contact the clinic immediately if you experience fever, 
                  worsening weakness, or wound drainage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Costs and Insurance */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Costs and Insurance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Insurance Coverage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Many indicated procedures are covered after pre-authorization</li>
                  <li>• Day-care options may reduce costs for selected endoscopic procedures</li>
                  <li>• We provide a written estimate after your evaluation and policy review</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Transparent Pricing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Clear cost breakdown before any procedure</li>
                  <li>• No hidden fees or surprise charges</li>
                  <li>• Flexible payment options available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Served */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              Locations Served
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Patients visit from Malakpet, Koti, Charminar, Himayat Nagar, Banjara Hills, 
              Hitech City, Gachibowli, LB Nagar, and Secunderabad. We streamline 
              pre-authorization and MRI review to minimize extra visits.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg text-blue-600 font-medium">
              <span>Malakpet</span>
              <span>•</span>
              <span>Banjara Hills</span>
              <span>•</span>
              <span>Hi-Tech City</span>
              <span>•</span>
              <span>Gachibowli</span>
              <span>•</span>
              <span>Secunderabad</span>
            </div>
          </div>
        </section>

        {/* How to Book */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              How to Book a Consultation in Hyderabad
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
                <div className="text-sm font-semibold text-blue-700 mb-2">Step 1</div>
                <h3 id="step-share-imaging" className="text-xl font-semibold text-blue-800 mb-3">
                  Share Imaging & Symptoms
                </h3>
                <p className="text-gray-700">
                  Upload your MRI/CT and a short symptom summary to neurospinehyd@drsayuj.com or WhatsApp. 
                  This helps confirm if an endoscopic or conservative path is safest.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
                <div className="text-sm font-semibold text-blue-700 mb-2">Step 2</div>
                <h3 id="step-pick-slot" className="text-xl font-semibold text-blue-800 mb-3">
                  Pick a Same-Week Slot
                </h3>
                <p className="text-gray-700">
                  The coordination team offers the earliest clinic or video slot (often same-day for nerve pain). 
                  Insurance pre-auth starts as soon as you confirm.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
                <div className="text-sm font-semibold text-blue-700 mb-2">Step 3</div>
                <h3 id="step-visit-clinic" className="text-xl font-semibold text-blue-800 mb-3">
                  Visit Yashoda, Malakpet
                </h3>
                <p className="text-gray-700">
                  Bring your ID, insurance card, and medication list. We finalize the plan in-clinic and share a 
                  written recovery roadmap with red-flag warnings.
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">
              Outstation patients can opt for teleconsultation with airport pickup support when surgery is advised.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Is endoscopic always better than open surgery?</h3>
                <p className="text-gray-700">
                  No. We choose the approach that safely achieves full decompression for your anatomy and goals. 
                  Each case is evaluated individually to determine the safest and most effective technique.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Can I get a second opinion?</h3>
                <p className="text-gray-700">
                  Yes. Bring your MRI and reports; we'll review options and timelines. 
                  We encourage informed decision-making and are happy to provide second opinions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Are older patients candidates for MISS?</h3>
                <p className="text-gray-700">
                  Many are—with careful selection, medical optimization, and clear recovery planning. 
                  Age alone is not a barrier; overall health and specific condition determine candidacy.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">How do I choose the best neurosurgeon in Hyderabad?</h3>
                <p className="text-gray-700">
                  Look for fellowship training, high endoscopic case volumes, navigation/ICU support, transparent outcomes, 
                  and clear recovery plans. Dr. Sayuj practices at Yashoda Hospital, Malakpet with these safeguards in place.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">What does minimally invasive spine surgery cost in Hyderabad?</h3>
                <p className="text-gray-700">
                  Endoscopic discectomy packages are typically ₹95,000–1,35,000 including surgeon fees, OT, implants, and follow-ups. 
                  Cashless insurance approval often reduces out-of-pocket expenses by 12–18% once pre-authorization is cleared.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-800 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              Book a Consultation
            </h2>
            <p className="text-xl mb-8">
              Book a consultation at Yashoda Hospitals – Malakpet. Bring your MRI and medication list 
              for a safe, stepwise plan.
            </p>
            <Link 
              href="/appointments" 
              className="bg-white text-blue-800 hover:bg-blue-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors inline-block"
            >
              Book Consultation
            </Link>
          </div>
        </section>

        {/* References */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8">References & Sources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-3">Medical Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <a href="https://www.aans.org/patients/conditions-and-treatments" target="_blank" rel="noopener" className="text-blue-600 hover:underline">AANS — Conditions and Treatments</a></li>
                  <li>• <a href="https://www.ninds.nih.gov/health-information/disorders" target="_blank" rel="noopener" className="text-blue-600 hover:underline">NINDS — Neurological Disorders</a></li>
                  <li>• <a href="https://www.nhs.uk/conditions/brain-tumours/treatment/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">NHS — Brain Tumor Treatment</a></li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-3">Research & Evidence</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <a href="https://www.mayoclinic.org/diseases-conditions/trigeminal-neuralgia" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Mayo Clinic — Trigeminal Neuralgia</a></li>
                  <li>• <a href="https://www.epilepsy.com/treatment/surgery" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Epilepsy Foundation — Surgery</a></li>
                  <li>• <a href="https://www.cancer.gov/types/brain/patient/brain-treatment-pdq" target="_blank" rel="noopener" className="text-blue-600 hover:underline">NCI — Brain Tumor Treatment</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> Educational content only; treatment decisions are individualized 
              after clinical evaluation and imaging review. Outcomes vary; no guarantees.
            </p>
          </div>
        </section>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["WebPage", "MedicalWebPage"],
                "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#webpage`,
                "url": `${SITE_URL}/best-neurosurgeon-in-hyderabad/`,
                "name": "Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan",
                "description": "Looking for the best neurosurgeon in Hyderabad? Dr. Sayuj Krishnan offers endoscopic spine surgery, brain tumor surgery, trigeminal neuralgia and epilepsy care. Safety-first, evidence-based treatment.",
                "speakable": {
                  "@type": "SpeakableSpecification",
                  "cssSelector": ["header h1", "header p"]
                },
                "isPartOf": { "@id": `${SITE_URL}/#website` },
                "primaryImageOfPage": {
                  "@type": "ImageObject",
                  "url": heroImageUrl,
                  "width": 900,
                  "height": 900
                },
                "inLanguage": "en-IN",
                "reviewedBy": { "@id": `${SITE_URL}/#physician` },
                "datePublished": "2023-01-01T00:00:00+05:30",
                "dateModified": new Date().toISOString(),
                "breadcrumb": { "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#breadcrumb` },
                "mainEntity": { "@id": `${SITE_URL}/#physician` },
                "about": [
                  { "@type": "MedicalSpecialty", "name": "Neurosurgery" },
                  { "@type": "MedicalProcedure", "name": "Endoscopic Spine Surgery" },
                  { "@type": "MedicalCondition", "name": "Brain Tumor" }
                ],
                "potentialAction": {
                  "@type": "ReserveAction",
                  "target": `${SITE_URL}/appointments`
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": SITE_URL
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Best Neurosurgeon in Hyderabad",
                    "item": `${SITE_URL}/best-neurosurgeon-in-hyderabad/`
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#faq`,
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is endoscopic always better than open surgery?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. We choose the approach that safely achieves full decompression for your anatomy and goals. Each case is evaluated individually to determine the safest and most effective technique."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I get a second opinion?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Bring your MRI and reports; we'll review options and timelines. We encourage informed decision-making and are happy to provide second opinions."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Are older patients candidates for MISS?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Many are—with careful selection, medical optimization, and clear recovery planning. Age alone is not a barrier; overall health and specific condition determine candidacy."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I choose the best neurosurgeon in Hyderabad?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Look for fellowship training, high endoscopic case volumes, navigation/ICU support, transparent outcomes, and clear recovery plans. Dr. Sayuj practices at Yashoda Hospital, Malakpet with these safeguards in place."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What does minimally invasive spine surgery cost in Hyderabad?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Endoscopic discectomy packages are typically ₹95,000–1,35,000 including surgeon fees, OT, implants, and follow-ups. Cashless insurance approval often reduces out-of-pocket expenses by 12–18% once pre-authorization is cleared."
                    }
                  }
                ]
              },
              {
                "@type": "HowTo",
                "@id": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#how-to-book`,
                "name": "How to book a consultation with Dr. Sayuj in Hyderabad",
                "description": "Three quick steps to schedule an in-clinic or teleconsultation at Yashoda Hospital, Malakpet.",
                "totalTime": "PT24H",
                "supply": [
                  { "@type": "HowToSupply", "name": "MRI/CT scans and reports" },
                  { "@type": "HowToSupply", "name": "Medication list and ID proof" }
                ],
                "tool": [
                  { "@type": "HowToTool", "name": "Secure video or WhatsApp link for imaging review" }
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Share imaging & symptoms",
                    "url": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#step-share-imaging`,
                    "text": "Upload MRI/CT and a short symptom summary to neurospinehyd@drsayuj.com or WhatsApp to confirm eligibility for an endoscopic or conservative path."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Pick a same-week slot",
                    "url": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#step-pick-slot`,
                    "text": "Coordination team schedules the earliest clinic or video slot—often same-day for nerve pain—and starts insurance pre-authorization."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Visit Yashoda, Malakpet",
                    "url": `${SITE_URL}/best-neurosurgeon-in-hyderabad/#step-visit-clinic`,
                    "text": "Bring your ID, insurance card, and medication list. The final plan and recovery roadmap are shared in writing after consultation."
                  }
                ],
                "performer": { "@id": `${SITE_URL}/#physician` },
                "areaServed": {
                  "@type": "City",
                  "name": "Hyderabad",
                  "containedInPlace": { "@type": "State", "name": "Telangana" }
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
