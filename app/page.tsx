import Link from "next/link";
import ExpandedFAQ from "../src/components/ExpandedFAQ";
import PatientEducationVideos from "./_components/PatientEducationVideos";
import RecoveryTimeline from "./_components/RecoveryTimeline";
import LocalReputationPanel from "./_components/LocalReputationPanel";
import FAQStructuredData from "./_components/FAQPageSchema";
import { SITE_URL } from "../src/lib/seo";
// Temporarily commenting out problematic imports
// import BreadcrumbSchema from "./components/schemas/BreadcrumbSchema";
// import { HeroCTA, StickyCTA } from "../src/components/Experiments";
// import SocialProofBand from "../src/components/Experiments/SocialProofBand";
// import ScrollDepthTracker from "../src/components/ScrollDepthTracker";
// import SEODashboard from "../src/components/SEODashboard";
// import SEOAuditDashboard from "../src/components/SEOAuditDashboard";
// import GoogleOAuth from "../src/components/GoogleOAuth";
// import { analytics } from "../src/lib/analytics";
import DoctorCard from "./_components/DoctorCard";
import TrustSignals from "./_components/TrustSignals";

export const metadata = {
  title: 'Best Neurosurgeon in Hyderabad | Dr. Sayuj Krishnan | Brain & Spine Surgery',
  description: 'Dr. Sayuj Krishnan is the best neurosurgeon in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. Same-day discharge available at Yashoda Hospital Malakpet. Book consultation now.',
  keywords: [
    'best neurosurgeon hyderabad',
    'dr sayuj krishnan',
    'endoscopic spine surgery hyderabad',
    'brain tumor surgery hyderabad',
    'minimally invasive spine surgery',
    'yashoda hospital malakpet',
    'spine specialist hyderabad',
    'brain surgeon hyderabad'
  ],
  alternates: {
    canonical: 'https://www.drsayuj.info/',
    languages: {
      'en-IN': 'https://www.drsayuj.info/',
      'x-default': 'https://www.drsayuj.info/'
    }
  },
  openGraph: {
    title: 'Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine Surgery',
    description: 'Expert neurosurgeon Dr. Sayuj Krishnan in Hyderabad specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. Same-day discharge available.',
    images: [
      {
        url: 'https://www.drsayuj.info/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Sayuj Krishnan - Best Neurosurgeon in Hyderabad'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad',
    description: 'Expert neurosurgeon specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures in Hyderabad.'
  }
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const HOME_FAQS = [
  {
    question: "How do I know if I'm a candidate for endoscopic spine surgery?",
    answer: [
      "Candidates usually have leg-dominant pain from a herniated disc or lumbar stenosis that has not responded to six weeks of supervised physiotherapy and medication.",
      "During consultation we review MRI scans, complete a focused neurological exam, and discuss work or sport demands before confirming the suitability of an endoscopic approach."
    ].join("\n"),
    category: "Procedures",
    emphasis: "80% of MISS patients walk out on the same day"
  },
  {
    question: "What recovery milestones should I expect after minimally invasive surgery?",
    answer: [
      "Day 0: walk within three hours with physiotherapy support. Week 2: return to desk work once wound inspection is clear.",
      "We schedule tele-follow ups at 48 hours, seven days, and 30 days, and the eight-week recovery roadmap below outlines each phase in detail."
    ].join("\n"),
    category: "Recovery",
    emphasis: "Structured 8-week rehabilitation with tele-support"
  },
  {
    question: "How much does minimally invasive spine surgery cost with insurance?",
    answer: [
      "Endoscopic discectomy packages typically range from INR 95,000 to 1,35,000 for self-pay patients including surgeon fees, OT charges, implants, and follow-up visits.",
      "Cashless insurance approvals reduce out-of-pocket expense by roughly 12–18% once pre-authorisation is cleared. Contact us for a personalized quote based on your specific procedure and insurance coverage."
    ].join("\n"),
    category: "Costs & Insurance"
  },
  {
    question: "What documents do you provide for insurance or corporate approvals?",
    answer: [
      "Our coordination team issues a detailed medical estimate, necessity letter, implant invoice, and operative summary aligned to TPA requirements.",
      "Corporate employees also receive stamped medical leave summaries and fit-to-work certificates tailored to HR policies."
    ].join("\n"),
    category: "Costs & Insurance"
  },
  {
    question: "Do you offer teleconsultations for patients outside Hyderabad?",
    answer: [
      "Yes. We provide secure video consultations for second opinions and post-operative reviews—share MRI scans via our encrypted portal or WhatsApp before the call.",
      "International patients receive assistance with itinerary planning, visa documentation, and extended follow-up scheduling."
    ].join("\n"),
    category: "Access & Logistics"
  },
  {
    question: "When can I travel or return to the gym after surgery?",
    answer: [
      "Short domestic travel is generally safe after 7–10 days once pain is controlled and the wound has healed.",
      "Gym and strength training resume after week six with progressive loading, while high-impact sports restart after clearance during the week-eight review."
    ].join("\n"),
    category: "Recovery"
  },
  {
    question: "How do you manage pain after endoscopic procedures?",
    answer: [
      "We combine regional anaesthesia, targeted oral medication, and physiotherapy-led movement drills to keep discomfort below three on ten.",
      "Patients receive breathing routines, cold-therapy guidance, and mindfulness resources with a 24/7 helpline for escalations."
    ].join("\n"),
    category: "Comfort & Support"
  },
  {
    question: "Can I get a second opinion using my existing MRI scans?",
    answer: [
      "Absolutely. Upload your DICOM files to our portal or bring the CD to clinic—we review images during consult and explain every treatment path in plain language.",
      "You leave with a written care summary covering conservative care, surgical options, and red-flag symptoms that require urgent attention."
    ].join("\n"),
    category: "Access & Logistics"
  }
];

export default function Home() {

  return (
    <>
      {/* <ScrollDepthTracker pageSlug="/" /> */}
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Dr. Sayuj Krishnan — Best Neurosurgeon in Hyderabad | Brain & Spine Surgery Expert
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  Dr Sayuj Krishnan — Leading Expert in Minimally Invasive Neurosurgery
                  <br />
                  Specializing in Endoscopic Spine Surgery, Brain Tumor Surgery & Epilepsy Treatment
                </p>
                {/* <HeroCTA /> */}
                <div className="space-y-4">
                  <Link 
                    href="/appointments" 
                    className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                  >
                    Book Consultation
                  </Link>
                  <a 
                    href="tel:+919778280044" 
                    className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors inline-block ml-4"
                  >
                    Call Now: +91 97782 80044
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <DoctorCard />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Social Proof Section */}
      {/* <SocialProofBand /> */}

      {/* Trust Signals */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <TrustSignals />
          </div>
        </div>
      </section>

      <PatientEducationVideos />

      {/* Minimally Invasive Spine Surgery (MISS) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Endoscopic Spine Surgery & Minimally Invasive Procedures (MISS)</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <div className="mb-6">
                    <div className="w-full h-64 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏥</div>
                        <h3 className="text-xl font-semibold text-blue-800">Minimally Invasive Spine Surgery</h3>
                        <p className="text-blue-600">Endoscopic Discectomy Technique</p>
                      </div>
                    </div>
                  </div>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj Krishnan uses advanced minimally invasive spine surgery techniques. 
                  These methods help patients recover faster with less pain and smaller scars.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Endoscopic Discectomy:</strong> Tiny 6-8mm incision for slip disc treatment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Spinal Stenosis Decompression:</strong> Relief for leg pain and numbness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Same-day Discharge:</strong> Most patients go home the same day</span>
          </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Faster Recovery:</strong> Return to work in 1-3 weeks for desk jobs</span>
          </li>
                </ul>
                <div className="mt-8">
                  <Link 
                    href="/services/minimally-invasive-spine-surgery"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Learn More About MISS →
                  </Link>
                  <div className="mt-4">
                    <Link href="/conditions/slip-disc-treatment-hyderabad/" className="text-blue-600 hover:underline mr-4">Slip Disc Treatment</Link>
                    <Link href="/conditions/spinal-stenosis-treatment-hyderabad/" className="text-blue-600 hover:underline">Spinal Stenosis</Link>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Who Benefits from MISS?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <Link href="/conditions/slip-disc-treatment-hyderabad/" className="text-blue-600 hover:underline">Patients with herniated discs (slip disc)</Link></li>
                  <li>• <Link href="/conditions/spinal-stenosis-treatment-hyderabad/" className="text-blue-600 hover:underline">Spinal stenosis causing leg pain</Link></li>
                  <li>• <Link href="/conditions/sciatica-treatment-hyderabad/" className="text-blue-600 hover:underline">Sciatica not improving with conservative treatment</Link></li>
                  <li>• Recurrent disc herniations</li>
                  <li>• Foraminal stenosis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brain Tumor Surgery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Brain Tumor Surgery</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="mb-6">
                    <div className="w-full h-64 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🧠</div>
                        <h3 className="text-xl font-semibold text-green-800">Brain Tumor Surgery</h3>
                        <p className="text-green-600">Microsurgical Techniques</p>
                      </div>
                    </div>
                  </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Advanced Microsurgical Techniques</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Neuronavigation:</strong> Precise tumor localization and removal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Intraoperative Monitoring:</strong> Real-time brain function protection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Awake Craniotomy:</strong> For tumors near speech/motor areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span><strong>Minimal Access:</strong> Smaller incisions, faster recovery</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj Krishnan performs advanced brain tumor surgery. He uses the latest 
                  microsurgical techniques, neuronavigation, and monitoring to safely remove tumors 
                  while protecting brain function.
                </p>
                <p className="text-gray-700 mb-6">
                  Dr. Krishnan has extensive experience with both benign and malignant brain tumors. 
                  He works with oncologists, radiologists, and rehabilitation specialists to provide complete care.
                </p>
                <div className="mt-8">
                  <Link 
                    href="/services/brain-tumor-surgery-hyderabad"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Learn More About Brain Tumor Surgery →
                  </Link>
                  <div className="mt-4">
                    <Link href="/services/epilepsy-surgery-hyderabad/" className="text-blue-600 hover:underline mr-4">Epilepsy Surgery</Link>
                    <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="text-blue-600 hover:underline">Trigeminal Neuralgia</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecoveryTimeline />

      {/* Trigeminal Neuralgia Care */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Trigeminal Neuralgia Care</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Trigeminal neuralgia causes severe facial pain that can be debilitating. Dr Sayuj Krishnan 
                  offers comprehensive treatment options from medical therapy to advanced surgical procedures 
                  including microvascular decompression (MVD) and radiosurgery.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h4 className="font-semibold text-blue-700 mb-3">Treatment Options:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Medical therapy (first-line treatment)</li>
                    <li>• Microvascular decompression (MVD)</li>
                    <li>• Gamma Knife radiosurgery</li>
                    <li>• Percutaneous procedures</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link 
                    href="/conditions/trigeminal-neuralgia-treatment-hyderabad"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Learn More About Trigeminal Neuralgia →
                  </Link>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Symptoms of Trigeminal Neuralgia</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Severe, electric shock-like facial pain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Pain triggered by light touch, eating, or talking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Brief episodes lasting seconds to minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Pain in jaw, cheek, or forehead areas</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Don't suffer in silence.</strong> Early diagnosis and treatment can provide 
                    significant relief and improve your quality of life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Epilepsy Surgery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Epilepsy Surgery</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Comprehensive Epilepsy Evaluation</h3>
                <p className="text-gray-700 mb-4">
                  For patients with drug-resistant epilepsy, surgical treatment can offer the best 
                  chance for seizure freedom. Dr. Krishnan provides comprehensive evaluation including:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Video-EEG monitoring</li>
                  <li>• Advanced brain imaging (MRI, PET)</li>
                  <li>• Neuropsychological testing</li>
                  <li>• Wada test when indicated</li>
                  <li>• Invasive monitoring (SEEG)</li>
                </ul>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj Krishnan specializes in epilepsy surgery for patients who don't respond 
                  to medications. With advanced techniques including laser ablation, resection surgery, 
                  and vagus nerve stimulation (VNS), he helps patients achieve better seizure control.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-800 mb-3">Surgical Options:</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Temporal lobectomy</li>
                    <li>• Laser interstitial thermal therapy (LITT)</li>
                    <li>• Vagus nerve stimulation (VNS)</li>
                    <li>• Corpus callosotomy</li>
                    <li>• Multiple subpial transection</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link 
                    href="/services/epilepsy-surgery-hyderabad"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Learn More About Epilepsy Surgery →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Dr. Sayuj */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr Sayuj Krishnan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Exceptional Training</h3>
                <p className="text-gray-700">
                  MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and 
                  Advanced Spine Surgery, Observer-ship in Full Endoscopic Spine Surgery (Germany)
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">15+ Years Experience</h3>
                <p className="text-gray-700">
                  Successfully treated thousands of patients with various neurological conditions, 
                  always prioritizing patient safety and optimal outcomes.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Advanced Technology</h3>
                <p className="text-gray-700 mb-4">
                  State-of-the-art equipment including neuronavigation, intraoperative monitoring, 
                  and minimally invasive surgical techniques.
                </p>
                <Link 
                  href="/technology-facilities"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Explore Our Technology →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-red-800 mb-4">24/7 Emergency Neurosurgical Care</h2>
              <p className="text-lg text-red-700">
                Immediate access to expert neurosurgical consultation for brain and spine emergencies
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-red-500">
                <div className="text-4xl mb-4">🚨</div>
                <h3 className="text-xl font-semibold text-red-700 mb-3">Emergency Hotline</h3>
                <p className="text-2xl font-bold text-red-600 mb-2">+91-9778280044</p>
                <p className="text-gray-600 mb-4">Available 24/7 for urgent consultations</p>
                <Link 
                  href="/emergency-rehabilitation"
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Learn More About Emergency Care →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-orange-500">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-orange-700 mb-3">Rapid Response</h3>
                <p className="text-gray-600 mb-4">
                  Immediate triage and assessment for traumatic brain injuries, spinal cord injuries, and stroke
                </p>
                <Link 
                  href="/emergency-rehabilitation"
                  className="text-orange-600 hover:text-orange-800 font-medium"
                >
                  Emergency Conditions →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-green-500">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">Hospital Partnership</h3>
                <p className="text-gray-600 mb-4">
                  Coordinated care with Yashoda Hospital emergency department for seamless patient care
                </p>
                <Link 
                  href="/emergency-rehabilitation"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Rehabilitation Services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Serve in Hyderabad */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Areas We Serve in Hyderabad</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj Krishnan serves patients across Hyderabad and surrounding areas, providing 
                  expert neurosurgical care at Yashoda Hospital, Malakpet. As the leading endoscopic spine surgeon 
                  in Hyderabad, Dr. Krishnan specializes in minimally invasive procedures for patients from 
                  Jubilee Hills, Banjara Hills, Hi-Tech City, Gachibowli, Madhapur, Kondapur, and throughout Telangana.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-blue-700 mb-2">Central Hyderabad</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Jubilee Hills</li>
                      <li>• Banjara Hills</li>
                      <li>• Hi-Tech City</li>
                      <li>• Gachibowli</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-blue-700 mb-2">Other Areas</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Madhapur</li>
                      <li>• Kondapur</li>
                      <li>• Malakpet</li>
                      <li>• Secunderabad</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Hospital Location</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Yashoda Hospital</h4>
                    <p className="text-gray-600">
                      Room No 317, OPD Block<br />
                      Malakpet, Hyderabad<br />
                      Telangana 500036
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                    <p className="text-gray-600">
                      <strong>Phone:</strong> +91 9778280044<br />
                      <strong>Email:</strong> neurospinehyd@drsayuj.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authoritative Citations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">References & Sources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-3">Medical Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <a href="https://www.aans.org/patients/conditions-and-treatments" target="_blank" rel="noopener" className="text-blue-600 hover:underline">AANS: Conditions and Treatments</a></li>
                  <li>• <a href="https://www.ninds.nih.gov/health-information/disorders" target="_blank" rel="noopener" className="text-blue-600 hover:underline">NINDS: Neurological Disorders</a></li>
                  <li>• <a href="https://www.cancer.gov/types/brain/patient/brain-treatment-pdq" target="_blank" rel="noopener" className="text-blue-600 hover:underline">NCI: Brain Tumor Treatment</a></li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-3">Research & Evidence</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <a href="https://www.epilepsy.com/treatment/surgery" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Epilepsy Foundation: Surgery</a></li>
                  <li>• <a href="https://www.nhs.uk/conditions/brain-tumours/treatment/" target="_blank" rel="noopener" className="text-blue-600 hover:underline">NHS: Brain Tumor Treatment</a></li>
                  <li>• <a href="https://www.mayoclinic.org/diseases-conditions/trigeminal-neuralgia/diagnosis-treatment/drc-20353347" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Mayo Clinic: Trigeminal Neuralgia</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExpandedFAQ faqs={HOME_FAQS} className="bg-gray-50" />
      <FAQStructuredData
        faqs={HOME_FAQS.map(({ question, answer }) => ({ question, answer }))}
        pageUrl={SITE_URL}
      />
      <LocalReputationPanel />

      {/* Disease Guides Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Comprehensive Disease Guides</h2>
              <p className="text-lg text-gray-700">
                Expert information about neurological and spinal conditions, their symptoms, causes, and treatment options
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🦴</div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Degenerative Disc Disease</h3>
                <p className="text-gray-600 text-sm mb-4">Age-related wear and tear of spinal discs</p>
                <Link 
                  href="/disease-guides/degenerative-disc-disease"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Spinal Stenosis</h3>
                <p className="text-gray-600 text-sm mb-4">Narrowing of spinal canal causing nerve compression</p>
                <Link 
                  href="/disease-guides"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">😣</div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Trigeminal Neuralgia</h3>
                <p className="text-gray-600 text-sm mb-4">Severe facial pain from nerve compression</p>
                <Link 
                  href="/disease-guides"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Epilepsy</h3>
                <p className="text-gray-600 text-sm mb-4">Neurological disorder causing recurrent seizures</p>
                <Link 
                  href="/disease-guides"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/disease-guides"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Disease Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="appointment" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Book an Appointment</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Phone</h4>
                    <a href="tel:+919778280044" className="text-blue-600 text-lg hover:underline">
                      +91 9778280044
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                    <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">
                      neurospinehyd@drsayuj.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Hospital Location</h4>
                    <p className="text-gray-600">
                      Yashoda Hospital<br />
                      Room No 317, OPD Block<br />
                      Malakpet, Hyderabad<br />
                      Telangana 500036
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Concluding Paragraph */}
              <div className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  If you're facing persistent neck or back pain, sciatica, or a diagnosed brain or spine condition, we'll help you understand safe options step by step. Book a consultation at Yashoda Hospitals – Malakpet to review your MRI, get a clear plan, and know what to expect in recovery.
                </p>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-800">Why Choose Dr Sayuj Krishnan?</h3>
                <ul className="space-y-4 text-blue-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>15+ years of neurosurgical experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Advanced training in Germany</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Minimally invasive techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Patient-centered approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>State-of-the-art technology</span>
                  </li>
                </ul>
                <div className="mt-8 space-y-4">
                  <Link 
                    href="/appointments"
                    className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold inline-block"
                  >
                    Book Your Consultation
                  </Link>
                  
                    {/* Google OAuth for patient verification - temporarily disabled for build */}
                    <div className="text-center">
                      <p className="text-sm text-blue-700 mb-2">Verified patients can access priority booking</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Verify with Google (Coming Soon)
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Dr Sayuj Krishnan. All rights reserved.</p>
        </div>
      </footer>

      {/* FAQPage Schema */}
      {/* <FAQPageSchema />
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" }
      ]} /> */}
      
      {/* Sticky CTA for mobile */}
      {/* <StickyCTA /> */}
      
      {/* SEO Dashboard - only in development */}
      {/* {process.env.NODE_ENV === 'development' && (
        <SEODashboard pageType="home" pageSlug="/" />
      )} */}
      
      {/* SEO Audit Dashboard - only in development */}
      {/* {process.env.NODE_ENV === 'development' && (
        <SEOAuditDashboard pageType="home" pageSlug="/" />
      )} */}
    </div>
    </>
  );
}

