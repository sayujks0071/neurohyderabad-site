import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import { PhysicianSchema } from "../../src/components/schema/PhysicianSchema";
import MedicalWebPageSchema from "../components/schemas/MedicalWebPageSchema";
import Section from "../_components/Section";
import Card from "../_components/Card";
import Button from "../_components/Button";
import LazySection from "../_components/LazySection";
import RemotionVideoEmbedWrapper from "../_components/RemotionVideoEmbedWrapper";

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Dr. Sayuj Krishnan | Best Neurosurgeon Hyderabad | 9+ Years Exp",
  description: "German-trained Neurosurgeon in Hyderabad. 9+ Years experience in Endoscopic Spine & Brain Surgery. Read Dr. Sayuj's profile and patient reviews.",
  keywords: [
    "dr sayuj krishnan credentials",
    "neurosurgeon hyderabad experience",
    "german trained neurosurgeon",
    "minimally invasive spine surgery expert",
    "endoscopic spine surgery hyderabad",
    "awake brain surgery hyderabad",
    "ROSA DBS hyderabad",
    "yashoda hospital neurosurgeon",
    "neurosurgery fellowship germany",
    "best neurosurgeon hyderabad credentials",
    "AO Spine member hyderabad",
    "AO Spine neurosurgeon"
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      'en-IN': `${SITE_URL}/about`,
      'x-default': `${SITE_URL}/about`
    }
  },
  openGraph: {
    title: "About Dr. Sayuj Krishnan | Premier Neurosurgeon in Hyderabad",
    description: "Learn about Dr. Sayuj Krishnan's exceptional training, over 9 years of neurosurgical experience, German fellowship, and pioneering work in minimally invasive brain & spine surgery.",
    url: `${SITE_URL}/about`,
    siteName: "Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr. Sayuj Krishnan | Premier Neurosurgeon in Hyderabad",
    description: "Learn about Dr. Sayuj Krishnan's exceptional training, over 9 years of neurosurgical experience, and pioneering work in minimally invasive brain & spine surgery.",
    images: [`${SITE_URL}/images/og-default.jpg`],
    site: '@drsayuj',
    creator: '@drsayuj'
  }
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "About Dr. Sayuj Krishnan", path: "/about" }
      ]} />
      <PhysicianSchema />
      <MedicalWebPageSchema
        pageType="about"
        pageSlug="/about"
        title="About Dr. Sayuj Krishnan | Premier Neurosurgeon in Hyderabad | Credentials & Experience"
        description="Learn about Dr. Sayuj Krishnan's exceptional training, over 9 years of neurosurgical experience, German fellowship, and pioneering work in minimally invasive brain & spine surgery in Hyderabad."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About Dr. Sayuj Krishnan", path: "/about" }
        ]}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        {/* Hero Section */}
        <Section background="none" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Dr. Sayuj Krishnan
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Premier neurosurgeon with over 9 years of experience, German training,
                and pioneering expertise in minimally invasive brain & spine surgery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  href="/appointments"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-none"
                >
                  Book Consultation
                </Button>
                <Button
                  href="tel:+919778280044"
                  className="bg-green-600 text-white hover:bg-green-700 border-none"
                >
                  Call: +91 97782 80044
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/dr-sayuj-krishnan-portrait-v2.jpg"
                    alt="Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad with German Training"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    priority
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-lg font-semibold text-blue-800">Dr. Sayuj Krishnan</p>
                  <p className="text-blue-600 text-sm">Premier Neurosurgeon</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* About Dr. Sayuj Krishnan - Improved Section */}
        <Section background="white" className="py-16">
          <div className="max-w-4xl mx-auto">
            <Card padding="lg" className="bg-blue-50 border-l-4 border-blue-600 mb-8 shadow-none">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">About Dr. Sayuj Krishnan</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Dr. Sayuj Krishnan is a consultant neurosurgeon and spine surgeon serving patients across Hyderabad. After completing his MBBS and DNB in neurosurgery, he obtained fellowship training in minimally invasive and endoscopic spine surgery in Germany. Over the past 9 years he has performed over 1,000 endoscopic procedures ranging from simple discectomy to complex brain tumour resections.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                He is affiliated with Yashoda Hospital, Malakpet, where he is known for blending advanced technology with compassionate care. Patients appreciate his clear explanations and focus on safe recovery without unnecessary interventions.
              </p>
            </Card>

            <Card padding="lg" className="bg-white border border-green-100 mb-8 shadow-sm">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Practice timeline & where I consult</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span aria-hidden className="text-green-600 mt-1">•</span>
                  <span>Previously consultant neurosurgeon at Apollo Hospitals, Kochi with advanced endoscopic exposure.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-green-600 mt-1">•</span>
                  <span>Now exclusively practicing in Hyderabad at Yashoda Hospital, Malakpet (Room 317, OPD block) for clinic and surgery.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-green-600 mt-1">•</span>
                  <span>Single contact line for all consultations: <strong>+91 97782 80044</strong> (call or WhatsApp).</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-green-600 mt-1">•</span>
                  <span>Online profiles and maps are updated to Hyderabad to avoid confusion with older Kerala listings.</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                This clarity helps patients and search engines understand that all care is delivered from Hyderabad while retaining the experience gained in Kerala.
              </p>
            </Card>

            {/* Pioneer Badge */}
            <Card padding="md" className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 shadow-none">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Pioneer in Full Endoscopic Spine Surgery</h3>
                  <p className="text-amber-800">
                    Dr. Krishnan is recognized as a pioneer in bringing Full Endoscopic Spine Surgery techniques to Hyderabad.
                    His German training at RIWOspine Academy and over 1,000 endoscopic procedures make him one of the most
                    experienced endoscopic spine surgeons in South India.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Credentials & Training */}
        <Section background="gray" className="py-16" id="credentials">
          <h2 className="text-3xl font-bold text-center mb-12">Credentials & Training</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Medical Education</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>MBBS</strong> - Medical Degree</li>
                <li><strong>DNB Neurosurgery</strong> - Direct 6 years</li>
                <li><strong>Fellowship</strong> - Minimally Invasive Spine Surgery</li>
                <li><strong>Observer-ship</strong> - Full Endoscopic Spine Surgery (Germany)</li>
              </ul>
            </Card>
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Experience</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>9+ Years</strong> - Neurosurgical Experience</li>
                <li><strong>1,000+</strong> - Endoscopic Surgeries Performed</li>
                <li><strong>Same-day Discharge</strong> - 80% of Spine Cases</li>
                <li><strong>German Training</strong> - RIWOspine Academy (2024)</li>
                <li><strong>Faculty Member</strong> - National Conferences</li>
              </ul>
            </Card>
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Specializations</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Endoscopic Spine Surgery</strong></li>
                <li><Link href="/services/brain-tumor-surgery-hyderabad" className="hover:text-blue-600 hover:underline"><strong>Awake Brain Surgery</strong></Link></li>
                <li><strong>ROSA DBS</strong> - Deep Brain Stimulation</li>
                <li><strong>Minimally Invasive Techniques</strong></li>
              </ul>
            </Card>
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🏅</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Professional Memberships</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><strong>AO Spine</strong> - International Member</li>
                <li><strong>NSI</strong> - Neurological Society of India</li>
                <li><strong>CNS</strong> - Congress of Neurological Surgeons</li>
                <li><strong>WFNS</strong> - World Federation of Neurosurgical Societies</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Publications, Conferences & Media */}
        <Section background="white" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Publications, Conferences & Media Recognition</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card padding="lg" className="bg-blue-50 shadow-none">
              <h3 className="text-xl font-semibold mb-6 text-blue-800 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Academic Contributions
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="border-l-4 border-blue-400 pl-4">
                  <p className="font-semibold">Research Publications</p>
                  <p className="text-sm text-gray-600">Multiple peer-reviewed publications on minimally invasive techniques and neurosurgical innovations</p>
                </li>
                <li className="border-l-4 border-blue-400 pl-4">
                  <p className="font-semibold">Conference Faculty</p>
                  <p className="text-sm text-gray-600">Invited faculty at national neurosurgery conferences including cervical spine workshops</p>
                </li>
                <li className="border-l-4 border-blue-400 pl-4">
                  <p className="font-semibold">Teaching & Training</p>
                  <p className="text-sm text-gray-600">Conducts workshops on full endoscopic spine surgery techniques for fellow neurosurgeons</p>
                </li>
              </ul>
            </Card>

            <Card padding="lg" className="bg-green-50 shadow-none">
              <h3 className="text-xl font-semibold mb-6 text-green-800 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Media & Public Education
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="border-l-4 border-green-400 pl-4">
                  <p className="font-semibold">Expert Commentary</p>
                  <p className="text-sm text-gray-600">Featured in leading health publications discussing advances in spine surgery</p>
                </li>
                <li className="border-l-4 border-green-400 pl-4">
                  <p className="font-semibold">Patient Education</p>
                  <p className="text-sm text-gray-600">Regular contributor to medical awareness programs on neurological health</p>
                </li>
                <li className="border-l-4 border-green-400 pl-4">
                  <p className="font-semibold">Community Outreach</p>
                  <p className="text-sm text-gray-600">Participates in health camps and awareness drives for spinal health</p>
                </li>
              </ul>
              <div className="mt-6">
                <Button
                  href="/media"
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold"
                >
                  View All Media Coverage →
                </Button>
              </div>
            </Card>
          </div>
        </Section>

        {/* German Training Experience - Key Differentiator */}
        <Section background="none" className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🇩🇪 International Credential
            </div>
            <h2 className="text-4xl font-bold mb-6">German-Trained Excellence</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Dr. Sayuj Krishnan's <strong>Observership in Full Endoscopic Spine Surgery (Germany)</strong>
              represents the highest level of specialized training available in this advanced field.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Why German Training Matters</h3>
              <p className="text-lg text-gray-700 mb-6">
                Germany is globally recognized as the birthplace and leader in endoscopic spine surgery technology.
                Dr. Krishnan's hands-on training there provides him with cutting-edge techniques and protocols
                that set him apart from other neurosurgeons in Hyderabad.
              </p>
              <Card padding="md" className="bg-blue-50 mb-6 shadow-none">
                <h3 className="font-semibold text-blue-800 mb-3">German Fellowship Highlights:</h3>
                <ul className="space-y-2 text-blue-700 mb-4">
                  <li>• Advanced endoscopic spine surgery techniques</li>
                  <li>• Minimally invasive surgical approaches</li>
                  <li>• State-of-the-art equipment and technology</li>
                  <li>• International best practices and protocols</li>
                </ul>
                <Button
                  href="/german-training"
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Official Certificate
                </Button>
              </Card>
              <p className="text-gray-700">
                This international experience has enabled Dr. Krishnan to offer cutting-edge
                neurosurgical care in Hyderabad, combining German precision with compassionate
                patient care.
              </p>
            </div>
            <Card padding="lg" className="shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Training Impact</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Enhanced Surgical Techniques</h4>
                    <p className="text-gray-600 text-sm">Improved precision and outcomes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Faster Recovery Times</h4>
                    <p className="text-gray-600 text-sm">Same-day discharge for most procedures</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Reduced Complications</h4>
                    <p className="text-gray-600 text-sm">Minimally invasive approaches</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">International Standards</h4>
                    <p className="text-gray-600 text-sm">World-class care in Hyderabad</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Animated Doctor Introduction Video */}
        <LazySection
          placeholder={
            <div className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="animate-pulse bg-gray-200 h-[450px] rounded-xl"></div>
                </div>
              </div>
            </div>
          }
        >
          <Section background="white" className="py-16">
            <RemotionVideoEmbedWrapper
              compositionId="DoctorIntro"
              title="Meet Dr. Sayuj Krishnan"
              description="An animated introduction to Dr. Sayuj's credentials, specializations, and patient care philosophy."
              controls
              loop
              immediate={true}
            />
          </Section>
        </LazySection>

        {/* Pioneering Work */}
        <Section background="gray" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Pioneering Work in Neurosurgery</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <Card padding="lg" className="shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-blue-700">Minimally Invasive Spine Surgery</h3>
              <p className="text-gray-700 mb-6">
                Dr. Krishnan has performed over 1,000 endoscopic spine surgeries, establishing
                himself as a leading expert in minimally invasive techniques. His approach
                combines precision with patient comfort, resulting in faster recovery times.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Endoscopic Discectomy:</strong> 6-8mm incisions for slip disc treatment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Spinal Stenosis Decompression:</strong> Relief for leg pain and numbness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Same-day Discharge:</strong> Most patients go home the same day</span>
                </li>
              </ul>
            </Card>
            <Card padding="lg" className="shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-blue-700">Awake Brain Surgery</h3>
              <p className="text-gray-700 mb-6">
                Dr. Krishnan specializes in awake brain surgery for tumors near critical areas
                of the brain. This technique allows for real-time monitoring of brain function
                during surgery, maximizing tumor removal while preserving neurological function.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Real-time Monitoring:</strong> Brain function protection during surgery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Precision Removal:</strong> Maximum tumor resection with safety</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Better Outcomes:</strong> Preserved neurological function</span>
                </li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Technology & Innovation */}
        <Section background="none" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Technology & Innovation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Neuronavigation</h3>
              <p className="text-gray-700">
                Advanced imaging technology for precise tumor localization and removal,
                ensuring maximum safety and effectiveness.
              </p>
            </Card>
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Intraoperative Monitoring</h3>
              <p className="text-gray-700">
                Real-time brain function monitoring during surgery to protect critical
                neurological pathways and ensure optimal outcomes.
              </p>
            </Card>
            <Card padding="lg" className="text-center shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700">ROSA DBS</h3>
              <p className="text-gray-700">
                Robotic-assisted deep brain stimulation for movement disorders,
                providing precise electrode placement and improved patient outcomes.
              </p>
            </Card>
          </div>
        </Section>

        {/* Patient-Centered Approach */}
        <Section background="gray" className="py-16" id="philosophy">
          <h2 className="text-3xl font-bold text-center mb-12">Patient-Centered Approach</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-700">Compassionate Care Philosophy</h3>
              <p className="text-lg text-gray-700 mb-6">
                Dr. Krishnan believes that exceptional neurosurgical care goes beyond
                technical expertise. His approach combines advanced surgical techniques
                with genuine compassion and personalized attention to each patient's needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Personalized Treatment Plans</h4>
                    <p className="text-gray-600">Tailored approach for each patient's unique condition</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Clear Communication</h4>
                    <p className="text-gray-600">Explaining complex procedures in understandable terms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Comprehensive Follow-up</h4>
                    <p className="text-gray-600">Ongoing support throughout recovery</p>
                  </div>
                </div>
              </div>
            </div>
            <Card padding="lg" className="shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Patients Choose Dr. Krishnan</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Over 9 years</strong> of neurosurgical experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>German training</strong> in advanced techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Minimally invasive</strong> approaches for faster recovery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Same-day discharge</strong> for most procedures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>State-of-the-art</strong> technology and equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Compassionate care</strong> throughout the journey</span>
                </li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Call to Action */}
        <Section background="none" className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Neurosurgical Needs?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Schedule a consultation with Dr. Sayuj Krishnan to discuss your condition
              and explore the best treatment options for your specific needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="/appointments"
                className="bg-white text-blue-600 hover:bg-gray-100 border-none"
              >
                Book Consultation
              </Button>
              <Button
                href="tel:+919778280044"
                className="bg-green-600 text-white hover:bg-green-700 border-none"
              >
                Call: +91 97782 80044
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
