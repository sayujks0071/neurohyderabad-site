import Link from "next/link";

export default function MedicalDisclaimer() {
  return (
    <aside
      className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-900 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-100"
      role="note"
      aria-label="Medical disclaimer"
    >
      <p className="font-semibold">Medical Disclaimer</p>
      <p className="mt-2 leading-relaxed">
        Content on this website is for educational awareness. It does not replace an in-person consultation, diagnostic imaging,
        or emergency medical services. Always seek individualized advice from your treating neurosurgeon. In case of neurological
        emergencies such as sudden weakness, speech difficulty, or loss of consciousness, call emergency services immediately.
      </p>
      <p className="mt-3">
        <Link
          href="/medical-disclaimer"
          className="font-semibold text-orange-800 underline decoration-orange-400 underline-offset-4 hover:text-orange-700 dark:text-orange-200 dark:hover:text-orange-100"
        >
          Read the full disclaimer
        </Link>
        .
      </p>
    </aside>
  );
}
