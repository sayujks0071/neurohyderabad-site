import Link from "next/link";
import { getInternalLinksFor } from "@/src/seo/internalLinks";

interface RelatedLinksProps {
  currentPath: string;
}

export default function RelatedLinks({ currentPath }: RelatedLinksProps) {
  const mapping = getInternalLinksFor(currentPath);

  if (mapping.linkTo.length === 0 && mapping.linkFrom.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-links-heading"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="md:w-1/2">
          <h2 id="related-links-heading" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Related resources patients also read
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Strengthen topical authority by linking to clinically relevant procedures, conditions, and patient stories.
          </p>
        </div>
        <div className="grid flex-1 gap-4 md:grid-cols-2">
          {mapping.linkTo.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Suggested internal links</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {mapping.linkTo.map((href) => (
                  <li key={`${currentPath}-to-${href}`}>
                    <Link
                      href={href}
                      className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-300"
                    >
                      {href}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {mapping.linkFrom.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Ensure backlinks from</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {mapping.linkFrom.map((href) => (
                  <li key={`${currentPath}-from-${href}`}>
                    <Link
                      href={href}
                      className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-300"
                    >
                      {href}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
