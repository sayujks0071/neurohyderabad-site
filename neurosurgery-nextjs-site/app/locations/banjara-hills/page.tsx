import { SITE_URL } from "../../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neurosurgeon Near Banjara Hills, Hyderabad | Dr Sayuj Krishnan - Expert Brain & Spine Surgery",
  description: "Expert neurosurgeon Dr Sayuj Krishnan serving patients from Banjara Hills, Hyderabad. Specializing in endoscopic spine surgery and brain surgery. Convenient access from Banjara Hills to Yashoda Hospital, Malakpet.",
  alternates: {
    canonical: "/locations/banjara-hills",
  },
  openGraph: {
    title: "Neurosurgeon Near Banjara Hills, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon serving patients from Banjara Hills, Hyderabad. Advanced endoscopic spine surgery and brain surgery with easy access from Banjara Hills.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Neurosurgeon Near Banjara Hills, Hyderabad")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan - Expert Brain & Spine Surgery")}`,
        width: 1200,
        height: 630,
        alt: "Neurosurgeon Near Banjara Hills, Hyderabad - Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function BanjaraHillsLocationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Neurosurgeon Near Banjara Hills, Hyderabad
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Dr Sayuj Krishnan — Expert Brain & Spine Surgery with Easy Access from Banjara Hills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments" 
                className="bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Consultation
              </Link>
              <Link 
                href="/locations/malakpet" 
                className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Serving Patients from Banjara Hills</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj Krishnan provides expert neurosurgical care to patients from Banjara Hills and surrounding areas. 
                  Located at Yashoda Hospital, Malakpet, the clinic is easily accessible from Banjara Hills with excellent 
                  connectivity via multiple routes.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Quick Facts</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Distance:</strong> 25 minutes drive from Banjara Hills</li>
                    <li>• <strong>Metro Access:</strong> Blue Line to Malakpet Metro Station</li>
                    <li>• <strong>Parking:</strong> Free parking available at hospital</li>
                    <li>• <strong>Emergency:</strong> 24/7 neurosurgical coverage</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Hospital Location</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Dr Sayuj Krishnan</strong></p>
                  <p>Room No 317, OPD Block</p>
                  <p>Yashoda Hospital</p>
                  <p>Malakpet, Hyderabad</p>
                  <p>Telangana 500036</p>
                </div>
                
                <div className="mt-6 space-y-2">
                  <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91 9778280044</a></p>
                  <p><strong>Email:</strong> <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">neurospinehyd@drsayuj.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions from Banjara Hills */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How to Reach from Banjara Hills</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">By Car (25 minutes)</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Route 1:</strong> Banjara Hills → Road No. 1 → Masab Tank → Malakpet</p>
                  <p><strong>Route 2:</strong> Banjara Hills → Jubilee Hills → Hi-Tech City → Malakpet</p>
                  <p><strong>Route 3:</strong> Banjara Hills → Begumpet → Secunderabad → Malakpet</p>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Tip:</strong> Use Google Maps for real-time traffic updates
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">By Metro (35 minutes)</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Step 1:</strong> Take Blue Line from Jubilee Hills Check Post</p>
                  <p><strong>Step 2:</strong> Change at Secunderabad for Blue Line</p>
                  <p><strong>Step 3:</strong> Get down at Malakpet Metro Station</p>
                  <p><strong>Step 4:</strong> 5-minute walk to Yashoda Hospital</p>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Metro Card:</strong> Available at all stations
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">By Bus (40 minutes)</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Direct Routes:</strong> Multiple TSRTC buses available</p>
                  <p><strong>Bus Stops:</strong> Banjara Hills → Malakpet</p>
                  <p><strong>Frequency:</strong> Every 15-20 minutes</p>
                  <p><strong>Drop Point:</strong> Yashoda Hospital bus stop</p>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Bus App:</strong> Use TSRTC app for live tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Banjara Hills Patients */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Neurosurgical Services for Banjara Hills Patients</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Spine Surgery</h3>
                <p className="text-gray-700 mb-4">
                  Minimally invasive spine procedures with faster recovery and minimal scarring. 
                  Perfect for working professionals from Banjara Hills who need quick return to work.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Endoscopic Discectomy (6-8mm incision)</li>
                  <li>• Endoscopic Foraminotomy</li>
                  <li>• Endoscopic ULBD</li>
                  <li>• Same-day discharge for most procedures</li>
                  <li>• Return to work in 1-2 weeks</li>
                </ul>
                <Link 
                  href="/services/minimally-invasive-spine-surgery" 
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Brain Surgery</h3>
                <p className="text-gray-700 mb-4">
                  Advanced brain surgery with neuronavigation and intraoperative monitoring. 
                  Comprehensive care for complex neurological conditions.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Brain Tumor Surgery with Neuronavigation</li>
                  <li>• Awake Craniotomy for eloquent areas</li>
                  <li>• Epilepsy Surgery (LITT, VNS, Resection)</li>
                  <li>• Microvascular Decompression (MVD)</li>
                  <li>• Intraoperative Monitoring</li>
                </ul>
                <Link 
                  href="/services/brain-tumor-surgery-hyderabad" 
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Dr Sayuj from Banjara Hills */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Patients from Banjara Hills Choose Dr Sayuj</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Convenient Location</h3>
                <p className="text-gray-700">
                  Easy access from Banjara Hills with multiple transportation options. 
                  Free parking and metro connectivity make visits hassle-free.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Quick Recovery</h3>
                <p className="text-gray-700">
                  Endoscopic techniques mean faster recovery and quicker return to work. 
                  Perfect for busy professionals from Banjara Hills.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Expert Care</h3>
                <p className="text-gray-700">
                  Advanced training in Germany with 15+ years experience. 
                  State-of-the-art equipment and personalized treatment plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Patients from Banjara Hills Say</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-700 italic mb-4">
                    "Dr Sayuj's endoscopic discectomy was amazing. I was back to work in just 2 weeks. 
                    The drive from Banjara Hills was worth it for such excellent care."
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>- Software Engineer, Banjara Hills</strong>
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-700 italic mb-4">
                    "The brain tumor surgery was successful and I'm back to my normal life. 
                    Dr Sayuj explained everything clearly and the hospital is easily accessible."
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>- Business Owner, Banjara Hills</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance and Payment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Insurance & Payment Options</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Insurance Coverage</h3>
                <p className="text-gray-700 mb-4">
                  We accept most major insurance plans and can help you understand your coverage:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cashless treatment available</li>
                  <li>• Pre-authorization assistance</li>
                  <li>• Insurance claim processing</li>
                  <li>• Corporate tie-ups</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Payment Options</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cash payments</li>
                  <li>• Credit/Debit cards</li>
                  <li>• UPI payments</li>
                  <li>• EMI options available</li>
                  <li>• Corporate billing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Consult with Dr Sayuj?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Easy access from Banjara Hills to expert neurosurgical care. Book your consultation today 
              and experience world-class treatment with minimal disruption to your busy schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments" 
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                href="/locations/malakpet" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
