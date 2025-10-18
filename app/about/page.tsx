import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dr Sayuj Krishnan | Neurosurgeon Hyderabad",
  description: "Dr Sayuj Krishnan is a highly experienced neurosurgeon with 15 years of expertise in minimally invasive brain and spine surgery in Hyderabad.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dr Sayuj Krishnan | Neurosurgeon Hyderabad",
    description: "Dr Sayuj Krishnan is a highly experienced neurosurgeon with 15 years of expertise in minimally invasive brain and spine surgery in Hyderabad.",
    url: `${SITE_URL}/about`,
    siteName: 'Dr. Sayuj Krishnan - Neurosurgeon Hyderabad',
    locale: 'en_IN',
    type: 'profile',
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("About Dr Sayuj Krishnan")}&subtitle=${encodeURIComponent("15 years of neurosurgical expertise")}`,
        width: 1200,
        height: 630,
        alt: "About Dr Sayuj Krishnan — Neurosurgeon in Hyderabad",
        type: 'image/jpeg'
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">About Dr Sayuj Krishnan</h1>
      
      <div className="max-w-4xl mx-auto">
        {/* Professional Credentials */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Professional Credentials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Education & Training</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>MBBS</strong> - Bachelor of Medicine and Bachelor of Surgery</li>
                <li><strong>DNB Neurosurgery</strong> - Direct 6 years program</li>
                <li><strong>Fellowship in Minimally Invasive and Advanced Spine Surgery</strong></li>
                <li><strong>Observer-ship in Full Endoscopic Spine Surgery</strong> (Germany)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Experience & Expertise</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>15+ years</strong> of neurosurgical experience</li>
                <li><strong>Thousands of successful procedures</strong> performed</li>
                <li><strong>Specialized training</strong> in advanced techniques</li>
                <li><strong>International exposure</strong> and training</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Clinical Specializations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Brain Surgery</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Brain tumor surgery with microsurgical techniques</li>
                <li>Epilepsy surgery and seizure control</li>
                <li>Minimally invasive approaches</li>
                <li>Neuronavigation and intraoperative monitoring</li>
                <li>Awake craniotomy for eloquent areas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Spine Surgery</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Minimally Invasive Spine Surgery (MISS)</li>
                <li>Endoscopic spine surgery</li>
                <li>Slip disc treatment and endoscopic discectomy</li>
                <li>Spinal stenosis decompression</li>
                <li>Complex spine reconstruction</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Dr. Sayuj is <Link href="/services/spine-surgery-hyderabad/" className="text-blue-600 hover:underline">a specialist in minimally invasive spine surgery in Hyderabad</Link>, 
                offering advanced endoscopic techniques for faster recovery and better outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Practice Philosophy */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Practice Philosophy</h2>
          <p className="text-gray-600 mb-4">
            Dr Sayuj Krishnan believes in providing personalized, evidence-based neurosurgical care that prioritizes 
            patient safety, optimal outcomes, and minimal invasiveness. His approach combines advanced surgical 
            techniques with compassionate patient care.
          </p>
          <p className="text-gray-600 mb-4">
            He emphasizes the importance of thorough evaluation, clear communication, and shared decision-making 
            with patients and their families. Every treatment plan is tailored to the individual patient's needs, 
            condition, and goals.
          </p>
        </div>

        {/* Practice Location */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Practice Location</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Yashoda Hospital, Malakpet</h3>
              <div className="text-gray-600">
                <p className="mb-2"><strong>Room No 317, OPD Block</strong></p>
                <p className="mb-2">Malakpet, Hyderabad</p>
                <p className="mb-4">Telangana 500036</p>
                <p className="mb-2"><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
                <p><strong>Email:</strong> <a href="mailto:neurospinehyd@drsayuj.com" className="text-blue-600 hover:underline">neurospinehyd@drsayuj.com</a></p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Areas Served</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Jubilee Hills</li>
                <li>Banjara Hills</li>
                <li>Hi-Tech City</li>
                <li>Gachibowli</li>
                <li>Madhapur</li>
                <li>Kondapur</li>
                <li>And across Hyderabad</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Memberships & Recognition */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-700">Professional Recognition</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">International Training</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Observer-ship in Full Endoscopic Spine Surgery (Germany)</li>
                <li>Advanced training in minimally invasive techniques</li>
                <li>Exposure to cutting-edge neurosurgical procedures</li>
                <li>International best practices implementation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Clinical Excellence</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>High success rates in complex procedures</li>
                <li>Minimal complication rates</li>
                <li>Patient-centered approach</li>
                <li>Continuous learning and improvement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Schedule a Consultation</h2>
          <p className="text-gray-600 mb-6">
            Experience expert neurosurgical care with Dr Sayuj Krishnan. Get personalized treatment 
            for your neurological condition with advanced minimally invasive techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/appointments"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg"
            >
              Book Appointment
            </a>
            <a 
              href="tel:+919778280044"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors text-lg"
            >
              Call +91-9778280044
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
