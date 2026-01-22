import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CONDITION_RESOURCES,
  type ConditionResource,
} from "@/src/data/conditionsIndex";
import { SITE_URL } from "@/src/lib/seo";
import ConditionStructuredData from "@/app/conditions/ConditionStructuredData";
import BreadcrumbNavigation from "@/app/conditions/BreadcrumbNavigation";
import RelatedConditions from "@/app/conditions/RelatedConditions";
import { LocalPathways } from "@/src/components/locations/LocalPathways";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return CONDITION_RESOURCES.map((condition) => ({
    slug: condition.slug,
  }));
}

function findCondition(slug: string): ConditionResource | undefined {
  return CONDITION_RESOURCES.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const condition = findCondition(slug);

  if (!condition) {
    return {
      title: "Condition Not Found",
    };
  }

  return {
    title: `${condition.name} Treatment | Dr. Sayuj Krishnan`,
    description: `${condition.summary} Expert treatment by Dr. Sayuj Krishnan in Hyderabad. Learn about symptoms, treatment options, and recovery.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}${condition.primaryPath}`,
    },
    openGraph: {
      title: `${condition.name} | Condition Summary`,
      description: condition.summary,
      url: `${SITE_URL}/conditions/a-z/${condition.slug}`,
      type: "article",
    },
  };
}

export default async function ConditionStubPage({ params }: PageParams) {
  const { slug } = await params;
  const condition = findCondition(slug);

  if (!condition) {
    notFound();
  }

  const stubPath = `/conditions/a-z/${condition.slug}`;
  if (
    condition.primaryPath &&
    condition.primaryPath !== stubPath &&
    condition.primaryPath.startsWith("/conditions/") &&
    !condition.primaryPath.startsWith("/conditions/a-z/")
  ) {
    permanentRedirect(condition.primaryPath);
  }

  const canonical =
    condition.primaryPath.startsWith("http") || condition.primaryPath.startsWith("/")
      ? condition.primaryPath
      : `/${condition.primaryPath}`;

  // If this stub is accessed by bots or users, provide content and encourage
  // navigation to the comprehensive resource.
  return (
    <div className="min-h-screen bg-white">
      <ConditionStructuredData condition={condition} canonicalPath={canonical} />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <BreadcrumbNavigation 
          items={[
            { label: "Conditions", href: "/conditions" },
            { label: condition.name }
          ]} 
        />
      </div>
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm uppercase tracking-wide text-blue-600">
            Condition Overview
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            {condition.name}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{condition.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={condition.primaryPath}
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Full Treatment Guide
            </Link>
            <Link
              href="/appointments"
              className="rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-6 py-14">
        {condition.symptomHighlights?.length ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              When to Suspect {condition.name}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {condition.symptomHighlights.map((symptom) => (
                <li key={symptom} className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {condition.treatmentHighlights?.length ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              How We Treat {condition.name}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              {condition.treatmentHighlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {condition.relatedResources?.length ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Related Resources
            </h2>
            <ul className="mt-4 space-y-3">
              {condition.relatedResources.map((resource) => (
                <li key={resource.href}>
                  <Link
                    href={resource.href}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {condition.faq?.length ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-4">
              {condition.faq.map((item, index) => (
                <div key={`${condition.slug}-faq-${index}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <h3 className="text-sm font-semibold text-blue-800">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {condition.keywords.length ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-900">
              Common Keywords & Symptoms
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {condition.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <RelatedConditions 
          currentCondition={condition} 
          allConditions={CONDITION_RESOURCES} 
        />

        <div className="mt-12">
          <LocalPathways mode="condition" />
        </div>
      </div>
    </div>
  );
}
