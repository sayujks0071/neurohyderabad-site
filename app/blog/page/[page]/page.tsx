import type { Metadata } from "next";

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

  return {
    title: `Neurosurgery Blog Insights – Page ${humanReadablePage}`,
    description:
      "Explore additional expert neurosurgery insights from Dr. Sayuj Krishnan. Continued reading on brain and spine conditions, recovery, and treatment innovations.",
    alternates: {
      canonical: "/blog",
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}
