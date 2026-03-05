import Link from "next/link";
import { ArrowRight, BookOpen, Activity, Stethoscope } from "lucide-react";

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
    <section className="mb-12 relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6 border-b border-[var(--color-primary-100)]/50 pb-4">
        <div className="p-2 bg-[var(--color-primary-100)]/50 rounded-lg text-[var(--color-primary-500)]">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-primary-800)]">Related Content</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {relatedConditions.map((conditionSlug) => (
          <Link
            key={conditionSlug}
            href={`/conditions/${conditionSlug}`}
            className="flex items-center justify-between p-4 bg-[var(--color-surface)]/50 border border-[var(--color-primary-50)] rounded-xl hover:bg-[var(--color-surface)]/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-primary-50)] rounded-lg text-[var(--color-primary-500)] group-hover:bg-[var(--color-primary-100)] transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-700)] transition-colors">
                {conditionSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-500)] transition-colors transform group-hover:translate-x-1" />
          </Link>
        ))}

        {relatedTreatments.map((treatmentSlug) => (
          <Link
            key={treatmentSlug}
            href={`/services/${treatmentSlug}`}
            className="flex items-center justify-between p-4 bg-[var(--color-surface)]/50 border border-[var(--color-primary-50)] rounded-xl hover:bg-[var(--color-surface)]/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-success-light)] rounded-lg text-[var(--color-success)] group-hover:bg-[var(--color-success-light)] transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-700)] transition-colors">
                {treatmentSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary-500)] transition-colors transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
