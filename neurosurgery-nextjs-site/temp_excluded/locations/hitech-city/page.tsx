import { SITE_URL } from "../../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neurosurgeon Near Hi-Tech City, Hyderabad | Dr Sayuj Krishnan - Expert Brain & Spine Surgery",
  description: "Expert neurosurgeon Dr Sayuj Krishnan serving IT professionals from Hi-Tech City, Hyderabad. Specializing in endoscopic spine surgery and brain surgery. Convenient access from Hi-Tech City to Yashoda Hospital, Malakpet.",
  alternates: {
    canonical: "/locations/hitech-city",
  },
  openGraph: {
    title: "Neurosurgeon Near Hi-Tech City, Hyderabad | Dr Sayuj Krishnan",
    description: "Expert neurosurgeon serving IT professionals from Hi-Tech City, Hyderabad. Advanced endoscopic spine surgery and brain surgery with easy access from Hi-Tech City.",
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Neurosurgeon Near Hi-Tech City, Hyderabad")}&subtitle=${encodeURIComponent("Dr Sayuj Krishnan - Expert Brain & Spine Surgery")}`,
        width: 1200,
        height: 630,
        alt: "Neurosurgeon Near Hi-Tech City, Hyderabad - Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function HiTechCityLocationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Neurosurgeon Near Hi-Tech City, Hyderabad
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Dr Sayuj Krishnan — Expert Brain & Spine Surgery for IT Professionals
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
                <h2 className="text-3xl font-bold mb-6">Serving IT Professionals from Hi-Tech City</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Dr Sayuj Krishnan understands the unique needs of IT professionals from Hi-Tech City. 
                  With endoscopic spine surgery techniques, you can get back to your demanding work schedule 
                  faster than traditional surgery methods.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Perfect for IT Professionals</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Quick Recovery:</strong> Return to work in 1-2 weeks</li>
                    <li>• <strong>Minimal Downtime:</strong> Endoscopic procedures with small incisions</li>
                    <li>• <strong>Flexible Hours:</strong> Evening appointments available</li>
                    <li>• <strong>Corporate Billing:</strong> Direct billing to companies</li>
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

      {/* Directions from Hi-Tech City */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How to Reach from Hi-Tech City</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">By Car (35 minutes)</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Route 1:</strong> Hi-Tech City → Gachibowli → Mehdipatnam → Malakpet</p>
                  <p><strong>Route 2:</strong> Hi-Tech City → Jubilee Hills → Banjara Hills → Malakpet</p>
                  <p><strong>Route 3:</strong> Hi-Tech City → ORR → Uppal → Malakpet</p>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Peak Hours:</strong> Add 15-20 minutes during rush hours
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">By Metro (45 minutes)</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Step 1:</strong> Take Blue Line from Hi-Tech City Metro</p>
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
                <h3 className="text-lg font-semibold mb-4 text-blue-700">By Bus (50 minutes)</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Direct Routes:</strong> Multiple TSRTC buses available</p>
                  <p><strong>Bus Stops:</strong> Hi-Tech City → Malakpet</p>
                  <p><strong>Frequency:</strong> Every 20-30 minutes</p>
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

      {/* Common IT Professional Issues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Common Spine Issues in IT Professionals</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Cervical Spine Problems</h3>
                <p className="text-gray-700 mb-4">
                  Long hours at computer screens can cause neck pain, cervical disc herniation, and cervical radiculopathy.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Neck pain and stiffness</li>
                  <li>• Arm pain and numbness</li>
                  <li>• Headaches</li>
                  <li>• Shoulder blade pain</li>
                  <li>• Endoscopic cervical discectomy available</li>
                </ul>
                <Link 
                  href="/conditions/cervical-radiculopathy-treatment-hyderabad" 
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Lumbar Spine Problems</h3>
                <p className="text-gray-700 mb-4">
                  Prolonged sitting can lead to lower back pain, lumbar disc herniation, and sciatica.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lower back pain</li>
                  <li>• Leg pain and numbness</li>
                  <li>• Sciatica</li>
                  <li>• Difficulty sitting for long periods</li>
                  <li>• Endoscopic lumbar discectomy available</li>
                </ul>
                <Link 
                  href="/conditions/sciatica-treatment-hyderabad" 
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Dr Sayuj for IT Professionals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why IT Professionals Choose Dr Sayuj</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Quick Return to Work</h3>
                <p className="text-gray-700">
                  Endoscopic procedures mean minimal downtime. Most IT professionals return to work 
                  within 1-2 weeks, not months.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Corporate Billing</h3>
                <p className="text-gray-700">
                  Direct billing to your company. We work with major IT companies and insurance 
                  providers for hassle-free payments.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Flexible Scheduling</h3>
                <p className="text-gray-700">
                  Evening appointments available. We understand your busy schedule and work 
                  around your project deadlines.
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
            <h2 className="text-3xl font-bold text-center mb-12">What IT Professionals Say</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-700 italic mb-4">
                    "As a software engineer, I couldn't afford to be away from work for months. 
                    Dr Sayuj's endoscopic discectomy got me back to coding in just 2 weeks!"
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>- Software Engineer, Hi-Tech City</strong>
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-gray-700 italic mb-4">
                    "The cervical spine surgery was perfect for my neck pain from long coding sessions. 
                    Dr Sayuj understood my work pressure and provided the best solution."
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>- Tech Lead, Hi-Tech City</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work-Related Spine Care */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Work-Related Spine Care</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Prevention Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Maintain proper posture while working</li>
                  <li>• Take breaks every 30-45 minutes</li>
                  <li>• Use ergonomic chair and desk setup</li>
                  <li>• Keep monitor at eye level</li>
                  <li>• Stretch regularly during work hours</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-700">When to Seek Help</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Persistent neck or back pain</li>
                  <li>• Pain radiating to arms or legs</li>
                  <li>• Numbness or tingling</li>
                  <li>• Difficulty sitting for long periods</li>
                  <li>• Pain affecting work performance</li>
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
            <h2 className="text-3xl font-bold mb-8">Don't Let Spine Issues Affect Your Career</h2>
            <p className="text-lg text-gray-700 mb-8">
              Get back to your demanding IT career quickly with Dr Sayuj's advanced endoscopic spine surgery. 
              Minimal downtime, maximum results.
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
