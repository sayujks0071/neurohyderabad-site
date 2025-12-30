import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Neurosurgeon in LB Nagar, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon serving LB Nagar. Dr Sayuj Krishnan offers spine and brain surgery at nearby Yashoda Hospital. Accessible from Vanasthalipuram, Nagole.",
  alternates: {
    canonical: `${SITE_URL}/locations/lb-nagar/`,
  },
};

export default function LBNagarLocationPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near LB Nagar</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan provides expert neurosurgical care for LB Nagar residents at Yashoda Hospital, Malakpet—conveniently located just 10 minutes away.
          </p>
        </section>

        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Clinic Details</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Yashoda Hospital, Malakpet</strong></p>
            <p>Room No 317, OPD Block, Nalgonda X Roads, Malakpet, Hyderabad 500036</p>
            <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
            <p><strong>Email:</strong> <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">hellodr@drsayuj.info</a></p>
            <p><strong>From LB Nagar:</strong> ~4 km, 10-15 minutes</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Comprehensive Neurosurgical Services</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Endoscopic Spine Surgery</h3>
              <p className="text-sm text-gray-600">Minimally invasive treatment for herniated discs</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Brain Tumor Surgery</h3>
              <p className="text-sm text-gray-600">Advanced microsurgical removal</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Facial Pain Surgery</h3>
              <p className="text-sm text-gray-600">Trigeminal neuralgia treatment</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Spinal Stenosis Treatment</h3>
              <p className="text-sm text-gray-600">Decompression for nerve compression</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why LB Nagar Patients Choose Dr Sayuj</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Close proximity to LB Nagar (10-15 minutes)</li>
            <li>✓ Advanced training in minimally invasive techniques</li>
            <li>✓ Day-care surgery options for selected cases</li>
            <li>✓ Insurance and cashless treatment accepted</li>
            <li>✓ Comprehensive pre and post-operative care</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nearby Areas Served</h2>
          <p className="text-gray-700">
            LB Nagar, Vanasthalipuram, Nagole, Kothapet, Hayathnagar, Pedda Amberpet, Mansoorabad, and surrounding areas.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Book Your Consultation from LB Nagar</h3>
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
            "name": "Dr Sayuj Krishnan - Neurosurgeon serving LB Nagar",
            "areaServed": {
              "@type": "Place",
              "name": "LB Nagar, Hyderabad"
            },
            "telephone": "+919778280044",
            "email": "hellodr@drsayuj.info"
          })
        }}
      />
    </main>
  );
}
