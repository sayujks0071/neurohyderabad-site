type Props = {
  lastReviewed: string;
  reviewer?: string;
};

/**
 * Sitewide YMYL attribution block to display reviewer credentials and disclaimer.
 */
export default function YMYLAttribution({
  lastReviewed,
  reviewer = "Dr. Sayuj Krishnan, Neurosurgeon",
}: Props) {
  return (
    <aside
      aria-label="Medical content attribution"
      className="rounded-md border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900"
    >
      <p className="font-semibold">Authored &amp; Reviewed by {reviewer}</p>
      <p className="mt-1">Last reviewed: {lastReviewed}</p>
      <p className="mt-2 text-blue-800">
        Disclaimer: Educational guidance only. Decisions about investigations or
        surgery require a personalised consultation.
      </p>
    </aside>
  );
}
