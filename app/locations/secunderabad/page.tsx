import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neurosurgeon in Secunderabad | Dr Sayuj Krishnan - Spine & Brain Surgery",
  description: "Expert neurosurgeon serving Secunderabad. Dr Sayuj Krishnan offers endoscopic spine surgery, brain tumor surgery. Accessible from Tarnaka, Malkajgiri, Alwal.",
  alternates: {
    canonical: `${SITE_URL}/locations/secunderabad/`,
  },
};

export default function SecunderabadLocationPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Serving Secunderabad</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan provides expert neurosurgical care for Secunderabad residents at Yashoda Hospital, Malakpet—easily accessible via the Inner Ring Road.
          </p>
        </section>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Clinic Location</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Yashoda Hospital, Malakpet</strong></p>
            <p>Room No 317, OPD Block, Nalgonda X Roads, Malakpet, Hyderabad 500036</p>
            <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
            <p><strong>From Secunderabad:</strong> ~10 km, 30-40 minutes via Mettuguda and Inner Ring Road</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Common Conditions Treated</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Lumbar Disc Herniation</h3>
              <p className="text-sm text-gray-600">Endoscopic discectomy for sciatica relief</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Cervical Spondylotic Myelopathy</h3>
              <p className="text-sm text-gray-600">Spinal cord decompression surgery</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Brain Tumors</h3>
              <p className="text-sm text-gray-600">Microsurgical tumor removal</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Trigeminal Neuralgia</h3>
              <p className="text-sm text-gray-600">Microvascular decompression</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Areas Served Near Secunderabad</h2>
          <p className="text-gray-700">
            Tarnaka, Malkajgiri, Alwal, East Marredpally, West Marredpally, Begumpet, Bowenpally, Trimulgherry, and all parts of Secunderabad.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Schedule Your Consultation from Secunderabad</h3>
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
            "name": "Dr Sayuj Krishnan - Neurosurgeon serving Secunderabad",
            "areaServed": {
              "@type": "Place",
              "name": "Secunderabad, Hyderabad"
            },
            "telephone": "+919778280044"
          })
        }}
      />
    </main>
  );
}
