import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "German Training in Endoscopic Spine Surgery | Dr. Sayuj Krishnan | International Credentials",
  description: "Dr. Sayuj Krishnan's certified German training in Full Endoscopic Spine Surgery. Learn about his international observership, advanced techniques, and how German precision benefits patients in Hyderabad.",
  keywords: [
    "german trained neurosurgeon hyderabad",
    "endoscopic spine surgery germany",
    "international neurosurgery training",
    "dr sayuj krishnan credentials",
    "german fellowship neurosurgeon",
    "endoscopic spine surgery certificate",
    "international medical training",
    "german medical education",
    "minimally invasive spine surgery germany",
    "neurosurgeon with german training"
  ],
  alternates: {
    canonical: `${SITE_URL}/german-training`,
    languages: {
      'en-IN': `${SITE_URL}/german-training`,
      'x-default': `${SITE_URL}/german-training`
    }
  },
  openGraph: {
    title: "German Training in Endoscopic Spine Surgery | Dr. Sayuj Krishnan",
    description: "Dr. Sayuj Krishnan's certified German training in Full Endoscopic Spine Surgery. International observership bringing advanced techniques to Hyderabad.",
    url: `${SITE_URL}/german-training`,
    siteName: 'Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("German Training Certificate")}&subtitle=${encodeURIComponent("International Endoscopic Spine Surgery")}`,
        width: 1200,
        height: 630,
        alt: "Dr. Sayuj Krishnan German Training Certificate",
        type: 'image/jpeg'
      },
    ],
  },
};

export default function GermanTrainingPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "German Training", path: "/german-training" }
      ]} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-lg font-semibold mb-6">
                  🇩🇪 International Medical Credential
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  German Training in Endoscopic Spine Surgery
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
                  Dr. Sayuj Krishnan's certified international training in Full Endoscopic Spine Surgery 
                  represents the highest standard of specialized neurosurgical education available globally.
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
          </div>
        </section>

        {/* Certificate Display */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">Official Training Certificate</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Dr. Sayuj Krishnan's official certificate from his German observership in Full Endoscopic Spine Surgery, 
                  demonstrating his international training credentials.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-8 rounded-2xl shadow-2xl">
                  <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-6">
                    <iframe
                      src="/documents/german-training-certificate.pdf#toolbar=0&navpanes=0&scrollbar=0"
                      className="w-full h-full"
                      title="Dr. Sayuj Krishnan German Training Certificate"
                    />
                  </div>
                  <div className="text-center">
                    <a
                      href="/documents/german-training-certificate.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Full Certificate
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-blue-800">Why German Training Matters</h3>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">🏆 Global Leadership in Endoscopic Surgery</h4>
                      <p className="text-gray-700">
                        Germany is internationally recognized as the birthplace and global leader in endoscopic spine surgery technology. 
                        German medical institutions set the gold standard for minimally invasive techniques.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">🎯 Hands-On Observership</h4>
                      <p className="text-gray-700">
                        Dr. Krishnan's training wasn't theoretical—it was a hands-on observership where he learned advanced techniques 
                        directly from German experts performing complex endoscopic procedures.
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-3">🔬 Cutting-Edge Technology</h4>
                      <p className="text-gray-700">
                        German training exposed Dr. Krishnan to the latest endoscopic equipment, surgical protocols, 
                        and patient care standards that are now available to patients in Hyderabad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How German Training Benefits Patients</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Faster Recovery</h3>
                  <p className="text-gray-700">
                    German-trained techniques enable same-day discharge for most endoscopic spine procedures, 
                    reducing hospital stay and accelerating recovery.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Precision Surgery</h3>
                  <p className="text-gray-700">
                    Advanced German protocols ensure minimal tissue damage, smaller incisions, 
                    and more precise surgical outcomes for complex spine conditions.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Reduced Complications</h3>
                  <p className="text-gray-700">
                    International best practices learned in Germany minimize surgical risks 
                    and ensure optimal patient safety during complex procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Procedures Enhanced by German Training */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Procedures Enhanced by German Training</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-800">Endoscopic Discectomy</h3>
                  <p className="text-gray-700 mb-4">
                    Dr. Krishnan's German training enables him to perform slip disc surgery through tiny 6-8mm incisions, 
                    using advanced endoscopic techniques learned from German experts.
                  </p>
                  <Link 
                    href="/services/endoscopic-discectomy-hyderabad"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More About Endoscopic Discectomy →
                  </Link>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-800">Spinal Stenosis Decompression</h3>
                  <p className="text-gray-700 mb-4">
                    German-trained minimally invasive techniques provide effective relief for spinal stenosis 
                    with minimal disruption to surrounding tissues and faster recovery.
                  </p>
                  <Link 
                    href="/conditions/spinal-stenosis-treatment-hyderabad"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More About Spinal Stenosis →
                  </Link>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-800">Minimally Invasive Spine Surgery</h3>
                  <p className="text-gray-700 mb-4">
                    Comprehensive German training covers advanced MISS techniques that reduce pain, 
                    minimize scarring, and accelerate return to normal activities.
                  </p>
                  <Link 
                    href="/services/minimally-invasive-spine-surgery"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More About MISS →
                  </Link>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-800">Complex Spine Procedures</h3>
                  <p className="text-gray-700 mb-4">
                    German training provides expertise in handling complex spine conditions 
                    with advanced endoscopic approaches and international best practices.
                  </p>
                  <Link 
                    href="/specializations"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View All Specializations →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Experience German-Trained Excellence</h2>
              <p className="text-xl mb-8 text-blue-100">
                Benefit from Dr. Sayuj Krishnan's international training in endoscopic spine surgery. 
                Schedule a consultation to discuss your treatment options with a German-trained neurosurgeon.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/appointments"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Consultation
                </Link>
                <Link 
                  href="/about"
                  className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-400 transition-colors"
                >
                  Learn More About Dr. Krishnan
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
