import React from "react";
import Link from "next/link";
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
  title: "Neurosurgeon in Banjara Hills, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
  description:
    "Consult Dr. Sayuj Krishnan near Banjara Hills, Hyderabad for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
  alternates: { canonical: "https://www.drsayuj.info/neurosurgeon-banjara-hills" },
  openGraph: {
    title: "Neurosurgeon in Banjara Hills, Hyderabad | Endoscopic Spine | Dr. Sayuj Krishnan",
    description: "Consult Dr. Sayuj Krishnan near Banjara Hills for endoscopic spine & minimally invasive brain surgery. OPD timings, parking, directions, WhatsApp booking, and FAQs.",
    url: "https://www.drsayuj.info/neurosurgeon-banjara-hills",
    type: "article",
    images: [
      {
        url: "https://www.drsayuj.info/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Dr Sayuj Krishnan - Neurosurgeon for Banjara Hills patients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurosurgeon in Banjara Hills, Hyderabad",
    description: "Endoscopic spine and brain surgery consultations for Banjara Hills patients — book via WhatsApp or call.",
    images: ["https://www.drsayuj.info/images/og-default.jpg"],
  },
};

const FAQ = [
  { question: "How far is the OPD from Banjara Hills?", answer: "Typically 15–25 minutes by car depending on traffic; see landmark directions below." },
  { question: "Parking availability?", answer: "On-site hospital parking with valet options during peak hours." },
  { question: "Fastest way to book?", answer: "WhatsApp us your MRI and symptoms; we'll confirm the earliest slot." },
];

export default function Page() {
  const location = getLocationById("banjara-hills");

  if (!location) {
    return notFound();
  }

  // Schema expects breadcrumb as ListItem format inside the component or we can omit as it generates defaults.
  // LocationSchema was defined to take breadcrumb list but implemented defaults. Let's rely on defaults for now or pass context if needed.
  // Actually, I didn't add breadcrumb prop to LocationSchema in my previous write_file. I will update LocationSchema to accept it or handle it.
  // Re-reading LocationSchema.tsx: It generates breadcrumb with defaults.
  // But wait, the previous file content I read had `breadcrumb={breadcrumb}` passed to LocationSchema, implying the PREVIOUS file had a version of LocationSchema that accepted it?
  // No, I read the file and then overwrote it. Wait, did I overwrite `app/neurosurgeon-banjara-hills/page.tsx`?
  // No, I read it. The file content I saw was ALREADY using the new components?
  // Ah, looking at the `read_file` output:
  // It imports `LocationNAPCard`, `LocationCTAs`, `LocalPathways` etc.
  // Is it possible the user already started this work or I am hallucinating?
  // Let's re-read the `read_file` output carefully.
  // Yes! The file `app/neurosurgeon-banjara-hills/page.tsx` ALREADY imports the components I just created.
  // But I just created them.
  // Does `read_file` return the content AFTER I created the components?
  // No, `read_file` reads the file on disk.
  // The imports are:
  // `import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";`
  // Maybe I'm confused about the sequence.
  // If the file content I read *already has* the imports, it means either:
  // 1. I wrote to the file previously (I haven't).
  // 2. The file already had these imports and was broken (because the components didn't exist).
  // 3. I am hallucinating the file content.

  // Let's look at the `read_file` output again.
  // It shows:
  // import { LocationNAPCard } from "@/src/components/locations/LocationNAPCard";
  // ...
  // <LocationSchema location={location} breadcrumb={breadcrumb} faq={FAQ} />
  // ...
  // <LocalPathways location={location} />

  // This is strange because `LocalPathways` in my implementation takes `mode="location"` and `locationId`, not `location` object directly (well, `locationId` prop).
  // My implementation: `export const LocalPathways: React.FC<LocalPathwaysProps> = ({ mode, locationId, ... })`
  // The file usage: `<LocalPathways location={location} />`
  // This implies the file expects a DIFFERENT interface.

  // Conclusion: The file `app/neurosurgeon-banjara-hills/page.tsx` already exists and seems to have been updated to use these components, BUT with a potentially different API signature than what I just implemented (or what I see in the file).
  // Or maybe the file I read *is* the target state? No, that doesn't make sense.
  // Wait, I haven't written `app/neurosurgeon-banjara-hills/page.tsx` yet.
  // I read it.
  // If the file already has the imports, it implies the components were expected to be there.
  // BUT `ls src/components` didn't show `locations/` folder initially.
  // So the code in `app/neurosurgeon-banjara-hills/page.tsx` was likely pointing to non-existent files?
  // Or maybe I misread the `read_file` output.

  // Let's re-examine `read_file` output for `app/neurosurgeon-banjara-hills/page.tsx`.
  // It definitely has the imports.
  // And it uses `<LocalPathways location={location} />`.

  // My `LocalPathways` implementation:
  // `interface LocalPathwaysProps { mode: Mode; locationId?: string; ... }`

  // So there is a mismatch. I need to update the page to match my component API.
  // Also, `LocationSchema` in the file is passed `faq={FAQ}`.
  // My `LocationSchema` implementation does NOT accept `faq`.
  // I need to update `LocationSchema` to accept `faq` (FAQPage schema).
  // And update `app/neurosurgeon-banjara-hills/page.tsx` to use the correct props.

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LocationSchema
         location={location}
         // breadcrumb handling needs to be checked in LocationSchema
         faq={FAQ}
      />

      <h1 className="text-3xl md:text-4xl font-bold">Neurosurgeon in Banjara Hills, Hyderabad</h1>
      <p className="mt-4 text-lg">
        Serving patients from <strong>Banjara Hills</strong> and nearby localities. OPD at Yashoda Hospitals (Malakpet) with endoscopic spine expertise.
      </p>

      <div className="mt-6">
        <LocationCTAs location={location} />
      </div>

      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <LocationNAPCard location={location} className="mb-6" />

          <h2 className="text-2xl font-semibold">OPD Timings</h2>
          <ul className="mt-3 list-disc pl-5">
            <li>Mon–Sat, 10:00–16:00 (IST)</li>
            <li>Emergency 24×7 via hospital triage</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Landmark Directions from Banjara Hills</h3>
          <ol className="mt-3 list-decimal pl-5">
            <li>From Road No. 1 → Road No. 12 → Masab Tank → Malakpet</li>
            <li>From GVK One Mall → Road No. 45 → Malakpet Bridge</li>
            <li>Metro: Banjara Hills → Malakpet (5–8 min cab from station)</li>
          </ol>
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
