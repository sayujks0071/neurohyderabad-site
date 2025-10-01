import { SITE_URL } from "../../src/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions | Dr Sayuj Krishnan - Neurosurgeon in Hyderabad",
  description: "Expert treatment for neurological conditions including slip disc, spinal stenosis, trigeminal neuralgia, and brain tumors in Hyderabad.",
  alternates: {
    canonical: "/conditions",
  },
  openGraph: {
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent("Neurological Conditions")}&subtitle=${encodeURIComponent("Expert diagnosis & treatment")}`,
        width: 1200,
        height: 630,
        alt: "Neurological Conditions — Dr Sayuj Krishnan",
      },
    ],
  },
};

export default function ConditionsPage() {
  const conditions = [
    {
      title: "Slip Disc (Herniated Disc) Treatment",
      description: "Accurate diagnosis and effective treatment for slip disc and sciatica with endoscopic discectomy and same-day ambulation.",
      href: "/conditions/slip-disc-treatment-hyderabad",
      symptoms: ["Back/leg pain", "Numbness", "Weakness", "Sciatica"]
    },
    {
      title: "Spinal Stenosis Treatment",
      description: "Relief for leg pain and numbness from spinal stenosis with evidence-based therapy and minimally invasive decompression.",
      href: "/conditions/spinal-stenosis-treatment-hyderabad",
      symptoms: ["Leg pain", "Numbness", "Walking difficulty", "Neurogenic claudication"]
    },
    {
      title: "Trigeminal Neuralgia Treatment",
      description: "Personalized care with medical therapy, microvascular decompression, and radiosurgery for facial pain relief.",
      href: "/conditions/trigeminal-neuralgia-treatment-hyderabad",
      symptoms: ["Severe facial pain", "Electric shock episodes", "Trigger zones", "Brief episodes"]
    },
    {
      title: "Brain Tumor Treatment",
      description: "Comprehensive care for brain tumors with advanced diagnosis, microsurgery, and recovery planning.",
      href: "/conditions/brain-tumor-treatment-hyderabad",
      symptoms: ["Headaches", "Seizures", "Vision changes", "Cognitive changes"]
    }
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Neurological Conditions We Treat</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Dr Sayuj Krishnan provides expert diagnosis and treatment for a wide range of neurological conditions 
        using the latest minimally invasive techniques and evidence-based approaches.
      </p>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {conditions.map((condition, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">{condition.title}</h2>
            <p className="text-gray-600 mb-6">{condition.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Common Symptoms:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {condition.symptoms.map((symptom, idx) => (
                  <li key={idx}>{symptom}</li>
                ))}
              </ul>
            </div>
            
            <Link 
              href={condition.href}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">Need Expert Diagnosis?</h2>
        <p className="text-gray-600 mb-6">Contact us for a comprehensive evaluation</p>
        <Link 
          href="/appointments"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors text-lg"
        >
          Book Consultation
        </Link>
      </div>
    </main>
  );
}
