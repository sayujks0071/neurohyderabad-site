"use client";

import Link from "next/link";
import type { ConditionResource } from "@/src/data/conditionsIndex";

interface RelatedConditionsProps {
  currentCondition: ConditionResource;
  allConditions: ConditionResource[];
  maxItems?: number;
}

export default function RelatedConditions({ 
  currentCondition, 
  allConditions, 
  maxItems = 4 
}: RelatedConditionsProps) {
  // Find related conditions based on shared keywords
  const relatedConditions = allConditions
    .filter(condition => 
      condition.slug !== currentCondition.slug &&
      condition.keywords.some(keyword => 
        currentCondition.keywords.some(currentKeyword => 
          keyword.toLowerCase().includes(currentKeyword.toLowerCase()) ||
          currentKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    )
    .slice(0, maxItems);

  if (relatedConditions.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Related Conditions
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {relatedConditions.map((condition) => (
          <Link
            key={condition.slug}
            href={`/conditions/a-z/${condition.slug}`}
            className="group block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {condition.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {condition.summary}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {condition.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
