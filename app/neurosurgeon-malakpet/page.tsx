import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Neurosurgeon in Malakpet, Hyderabad | Dr. Sayuj Krishnan at Yashoda Hospital | Full Endoscopic Spine Surgery",
  description:
    "Dr. Sayuj Krishnan practices at Yashoda Hospital Malakpet. Expert neurosurgeon offering endoscopic spine surgery, brain tumor surgery, and 24/7 emergency neurosurgical care right in Malakpet, Hyderabad. Book consultation today.",
  keywords: "neurosurgeon malakpet, yashoda hospital malakpet neurosurgeon, spine surgeon malakpet, dr sayuj krishnan malakpet, endoscopic spine surgery malakpet",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-malakpet" },
  openGraph: {
    title: "Neurosurgeon in Malakpet | Dr. Sayuj Krishnan at Yashoda Hospital",
    description: "Expert neurosurgeon practicing at Yashoda Hospital Malakpet with endoscopic spine surgery and brain surgery expertise.",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    type: "website",
  },
};

const FAQ = [
  { q: "Where exactly is Dr. Sayuj's clinic in Malakpet?", a: "Dr. Sayuj Krishnan's clinic is at Room 317, OPD Block, Yashoda Hospital, Alexander Road, Malakpet, Hyderabad 500036. It's centrally located and easily accessible from all parts of Malakpet." },
  { q: "What services are available at the Malakpet clinic?", a: "Full range of neurosurgical services including endoscopic spine surgery, brain tumor surgery, trigeminal neuralgia treatment, cervical myelopathy decompression, and 24/7 emergency neurosurgical care." },
  { q: "Is parking available at Yashoda Hospital Malakpet?", a: "Yes, Yashoda Hospital has extensive on-site parking facilities with dedicated visitor parking. Valet service is also available during peak hours." },
  { q: "How do I book an appointment at the Malakpet clinic?", a: "Book instantly via WhatsApp (+91 9778280044), call directly, or use our online appointment system. Walk-in consultations are also available during OPD hours." },
  { q: "Do you accept insurance at Yashoda Hospital Malakpet?", a: "Yes, we accept all major health insurance policies with cashless TPA approvals. Our team assists with pre-authorization and claims processing." },
];

export default function MalakpetNeurosurgeonPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.drsayuj.info/" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.drsayuj.info/locations" },
      { "@type": "ListItem", position: 3, name: "Neurosurgeon in Malakpet", item: "https://www.drsayuj.info/neurosurgeon-malakpet" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr. Sayuj Krishnan - Neurosurgeon at Yashoda Hospital Malakpet",
    description: "Full neurosurgical services including endoscopic spine surgery and brain surgery at Yashoda Hospital Malakpet",
    url: "https://www.drsayuj.info/neurosurgeon-malakpet",
    telephone: "+91-9778280044",
    email: "neurospinehyd@drsayuj.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Room 317, OPD Block, Yashoda Hospital, Alexander Road",
      addressLocality: "Malakpet, Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500036",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.375,
      longitude: 78.5147,
    },
    areaServed: {
      "@type": "City",
      name: "Malakpet, Hyderabad",
    },
    priceRange: "₹₹₹",
  };

  return (
    <main className="bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-sm uppercase tracking-wide text-blue-100">
            Yashoda Hospital Malakpet · Hyderabad
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Neurosurgeon in Malakpet, Hyderabad
          </h1>
          <p className="mt-4 text-xl text-blue-50">
            Dr. Sayuj Krishnan – Your Local Neurosurgeon at Yashoda Hospital Malakpet. Full Endoscopic Spine Surgery • Brain Tumor Surgery • 24/7 Emergency Care • 15+ Years Experience
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://wa.me/919778280044" className="rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600">
              WhatsApp: +91 9778280044
            </a>
            <a href="tel:+919778280044" className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-blue-800">
              Call Now
            </a>
            <a href="https://maps.google.com/?q=Yashoda+Hospitals+Malakpet+Hyderabad" className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-blue-800" target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Expert Neurosurgical Care Right in Malakpet
            </h2>
            <p className="mt-4 text-gray-700">
              Dr. Sayuj Krishnan brings world-class neurosurgical expertise to <strong>Malakpet</strong>, 
              one of Hyderabad's most accessible neighborhoods. Our clinic at Yashoda Hospital Malakpet 
              offers the full spectrum of brain and spine surgery services—from minimally invasive daycare 
              procedures to complex brain tumor resections.
            </p>
            <p className="mt-4 text-gray-700">
              Conveniently located on Alexander Road in the heart of Malakpet, we serve patients from 
              Dilsukhnagar, LB Nagar, Charminar, Moosarambagh, and surrounding areas. As a fellowship-trained 
              neurosurgeon with German training in endoscopic spine surgery, Dr. Sayuj offers cutting-edge 
              minimally invasive techniques with same-day discharge for most spine procedures.
            </p>
            
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="font-semibold text-blue-800">Why Choose Our Malakpet Clinic:</h3>
              <ul className="mt-3 space-y-2 text-blue-900">
                <li>✓ <strong>Centrally located</strong> at Yashoda Hospital Malakpet</li>
                <li>✓ <strong>15+ years</strong> neurosurgical experience</li>
                <li>✓ <strong>German fellowship</strong> in endoscopic spine surgery</li>
                <li>✓ <strong>Same-day discharge</strong> for most spine procedures</li>
                <li>✓ <strong>24/7 emergency</strong> neurosurgical care</li>
                <li>✓ <strong>All major insurance</strong> accepted (cashless TPA)</li>
                <li>✓ <strong>Ample parking</strong> and easy access</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700">
                Comprehensive Neurosurgical Services
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Full Endoscopic Spine Surgery</h4>
                  <p className="text-sm text-gray-600">Minimally invasive spine surgery through 6-8mm incision, same-day discharge</p>
                  <Link href="/services/endoscopic-spine-surgery-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Brain Tumor Surgery</h4>
                  <p className="text-sm text-gray-600">Advanced microsurgical techniques with neuronavigation</p>
                  <Link href="/conditions/brain-tumor-surgery-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emergency Brain Bleed Evacuation</h4>
                  <p className="text-sm text-gray-600">24/7 emergency endoscopic hemorrhage evacuation</p>
                  <Link href="/conditions/brain-bleed-evacuation-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Trigeminal Neuralgia Treatment</h4>
                  <p className="text-sm text-gray-600">Microvascular decompression for facial pain relief</p>
                  <Link href="/conditions/trigeminal-neuralgia-treatment-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Cervical Myelopathy Surgery</h4>
                  <p className="text-sm text-gray-600">Endoscopic decompression for spinal cord compression</p>
                  <Link href="/conditions/cervical-myelopathy-decompression-hyderabad" className="text-sm text-blue-600 hover:underline">Learn more →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-gray-900">Visit Us at Yashoda Hospital Malakpet</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-blue-700">Clinic Address</h3>
                <p className="mt-4 text-gray-700">
                  <strong>Dr. Sayuj Krishnan</strong><br />
                  Room No. 317, OPD Block<br />
                  Yashoda Hospital<br />
                  Alexander Road, Malakpet<br />
                  Hyderabad, Telangana 500036
                </p>
                
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-gray-900">Contact Information</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>📞 <strong>Phone:</strong> +91 9778280044</li>
                    <li>✉️ <strong>Email:</strong> neurospinehyd@drsayuj.com</li>
                    <li>💬 <strong>WhatsApp:</strong> +91 9778280044</li>
                  </ul>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <h4 className="font-semibold text-gray-900">OPD Timings</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• Monday – Saturday: 10:00 AM – 4:00 PM</li>
                    <li>• Emergency: 24×7 via hospital</li>
                    <li>• Teleconsultation: Available</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="font-semibold text-blue-800">Nearby Landmarks</h4>
                <ul className="mt-2 space-y-1 text-sm text-blue-900">
                  <li>• Near Malakpet Railway Station (2 km)</li>
                  <li>• Close to Dilsukhnagar (3 km)</li>
                  <li>• Accessible from Charminar (4 km)</li>
                  <li>• Easy access from LB Nagar (5 km)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700">Location Map</h3>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border shadow-lg">
                <iframe
                  title="Yashoda Hospital Malakpet Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d78.5147!3d17.3750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225326!2sYashoda%20Hospital%20Malakpet!5e0!3m2!1sen!2sin!4v1234567890"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="font-semibold text-green-800">Public Transport</h4>
                <p className="mt-2 text-sm text-green-900">
                  <strong>Nearest Metro:</strong> Malakpet Station (Green Line) – 10 min walk<br />
                  <strong>Bus Routes:</strong> Multiple TSRTC buses serve Malakpet area<br />
                  <strong>Auto/Taxi:</strong> Easily available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-4">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-blue-700">{q}</summary>
              <p className="mt-3 text-gray-700">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Consultation Today</h2>
          <p className="mt-4 text-lg text-gray-700">
            Expert neurosurgical care right in Malakpet at Yashoda Hospital.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/appointments" className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
              Book Online Appointment
            </Link>
            <a href="tel:+919778280044" className="rounded-full border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white">
              Call: +91 9778280044
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </main>
  );
}

