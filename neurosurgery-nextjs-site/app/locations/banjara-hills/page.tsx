import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neurosurgeon in Banjara Hills, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgical care near Banjara Hills. Dr Sayuj Krishnan offers advanced spine and brain surgery. Convenient access from Jubilee Hills, Punjagutta.",
  alternates: {
    canonical: `${SITE_URL}/locations/banjara-hills/`,
  },
};

export default function BanjaraHillsLocationPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Banjara Hills</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan serves patients from Banjara Hills at Yashoda Hospital, Malakpet—conveniently accessible within 20-30 minutes from Banjara Hills, Jubilee Hills, and Road No. 10 areas.
          </p>
        </section>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Primary Practice Location</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Yashoda Hospital, Malakpet</strong></p>
            <p>Room No 317, OPD Block, Nalgonda X Roads, Malakpet, Hyderabad 500036</p>
            <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
            <p><strong>Distance from Banjara Hills:</strong> ~6 km, 20-30 minutes by car</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Specialized Services</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Endoscopic Spine Surgery for disc herniation</li>
            <li>• Minimally Invasive Brain Tumor Surgery</li>
            <li>• Trigeminal Neuralgia (Microvascular Decompression)</li>
            <li>• Cervical Myelopathy Treatment</li>
            <li>• Epilepsy Surgery Evaluation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Banjara Hills Patients Choose Dr Sayuj</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <p className="font-semibold text-blue-700">15+ Years Experience</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <p className="font-semibold text-blue-700">Advanced Training in Germany</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <p className="font-semibold text-blue-700">Minimally Invasive Techniques</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Book Your Consultation from Banjara Hills</h3>
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
            "name": "Dr Sayuj Krishnan - Neurosurgeon serving Banjara Hills",
            "areaServed": {
              "@type": "Place",
              "name": "Banjara Hills, Hyderabad"
            },
            "telephone": "+919778280044",
            "medicalSpecialty": "Neurosurgery"
          })
        }}
      />
    </main>
  );
}
