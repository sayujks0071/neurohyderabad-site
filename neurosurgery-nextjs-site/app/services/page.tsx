import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

// ISR: Revalidate every 24 hours
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Services | Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
  description: "Neurosurgery services in Hyderabad: brain tumor surgery, MISS/endoscopic spine, epilepsy surgery, and facial pain care.",
  alternates: {
    canonical: "/services",
    languages: {
      'en-IN': 'https://www.drsayuj.com/services/',
      'x-default': 'https://www.drsayuj.com/services/'
    }
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Neurosurgical Services")}&subtitle=${encodeURIComponent("Expert brain & spine care")}`,
        width: 1200,
        height: 630,
        alt: "Neurosurgical Services — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "Minimally Invasive Spine Surgery",
      description: "Tiny-incision minimally invasive spine surgery in Hyderabad. Endoscopic discectomy/foraminotomy with faster recovery when appropriate.",
      href: "/services/minimally-invasive-spine-surgery/",
      features: ["Smaller incisions", "Less muscle damage", "Faster recovery", "Lower infection risk"]
    },
    {
      title: "Endoscopic Discectomy",
      description: "Tiny-incision endoscopic discectomy for slip disc and sciatica in Hyderabad. Faster mobilization when appropriate.",
      href: "/services/endoscopic-discectomy-hyderabad/",
      features: ["Minimal scarring", "Quick recovery", "Reduced pain", "Outpatient procedures"]
    },
    {
      title: "Endoscopic Foraminotomy",
      description: "Targeted endoscopic decompression for foraminal stenosis with minimal tissue disruption. Clear recovery plan and insurance support.",
      href: "/services/endoscopic-foraminotomy-hyderabad/",
      features: ["Precise decompression", "Minimal tissue damage", "Faster healing", "Structured rehab"]
    },
    {
      title: "Endoscopic ULBD",
      description: "Tiny-incision endoscopic ULBD for lumbar spinal stenosis in Hyderabad. Who qualifies, benefits/risks, recovery, and day-care eligibility.",
      href: "/services/endoscopic-ulbd-hyderabad/",
      features: ["Bilateral decompression", "Single incision", "Day-care eligible", "Structured recovery"]
    },
    {
      title: "Endoscopic Cervical Discectomy",
      description: "Motion-preserving endoscopic cervical discectomy for selected radiculopathy cases. Multidisciplinary planning and clear rehab.",
      href: "/services/endoscopic-cervical-discectomy-hyderabad/",
      features: ["Motion preservation", "Minimal approach", "Neck/arm pain relief", "Structured recovery"]
    },
    {
      title: "Cervical Foraminotomy",
      description: "Endoscopic or microscopic cervical foraminotomy for nerve root decompression. Personalized approach based on anatomy and symptoms.",
      href: "/services/cervical-foraminotomy-hyderabad/",
      features: ["Nerve root decompression", "Flexible approach", "Neck/arm relief", "Individualized care"]
    },
    {
      title: "Brain Tumor Surgery",
      description: "Neuronavigation-guided microsurgery with neuromonitoring for maximal safe resection when appropriate. Multidisciplinary care.",
      href: "/services/brain-tumor-surgery-hyderabad/",
      features: ["Microsurgical precision", "Maximal safe resection", "Advanced imaging", "Multidisciplinary care"]
    },
    {
      title: "Microvascular Decompression (MVD)",
      description: "MVD for trigeminal neuralgia in Hyderabad—who qualifies, MRI planning, benefits/risks vs radiosurgery and percutaneous options.",
      href: "/services/microvascular-decompression-mvd-hyderabad/",
      features: ["Vascular decompression", "Durable pain relief", "Preserved sensation", "Comprehensive evaluation"]
    },
    {
      title: "Radiosurgery (Gamma Knife)",
      description: "Non-incisional radiosurgery for selected brain tumors and trigeminal neuralgia in Hyderabad. Indications, benefits/risks, recovery.",
      href: "/services/radiosurgery-gamma-knife-hyderabad/",
      features: ["No incision", "Outpatient treatment", "Precise targeting", "Minimal downtime"]
    },
    {
      title: "Epilepsy Surgery",
      description: "For drug-resistant epilepsy: LITT/resection/VNS after full workup. Individualized plans and clear risk counseling.",
      href: "/services/epilepsy-surgery-hyderabad/",
      features: ["Comprehensive evaluation", "Advanced techniques", "Multidisciplinary care", "Personalized treatment"]
    }
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Neurosurgical Services</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Dr Sayuj Krishnan offers comprehensive neurosurgical services using the latest minimally invasive techniques 
        for optimal patient outcomes and faster recovery.
      </p>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">{service.title}</h2>
            <p className="text-gray-600 mb-6">{service.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Key Benefits:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <Link 
              href={service.href}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Ready to Schedule a Consultation?</h2>
        <p className="text-gray-600 mb-6">Contact us to discuss your neurosurgical needs</p>
        <Link 
          href="/appointments"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg"
        >
          Book Appointment
        </Link>
      </div>
    </main>
  );
}
