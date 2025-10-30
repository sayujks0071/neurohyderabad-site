import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";

// Ensure page is statically generated
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "About Dr. Sayuj Krishnan | Premier Neurosurgeon in Hyderabad | Credentials & Experience",
  description: "Learn about Dr. Sayuj Krishnan's exceptional training, 15+ years of neurosurgical experience, German fellowship, and pioneering work in minimally invasive brain & spine surgery in Hyderabad.",
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
    "best neurosurgeon hyderabad credentials"
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
    description: "Learn about Dr. Sayuj Krishnan's exceptional training, 15+ years of neurosurgical experience, German fellowship, and pioneering work in minimally invasive brain & spine surgery.",
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
    description: "Learn about Dr. Sayuj Krishnan's exceptional training, 15+ years of neurosurgical experience, and pioneering work in minimally invasive brain & spine surgery."
  }
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "About Dr. Sayuj Krishnan", path: "/about" }
      ]} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    About Dr. Sayuj Krishnan
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    Premier neurosurgeon with 15+ years of experience, German training, 
                    and pioneering expertise in minimally invasive brain & spine surgery.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/appointments"
                      className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Book Consultation
                    </Link>
                    <a 
                      href="tel:+919778280044"
                      className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Call: +91 97782 80044
                    </a>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/images/dr-sayuj-krishnan-portrait.jpg"
                        alt="Dr. Sayuj Krishnan - Premier Neurosurgeon in Hyderabad with German Training"
                        width={320}
                        height={320}
                        className="object-cover w-full h-full"
                        priority
                        quality={95}
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
            </div>
          </div>
        </section>

        {/* About Dr. Sayuj Krishnan - Improved Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">About Dr. Sayuj Krishnan</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Dr. Sayuj Krishnan is a consultant neurosurgeon and spine surgeon serving patients across Hyderabad. After completing his MBBS and DNB in neurosurgery, he obtained fellowship training in minimally invasive and endoscopic spine surgery in Germany. Over the past 15 years he has performed hundreds of procedures ranging from simple endoscopic discectomy to complex brain tumour resections. He is affiliated with Yashoda Hospital, Malakpet, where he is known for blending advanced technology with compassionate care. Patients appreciate his clear explanations and focus on safe recovery without unnecessary interventions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials & Training */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Credentials & Training</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Medical Education</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>MBBS</strong> - Medical Degree</li>
                    <li><strong>DNB Neurosurgery</strong> - Direct 6 years</li>
                    <li><strong>Fellowship</strong> - Minimally Invasive Spine Surgery</li>
                    <li><strong>Observer-ship</strong> - Full Endoscopic Spine Surgery (Germany)</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🏥</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Experience</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>15+ Years</strong> - Neurosurgical Experience</li>
                    <li><strong>1,000+</strong> - Endoscopic Surgeries</li>
                    <li><strong>Same-day Discharge</strong> - Most Procedures</li>
                    <li><strong>International Training</strong> - Germany</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Specializations</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>Endoscopic Spine Surgery</strong></li>
                    <li><strong>Awake Brain Surgery</strong></li>
                    <li><strong>ROSA DBS</strong> - Deep Brain Stimulation</li>
                    <li><strong>Minimally Invasive Techniques</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* German Training Experience - Key Differentiator */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
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
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-800 mb-3">German Fellowship Highlights:</h3>
                    <ul className="space-y-2 text-blue-700 mb-4">
                      <li>• Advanced endoscopic spine surgery techniques</li>
                      <li>• Minimally invasive surgical approaches</li>
                      <li>• State-of-the-art equipment and technology</li>
                      <li>• International best practices and protocols</li>
                    </ul>
                    <Link 
                      href="/german-training"
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Official Certificate
                    </Link>
                  </div>
                  <p className="text-gray-700">
                    This international experience has enabled Dr. Krishnan to offer cutting-edge 
                    neurosurgical care in Hyderabad, combining German precision with compassionate 
                    patient care.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pioneering Work */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Pioneering Work in Neurosurgery</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
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
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology & Innovation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Advanced Technology & Innovation</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🧭</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Neuronavigation</h3>
                  <p className="text-gray-700">
                    Advanced imaging technology for precise tumor localization and removal, 
                    ensuring maximum safety and effectiveness.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Intraoperative Monitoring</h3>
                  <p className="text-gray-700">
                    Real-time brain function monitoring during surgery to protect critical 
                    neurological pathways and ensure optimal outcomes.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">ROSA DBS</h3>
                  <p className="text-gray-700">
                    Robotic-assisted deep brain stimulation for movement disorders, 
                    providing precise electrode placement and improved patient outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient-Centered Approach */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
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
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Why Patients Choose Dr. Krishnan</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span><strong>15+ years</strong> of neurosurgical experience</span>
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Neurosurgical Needs?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Schedule a consultation with Dr. Sayuj Krishnan to discuss your condition 
                and explore the best treatment options for your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/appointments"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Consultation
                </Link>
                <a 
                  href="tel:+919778280044"
                  className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Call: +91 97782 80044
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}