import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CONDITION_RESOURCES,
  getConditionResource,
} from "@/src/data/conditionsIndex";
import { SITE_URL } from "@/src/lib/seo";
import ConditionStructuredData from "../ConditionStructuredData";
import Section from "../../_components/Section";
import Card from "../../_components/Card";
import Button from "../../_components/Button";
import { LocalPathways } from "@/src/components/locations/LocalPathways";
import { getLocationById } from "@/src/data/locations";

// Ensure this route is fully statically generated (no dynamic fallback SSR).
export const dynamic = 'force-static';
export const dynamicParams = false;

// List of condition pages that have explicit static folders in app/conditions/
// These take precedence over dynamic routing.
const STATIC_CONDITION_PATHS = [
  "/conditions/brain-bleed-evacuation-hyderabad",
  "/conditions/brain-tumor-surgery-hyderabad",
  "/conditions/cervical-myelopathy-decompression-hyderabad",
  "/conditions/cervical-radiculopathy-treatment-hyderabad",
  "/conditions/osteoporotic-spine-fracture-hyderabad",
  "/conditions/sciatica-pain-treatment-hyderabad",
  "/conditions/sciatica-pain-treatment-hyderabad",
  "/conditions/slip-disc-treatment-hyderabad",
  "/conditions/spinal-stenosis-treatment-hyderabad",
  "/conditions/spine-tumor-surgery-hyderabad",
  "/conditions/spondylolisthesis-treatment-hyderabad",
  "/conditions/trigeminal-neuralgia-treatment-hyderabad",
];

const DEDICATED_CONDITIONS = CONDITION_RESOURCES.filter((condition) => {
  const path = condition.primaryPath;
  return (
    path.startsWith("/conditions/") &&
    !path.startsWith("/conditions/a-z/") &&
    !STATIC_CONDITION_PATHS.includes(path)
  );
});

export async function generateStaticParams() {
  return DEDICATED_CONDITIONS.map((condition) => ({
    conditionSlug: condition.primaryPath.replace("/conditions/", ""),
  }));
}

interface PageParams {
  params: Promise<{
    conditionSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { conditionSlug } = await params;
  const currentPath = `/conditions/${conditionSlug}`;

  // Find condition by path (primaryPath) OR by slug (legacy fallback)
  const condition =
    CONDITION_RESOURCES.find(c => c.primaryPath === currentPath) ||
    getConditionResource(conditionSlug);

  if (!condition || !DEDICATED_CONDITIONS.some((item) => item.slug === condition.slug)) {
    return {};
  }

  const title = `${condition.name} Treatment in Hyderabad | Dr. Sayuj Krishnan`;
  const description =
    condition.summary ||
    `Learn about diagnosis and treatment for ${condition.name} with Dr. Sayuj Krishnan in Hyderabad.`;

  const canonical = `${SITE_URL}${condition.primaryPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Dr. Sayuj Krishnan - Neurosurgeon in Hyderabad",
      images: [
        condition.heroImage
          ? {
            url: `${SITE_URL}${condition.heroImage.src}`,
            width: 1200,
            height: 630,
            alt: condition.heroImage.alt,
          }
          : {
            url: `${SITE_URL}/api/og?title=${encodeURIComponent(
              condition.name,
            )}&subtitle=Treatment%20at%20Dr%20Sayuj%20Krishnan`,
            width: 1200,
            height: 630,
            alt: `${condition.name} treatment insights`,
          },
      ],
      type: "article",
    },
  };
}

export default async function ConditionDetailPage({ params }: PageParams) {
  const { conditionSlug } = await params;
  const currentPath = `/conditions/${conditionSlug}`;

  // Find condition by path (primaryPath) OR by slug (legacy fallback)
  const condition =
    CONDITION_RESOURCES.find(c => c.primaryPath === currentPath) ||
    getConditionResource(conditionSlug);

  if (!condition || !DEDICATED_CONDITIONS.some((item) => item.slug === condition.slug)) {
    return notFound();
  }

   // Reuse main location for condition pages
   const location = getLocationById("hyderabad");

  return (
    <div className="bg-white">
      <ConditionStructuredData
        condition={condition}
        canonicalPath={condition.primaryPath}
      />

      <Section background="none" className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-blue-600">
              Condition Focus
            </p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              {condition.name}
            </h1>
            <p className="mt-5 text-lg text-gray-700">{condition.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/appointments"
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book a Consultation
              </Button>
              <Button
                href="tel:+919778280044"
                variant="outline"
                className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
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
            </div>
          </div>

          {condition.heroImage ? (
            <div className="flex-1 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
              <Image
                src={condition.heroImage.src}
                alt={condition.heroImage.alt}
                width={640}
                height={420}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 500px, 100vw"
                priority
              />
            </div>
          ) : null}
        </div>
      </Section>

      <Section background="white" className="py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {condition.symptomHighlights?.length ? (
              <Card padding="lg" className="bg-gray-50 border border-gray-200 shadow-none">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recognising {condition.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Seek a neurosurgical opinion if you experience these symptoms
                  or warning signs. Early diagnosis improves outcomes.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  {condition.symptomHighlights.map((symptom) => (
                    <li key={symptom} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}

            {condition.treatmentHighlights?.length ? (
              <Card padding="lg" className="bg-white border border-blue-100 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900">
                  Treatment Pathway
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Dr. Sayuj Krishnan personalises care plans by combining
                  evidence-based protocols with advanced technology.
                </p>
                <ol className="mt-4 space-y-3 text-sm text-gray-700">
                  {condition.treatmentHighlights.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            ) : null}
          </div>

          {condition.relatedResources?.length ? (
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900">
                Related Guides & Resources
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {condition.relatedResources.map((resource) => (
                  <Link
                    key={resource.href}
                    href={resource.href}
                    className="group rounded-2xl border border-gray-200 p-5 transition hover:border-blue-200 hover:shadow-md"
                  >
                    <span className="text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                      {resource.label}
                    </span>
                    <span className="mt-2 block text-xs text-gray-500">
                      {resource.href}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {condition.faq?.length ? (
            <div className="mt-12">
              <Card padding="lg" className="border border-gray-200 shadow-none">
                <h2 className="text-xl font-semibold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="mt-5 space-y-4">
                  {condition.faq.map((item, index) => (
                    <details
                      key={`${condition.slug}-faq-${index}`}
                      className="group rounded-2xl border border-gray-150 bg-white p-4"
                    >
                      <summary className="cursor-pointer text-sm font-semibold text-blue-800 outline-none group-open:text-blue-900">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm text-gray-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </Card>
            </div>
          ) : null}

          {location && (
            <div className="mt-12 border-t pt-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Local Care Options</h2>
                <p className="mb-6 text-gray-700">
                    Dr. Sayuj Krishnan provides treatment for {condition.name} at multiple locations across Hyderabad.
                </p>
                 <LocalPathways mode="condition" currentSlug={condition.slug} />
            </div>
          )}

          <div className="mt-12">
            <Card padding="lg" className="bg-blue-50 shadow-none">
              <h2 className="text-xl font-semibold text-blue-900">
                Ready to Discuss Your Case?
              </h2>
              <p className="mt-2 text-blue-800">
                Share imaging, reports, and symptom history. Our coordination team
                will schedule the earliest possible slot with Dr. Sayuj Krishnan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href="/appointments"
                  className="bg-blue-600 text-white hover:bg-blue-700 border-none"
                >
                  Request Appointment
                </Button>
                <Button
                  href="/ai-chat"
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  Use AI Booking Assistant
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  Contact Coordination Desk
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
