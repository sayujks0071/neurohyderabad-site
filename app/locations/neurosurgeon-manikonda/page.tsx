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
  title: "Neurosurgeon Near Manikonda, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon serving Manikonda and Puppalaguda. Dr Sayuj Krishnan offers minimally invasive spine and brain surgery.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-manikonda/",
  },
};

export default function ManikondaLocationPage() {
  const location = getLocationById("manikonda");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Manikonda", item: "https://www.drsayuj.info/locations/neurosurgeon-manikonda" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Manikonda</h1>

        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr. Sayuj Krishnan welcomes patients from Manikonda to his clinic at Yashoda Hospital, Malakpet.
            Experience world-class neurosurgical care with a patient-centric approach.
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
            <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
            <LocationMapEmbed location={location} />
        </section>

        <LocalPathways location={location} />
      </article>
    </main>
  );
}
