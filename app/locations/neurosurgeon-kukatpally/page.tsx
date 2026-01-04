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
  title: "Neurosurgeon Near Kukatpally, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgeon serving Kukatpally and KPHB. Dr Sayuj Krishnan provides advanced spine and brain care at Yashoda Hospital Malakpet.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/neurosurgeon-kukatpally/",
  },
};

export default function KukatpallyLocationPage() {
  const location = getLocationById("kukatpally");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Kukatpally", item: "https://www.drsayuj.info/locations/neurosurgeon-kukatpally" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Kukatpally</h1>

        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Residents of Kukatpally and KPHB can access specialized neurosurgical care with Dr. Sayuj Krishnan at Yashoda Hospital, Malakpet.
            We offer advanced solutions for spine and brain conditions with a focus on minimally invasive techniques.
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
          <h2 className="text-2xl font-semibold mb-4">Why Travel from Kukatpally?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Expertise:</strong> Fellowship-trained in endoscopic spine surgery</li>
            <li>• <strong>Technology:</strong> Access to advanced neuronavigation and microscopes</li>
            <li>• <strong>Outcomes:</strong> Focus on safety and rapid recovery</li>
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
