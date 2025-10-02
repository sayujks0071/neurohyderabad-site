import { SITE_URL } from "../../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { MalakpetLocationStructuredData } from "./structured-data";

export const metadata: Metadata = {
  title: "Neurosurgeon in Malakpet, Hyderabad | Dr Sayuj Krishnan - Yashoda Hospital",
  description: "Expert neurosurgeon Dr Sayuj Krishnan at Yashoda Hospital, Malakpet. Specializing in endoscopic spine surgery and brain surgery. Easy access from all parts of Hyderabad.",
  alternates: {
    canonical: "/locations/malakpet",
  },
  openGraph: {
    title: "Neurosurgeon in Malakpet, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon at Yashoda Hospital, Malakpet. Advanced endoscopic spine surgery and brain surgery with easy access from all parts of Hyderabad.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Neurosurgeon in Malakpet, Hyderabad")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan - Yashoda Hospital")}`,
        width: 1200,
        height: 630,
        alt: "Neurosurgeon in Malakpet, Hyderabad - Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function MalakpetLocationPage() {
  return (
    <>
      <MalakpetLocationStructuredData />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Neurosurgeon in Malakpet, Hyderabad
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Dr Sayuj Krishnan at Yashoda Hospital — Expert Brain & Spine Surgery
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments" 
                className="bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Book Consultation
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Hospital Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Yashoda Hospital, Malakpet</h2>
                
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Hospital Address</h3>
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

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Consultation Hours</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</li>
                    <li><strong>Saturday:</strong> 9:00 AM - 1:00 PM</li>
                    <li><strong>Sunday:</strong> Closed</li>
                    <li><strong>Emergency:</strong> 24/7 coverage available</li>
                  </ul>
                </div>
              </div>

              {/* Map and Directions */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Location & Directions</h2>
                
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">How to Reach</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">By Metro</h4>
                      <p className="text-gray-700">
                        Take the Blue Line to Malakpet Metro Station. The hospital is a 5-minute walk from the station.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">By Bus</h4>
                      <p className="text-gray-700">
                        Multiple bus routes serve Malakpet. Get off at Yashoda Hospital bus stop.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">By Car</h4>
                      <p className="text-gray-700">
                        Located on the main road in Malakpet, easily accessible from all parts of Hyderabad. 
                        Ample parking available in the hospital complex.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Parking Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Free parking available for patients and visitors</li>
                    <li>• Valet parking service available</li>
                    <li>• Wheelchair accessible parking spaces</li>
                    <li>• Security personnel available 24/7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Serving Patients from Nearby Areas</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">Central Hyderabad</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Abids (15 minutes)</li>
                  <li>• Koti (10 minutes)</li>
                  <li>• Nampally (12 minutes)</li>
                  <li>• Secunderabad (20 minutes)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">South Hyderabad</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Banjara Hills (25 minutes)</li>
                  <li>• Jubilee Hills (30 minutes)</li>
                  <li>• Hi-Tech City (35 minutes)</li>
                  <li>• Gachibowli (40 minutes)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">East Hyderabad</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• LB Nagar (20 minutes)</li>
                  <li>• Uppal (15 minutes)</li>
                  <li>• Dilsukhnagar (10 minutes)</li>
                  <li>• Kothapet (8 minutes)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Neurosurgical Services at Malakpet</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Endoscopic Spine Surgery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Endoscopic Discectomy (6-8mm incision)</li>
                  <li>• Endoscopic Foraminotomy</li>
                  <li>• Endoscopic ULBD</li>
                  <li>• Endoscopic Cervical Discectomy</li>
                  <li>• Same-day discharge for most procedures</li>
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
                <ul className="space-y-2 text-gray-700">
                  <li>• Brain Tumor Surgery with Neuronavigation</li>
                  <li>• Awake Craniotomy</li>
                  <li>• Intraoperative Monitoring</li>
                  <li>• Epilepsy Surgery (LITT, VNS, Resection)</li>
                  <li>• Microvascular Decompression (MVD)</li>
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
            <h2 className="text-3xl font-bold mb-8">Visit Dr Sayuj in Malakpet</h2>
            <p className="text-lg text-gray-700 mb-8">
              Conveniently located at Yashoda Hospital, Malakpet. Easy access from all parts of Hyderabad 
              with excellent parking and public transport connectivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/appointments" 
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
