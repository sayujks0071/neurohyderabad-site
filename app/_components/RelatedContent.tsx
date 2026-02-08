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
    <section className="mb-12 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6 border-b border-blue-100/50 pb-4">
        <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-blue-800">Related Content</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {relatedConditions.map((conditionSlug) => (
          <Link
            key={conditionSlug}
            href={`/conditions/${conditionSlug}`}
            className="flex items-center justify-between p-4 bg-white/50 border border-blue-50/50 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                {conditionSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
          </Link>
        ))}

        {relatedTreatments.map((treatmentSlug) => (
          <Link
            key={treatmentSlug}
            href={`/services/${treatmentSlug}`}
            className="flex items-center justify-between p-4 bg-white/50 border border-blue-50/50 rounded-xl hover:bg-white/80 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                {treatmentSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
