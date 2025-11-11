interface LastReviewedProps {
  date: string;
  reviewer?: string;
  proofLink?: string;
}

function parseDateLocal(dateStr: string): Date | null {
  // Handles 'YYYY-MM-DD' format as local date
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]) - 1; // JS months are 0-based
    const day = Number(match[3]);
    return new Date(year, month, day);
  }
  // fallback to native Date parsing for other formats
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export default function LastReviewed({ date, reviewer = "Dr. Sayuj Krishnan", proofLink }: LastReviewedProps) {
  const parsedDate = parseDateLocal(date);
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
      <span className="text-xs font-semibold uppercase tracking-wide">Last medically reviewed</span>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>
          {parsedDate
            ? parsedDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
            : date}
        </span>
        <span aria-hidden="true">•</span>
        <span>{reviewer}</span>
        {proofLink && (
          <a
            href={proofLink}
            className="underline decoration-emerald-500 decoration-2 underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-200"
            rel="nofollow noopener"
          >
            View credential
          </a>
        )}
      </div>
    </div>
  );
}
