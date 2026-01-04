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
  title: "Neurosurgeon Near Nizampet, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon serving Nizampet and Bachupally. Dr Sayuj Krishnan provides comprehensive care for spine and brain disorders.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-nizampet/",
  },
};

export default function NizampetLocationPage() {
  const location = getLocationById("nizampet");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Nizampet", item: "https://www.drsayuj.info/locations/neurosurgeon-nizampet" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Nizampet</h1>

        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Patients from Nizampet can consult Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet for expert opinion on neurosurgical conditions.
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
