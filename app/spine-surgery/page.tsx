import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../src/lib/seo";
import BreadcrumbSchema from "../components/schemas/BreadcrumbSchema";
import { serviceJsonLd } from "../../src/lib/seo";

export const metadata: Metadata = {
  title: "Spine Surgery Hyderabad | Minimally Invasive Endoscopic Spine Surgery | Dr. Sayuj Krishnan",
  description: "Expert spine surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in minimally invasive endoscopic spine surgery, same-day discharge, and faster recovery. 1,000+ successful procedures.",
  keywords: [
    "spine surgery hyderabad",
    "endoscopic spine surgery hyderabad",
    "minimally invasive spine surgery",
    "slip disc treatment hyderabad",
    "spinal stenosis treatment hyderabad",
    "sciatica treatment hyderabad",
    "same day spine surgery",
    "endoscopic discectomy hyderabad",
    "spine specialist hyderabad",
    "back pain treatment hyderabad"
  ],
  alternates: {
    canonical: `${SITE_URL}/spine-surgery`,
    languages: {
      'en-IN': `${SITE_URL}/spine-surgery`,
      'x-default': `${SITE_URL}/spine-surgery`
    }
  },
  openGraph: {
    title: "Spine Surgery Hyderabad | Minimally Invasive Endoscopic Spine Surgery",
    description: "Expert spine surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in minimally invasive endoscopic spine surgery, same-day discharge, and faster recovery.",
    url: `${SITE_URL}/spine-surgery`,
    siteName: "Dr. Sayuj Krishnan - Premier Neurosurgeon Hyderabad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Minimally Invasive Spine Surgery in Hyderabad - Dr. Sayuj Krishnan",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Spine Surgery Hyderabad | Minimally Invasive Endoscopic Spine Surgery",
    description: "Expert spine surgery in Hyderabad with Dr. Sayuj Krishnan. Specializing in minimally invasive endoscopic spine surgery, same-day discharge, and faster recovery."
  }
};

export default function SpineSurgeryPage() {
  const spineServiceJsonLd = serviceJsonLd({
    name: "Minimally Invasive Spine Surgery",
    description: "Advanced endoscopic spine surgery techniques for faster recovery and better outcomes. Specializing in slip disc treatment, spinal stenosis, and sciatica relief.",
    url: `${SITE_URL}/spine-surgery`,
    areaServed: "Hyderabad, Telangana, India"
  });

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", path: "/" },
        { name: "Spine Surgery", path: "/spine-surgery" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spineServiceJsonLd) }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Minimally Invasive Spine Surgery
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-blue-100">
                    Advanced endoscopic techniques for faster recovery, same-day discharge, 
                    and better outcomes. 1,000+ successful procedures performed.
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
                  <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🦴</div>
                      <p className="text-lg font-semibold">Endoscopic Spine Surgery</p>
                      <p className="text-blue-200">Minimally Invasive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Minimally Invasive Spine Surgery?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Same-Day Discharge</h3>
                  <p className="text-gray-700">
                    Most patients go home the same day, reducing hospital stay and costs.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🔬</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Smaller Incisions</h3>
                  <p className="text-gray-700">
                    6-8mm incisions instead of traditional large cuts, reducing scarring.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🏃</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Faster Recovery</h3>
                  <p className="text-gray-700">
                    Return to work in 1-3 weeks for desk jobs, much faster than traditional surgery.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Less Pain</h3>
                  <p className="text-gray-700">
                    Reduced post-operative pain and faster healing with minimal tissue damage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Treated */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Conditions We Treat</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Slip Disc (Herniated Disc)</h3>
                  <p className="text-gray-700 mb-6">
                    Endoscopic discectomy for herniated discs causing leg pain, numbness, and weakness. 
                    Our minimally invasive approach provides relief with minimal recovery time.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Endoscopic Discectomy:</strong> 6-8mm incision for disc removal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Same-day Discharge:</strong> Most patients go home the same day</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Faster Recovery:</strong> Return to work in 1-3 weeks</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link 
                      href="/conditions/slip-disc-treatment-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn More About Slip Disc Treatment →
                    </Link>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Spinal Stenosis</h3>
                  <p className="text-gray-700 mb-6">
                    Minimally invasive decompression for spinal stenosis causing leg pain, 
                    numbness, and difficulty walking. Our endoscopic approach preserves spinal stability.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Endoscopic Decompression:</strong> Relief for leg pain and numbness</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Preserved Stability:</strong> Maintains spinal structure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>Better Outcomes:</strong> Improved walking and function</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link 
                      href="/conditions/spinal-stenosis-treatment-hyderabad"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Learn More About Spinal Stenosis →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Procedures */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Spine Surgery Procedures</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Discectomy</h3>
                  <p className="text-gray-700 mb-4">
                    Minimally invasive removal of herniated disc material through a small incision.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 6-8mm incision</li>
                    <li>• Same-day discharge</li>
                    <li>• Faster recovery</li>
                    <li>• Less post-operative pain</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Foraminotomy</h3>
                  <p className="text-gray-700 mb-4">
                    Decompression of nerve roots through endoscopic techniques for foraminal stenosis.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nerve root decompression</li>
                    <li>• Preserved spinal stability</li>
                    <li>• Minimal tissue damage</li>
                    <li>• Quick recovery</li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic ULBD</h3>
                  <p className="text-gray-700 mb-4">
                    Unilateral laminotomy bilateral decompression for spinal stenosis using endoscopic techniques.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Bilateral decompression</li>
                    <li>• Preserved spinal stability</li>
                    <li>• Minimal muscle damage</li>
                    <li>• Better outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recovery Timeline</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">What to Expect After Surgery</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Day 0 (Surgery Day)</h4>
                        <p className="text-gray-600">Walk within 3 hours with physiotherapy support</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Week 1</h4>
                        <p className="text-gray-600">Wound inspection and initial recovery assessment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Week 2-3</h4>
                        <p className="text-gray-600">Return to desk work once wound is healed</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Week 6-8</h4>
                        <p className="text-gray-600">Full recovery and return to normal activities</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Follow-up Care</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>48 hours:</strong> Tele-follow up call</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>7 days:</strong> Wound inspection and assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>30 days:</strong> Progress review and guidance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span><strong>8 weeks:</strong> Final assessment and clearance</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>24/7 Support:</strong> Our team is available for any concerns or questions 
                      throughout your recovery journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Dr. Krishnan */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dr. Sayuj Krishnan for Spine Surgery?</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700">Exceptional Expertise</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">1,000+ Endoscopic Surgeries</h4>
                        <p className="text-gray-600">Extensive experience in minimally invasive techniques</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">German Training</h4>
                        <p className="text-gray-600">International fellowship in endoscopic spine surgery</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">15+ Years Experience</h4>
                        <p className="text-gray-600">Comprehensive neurosurgical expertise</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Same-day Discharge</h4>
                        <p className="text-gray-600">Most patients go home the same day</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Patient Success Stories</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-gray-700 italic">
                        "Dr. Krishnan's endoscopic discectomy changed my life. I was back to work 
                        in 2 weeks and the pain was completely gone."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with L4-L5 herniated disc</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-gray-700 italic">
                        "The recovery was so much faster than I expected. Same-day discharge 
                        and back to normal activities in 6 weeks."
                      </p>
                      <p className="text-sm text-gray-500 mt-2">- Patient with spinal stenosis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Discuss Your Spine Surgery Options?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Schedule a consultation with Dr. Sayuj Krishnan to discuss your spine condition 
                and explore minimally invasive treatment options.
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

