import Link from "next/link";
import { Metadata } from "next";
import ConditionsExplorer from "./ConditionsExplorer";
import BreadcrumbNavigation from "./BreadcrumbNavigation";
import {
  CONDITION_RESOURCES,
  groupConditionsByLetter,
} from "@/src/data/conditionsIndex";
import { SITE_URL } from "@/src/lib/seo";
import Section from "../_components/Section";
import Card from "../_components/Card";
import Button from "../_components/Button";
import { LocalPathways } from '@/src/components/locations/LocalPathways';

export const metadata: Metadata = {
  title: "Neurological Conditions A–Z | Dr. Sayuj Krishnan",
  description:
    "Browse an A–Z index of brain, spine, and nerve conditions treated by Dr. Sayuj Krishnan with links to detailed guides and treatment options.",
  alternates: {
    canonical: `${SITE_URL}/conditions`,
    languages: {
      "en-IN": `${SITE_URL}/conditions`,
      "x-default": `${SITE_URL}/conditions`,
    },
  },
  openGraph: {
    title: "Neurological Conditions A–Z | Dr. Sayuj Krishnan",
    description:
      "Explore conditions, symptoms, and minimally invasive treatments offered for brain, spine, and epilepsy care.",
    url: `${SITE_URL}/conditions`,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
    images: [
      {
        url: `${SITE_URL}/api/og?title=Conditions%20A%E2%80%93Z&subtitle=Brain%20%26%20Spine%20Care%20Index`,
        width: 1200,
        height: 630,
        alt: "Conditions Index - Dr. Sayuj Krishnan",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurological Conditions A–Z | Dr. Sayuj Krishnan",
    description:
      "Find information about conditions treated, diagnostic pathways, and evidence-based neurosurgical care.",
    images: [
      `${SITE_URL}/api/og?title=Conditions%20A%E2%80%93Z&subtitle=Brain%20%26%20Spine%20Care%20Index`,
    ],
  },
};

const letterGroups = groupConditionsByLetter();
const letters = Object.keys(letterGroups).sort();

export default function ConditionsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <BreadcrumbNavigation
          items={[
            { label: "Conditions" }
          ]}
        />
      </div>
      <Section background="none" className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-wide text-blue-600">
            Conditions & Treatments
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            Conditions We Treat – A to Z
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Browse neurological, brain, and spine conditions managed by Dr.
            Sayuj Krishnan. Each condition links to detailed guides, treatment
            options, and patient success stories.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-blue-700">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 transition hover:border-blue-400 hover:text-blue-900"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section background="white" className="py-14">
        <div className="mx-auto max-w-5xl">
          <ConditionsExplorer conditions={CONDITION_RESOURCES} />

          <div className="mt-16">
            <Card padding="lg" className="bg-blue-50 shadow-none">
              <h2 className="text-2xl font-semibold text-blue-900">
                Need Help Identifying a Condition?
              </h2>
              <p className="mt-2 text-blue-800">
                Call or message our coordination team for triage. We review imaging,
                organise second opinions, and help plan the next steps in your care.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href="tel:+919778280044"
                  className="bg-blue-600 text-white hover:bg-blue-700 border-none"
                >
                  Call +91 97782 80044
                </Button>
                <Button
                  href="https://wa.me/919778280044"
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  WhatsApp the Care Team
                </Button>
                <Button
                  href="/appointments"
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  Book Consultation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <div className="mx-auto max-w-5xl px-6 pb-16">
         <LocalPathways mode="condition" />
      </div>
    </div>
  );
}
