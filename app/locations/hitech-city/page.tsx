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
  title: "Neurosurgeon in Hitech City, Hyderabad | Dr Sayuj Krishnan",
  description: "Expert neurosurgical care near Hitech City & Madhapur. Dr Sayuj Krishnan offers advanced spine and brain surgery. Accessible via Metro or ORR.",
  alternates: {
    canonical: "https://www.drsayuj.info/locations/hitech-city/",
  },
};

export default function HitechCityLocationPage() {
  const location = getLocationById("hitech-city");

  if (!location) {
    return notFound();
  }

  const breadcrumb = [
      { name: "Locations", item: "https://www.drsayuj.info/locations" },
      { name: "Neurosurgeon in Hitech City", item: "https://www.drsayuj.info/locations/hitech-city" },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <LocationSchema location={location} breadcrumb={breadcrumb} />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Neurosurgeon Near Hitech City</h1>
        
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Dr Sayuj Krishnan serves patients from Hitech City and Madhapur at Yashoda Hospital, Malakpet.
            While located in Malakpet, we see many patients from the IT corridor seeking specialized endoscopic spine care.
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
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Expert in Endoscopic (Keyhole) Spine Surgery</li>
            <li>• Rapid recovery protocols for busy professionals</li>
            <li>• Comprehensive care for spinal and cranial conditions</li>
            <li>• Transparent pricing and ethical advice</li>
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
