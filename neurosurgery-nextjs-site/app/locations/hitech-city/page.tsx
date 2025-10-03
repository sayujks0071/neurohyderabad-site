import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neurosurgeon Near Hi-Tech City, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert spine and brain surgeon serving Hi-Tech City, Madhapur, Gachibowli. Dr Sayuj Krishnan offers minimally invasive neurosurgery with advanced techniques.",
  alternates: {
    canonical: `${SITE_URL}/locations/hitech-city/`,
  },
};

export default function HiTechCityLocationPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Hi-Tech City</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan provides comprehensive neurosurgical care for Hi-Tech City professionals at Yashoda Hospital, Malakpet—accessible within 30-40 minutes from the IT corridor.
          </p>
        </section>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Practice Location</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Yashoda Hospital, Malakpet</strong></p>
            <p>Room No 317, OPD Block, Nalgonda X Roads, Malakpet, Hyderabad 500036</p>
            <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
            <p><strong>From Hi-Tech City:</strong> ~12 km, 30-40 minutes via Outer Ring Road</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">For IT Professionals: Work-Life Compatible Surgery</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Minimally Invasive Techniques</h3>
              <p className="text-sm text-gray-600">Faster recovery, less downtime for busy professionals</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Day-Care Surgery Options</h3>
              <p className="text-sm text-gray-600">Selected endoscopic procedures allow same-day discharge</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Quick Return to Desk Work</h3>
              <p className="text-sm text-gray-600">Many patients resume remote work within 1-2 weeks</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Common Issues for Tech Workers</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Cervical Disc Herniation:</strong> From prolonged sitting and poor posture</li>
            <li>• <strong>Lumbar Disc Herniation:</strong> Back pain radiating to legs</li>
            <li>• <strong>Cervical Myelopathy:</strong> Spinal cord compression from degenerative changes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nearby Areas Served</h2>
          <p className="text-gray-700">
            Hi-Tech City, Madhapur, Gachibowli, Kondapur, Kukatpally, Manikonda, Nanakramguda, Financial District.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Book Your Consultation from Hi-Tech City</h3>
          <Link href="/appointments" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors inline-block">
            Book Appointment
          </Link>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dr Sayuj Krishnan - Neurosurgeon serving Hi-Tech City",
            "areaServed": {
              "@type": "Place",
              "name": "Hi-Tech City, Hyderabad"
            },
            "telephone": "+919778280044"
          })
        }}
      />
    </main>
  );
}
