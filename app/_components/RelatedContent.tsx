import Link from "next/link";

interface RelatedContentProps {
  relatedConditions?: string[];
  relatedTreatments?: string[];
}

export default function RelatedContent({
  relatedConditions = [],
  relatedTreatments = [],
}: RelatedContentProps) {
  if (!relatedConditions.length && !relatedTreatments.length) return null;

  return (
    <section className="mb-8 bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Related Content</h2>
      <div className="space-y-2">
        {relatedConditions.map((conditionSlug) => (
          <Link
            key={conditionSlug}
            href={`/conditions/${conditionSlug}`}
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Learn about {conditionSlug.replace(/-/g, ' ')}
          </Link>
        ))}
        {relatedTreatments.map((treatmentSlug) => (
          <Link
            key={treatmentSlug}
            href={`/services/${treatmentSlug}`}
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Learn about {treatmentSlug.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </section>
  );
}
