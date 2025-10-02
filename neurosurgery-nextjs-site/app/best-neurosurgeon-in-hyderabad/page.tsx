import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { BestNeurosurgeonStructuredData } from "./structured-data";

export const metadata: Metadata = {
  title: "Best Neurosurgeon in Hyderabad | Dr Sayuj Krishnan - Expert Brain & Spine Surgery",
  description: "Dr Sayuj Krishnan is the best neurosurgeon in Hyderabad with 15+ years experience in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures. Book consultation.",
  alternates: {
    canonical: "/best-neurosurgeon-in-hyderabad",
  },
  openGraph: {
    title: "Best Neurosurgeon in Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon with advanced training in Germany. Specializing in endoscopic spine surgery, brain tumor surgery, and minimally invasive procedures.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Best Neurosurgeon in Hyderabad")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan - Expert Brain & Spine Surgery")}`,
        width: 1200,
        height: 630,
        alt: "Best Neurosurgeon in Hyderabad - Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function BestNeurosurgeonPage() {
  return (
    <>
      <BestNeurosurgeonStructuredData />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best Neurosurgeon in Hyderabad
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Dr Sayuj Krishnan — Leading Expert in Minimally Invasive Brain & Spine Surgery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments" 
                className="bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Consultation
              </Link>
              <Link 
                href="/services" 
                className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Review Notice */}
      <section className="py-4 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700">
              <strong>Medically reviewed by Dr Sayuj Krishnan</strong> — MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and Advanced Spine Surgery, Observer-ship in Full Endoscopic Spine Surgery (Germany)
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Last reviewed: October 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Why Dr Sayuj is the Best */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Dr Sayuj Krishnan is the Best Neurosurgeon in Hyderabad</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Exceptional Training & Experience</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <div>
                      <strong>15+ Years Experience:</strong> Successfully treated thousands of patients with various neurological conditions
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Advanced Training in Germany:</strong> Observer-ship in Full Endoscopic Spine Surgery from leading European centers
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <div>
                      <strong>DNB Neurosurgery (Direct 6 years):</strong> Comprehensive training in all aspects of neurosurgery
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <div>
                      <strong>Fellowship in MISS:</strong> Specialized training in Minimally Invasive and Advanced Spine Surgery
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4 text-blue-700">Credentials & Memberships</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• MBBS (Bachelor of Medicine and Bachelor of Surgery)</li>
                  <li>• DNB Neurosurgery (Diplomate of National Board)</li>
                  <li>• Fellowship in Minimally Invasive Spine Surgery</li>
                  <li>• Observer-ship in Full Endoscopic Spine Surgery (Germany)</li>
                  <li>• Member, Neurological Society of India</li>
                  <li>• Member, Association of Spine Surgeons of India</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Advanced Technology</h3>
                <p className="text-gray-700">State-of-the-art equipment including neuronavigation, intraoperative monitoring, and minimally invasive surgical techniques.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Patient-Centered Care</h3>
                <p className="text-gray-700">Individualized treatment plans with clear communication about risks, benefits, and recovery expectations.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Proven Outcomes</h3>
                <p className="text-gray-700">High success rates with faster recovery times and lower complication rates compared to traditional open surgery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Specialized Neurosurgical Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Endoscopic Spine Surgery</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Endoscopic Discectomy (6-8mm incision)</li>
                  <li>• Endoscopic Foraminotomy</li>
                  <li>• Endoscopic ULBD (Unilateral Laminotomy for Bilateral Decompression)</li>
                  <li>• Endoscopic Cervical Discectomy</li>
                  <li>• Same-day discharge for most procedures</li>
                </ul>
                <Link 
                  href="/services/minimally-invasive-spine-surgery" 
                  className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More About MISS →
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Brain Surgery</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Brain Tumor Surgery with Neuronavigation</li>
                  <li>• Awake Craniotomy for eloquent areas</li>
                  <li>• Intraoperative Monitoring</li>
                  <li>• Epilepsy Surgery (LITT, VNS, Resection)</li>
                  <li>• Microvascular Decompression (MVD)</li>
                </ul>
                <Link 
                  href="/services/brain-tumor-surgery-hyderabad" 
                  className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More About Brain Surgery →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Makes Dr Sayuj Different</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Conservative-First Approach</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj believes in exhausting conservative treatment options before recommending surgery. When surgery is needed, he uses the least invasive approach possible.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Thorough evaluation with advanced imaging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Clear explanation of all treatment options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Realistic expectations about recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">✓</span>
                    <span>Comprehensive follow-up care</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4 text-blue-700">Patient Success Stories</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-gray-700 italic">
                      "Dr Sayuj's endoscopic discectomy got me back to work in 2 weeks. The tiny incision healed quickly and I had minimal pain."
                    </p>
                    <p className="text-sm text-gray-600 mt-2">- Software Engineer, Hi-Tech City</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="text-gray-700 italic">
                      "The brain tumor surgery was successful and I'm back to my normal life. Dr Sayuj explained everything clearly."
                    </p>
                    <p className="text-sm text-gray-600 mt-2">- Teacher, Banjara Hills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Visit Dr Sayuj in Hyderabad</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Hospital Location</h3>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h4 className="text-xl font-semibold mb-4">Yashoda Hospital, Malakpet</h4>
                  <p className="text-gray-600 mb-4">
                    Room No 317, OPD Block<br/>
                    Malakpet, Hyderabad<br/>
                    Telangana 500036
                  </p>
                  <div className="space-y-2">
                    <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91 9778280044</a></p>
                    <p><strong>Email:</strong> <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">neurospinehyd@drsayuj.com</a></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-700">Areas Served</h3>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <p className="text-gray-700 mb-4">
                    Dr Sayuj serves patients from across Hyderabad and surrounding areas:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <h5 className="font-semibold text-blue-700 mb-2">Central Hyderabad</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Jubilee Hills</li>
                        <li>• Banjara Hills</li>
                        <li>• Hi-Tech City</li>
                        <li>• Gachibowli</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-700 mb-2">Other Areas</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Madhapur</li>
                        <li>• Kondapur</li>
                        <li>• Secunderabad</li>
                        <li>• LB Nagar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Consult with Hyderabad's Best Neurosurgeon?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Book a consultation with Dr Sayuj Krishnan to discuss your neurosurgical needs. Get expert evaluation and personalized treatment recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments" 
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Consultation Now
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
