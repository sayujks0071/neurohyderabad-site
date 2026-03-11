import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import ExpandedFAQ from "../src/components/ExpandedFAQ";
import { SITE_URL } from "../src/lib/seo";
import { makeMetadata } from "@/app/_lib/meta";
import BreadcrumbSchema from "./components/schemas/BreadcrumbSchema";
import MedicalWebPageSchema from "./components/schemas/MedicalWebPageSchema";
// Temporarily commenting out problematic imports
// import { HeroCTA, StickyCTA } from "../src/components/Experiments";
// import SocialProofBand from "../src/components/Experiments/SocialProofBand";
// import SEODashboard from "../src/components/SEODashboard";
// import SEOAuditDashboard from "../src/components/SEOAuditDashboard";
// import GoogleOAuth from "../src/components/GoogleOAuth";
// import { analytics } from "../src/lib/analytics";
import DoctorCard from "./_components/DoctorCard";
import HomeTrackers from "./_components/HomeTrackers";
import TrustBridgeLink from "./_components/TrustBridgeLink";
import { mediaPublications } from "../src/content/media";
import Button from "./_components/Button";
import Card from "./_components/Card";
import LazySection from "./_components/LazySection";
import Section from "./_components/Section";
import FAQPageSchema from "./_components/FAQPageSchema";
import HeroCTAButtons from "./_components/HeroCTAButtons";
import PatientEducationVideosSkeleton from "./_components/skeletons/PatientEducationVideosSkeleton";
import TrustSignals from "./_components/TrustSignals";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { CANONICAL_TELEPHONE, CANONICAL_WHATSAPP } from "@/src/data/locations";

const PatientEducationVideosWrapper = dynamic(() => import('./_components/wrappers/PatientEducationVideosWrapper'));
const RecoveryTimelineWrapper = dynamic(() => import('./_components/wrappers/RecoveryTimelineWrapper'));
const LocalReputationPanelWrapper = dynamic(() => import('./_components/wrappers/LocalReputationPanelWrapper'));
const RemotionVideoEmbedWrapper = dynamic(() => import('./_components/RemotionVideoEmbedWrapper'));

const HOME_CANONICAL = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;

const baseMetadata = makeMetadata({
  title: "Best Neurosurgeon & Spine Specialist Hyderabad | Dr. Sayuj",
  description: "German-trained neurosurgeon in Hyderabad (Yashoda Hospital). Expert in minimally invasive spine & brain surgery, sciatica, and awake craniotomy. Book now.",
  canonicalPath: "/",
  ogImage: "https://www.drsayuj.info/images/og-default.jpg",
  ogImageAlt: "Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad | Full Endoscopic Spine Surgery & Brain Tumor Surgery"
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: "Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad | Brain & Spine",
  },
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
  // Override openGraph to match specific requirements if makeMetadata default isn't enough,
  // but makeMetadata output is generally good.
  // The original had specific OG title/desc that were slightly different from main title/desc.
  // To preserve EXACTLY what was there, we can override OpenGraph too.
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Dr. Sayuj Krishnan S | German-Trained Neurosurgeon in Hyderabad | Brain & Spine Surgery',
    description: 'German-trained neurosurgeon specializing in full endoscopic spine surgery, minimally invasive brain surgery, and awake craniotomy. 1,000+ endoscopic procedures performed.',
    url: HOME_CANONICAL,
    siteName: 'Dr. Sayuj Krishnan S - Neurosurgeon Hyderabad',
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

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

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

import Hero from "./components/scrollytelling/Hero";
import FeaturedProcedures from "./components/scrollytelling/FeaturedProcedures";

// ... existing imports

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
        title="Dr. Sayuj Krishnan | Best Neurosurgeon in Hyderabad"
        description="Top-rated, German-trained neurosurgeon in Hyderabad (Yashoda Hospital). Expert in minimally invasive spine & brain surgery, sciatica, and awake craniotomy."
        serviceOrCondition="Neurosurgery Services"
        breadcrumbs={[{ name: "Home", path: "/" }]}
        medicalSpecialty={["Neurosurgery", "Spine Surgery", "Endoscopic Surgery"]}
        audience="Patients seeking neurosurgical care in Hyderabad"
      />

      <HomeTrackers />
      <div className="min-h-screen bg-[var(--color-surface)]">

        {/* Scrollytelling Hero Section */}
        <Hero />

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
                  <span className="inline-block bg-[var(--color-primary-100)] text-[var(--color-primary-800)] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {publication.type.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm text-[var(--color-text-secondary)]">
                    {publication.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
                  {publication.title}
                </h3>

                <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                  <strong>{publication.publication}</strong>
                </p>

                <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                  {publication.description}
                </p>

                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium text-sm"
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
          placeholder={<PatientEducationVideosSkeleton />}
        >
          <PatientEducationVideosWrapper />
        </LazySection>

        {/* Animated Service Showcase Video */}
        <LazySection
          placeholder={
            <div className="py-12 md:py-16 bg-[var(--color-primary-50)]">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Header Placeholder */}
                  <div className="mb-6">
                    <div className="h-8 md:h-9 w-3/4 md:w-1/2 bg-[var(--color-primary-200)] rounded animate-pulse mx-auto mb-2"></div>
                    <div className="h-4 w-full md:w-2/3 bg-[var(--color-primary-100)] rounded animate-pulse mx-auto"></div>
                    <div className="h-4 w-5/6 md:w-1/2 bg-[var(--color-primary-100)] rounded animate-pulse mx-auto mt-1"></div>
                  </div>
                  {/* Video Placeholder - Aspect Ratio Match */}
                  <div className="max-w-[800px] mx-auto w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-[var(--color-primary-100)] animate-pulse">
                    <div className="h-full w-full flex items-center justify-center text-[var(--color-primary-300)]">
                      <span className="sr-only">Loading video...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <Section background="none" className="py-16 bg-gradient-to-b from-[var(--color-primary-50)] to-[var(--color-surface)]">
            <RemotionVideoEmbedWrapper
              compositionId="ServiceShowcase"
              title="Our Neurosurgical Services"
              description="Explore our comprehensive range of advanced neurosurgical procedures, from endoscopic spine surgery to robotic deep brain stimulation."
              controls
              loop
              immediate={true}
            />
          </Section>
        </LazySection>

        {/* Featured Procedures Grid (Replacing MISS Section) */}
        <FeaturedProcedures />


        {/* Memberships & Certifications */}
        <Section background="white" className="py-12 border-t border-[var(--color-border)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]">Memberships & Certifications</h2>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
              <a
                href="https://www.aospine.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                aria-label="AO Spine International (opens in a new tab)"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🌍</span>
                <span className="font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-700)]">AO Spine International</span>
              </a>
              <a
                href="https://neurosocietyindia.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                aria-label="Neurological Society of India (opens in a new tab)"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🇮🇳</span>
                <span className="font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-700)]">Neurological Society of India</span>
              </a>
              <a
                href="https://www.cns.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                aria-label="Congress of Neurological Surgeons (opens in a new tab)"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧠</span>
                <span className="font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-700)]">Congress of Neurological Surgeons</span>
              </a>
            </div>
          </div>
        </Section>

        {/* Trust Bridge Section - Connect Services to Credentials */}
        <Section id="trust-bridge-section" background="blue" className="py-16 bg-[var(--color-primary-50)]">
          <div className="grid md:grid-cols-2 gap-8">
            <TrustBridgeLink
              href="/about"
              className="bg-[var(--color-surface)] rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
              eventLabel="homepage_trust_bridge_about"
            >
              <h3 className="text-2xl font-bold text-[var(--color-primary-900)] mb-4 group-hover:text-[var(--color-primary-700)]">
                Meet Dr. Sayuj Krishnan
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Learn about over 9 years of neurosurgical experience, German fellowship training, and his approach to compassionate, minimally invasive care.
              </p>
              <ul className="space-y-2 text-[var(--color-text-secondary)] mb-4">
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span>MBBS, DNB Neurosurgery • Fellowship in Minimally Invasive Spine Surgery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span>Observer-ship in Full Endoscopic Spine Surgery (Germany)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span>Affiliated with Yashoda Hospital, Malakpet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span>Member: AO Spine (International), Neurological Society of India (NSI), Congress of Neurological Surgeons (CNS)</span>
                </li>
              </ul>
              <span className="text-[var(--color-primary-500)] font-semibold group-hover:text-[var(--color-primary-800)]">
                Learn More About Dr. Sayuj →
              </span>
            </TrustBridgeLink>

            <TrustBridgeLink
              href="/patient-stories"
              className="bg-[var(--color-surface)] rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow group"
              eventLabel="homepage_trust_bridge_patient_stories"
            >
              <h3 className="text-2xl font-bold text-[var(--color-primary-900)] mb-4 group-hover:text-[var(--color-primary-700)]">
                Patient Success Stories
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Read real stories from patients who have successfully undergone neurosurgery and spine surgery with Dr. Sayuj Krishnan.
              </p>
              <div className="space-y-3 mb-4">
                <div className="border-l-4 border-[var(--color-success)] pl-4">
                  <p className="text-[var(--color-text-secondary)] italic text-sm">
                    "I was speaking normally the next day and felt safe throughout the awake mapping."
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">— Patient with Meningioma Surgery</p>
                </div>
                <div className="border-l-4 border-[var(--color-primary-500)] pl-4">
                  <p className="text-[var(--color-text-secondary)] italic text-sm">
                    "I could stand straight the very next morning and walked the corridor with the physio."
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">— Patient after TLIF Spine Surgery</p>
                </div>
              </div>
              <span className="text-[var(--color-primary-500)] font-semibold group-hover:text-[var(--color-primary-800)]">
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
                <div className="w-full h-64 bg-gradient-to-r from-[var(--color-success-light)] to-[var(--color-success-light)] rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧠</div>
                    <h3 className="text-xl font-semibold text-[var(--color-success)]">Brain Tumor Surgery</h3>
                    <p className="text-[var(--color-success-700)]">Microsurgical Techniques</p>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-700)]">Advanced Microsurgical Techniques</h3>
              <ul className="space-y-3 text-[var(--color-text-secondary)]">
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span><strong>Neuronavigation:</strong> Precise tumor localization and removal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span><strong>Intraoperative Monitoring:</strong> Real-time brain function protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span><strong>Awake Craniotomy:</strong> For tumors near speech/motor areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-primary-500)] mr-2">✓</span>
                  <span><strong>Minimal Access:</strong> Smaller incisions, faster recovery</span>
                </li>
              </ul>
            </Card>
            <div>
              <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                Dr Sayuj Krishnan performs advanced brain tumor surgery. He uses the latest
                microsurgical techniques, neuronavigation, and monitoring to safely remove tumors
                while protecting brain function.
              </p>
              <p className="text-[var(--color-text-secondary)] mb-6">
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
                  <Link href="/services/epilepsy-surgery-hyderabad/" className="text-[var(--color-primary-500)] hover:underline mr-4">Epilepsy Surgery</Link>
                  <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad/" className="text-[var(--color-primary-500)] hover:underline">Trigeminal Neuralgia</Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Lazy load recovery timeline - only loads when user scrolls */}
        <LazySection
          placeholder={
            <div className="py-16 bg-[#0B1120]">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  {/* CLS Optimization: Height aligned with dynamic import loading state */}
                  <div className="animate-pulse bg-[#1E293B] h-[1500px] md:h-[1400px] rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <RecoveryTimelineWrapper />
        </LazySection>

        {/* Trigeminal Neuralgia Care */}
        <Section background="gray" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Trigeminal Neuralgia Care</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                Trigeminal neuralgia causes severe facial pain that can be debilitating. Dr Sayuj Krishnan
                offers comprehensive treatment options from medical therapy to advanced surgical procedures
                including microvascular decompression (MVD) and radiosurgery.
              </p>
              <Card padding="md" className="mb-6 shadow-md">
                <h3 className="font-semibold text-[var(--color-primary-700)] mb-3">Treatment Options:</h3>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
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
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-700)]">Symptoms of Trigeminal Neuralgia</h3>
              <ul className="space-y-3 text-[var(--color-text-secondary)]">
                <li className="flex items-start">
                  <span className="text-[var(--color-error)] mr-2">•</span>
                  <span>Severe, electric shock-like facial pain</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-error)] mr-2">•</span>
                  <span>Pain triggered by light touch, eating, or talking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-error)] mr-2">•</span>
                  <span>Brief episodes lasting seconds to minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-error)] mr-2">•</span>
                  <span>Pain in jaw, cheek, or forehead areas</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-[var(--color-primary-50)] rounded-lg">
                <p className="text-sm text-[var(--color-primary-800)]">
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
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-700)]">Comprehensive Epilepsy Evaluation</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                For patients with drug-resistant epilepsy, surgical treatment can offer the best
                chance for seizure freedom. Dr. Krishnan provides comprehensive evaluation including:
              </p>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li>• Video-EEG monitoring</li>
                <li>• Advanced brain imaging (MRI, PET)</li>
                <li>• Neuropsychological testing</li>
                <li>• Wada test when indicated</li>
                <li>• Invasive monitoring (SEEG)</li>
              </ul>
            </Card>
            <div>
              <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                Dr Sayuj Krishnan specializes in epilepsy surgery for patients who don't respond
                to medications. With advanced techniques including laser ablation, resection surgery,
                and vagus nerve stimulation (VNS), he helps patients achieve better seizure control.
              </p>
              <div className="bg-[var(--color-primary-50)] p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-[var(--color-primary-800)] mb-3">Surgical Options:</h3>
                <ul className="space-y-2 text-[var(--color-primary-700)]">
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
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-700)]">Exceptional Training</h3>
              <p className="text-[var(--color-text-secondary)]">
                MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and
                Advanced Spine Surgery, Observer-ship in Full Endoscopic Spine Surgery (Germany)
              </p>
            </Card>
            <Card padding="lg" className="shadow-lg text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-700)]">9+ Years Experience</h3>
              <p className="text-[var(--color-text-secondary)]">
                Successfully treated thousands of patients with various neurological conditions,
                always prioritizing patient safety and optimal outcomes.
              </p>
            </Card>
            <Card padding="lg" className="shadow-lg text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary-700)]">Advanced Technology</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                State-of-the-art equipment including neuronavigation, intraoperative monitoring,
                and minimally invasive surgical techniques.
              </p>
              <Link
                href="/technology-facilities"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium"
              >
                Explore Our Technology →
              </Link>
            </Card>
          </div>
        </Section>

        {/* Animated Outcome Dashboard */}
        <LazySection
          placeholder={
            <div className="py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Header Placeholder */}
                  <div className="mb-6">
                    <div className="h-8 md:h-9 w-3/4 md:w-1/2 bg-[var(--color-border)] rounded animate-pulse mx-auto mb-2"></div>
                    <div className="h-4 w-full md:w-2/3 bg-[var(--color-background)] rounded animate-pulse mx-auto"></div>
                  </div>
                  {/* Video Placeholder - Aspect Ratio Match */}
                  <div className="max-w-[800px] mx-auto w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-[var(--color-border)] animate-pulse">
                    <div className="h-full w-full flex items-center justify-center text-[var(--color-text-secondary)]">
                      <span className="sr-only">Loading video...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <Section className="py-16">
            <RemotionVideoEmbedWrapper
              compositionId="OutcomeDashboard"
              title="Practice at a Glance"
              description="Animated overview of outcomes, experience, and patient satisfaction metrics."
              controls
              loop
              immediate={true}
            />
          </Section>
        </LazySection>

        {/* Emergency Services */}
        <Section background="none" className="py-16 bg-[var(--color-error-light)]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-error-800)] mb-4">24/7 Emergency Neurosurgical Care</h2>
            <p className="text-lg text-[var(--color-error-700)]">
              Immediate access to expert neurosurgical consultation for brain and spine emergencies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-l-4 border-[var(--color-error)] shadow-lg">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-xl font-semibold text-[var(--color-error-700)] mb-3">Emergency Hotline</h3>
              <p className="text-2xl font-bold text-[var(--color-error)] mb-2">{CANONICAL_TELEPHONE}</p>
              <p className="text-[var(--color-text-secondary)] mb-4">Available 24/7 for urgent consultations</p>
              <Link
                href="/emergency-rehabilitation"
                className="text-[var(--color-error)] hover:text-[var(--color-error-800)] font-medium"
              >
                Learn More About Emergency Care →
              </Link>
            </Card>
            <Card className="text-center border-l-4 border-[var(--color-warning)] shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-[var(--color-warning-700)] mb-3">Rapid Response</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Immediate triage and assessment for traumatic brain injuries, spinal cord injuries, and stroke
              </p>
              <Link
                href="/emergency-rehabilitation"
                className="text-[var(--color-warning-700)] hover:text-[var(--color-warning-700)] font-medium"
              >
                Emergency Conditions →
              </Link>
            </Card>
            <Card className="text-center border-l-4 border-[var(--color-success)] shadow-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-[var(--color-success-700)] mb-3">Hospital Partnership</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Coordinated care with Yashoda Hospital emergency department for seamless patient care
              </p>
              <Link
                href="/emergency-rehabilitation"
                className="text-[var(--color-success-700)] hover:text-[var(--color-success)] font-medium"
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
              <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                Dr. Sayuj Krishnan provides expert neurosurgical care at Yashoda Hospital, Malakpet. As a pioneering endoscopic spine surgeon,
                he specializes in advanced, minimally invasive procedures offering faster recovery. Our facility is conveniently accessible
                via the PVNR Expressway and Outer Ring Road (ORR), making it a straight drive for patients traveling from major IT corridors and central neighborhoods.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card padding="sm" className="shadow-md">
                  <h3 className="font-semibold text-[var(--color-primary-700)] mb-2">Central & IT Hubs</h3>
                  <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                    <li>• <Link href="/neurosurgeon-jubilee-hills" className="text-[var(--color-primary-600)] hover:underline">Jubilee Hills</Link></li>
                    <li>• <Link href="/neurosurgeon-banjara-hills" className="text-[var(--color-primary-600)] hover:underline">Banjara Hills</Link></li>
                    <li>• <Link href="/neurosurgeon-hitech-city" className="text-[var(--color-primary-600)] hover:underline">Hitech City</Link></li>
                    <li>• <Link href="/neurosurgeon-gachibowli" className="text-[var(--color-primary-600)] hover:underline">Gachibowli</Link></li>
                  </ul>
                </Card>
                <Card padding="sm" className="shadow-md">
                  <h3 className="font-semibold text-[var(--color-primary-700)] mb-2">Other Key Areas</h3>
                  <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                    <li>• <Link href="/locations/neurosurgeon-madhapur" className="text-[var(--color-primary-600)] hover:underline">Madhapur</Link></li>
                    <li>• <Link href="/locations/neurosurgeon-kondapur" className="text-[var(--color-primary-600)] hover:underline">Kondapur</Link></li>
                    <li>• <Link href="/neurosurgeon-secunderabad" className="text-[var(--color-primary-600)] hover:underline">Secunderabad</Link></li>
                    <li>• <Link href="/neurosurgeon-malakpet" className="text-[var(--color-primary-600)] hover:underline">Malakpet</Link></li>
                  </ul>
                </Card>
              </div>
            </div>
            <LocationNAPCard locationId="malakpet" />
          </div>
        </Section>

        {/* Conditions We Treat Mini-Cluster */}
        <Section background="white" className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Common Conditions We Treat</h2>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Explore specialized care and minimally invasive options for frequent neurological concerns.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
               <Link href="/conditions/sciatica-pain-treatment-hyderabad" className="bg-white border border-blue-200 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-50 font-medium transition-colors">
                  Sciatica Pain
               </Link>
               <Link href="/conditions/slip-disc-treatment-hyderabad" className="bg-white border border-blue-200 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-50 font-medium transition-colors">
                  Slipped Disc
               </Link>
               <Link href="/conditions/brain-tumor-surgery-hyderabad" className="bg-white border border-blue-200 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-50 font-medium transition-colors">
                  Brain Tumor
               </Link>
               <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="bg-white border border-blue-200 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-50 font-medium transition-colors">
                  Trigeminal Neuralgia
               </Link>
            </div>
            <div className="mt-8">
                <Link href="/conditions" className="text-blue-600 font-semibold hover:underline">
                    View All Conditions →
                </Link>
            </div>
          </div>
        </Section>

        {/* Authoritative Citations */}
        <Section background="white" className="py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">References & Sources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card padding="md" hover={true}>
                <h3 className="font-semibold text-[var(--color-primary-700)] mb-3">Medical Guidelines</h3>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <li>• <a href="https://www.aans.org/patients/conditions-and-treatments" target="_blank" rel="noopener" className="text-[var(--color-primary-500)] hover:underline" aria-label="AANS: Conditions and Treatments (opens in a new tab)">AANS: Conditions and Treatments</a></li>
                  <li>• <a href="https://www.ninds.nih.gov/health-information/disorders" target="_blank" rel="noopener" className="text-[var(--color-primary-500)] hover:underline" aria-label="NINDS: Neurological Disorders (opens in a new tab)">NINDS: Neurological Disorders</a></li>
                  <li>• <a href="https://www.cancer.gov/types/brain/patient/brain-treatment-pdq" target="_blank" rel="noopener" className="text-[var(--color-primary-500)] hover:underline" aria-label="NCI: Brain Tumor Treatment (opens in a new tab)">NCI: Brain Tumor Treatment</a></li>
                </ul>
              </Card>
              <Card padding="md" hover={true}>
                <h3 className="font-semibold text-[var(--color-primary-700)] mb-3">Research & Evidence</h3>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <li>• <a href="https://www.epilepsy.com/treatment/surgery" target="_blank" rel="noopener" className="text-[var(--color-primary-500)] hover:underline" aria-label="Epilepsy Foundation: Surgery (opens in a new tab)">Epilepsy Foundation: Surgery</a></li>
                  <li>• <a href="https://www.nhs.uk/conditions/brain-tumours/treatment/" target="_blank" rel="noopener" className="text-[var(--color-primary-500)] hover:underline" aria-label="NHS: Brain Tumor Treatment (opens in a new tab)">NHS: Brain Tumor Treatment</a></li>
                  <li>• <a href="https://www.mayoclinic.org/diseases-conditions/trigeminal-neuralgia/diagnosis-treatment/drc-20353347" target="_blank" rel="noopener" className="text-[var(--color-primary-500)] hover:underline" aria-label="Mayo Clinic: Trigeminal Neuralgia (opens in a new tab)">Mayo Clinic: Trigeminal Neuralgia</a></li>
                </ul>
              </Card>
            </div>
          </div>
        </Section>

        {/* Disable internal schema as it is already handled by FAQPageSchema above */}
        <ExpandedFAQ faqs={HOME_FAQS} className="bg-[var(--color-background)]" disableSchema={true} />
        {/* Lazy load reputation panel - only loads when user scrolls */}
        <LazySection
          placeholder={
            <div className="py-8 bg-[var(--color-background)]">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {/* CLS Optimization: Height aligned with dynamic import loading state */}
                  <div className="animate-pulse bg-[var(--color-border)] h-[1100px] md:h-[600px] rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <LocalReputationPanelWrapper />
        </LazySection>

        {/* Disease Guides Section */}
        <Section background="gray" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-primary-800)] mb-4">Comprehensive Disease Guides</h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Expert information about neurological and spinal conditions, their symptoms, causes, and treatment options
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🦴</div>
              <h3 className="text-lg font-semibold text-[var(--color-primary-700)] mb-3">Degenerative Disc Disease</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">Age-related wear and tear of spinal discs</p>
              <Link
                href="/disease-guides/degenerative-disc-disease"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium"
              >
                Learn More About Degenerative Disc Disease →
              </Link>
            </Card>
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-lg font-semibold text-[var(--color-primary-700)] mb-3">Spinal Stenosis</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">Narrowing of spinal canal causing nerve compression</p>
              <Link
                href="/disease-guides"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium"
              >
                Learn More About Spinal Stenosis →
              </Link>
            </Card>
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">😣</div>
              <h3 className="text-lg font-semibold text-[var(--color-primary-700)] mb-3">Trigeminal Neuralgia</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">Severe facial pain from nerve compression</p>
              <Link
                href="/conditions/trigeminal-neuralgia-treatment-hyderabad"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium"
              >
                Learn More About Trigeminal Neuralgia Treatment →
              </Link>
            </Card>
            <Card padding="md" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold text-[var(--color-primary-700)] mb-3">Epilepsy</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-4">Neurological disorder causing recurrent seizures</p>
              <Link
                href="/services/epilepsy-surgery-hyderabad"
                className="text-[var(--color-primary-500)] hover:text-[var(--color-primary-800)] font-medium"
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
              <LocationNAPCard locationId="malakpet" />

              {/* Concluding Paragraph */}
              <Card padding="lg" className="border border-[var(--color-border)] mb-8 shadow-none">
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  If you're facing persistent neck or back pain, sciatica, or a diagnosed brain or spine condition, we'll help you understand safe options step by step. Book a consultation at Yashoda Hospitals – Malakpet to review your MRI, get a clear plan, and know what to expect in recovery.
                </p>
              </Card>

              <div className="bg-[var(--color-primary-50)] p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-[var(--color-primary-800)]">Why Choose Dr Sayuj Krishnan?</h3>
                <ul className="space-y-4 text-[var(--color-primary-700)]">
                  <li className="flex items-start">
                    <span className="text-[var(--color-primary-500)] mr-3 mt-1">✓</span>
                    <span>Over 9 years of neurosurgical experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--color-primary-500)] mr-3 mt-1">✓</span>
                    <span>Advanced training in Germany</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--color-primary-500)] mr-3 mt-1">✓</span>
                    <span>Minimally invasive techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--color-primary-500)] mr-3 mt-1">✓</span>
                    <span>Patient-centered approach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--color-primary-500)] mr-3 mt-1">✓</span>
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
        {/* <Sticky CTA /> */}

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
