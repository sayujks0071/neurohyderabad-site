import type { Metadata } from "next";
import Link from "next/link";
import dynamic from 'next/dynamic';
import ExpandedFAQ from "../src/components/ExpandedFAQ";
import LazySection from "./_components/LazySection";
import { SITE_URL } from "../src/lib/seo";
import BreadcrumbSchema from "./components/schemas/BreadcrumbSchema";
import MedicalWebPageSchema from "./components/schemas/MedicalWebPageSchema";
// Temporarily commenting out problematic imports
// import { HeroCTA, StickyCTA } from "../src/components/Experiments";
// import SocialProofBand from "../src/components/Experiments/SocialProofBand";
// import ScrollDepthTracker from "../src/components/ScrollDepthTracker";
// import SEODashboard from "../src/components/SEODashboard";
// import SEOAuditDashboard from "../src/components/SEOAuditDashboard";
// import GoogleOAuth from "../src/components/GoogleOAuth";
// import { analytics } from "../src/lib/analytics";
import DoctorCard from "./_components/DoctorCard";
import TrustSignals from "./_components/TrustSignals";
import HomeTrackers from "./_components/HomeTrackers";
import TrustBridgeLink from "./_components/TrustBridgeLink";
import { mediaPublications } from "../src/content/media";
import Button from "./_components/Button";
import Card from "./_components/Card";
import Section from "./_components/Section";
import FAQPageSchema from "./_components/FAQPageSchema";
import HeroCTAButtons from "./_components/HeroCTAButtons";

// Dynamic imports for Lazy components
const PatientEducationVideos = dynamic(() => import('./_components/PatientEducationVideos'), {
  loading: () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* CLS Optimization: Explicit height matches rendered content (3 cards in grid/stack) */}
          <div className="animate-pulse bg-gray-200 h-[1700px] md:h-[600px] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

const RecoveryTimeline = dynamic(() => import('./_components/RecoveryTimeline'), {
  loading: () => (
    <div className="py-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* CLS Optimization: Explicit height matches 5 vertical milestones + header */}
          <div className="animate-pulse bg-slate-800 h-[1500px] md:h-[1400px] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

const LocalReputationPanel = dynamic(() => import('./_components/LocalReputationPanel'), {
  loading: () => (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* CLS Optimization: Explicit height matches testimonials grid + trust indicators */}
          <div className="animate-pulse bg-gray-200 h-[1100px] md:h-[600px] rounded-lg"></div>
        </div>
      </div>
    </div>
  )
});

const HOME_CANONICAL = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;

export const metadata: Metadata = {
  title: {
    absolute: "Best Neurosurgeon Hyderabad | Spine & Brain Specialist",
  },
  description: 'Top-rated neurosurgeon in Hyderabad (Yashoda Hospital). Expert in endoscopic spine surgery, brain tumors & sciatica. Book appointment now.',
  keywords: [
    'dr sayuj krishnan',
    'best spine surgeon in yashoda hospital',
    'spine surgeon in yashoda hospital hyderabad',
    'yashoda hospital spine surgeon',
    'yashoda hospital malakpet spine surgeon',
    'neurologist near me',
    'spine specialist near me',
    'best neurosurgeon hyderabad',
    'endoscopic spine surgery hyderabad',
    'minimally invasive spine surgery',
    'yashoda hospital neurosurgeon',
    'awake brain surgery hyderabad',
    'ROSA DBS hyderabad',
    'brain tumor surgery hyderabad',
    'spine specialist hyderabad',
    'robotic neurosurgery hyderabad',
    'same day spine surgery',
    'yashoda hospital malakpet',
    'german trained neurosurgeon',
    'neurosurgeon near me',
    'back pain specialist near me'
  ],
  alternates: {
    canonical: HOME_CANONICAL,
    languages: {
      'en-IN': HOME_CANONICAL,
      'x-default': HOME_CANONICAL
    }
  },
  openGraph: {
    title: 'Dr. Sayuj Krishnan S | German-Trained Neurosurgeon in Hyderabad | Brain & Spine Surgery',
    description: 'German-trained neurosurgeon specializing in minimally invasive spine surgery, awake brain surgery, and robotic DBS. Over 1,000 endoscopic procedures performed. Same-day discharge available at Yashoda Hospital, Malakpet.',
    url: HOME_CANONICAL,
    siteName: 'Dr. Sayuj Krishnan S - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.drsayuj.info/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad | Endoscopic Spine Surgery & Brain Tumor Surgery',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Sayuj Krishnan | German-Trained Neurosurgeon in Hyderabad',
    description: 'German-trained neurosurgeon specializing in minimally invasive spine & brain surgery. Over 1,000 endoscopic procedures. Same-day discharge available.',
    images: ['https://www.drsayuj.info/images/og-default.jpg'],
    site: '@drsayuj',
    creator: '@drsayuj'
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
      {/* Schemas handled in RootLayout: Website, Physician, Hospital.
          Specific page schemas like FAQPage remain here.
          OrganizationSchema, LocalBusinessSchema, and MedicalClinicSchema were removed
          to avoid duplicate entities in the Knowledge Graph. */}

      <FAQPageSchema faqs={HOME_FAQS} pageUrl={HOME_CANONICAL} />

      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/"
        title="Best Neurosurgeon in Hyderabad | Spine & Brain Specialist"
        description="Top-rated neurosurgeon in Hyderabad (Yashoda Hospital). Expert in endoscopic spine surgery, brain tumors & sciatica. Book appointment now."
        serviceOrCondition="Neurosurgery Services"
        breadcrumbs={[{ name: "Home", path: "/" }]}
      />

      {/* <ScrollDepthTracker pageSlug="/" /> */}
      <HomeTrackers />
      <div className="min-h-screen bg-white">
        {/* Hero Section - LCP Optimized */}
        <header className="home-hero text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="home-hero__title text-4xl md:text-6xl font-bold leading-tight">
                    Dr. Sayuj Krishnan: German-Trained Neurosurgeon in Hyderabad
                    <span className="home-hero__subtitle block text-3xl md:text-5xl">
                      Minimally invasive spine, awake brain surgery, and ROSA DBS at Yashoda Hospital, Malakpet.
                    </span>
                  </h1>
                  <p className="home-hero__lead text-xl md:text-2xl">
                    I personally evaluate every case and perform the surgery—combining full-endoscopic spine techniques, awake mapping for complex brain tumors, and robotic guidance for DBS to deliver safer, faster recoveries.
                  </p>
                  <div className="mt-6 space-y-4">
                    <ul className="grid gap-3 text-left md:grid-cols-2">
                      <li className="flex items-start gap-3 text-lg text-blue-50">
                        <span aria-hidden className="mt-1">✓</span>
                        <span>9+ years, 1,000+ full endoscopic spine procedures</span>
                      </li>
                      <li className="flex items-start gap-3 text-lg text-blue-50">
                        <span aria-hidden className="mt-1">✓</span>
                        <span>80% same-day discharge; awake options for high-risk patients</span>
                      </li>
                      <li className="flex items-start gap-3 text-lg text-blue-50 md:col-span-2">
                        <span aria-hidden className="mt-1">✓</span>
                        <span>ROSA robotic DBS, neuronavigation, and endoscopic skull-base approaches for precision brain surgery</span>
                      </li>
                    </ul>
                    <div className="space-y-3">
                      <HeroCTAButtons />
                      <p className="text-sm text-blue-50">
                        Call/WhatsApp +91 97782 80044 • Same-day clinic slots at Yashoda Malakpet and secure tele-consults for outstation patients.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <DoctorCard priority={true} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Social Proof Section */}
        {/* <SocialProofBand /> */}

        {/* Trust Signals */}
        <Section className="py-8">
          <TrustSignals />
        </Section>

        {/* Media Publications Section */}
        <Section background="blue" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Expert Insights & Media Coverage
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaPublications.filter(pub => pub.featured).slice(0, 3).map((publication) => (
              <Card key={publication.id} hover={true} className="h-full">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {publication.type.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {publication.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {publication.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  <strong>{publication.publication}</strong>
                </p>

                <p className="text-gray-700 text-sm mb-4">
                  {publication.description}
                </p>

                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                  aria-label={
                    publication.type === 'interview'
                      ? `Watch Interview: ${publication.title} (opens in a new tab)`
                      : `Read: ${publication.title} (opens in a new tab)`
                  }
                >
                  {publication.type === 'interview' ? 'Watch Interview →' : `Read: ${publication.title.length > 50 ? publication.title.substring(0, 50) + '...' : publication.title} →`}
                </a>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              href="/media"
              variant="primary"
              className="rounded-lg"
            >
              View All Media Publications
            </Button>
          </div>
        </Section>

        {/* Lazy load video section - only loads when user scrolls */}
        <LazySection
          placeholder={
            <div className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {/* CLS Optimization: Height aligned with dynamic import loading state */}
                  <div className="animate-pulse bg-gray-200 h-[1700px] md:h-[600px] rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <PatientEducationVideos />
        </LazySection>

        {/* Minimally Invasive Spine Surgery (MISS) */}
        <Section background="gray" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <Link
              href="/services/minimally-invasive-spine-surgery"
              className="underline underline-offset-4 decoration-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
            >
              Endoscopic Spine Surgery
            </Link>{" "}
            & Minimally Invasive Procedures (MISS)
          </h2>
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
                <Button
                  href="/services/minimally-invasive-spine-surgery"
                  variant="primary"
                  className="rounded-full"
                >
                  Learn More About MISS →
                </Button>
                <div className="mt-4">
                  <Link href="/conditions/slip-disc-treatment-hyderabad/" className="text-blue-600 hover:underline mr-4">Slip Disc Treatment</Link>
                  <Link href="/conditions/spinal-stenosis-treatment-hyderabad/" className="text-blue-600 hover:underline">Spinal Stenosis</Link>
                  <div className="mt-3 text-sm">
                    <Link
                      href="/blog/does-endoscopic-spine-surgery-work-for-sciatica-hyderabad/"
                      className="inline-flex items-center min-h-[44px] px-2 -mx-2 text-blue-700 hover:underline mr-4"
                    >
                      Does Endoscopic Spine Surgery Work for Sciatica?
                    </Link>
                    <Link
                      href="/blog/when-to-worry-about-back-pain-neurosurgeon-hyderabad/"
                      className="inline-flex items-center min-h-[44px] px-2 -mx-2 text-blue-700 hover:underline"
                    >
                      When to Worry About Back Pain
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Card padding="lg" className="shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Who Benefits from MISS?</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <Link href="/conditions/slip-disc-treatment-hyderabad/" className="text-blue-600 hover:underline">Patients with herniated discs (slip disc)</Link></li>
                <li>• <Link href="/conditions/spinal-stenosis-treatment-hyderabad/" className="text-blue-600 hover:underline">Spinal stenosis causing leg pain</Link></li>
                <li>• <Link href="/conditions/sciatica-pain-treatment-hyderabad/" className="text-blue-600 hover:underline">Sciatica not improving with conservative treatment</Link></li>
                <li>• Recurrent disc herniations</li>
                <li>• Foraminal stenosis</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Memberships & Certifications */}
        <Section background="white" className="py-12 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Memberships & Certifications</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
              <a href="https://www.aospine.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🌍</span>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-700">AO Spine International</span>
              </a>
              <a href="https://neurosocietyindia.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🇮🇳</span>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-700">Neurological Society of India</span>
              </a>
              <a href="https://www.cns.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧠</span>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-700">Congress of Neurological Surgeons</span>
              </a>
            </div>
          </div>
        </Section>

        {/* Trust Bridge Section - Connect Services to Credentials */}
        <Section background="blue" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="grid md:grid-cols-2 gap-8">
            <TrustBridgeLink
              href="/about"
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
              eventLabel="homepage_trust_bridge_about"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-700">
                Meet Dr. Sayuj Krishnan
              </h3>
              <p className="text-gray-700 mb-4">
                Learn about over 9 years of neurosurgical experience, German fellowship training, and his approach to compassionate, minimally invasive care.
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>MBBS, DNB Neurosurgery • Fellowship in Minimally Invasive Spine Surgery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Observer-ship in Full Endoscopic Spine Surgery (Germany)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Affiliated with Yashoda Hospital, Malakpet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Member: AO Spine (International), Neurological Society of India (NSI), Congress of Neurological Surgeons (CNS)</span>
                </li>
              </ul>
              <span className="text-blue-600 font-semibold group-hover:text-blue-800">
                Learn More About Dr. Sayuj →
              </span>
            </TrustBridgeLink>

            <TrustBridgeLink
              href="/patient-stories"
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
              eventLabel="homepage_trust_bridge_patient_stories"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-700">
                Patient Success Stories
              </h3>
              <p className="text-gray-700 mb-4">
                Read real stories from patients who have successfully undergone neurosurgery and spine surgery with Dr. Sayuj Krishnan.
              </p>
              <div className="space-y-3 mb-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-gray-700 italic text-sm">
                    "I was speaking normally the next day and felt safe throughout the awake mapping."
                  </p>
                  <p className="text-xs text-gray-500 mt-1">— Patient with Meningioma Surgery</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-gray-700 italic text-sm">
                    "I could stand straight the very next morning and walked the corridor with the physio."
                  </p>
                  <p className="text-xs text-gray-500 mt-1">— Patient after TLIF Spine Surgery</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold group-hover:text-blue-800">
                Read All Patient Stories →
              </span>
            </TrustBridgeLink>
          </div>
        </Section>

        {/* Brain Tumor Surgery */}
        <Section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Brain Tumor Surgery</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card padding="lg" className="shadow-lg">
              <div className="mb-6">
                <div className="w-full h-64 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧠</div>
                    <h3 className="text-xl font-semibold text-green-800">Brain Tumor Surgery</h3>
                    <p className="text-green-700">Microsurgical Techniques</p>
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
            </Card>
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
                <Button
                  href="/services/brain-tumor-surgery-hyderabad"
                  variant="primary"
                  className="rounded-full"
                >
                  Learn More About Brain Tumor Surgery →
                </Button>
                <div className="mt-4">
                  <Link href="/services/epilepsy-surgery-hyderabad/" className="text-blue-600 hover:underline mr-4">Epilepsy Surgery</Link>
                  <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="text-blue-600 hover:underline">Trigeminal Neuralgia</Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Lazy load recovery timeline - only loads when user scrolls */}
        <LazySection
          placeholder={
            <div className="py-16 bg-slate-950">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  {/* CLS Optimization: Height aligned with dynamic import loading state */}
                  <div className="animate-pulse bg-slate-800 h-[1500px] md:h-[1400px] rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <RecoveryTimeline />
        </LazySection>

        {/* Trigeminal Neuralgia Care */}
        <Section background="gray" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Trigeminal Neuralgia Care</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Trigeminal neuralgia causes severe facial pain that can be debilitating. Dr Sayuj Krishnan
                offers comprehensive treatment options from medical therapy to advanced surgical procedures
                including microvascular decompression (MVD) and radiosurgery.
              </p>
              <Card padding="md" className="mb-6 shadow-md">
                <h3 className="font-semibold text-blue-700 mb-3">Treatment Options:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Medical therapy (first-line treatment)</li>
                  <li>• Microvascular decompression (MVD)</li>
                  <li>• Gamma Knife radiosurgery</li>
                  <li>• Percutaneous procedures</li>
                </ul>
              </Card>
              <div className="mt-8">
                <Button
                  href="/conditions/trigeminal-neuralgia-treatment-hyderabad"
                  variant="primary"
                  className="rounded-full"
                >
                  Learn More About Trigeminal Neuralgia →
                </Button>
              </div>
            </div>
            <Card padding="lg" className="shadow-lg">
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
            </Card>
          </div>
        </Section>

        {/* Epilepsy Surgery */}
        <Section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Epilepsy Surgery</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card padding="lg" className="shadow-lg">
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
            </Card>
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Dr Sayuj Krishnan specializes in epilepsy surgery for patients who don't respond
                to medications. With advanced techniques including laser ablation, resection surgery,
                and vagus nerve stimulation (VNS), he helps patients achieve better seizure control.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-3">Surgical Options:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Temporal lobectomy</li>
                  <li>• Laser interstitial thermal therapy (LITT)</li>
                  <li>• Vagus nerve stimulation (VNS)</li>
                  <li>• Corpus callosotomy</li>
                  <li>• Multiple subpial transection</li>
                </ul>
              </div>
              <div className="mt-8">
                <Button
                  href="/services/epilepsy-surgery-hyderabad"
                  variant="primary"
                  className="rounded-full"
                >
                  Learn More About Epilepsy Surgery →
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Why Choose Dr. Sayuj */}
        <Section background="gray" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr Sayuj Krishnan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card padding="lg" className="shadow-lg text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Exceptional Training</h3>
              <p className="text-gray-700">
                MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and
                Advanced Spine Surgery, Observer-ship in Full Endoscopic Spine Surgery (Germany)
              </p>
            </Card>
            <Card padding="lg" className="shadow-lg text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">9+ Years Experience</h3>
              <p className="text-gray-700">
                Successfully treated thousands of patients with various neurological conditions,
                always prioritizing patient safety and optimal outcomes.
              </p>
            </Card>
            <Card padding="lg" className="shadow-lg text-center">
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
            </Card>
          </div>
        </Section>

        {/* Emergency Services */}
        <Section background="none" className="py-16 bg-red-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-800 mb-4">24/7 Emergency Neurosurgical Care</h2>
            <p className="text-lg text-red-700">
              Immediate access to expert neurosurgical consultation for brain and spine emergencies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-l-4 border-red-500 shadow-lg">
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
            </Card>
            <Card className="text-center border-l-4 border-orange-500 shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Rapid Response</h3>
              <p className="text-gray-600 mb-4">
                Immediate triage and assessment for traumatic brain injuries, spinal cord injuries, and stroke
              </p>
              <Link
                href="/emergency-rehabilitation"
                className="text-orange-700 hover:text-orange-900 font-medium"
              >
                Emergency Conditions →
              </Link>
            </Card>
            <Card className="text-center border-l-4 border-green-500 shadow-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Hospital Partnership</h3>
              <p className="text-gray-600 mb-4">
                Coordinated care with Yashoda Hospital emergency department for seamless patient care
              </p>
              <Link
                href="/emergency-rehabilitation"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                Rehabilitation Services →
              </Link>
            </Card>
          </div>
        </Section>

        {/* Areas We Serve in Hyderabad */}
        <Section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Spine Specialist & Neurosurgeon Near You in Hyderabad</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Dr. Sayuj Krishnan provides expert neurosurgical care at Yashoda Hospital, Malakpet, serving patients across Hyderabad and throughout Telangana.
                As a pioneering endoscopic spine surgeon, Dr. Krishnan specializes in advanced, minimally invasive procedures that enable faster recovery
                and same-day discharge for most patients. Our Malakpet location is conveniently accessible for patients throughout the region.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card padding="sm" className="shadow-md">
                  <h3 className="font-semibold text-blue-700 mb-2">Central Hyderabad</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Jubilee Hills</li>
                    <li>• Banjara Hills</li>
                    <li>• Hi-Tech City</li>
                    <li>• Gachibowli</li>
                  </ul>
                </Card>
                <Card padding="sm" className="shadow-md">
                  <h3 className="font-semibold text-blue-700 mb-2">Other Areas</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Madhapur</li>
                    <li>• Kondapur</li>
                    <li>• Malakpet</li>
                    <li>• Secunderabad</li>
                  </ul>
                </Card>
              </div>
            </div>
            <Card padding="lg" className="shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Hospital Location</h3>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Yashoda Hospital</h3>
                  <p className="text-gray-600">
                    Room No 317, OPD Block<br />
                    Malakpet, Hyderabad<br />
                    Telangana 500036
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
                  <p className="text-gray-600">
                    <strong>Phone:</strong> +91 9778280044<br />
                    <strong>Email:</strong> hellodr@drsayuj.info
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Authoritative Citations */}
        <Section background="white" className="py-12">
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
        </Section>

        {/* Disable internal schema as it is already handled by FAQPageSchema above */}
        <ExpandedFAQ faqs={HOME_FAQS} className="bg-gray-50" disableSchema={true} />
        {/* Lazy load reputation panel - only loads when user scrolls */}
        <LazySection
          placeholder={
            <div className="py-8 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {/* CLS Optimization: Height aligned with dynamic import loading state */}
                  <div className="animate-pulse bg-gray-200 h-[1100px] md:h-[600px] rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <LocalReputationPanel />
        </LazySection>

        {/* Disease Guides Section */}
        <Section background="gray" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Comprehensive Disease Guides</h2>
            <p className="text-lg text-gray-700">
              Expert information about neurological and spinal conditions, their symptoms, causes, and treatment options
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🦴</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Degenerative Disc Disease</h3>
              <p className="text-gray-600 text-sm mb-4">Age-related wear and tear of spinal discs</p>
              <Link
                href="/disease-guides/degenerative-disc-disease"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn More About Degenerative Disc Disease →
              </Link>
            </Card>
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Spinal Stenosis</h3>
              <p className="text-gray-600 text-sm mb-4">Narrowing of spinal canal causing nerve compression</p>
              <Link
                href="/disease-guides"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn More About Spinal Stenosis →
              </Link>
            </Card>
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">😣</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Trigeminal Neuralgia</h3>
              <p className="text-gray-600 text-sm mb-4">Severe facial pain from nerve compression</p>
              <Link
                href="/conditions/trigeminal-neuralgia-treatment-hyderabad"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn More About Trigeminal Neuralgia Treatment →
              </Link>
            </Card>
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Epilepsy</h3>
              <p className="text-gray-600 text-sm mb-4">Neurological disorder causing recurrent seizures</p>
              <Link
                href="/services/epilepsy-surgery-hyderabad"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn More About Epilepsy Surgery →
              </Link>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button
              href="/disease-guides"
              variant="primary"
              className="px-8 py-3 rounded-lg"
            >
              Explore All Disease & Symptom Guides
            </Button>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="appointment" className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Book an Appointment</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card padding="lg" className="shadow-lg">
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
                    <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">
                      hellodr@drsayuj.info
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
              </Card>

              {/* Concluding Paragraph */}
              <Card padding="lg" className="border border-gray-200 mb-8 shadow-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  If you're facing persistent neck or back pain, sciatica, or a diagnosed brain or spine condition, we'll help you understand safe options step by step. Book a consultation at Yashoda Hospitals – Malakpet to review your MRI, get a clear plan, and know what to expect in recovery.
                </p>
              </Card>

              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-800">Why Choose Dr Sayuj Krishnan?</h3>
                <ul className="space-y-4 text-blue-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Over 9 years of neurosurgical experience</span>
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
                  <Button
                    href="/appointments"
                    variant="primary"
                    className="px-8 py-3 rounded-full text-lg font-semibold inline-block"
                  >
                    Book Your Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQPage Schema */}
        {/* <FAQPageSchema /> */}
        <BreadcrumbSchema items={[
          { name: "Home", path: "/" }
        ]} />

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
