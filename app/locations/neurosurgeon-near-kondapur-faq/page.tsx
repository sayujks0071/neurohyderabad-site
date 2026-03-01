import React from 'react';
import Link from 'next/link';
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
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
  title: 'Neurosurgeon Near Kondapur FAQ | Dr. Sayuj Krishnan',
  description: 'Frequently asked questions about finding a neurosurgeon near Kondapur, Hyderabad. Expert answers from Dr. Sayuj Krishnan about brain and spine surgery options.',
  alternates: {
    canonical: 'https://www.drsayuj.info/locations/neurosurgeon-near-kondapur-faq',
  },
};

const FAQ = [
    {
      q: "Who is the best neurosurgeon near Kondapur?",
      a: "Dr. Sayuj Krishnan is a leading neurosurgeon accessible from Kondapur, specializing in minimally invasive brain and spine surgery. With over 9 years of experience and advanced training in Germany, he offers endoscopic spine surgery with same-day discharge options."
    },
    {
      q: "How far is Dr. Sayuj's clinic from Kondapur?",
      a: "Dr. Sayuj practices at Yashoda Hospital Malakpet. The journey typically takes 40-50 minutes by road via Hitech City → Jubilee Hills, or you can use the Metro to Malakpet for a faster commute during peak hours."
    },
    {
      q: "What spine conditions can be treated near Kondapur?",
      a: "Dr. Sayuj treats all spine conditions including slip disc, spinal stenosis, spondylolisthesis, sciatica, and spinal tumors. He specializes in endoscopic spine surgery with 6-8mm incisions and same-day discharge for many procedures."
    },
    {
      q: "Is there emergency neurosurgery available near Kondapur?",
      a: "Yes, Dr. Sayuj provides 24/7 emergency neurosurgery services. For urgent cases, you can call +91 97782 80044 or visit Yashoda Hospital Malakpet's emergency department, which is easily accessible from Kondapur."
    },
    {
      q: "What are the costs of neurosurgery near Kondapur?",
      a: "Costs vary by procedure. Endoscopic discectomy costs ₹1.5-2L, spinal fusion ₹3-4L, and brain tumor surgery ₹4-5.5L. Dr. Sayuj offers transparent pricing and works with most insurance providers for cashless treatment."
    },
    {
      q: "How do I book an appointment with a neurosurgeon near Kondapur?",
      a: "You can book online at www.drsayuj.info/appointments, call +91 97782 80044, or visit Yashoda Hospital Malakpet. Dr. Sayuj offers flexible appointment timings and same-day consultations for urgent cases."
    }
  ];

export default function NeurosurgeonNearKondapurFAQPage() {
  // Mapping Kondapur to Hitech City as it is the closest and most relevant cluster
  // But strictly using 'kondapur' location data if available might be better if it exists.
  // We have 'kondapur' in locations.ts. Let's use it.
  const location = getLocationById("kondapur") || getLocationById("hitech-city");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
    { name: "Locations", item: 'https://www.drsayuj.info/locations' },
    { name: "Neurosurgeon Near Kondapur FAQ", item: 'https://www.drsayuj.info/locations/neurosurgeon-near-kondapur-faq' }
  ];

  return (
    <main id="main" className="max-w-4xl mx-auto px-4 py-12">
      <LocationSchema location={location}  faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold mb-8">Neurosurgeon Near Kondapur FAQ | Dr. Sayuj Krishnan</h1>

      <section className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm leading-6">
        <h2 className="mb-2 text-base font-semibold text-blue-900">Quick answers</h2>
        <ul className="list-disc pl-5 text-blue-900">
          <li>Dr. Sayuj Krishnan is the leading neurosurgeon accessible from Kondapur.</li>
          <li>Located at Yashoda Hospital Malakpet, accessible via Hitech City road.</li>
          <li>Specializes in minimally invasive endoscopic spine surgery.</li>
          <li>24/7 emergency services and same-day discharge options available.</li>
        </ul>
      </section>

      <SmartImage
        src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80"
        width={1400}
        height={780}
        alt="Neurosurgeon consultation near Kondapur"
        className="mb-10 rounded-xl w-full h-auto object-cover"
        priority
      />

      <p className="text-lg text-gray-700 mb-8">
        If you're looking for a neurosurgeon near Kondapur, Dr. Sayuj Krishnan provides expert brain and spine surgery 
        care at Yashoda Hospital Malakpet. This FAQ addresses common questions about accessing neurosurgical care from Kondapur.
      </p>

      <div className="mb-12">
         <LocationCTAs location={location} />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
      
      <div className="space-y-6 mb-12">
        {FAQ.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">{faq.q}</h3>
            <p className="text-gray-700">{faq.a}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Getting to Dr. Sayuj from Kondapur</h2>
      
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">By Road</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Travel Time:</strong> 40-50 minutes</p>
            <p><strong>Route:</strong> Kondapur → Jubilee Hills → Malakpet → Yashoda Hospital</p>
            <p><strong>Parking:</strong> Ample parking available at hospital</p>
          </div>
        </div>
        
        <div>
           <LocationMapEmbed location={location} />
        </div>
      </div>

      <div className="mb-12">
        <LocalPathways mode="location" locationId={location.id} />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Patient Success Stories from Kondapur</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 mb-12 border border-blue-100">
        <blockquote className="text-lg text-gray-700 mb-4 italic">
          "I traveled from Kondapur for my spinal fusion surgery with Dr. Sayuj. The endoscopic approach
          meant minimal pain and I was back to my normal activities in just 4 weeks. Highly recommended!"
        </blockquote>
        <cite className="text-blue-600 font-semibold">— Anita Rao, Software Architect, Kondapur</cite>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900">Emergency Contact Information</h2>
      
      <div className="bg-red-50 rounded-lg p-6 mb-12 border border-red-100">
        <h3 className="text-xl font-semibold mb-4 text-red-800">24/7 Emergency Services</h3>
        <div className="space-y-3 text-red-900">
           <p className="font-medium">For urgent neurosurgical care, contact our emergency line immediately.</p>
           <LocationCTAs location={location} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2" />
        </div>
      </div>

      <div className="mt-12">
        <LocationNAPCard location={location} />
      </div>

      <div className="mt-12">
        <ReviewedBy lastReviewed="2025-01-15" />
        <MedicalCitations />
      </div>

      <LocationPageTracker location={location.id} />
    </main>
  );
}
