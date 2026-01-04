import React from "react";
import { getLocationById } from "@/src/data/locations";
import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
import { LocationCTAs } from "@/src/components/locations/LocationCTAs";
import { LocationMapEmbed } from "@/src/components/locations/LocationMapEmbed";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { LocationSchema } from "@/src/components/locations/LocationSchema";
import { notFound } from "next/navigation";

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 86400;

export const metadata = {
  title: "Neurosurgeon in LB Nagar, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon serving LB Nagar. Dr Sayuj Krishnan offers spine and brain surgery at nearby Yashoda Hospital. Accessible from Vanasthalipuram, Nagole.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/lb-nagar/",
  },
};

export default function LBNagarLocationPage() {
  const location = getLocationById("lb-nagar");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in LB Nagar", item: "https://www.drsayuj.info/locations/lb-nagar" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near LB Nagar</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan provides expert neurosurgical care for LB Nagar residents at Yashoda Hospital, Malakpet—conveniently located just 10 minutes away.
          </p>
        </section>

        <section className="mb-8">
            <LocationNAPCard location={location} />
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Clinic Actions</h2>
            <LocationCTAs location={location} />
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

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
            <LocationMapEmbed location={location} />
        </section>

        <LocalPathways location={location} />
      </article>
    </main>
  );
}
