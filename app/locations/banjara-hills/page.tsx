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
  title: "Neurosurgeon in Banjara Hills, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgical care near Banjara Hills. Dr Sayuj Krishnan offers advanced spine and brain surgery. Convenient access from Jubilee Hills, Punjagutta.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/banjara-hills/",
  },
};

export default function BanjaraHillsLocationPage() {
  const location = getLocationById("banjara-hills");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Banjara Hills", item: "https://www.drsayuj.info/locations/banjara-hills" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Banjara Hills</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan serves patients from Banjara Hills at Yashoda Hospital, Malakpet—conveniently accessible within 20-30 minutes from Banjara Hills, Jubilee Hills, and Road No. 10 areas.
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
              <p className="font-semibold text-blue-700">9+ Years Experience</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <p className="font-semibold text-blue-700">Advanced Training in Germany</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <p className="font-semibold text-blue-700">Minimally Invasive Techniques</p>
            </div>
          </div>
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
