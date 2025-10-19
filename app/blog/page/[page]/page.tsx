import type { Metadata } from "next";
import { makeMetadata } from "@/app/_lib/meta";
import { SITE_URL } from "@/src/lib/seo";

export { default } from "../../page";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number.parseInt(page, 10);
  const humanReadablePage = Number.isNaN(pageNumber) ? page : pageNumber;
  const canonicalPath =
    !Number.isNaN(pageNumber) && pageNumber > 1
      ? `/blog/page/${pageNumber}`
      : "/blog";

  const baseMeta = makeMetadata({
    title: `Neurosurgery Blog Insights – Page ${humanReadablePage}`,
    description:
      "Explore additional expert neurosurgery insights from Dr. Sayuj Krishnan. Continued reading on brain and spine conditions, recovery, and treatment innovations.",
    canonicalPath,
  });

  return {
    ...baseMeta,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      title: `Neurosurgery Blog Insights – Page ${humanReadablePage}`,
      description:
        "Explore additional expert neurosurgery insights from Dr. Sayuj Krishnan covering brain and spine care.",
      url: `${SITE_URL}${canonicalPath}`,
      siteName: "Dr. Sayuj Krishnan - Neurosurgeon Hyderabad",
      locale: "en_IN",
      type: "website",
    },
  };
}
