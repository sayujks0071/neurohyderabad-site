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

const FAQ = [
  { question: "How far is the OPD from LB Nagar?", answer: "Typically 10-15 minutes by car (~4 km)." },
  { question: "Do you treat sciatica?", answer: "Yes, Dr. Sayuj specializes in endoscopic spine surgery for sciatica and disc problems." },
  { question: "Is emergency care available?", answer: "Yes, 24/7 emergency neurosurgery services are available at Yashoda Hospital, Malakpet." },
];

export default function LBNagarLocationPage() {
  const location = getLocationById("lb-nagar");

  if (!location) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema location={location} faq={FAQ} />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Neurosurgeon Near LB Nagar, Hyderabad</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Dr Sayuj Krishnan provides expert neurosurgical care for LB Nagar residents at Yashoda Hospital, Malakpet—conveniently located just 10 minutes away.
      </p>

      <div className="mt-6 flex justify-center">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">Clinic Details</h2>
          <div className="mt-3 space-y-2 text-gray-700">
             <p><strong>From LB Nagar:</strong> ~4 km, 10-15 minutes</p>
             <p>Serving areas: LB Nagar, Vanasthalipuram, Nagole, Kothapet, Hayathnagar.</p>
          </div>

          <h3 className="text-xl font-semibold mt-6">Why LB Nagar Patients Choose Dr Sayuj</h3>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Close proximity to LB Nagar (10-15 minutes)</li>
            <li>Advanced training in minimally invasive techniques</li>
            <li>Day-care surgery options for selected cases</li>
            <li>Insurance and cashless treatment accepted</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Map</h2>
          <LocationMapEmbed location={location} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map(({ question, answer }) => (
            <details key={question} className="rounded-xl border p-4">
              <summary className="font-medium">{question}</summary>
              <p className="mt-2">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <LocalPathways mode="location" locationId={location.id} />
      </div>
    </main>
  );
}
