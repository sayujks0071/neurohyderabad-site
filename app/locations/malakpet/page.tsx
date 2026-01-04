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
  title: "Neurosurgeon in Malakpet, Hyderabad | Dr Sayuj Krishnan",
  description: "Best neurosurgeon in Malakpet at Yashoda Hospital. Dr Sayuj Krishnan specializes in endoscopic spine surgery and brain tumor treatment. Book appointment now.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/malakpet/",
  },
};

export default function MalakpetLocationPage() {
  const location = getLocationById("malakpet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Malakpet", item: "https://www.drsayuj.info/locations/malakpet" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon in Malakpet</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan is a senior neurosurgeon consultant at Yashoda Hospital, Malakpet.
            Located at Nalgonda X Roads, our clinic provides world-class neurosurgical care right in the heart of Malakpet.
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
          <h2 className="text-2xl font-semibold mb-4">Services at Malakpet</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 24/7 Emergency Neurosurgery & Trauma Care</li>
            <li>• Advanced Endoscopic Spine Centre</li>
            <li>• Brain Tumor & Skull Base Surgery</li>
            <li>• Stroke & Aneurysm Management</li>
            <li>• Pediatric Neurosurgery</li>
          </ul>
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
