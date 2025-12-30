import { SITE_URL } from "../../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Spine Surgeon in Yashoda Hospital Malakpet | Dr Sayuj Krishnan - Neurosurgeon",
  description: "Dr Sayuj Krishnan is the best spine surgeon in Yashoda Hospital Malakpet, Hyderabad. Expert neurosurgeon and spine specialist offering endoscopic spine surgery, minimally invasive procedures, and brain surgery. Easy access from Dilsukhnagar, Kothapet, LB Nagar.",
  keywords: [
    'best spine surgeon in yashoda hospital',
    'spine surgeon in yashoda hospital hyderabad',
    'yashoda hospital malakpet spine surgeon',
    'yashoda hospital spine surgeon',
    'best spine surgeon in yashoda hospital malakpet',
    'neurosurgeon in malakpet',
    'spine specialist in yashoda hospital',
  ],
  alternates: {
    canonical: `${SITE_URL}/locations/malakpet/`,
  },
};

export default function MalakpetLocationPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Best Spine Surgeon in Yashoda Hospital Malakpet, Hyderabad</h1>
        
        <section className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Yashoda Hospital, Malakpet</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Address:</strong> Room No 317, OPD Block, Yashoda Hospital, Nalgonda X Roads, Malakpet, Hyderabad 500036</p>
            <p><strong>Phone:</strong> <a href="tel:+919778280044" className="text-blue-600 hover:underline">+91-9778280044</a></p>
            <p><strong>Email:</strong> <a href="mailto:hellodr@drsayuj.info" className="text-blue-600 hover:underline">hellodr@drsayuj.info</a></p>
            <p><strong>Hours:</strong> Mon-Fri: 9 AM - 5 PM, Sat: 9 AM - 1 PM</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Services at Malakpet Location</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Endoscopic Spine Surgery</h3>
              <p className="text-sm text-gray-600">Minimally invasive disc herniation treatment</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Brain Tumor Surgery</h3>
              <p className="text-sm text-gray-600">Advanced microsurgical techniques</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Trigeminal Neuralgia Treatment</h3>
              <p className="text-sm text-gray-600">MVD and other surgical options</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-blue-700 mb-2">Cervical Myelopathy Surgery</h3>
              <p className="text-sm text-gray-600">Spinal cord decompression</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nearby Areas Served</h2>
          <p className="text-gray-700 mb-4">
            Easily accessible from Dilsukhnagar, Kothapet, Santoshnagar, Chaitanyapuri, Moosarambagh, Saidabad, and surrounding areas in Hyderabad.
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Book Your Consultation at Malakpet</h3>
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
            "@type": "MedicalClinic",
            "name": "Dr Sayuj Krishnan - Yashoda Hospital Malakpet",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Room No 317, OPD Block, Yashoda Hospital, Nalgonda X Roads",
              "addressLocality": "Malakpet",
              "addressRegion": "Telangana",
              "postalCode": "500036",
              "addressCountry": "IN"
            },
            "telephone": "+919778280044",
            "email": "hellodr@drsayuj.info",
            "medicalSpecialty": "Neurosurgery",
            "availableService": [
              {"@type": "MedicalProcedure", "name": "Endoscopic Spine Surgery"},
              {"@type": "MedicalProcedure", "name": "Brain Tumor Surgery"}
            ]
          })
        }}
      />
    </main>
  );
}
