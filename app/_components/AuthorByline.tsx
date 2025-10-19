import Link from "next/link";

function formatDisplayDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface AuthorBylineProps {
  publishedOn?: string;
  updatedOn?: string;
  className?: string;
}

export default function AuthorByline({
  publishedOn,
  updatedOn,
  className = "",
}: AuthorBylineProps) {
  const hasPublished = Boolean(publishedOn);
  const hasUpdated = Boolean(updatedOn);

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600 ${className}`}
      aria-label="Article authorship"
    >
      <span>
        Written by{" "}
        <Link
          href="/about"
          rel="author"
          className="font-semibold text-blue-700 hover:text-blue-900 underline decoration-blue-300"
        >
          Dr. Sayuj Krishnan
        </Link>
      </span>
      {(hasPublished || hasUpdated) && <span className="hidden sm:inline">•</span>}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {hasPublished && (
          <span>Published {formatDisplayDate(publishedOn as string)}</span>
        )}
        {hasUpdated && (
          <>
            <span className="hidden sm:inline">•</span>
            <span>Updated {formatDisplayDate(updatedOn as string)}</span>
          </>
        )}
      </div>
    </div>
  );
}
