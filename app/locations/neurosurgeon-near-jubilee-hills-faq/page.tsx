import React from 'react';
import Link from 'next/link';
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { notFound } from "next/navigation";
import ReviewedBy from '@/app/_components/ReviewedBy';
import MedicalCitations from '@/app/_components/MedicalCitations';
import SmartImage from '@/components/SmartImage';
import LocationPageTracker from '@/src/components/LocationPageTracker';

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: 'Neurosurgeon Near Jubilee Hills FAQ | Dr. Sayuj Krishnan',
  description: 'Frequently asked questions about finding a neurosurgeon near Jubilee Hills, Hyderabad. Expert answers from Dr. Sayuj Krishnan about brain and spine surgery options.',
  alternates: {
    canonical: 'https://www.drsayuj.info/locations/neurosurgeon-near-jubilee-hills-faq',
  },
};

const FAQ = [
    {
      q: "Who is the best neurosurgeon near Jubilee Hills?",
      a: "Dr. Sayuj Krishnan is a leading neurosurgeon accessible from Jubilee Hills, specializing in minimally invasive brain and spine surgery. With over 9 years of experience and advanced training in Germany, he offers endoscopic spine surgery with same-day discharge options."
    },
    {
      q: "How far is Dr. Sayuj's clinic from Jubilee Hills?",
      a: "Dr. Sayuj practices at Yashoda Hospital Malakpet, approximately 15-20 km from Jubilee Hills. The journey takes 30-45 minutes by road via ORR, or 25-35 minutes by metro from Jubilee Hills to Malakpet."
    },
    {
      q: "What spine conditions can be treated near Jubilee Hills?",
      a: "Dr. Sayuj treats all spine conditions including slip disc, spinal stenosis, spondylolisthesis, sciatica, and spinal tumors. He specializes in endoscopic spine surgery with 6-8mm incisions and same-day discharge for many procedures."
    },
    {
      q: "Is there emergency neurosurgery available near Jubilee Hills?",
      a: "Yes, Dr. Sayuj provides 24/7 emergency neurosurgery services. For urgent cases, you can call +91 97782 80044 or visit Yashoda Hospital Malakpet's emergency department, which is easily accessible from Jubilee Hills."
    },
    {
      q: "What are the costs of neurosurgery near Jubilee Hills?",
      a: "Costs vary by procedure. Endoscopic discectomy costs ₹1.5-2L, spinal fusion ₹3-4L, and brain tumor surgery ₹4-5.5L. Dr. Sayuj offers transparent pricing and works with most insurance providers for cashless treatment."
    },
    {
      q: "How do I book an appointment with a neurosurgeon near Jubilee Hills?",
      a: "You can book online at www.drsayuj.info/appointments, call +91 97782 80044, or visit Yashoda Hospital Malakpet. Dr. Sayuj offers flexible appointment timings and same-day consultations for urgent cases."
    }
  ];

export default function NeurosurgeonNearJubileeHillsFAQPage() {
  const location = getLocationById("jubilee-hills");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
    { name: "Locations", item: 'https://www.drsayuj.info/locations' },
    { name: "Neurosurgeon Near Jubilee Hills FAQ", item: 'https://www.drsayuj.info/locations/neurosurgeon-near-jubilee-hills-faq' }
  ];

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 py-12">
      <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Neurosurgeon Near Jubilee Hills FAQ | Dr. Sayuj Krishnan</h1>

      <section className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Quick answers</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Dr. Sayuj Krishnan is the leading neurosurgeon accessible from Jubilee Hills.</li>
          <li>Located at Yashoda Hospital Malakpet, 15-20 km from Jubilee Hills.</li>
          <li>Specializes in minimally invasive endoscopic spine surgery.</li>
          <li>24/7 emergency services and same-day discharge options available.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Neurosurgeon consultation near Jubilee Hills"
        className="mb-10 rounded-xl w-full h-auto object-cover"
        priority
      />

      <p className="text-lg text-gray-700 mb-8">
        If you're looking for a neurosurgeon near Jubilee Hills, Dr. Sayuj Krishnan provides expert brain and spine surgery 
        care at Yashoda Hospital Malakpet. This FAQ addresses common questions about accessing neurosurgical care from Jubilee Hills.
      </p>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
      
      <div className="space-y-6 mb-12">
        {FAQ.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">{faq.q}</h3>
            <p className="text-gray-700">{faq.a}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Getting to Dr. Sayuj from Jubilee Hills</h2>
      
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">By Road</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Distance:</strong> 15-20 km</p>
            <p><strong>Travel Time:</strong> 30-45 minutes</p>
            <p><strong>Route:</strong> Jubilee Hills → ORR → Malakpet → Yashoda Hospital</p>
            <p><strong>Parking:</strong> Ample parking available at hospital</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">By Metro</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Route:</strong> Jubilee Hills Metro → Malakpet Metro</p>
            <p><strong>Travel Time:</strong> 25-35 minutes</p>
            <p><strong>Walk:</strong> 5 minutes from Malakpet Metro to hospital</p>
            <p><strong>Frequency:</strong> Every 5-10 minutes</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Services Available Near Jubilee Hills</h2>
      
      <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-100">
        <h3 className="text-lg font-semibold mb-4 text-green-800">Neurosurgical Services</h3>
        <div className="grid md:grid-cols-2 gap-4 text-green-900">
          <div>
            <h4 className="font-semibold mb-2">Spine Surgery</h4>
            <ul className="text-sm space-y-1">
              <li>• Endoscopic discectomy</li>
              <li>• Spinal fusion (TLIF/ACDF)</li>
              <li>• Spinal decompression</li>
              <li>• Spinal tumor surgery</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Brain Surgery</h4>
            <ul className="text-sm space-y-1">
              <li>• Brain tumor surgery</li>
              <li>• Trigeminal neuralgia treatment</li>
              <li>• Hydrocephalus treatment</li>
              <li>• Aneurysm surgery</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Patient Success Stories from Jubilee Hills</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-12 border border-blue-100">
        <blockquote className="text-lg text-gray-700 mb-4 italic">
          "I traveled from Jubilee Hills for my endoscopic discectomy with Dr. Sayuj. The journey was worth it - 
          I was walking the same day and back to work in 2 weeks. The minimally invasive approach made all the difference."
        </blockquote>
        <cite className="text-blue-600 font-semibold">— Rajesh Kumar, Software Engineer, Jubilee Hills</cite>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Emergency Contact Information</h2>
      
      <div className="bg-red-50 rounded-lg p-6 mb-12 border border-red-100">
        <h3 className="text-xl font-semibold mb-4 text-red-800">24/7 Emergency Services</h3>
        <div className="space-y-3 text-red-900">
          <div className="flex items-center">
            <span className="text-red-600 mr-3">📞</span>
            <div>
              <strong>Emergency Hotline:</strong> <a href="tel:+919778280044" className="hover:underline">+91 97782 80044</a>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-red-600 mr-3">🏥</span>
            <div>
              <strong>Hospital:</strong> Yashoda Hospital Malakpet Emergency Department
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-red-600 mr-3">📍</span>
            <div>
              <strong>Address:</strong> OPD Block, Room No 317, Yashoda Hospital, Malakpet
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8 border border-blue-100">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Ready to Consult with Dr. Sayuj?</h2>
        <p className="mb-6 text-blue-900">
          Get expert neurosurgical care accessible from Jubilee Hills. Dr. Sayuj offers personalized treatment 
          with advanced minimally invasive techniques and same-day discharge options.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/appointments" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Book Consultation
          </Link>
          <Link 
            href="/contact" 
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Get Directions
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <LocalPathways mode="location" locationId={location.id} />
      </div>

      <div className="mt-12">
        <LocationNAPCard location={location} />
      </div>

      <div className="mt-12">
        <ReviewedBy lastReviewed="2025-01-15" />
        <MedicalCitations />
      </div>

      <LocationPageTracker location="jubilee-hills" />
    </main>
  );
}
