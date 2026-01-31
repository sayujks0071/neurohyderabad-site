import Link from "next/link";
import { Metadata } from "next";
import ConditionsExplorer from "../conditions/ConditionsExplorer";
import BreadcrumbNavigation from "../conditions/BreadcrumbNavigation";
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
  title: "Medical Knowledge Base | Conditions & Treatments A–Z",
  description:
    "Comprehensive medical knowledge base by Dr. Sayuj Krishnan. Explore an A–Z index of neurological conditions, brain tumors, spine surgery, and recovery guides.",
  alternates: {
    canonical: `${SITE_URL}/knowledge-base`,
  },
  openGraph: {
    title: "Medical Knowledge Base | Conditions & Treatments A–Z",
    description:
      "Search our comprehensive library for information on brain tumors, spine surgery, treatments, and recovery guides.",
    url: `${SITE_URL}/knowledge-base`,
    siteName: "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
    images: [
      {
        url: `${SITE_URL}/api/og?title=Medical%20Knowledge%20Base&subtitle=Conditions%20%26%20Treatments%20Index`,
        width: 1200,
        height: 630,
        alt: "Medical Knowledge Base - Dr. Sayuj Krishnan",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const letterGroups = groupConditionsByLetter();
const letters = Object.keys(letterGroups).sort();

export default function KnowledgeBasePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <BreadcrumbNavigation
          items={[
            { label: "Knowledge Base" }
          ]}
        />
      </div>
      <Section background="none" className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-wide text-blue-600">
            Patient Education & Resources
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            Medical Knowledge Base
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Browse our comprehensive library of neurological conditions and treatments.
            Access detailed guides, recovery timelines, and patient success stories.
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
          {/* Reuse ConditionsExplorer which has the search bar */}
          <ConditionsExplorer conditions={CONDITION_RESOURCES} />

          <div className="mt-16">
            <Card padding="lg" className="bg-blue-50 shadow-none">
              <h2 className="text-2xl font-semibold text-blue-900">
                Can't find what you're looking for?
              </h2>
              <p className="mt-2 text-blue-800">
                Our care coordination team can help answer your questions or schedule a consultation
                to discuss your specific condition.
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
                  WhatsApp Us
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
