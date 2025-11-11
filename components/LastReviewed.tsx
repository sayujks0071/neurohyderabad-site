interface LastReviewedProps {
  date: string;
  reviewer?: string;
  proofLink?: string;
}

export default function LastReviewed({ date, reviewer = "Dr. Sayuj Krishnan", proofLink }: LastReviewedProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
      <span className="text-xs font-semibold uppercase tracking-wide">Last medically reviewed</span>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>{new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
