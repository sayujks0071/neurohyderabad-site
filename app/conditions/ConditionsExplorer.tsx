"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ConditionResource } from "@/src/data/conditionsIndex";
import { groupConditionsByLetter } from "@/src/data/conditionsIndex";

interface ConditionsExplorerProps {
  conditions: ConditionResource[];
}

export default function ConditionsExplorer({
  conditions,
}: ConditionsExplorerProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return conditions;

    return conditions.filter((condition) => {
      const haystack = [
        condition.name,
        condition.summary,
        ...(condition.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [conditions, search]);

  const grouped = useMemo(
    () => groupConditionsByLetter(filtered),
    [filtered],
  );

  const letters = Object.keys(grouped).sort();

  return (
    <div className="space-y-12">
      <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
        <label htmlFor="condition-search" className="text-sm font-semibold text-gray-700">
          Search conditions
        </label>
        <div className="mt-2 flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <SearchIcon className="h-4 w-4 text-gray-400" />
          <input
            id="condition-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Type a condition, symptom, or keyword (e.g., sciatica, epilepsy)"
            className="ml-3 w-full border-none text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          {filtered.length} {filtered.length === 1 ? "result" : "results"} •{" "}
          press <kbd className="rounded border border-gray-300 bg-gray-100 px-1">⌘</kbd>
          <span className="mx-1">/</span>
          <kbd className="rounded border border-gray-300 bg-gray-100 px-1">Ctrl</kbd> +{" "}
          <kbd className="rounded border border-gray-300 bg-gray-100 px-1">F</kbd> to use your browser search
        </p>
      </div>

      {letters.length === 0 ? (
        <p className="text-center text-sm text-gray-500">
          No conditions matched your search. Try using broader terms or
          checking spelling.
        </p>
      ) : (
        letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {letter}
              </span>
              <h2 className="text-xl font-semibold text-gray-900">
                Conditions starting with {letter}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {grouped[letter].map((condition) => (
                <article
                  key={condition.slug}
                  className="rounded-2xl border border-gray-200 p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-blue-800">
                    <Link href={`/conditions/a-z/${condition.slug}`}>
                      {condition.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {condition.summary}
                  </p>
                  {condition.symptomHighlights?.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Common symptoms
                      </p>
                      <ul className="mt-1 space-y-1 text-sm text-gray-600">
                        {condition.symptomHighlights.slice(0, 3).map((symptom) => (
                          <li key={symptom} className="flex gap-2">
                            <span className="text-blue-500">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {condition.treatmentHighlights?.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Treatment focus
                      </p>
                      <ul className="mt-1 space-y-1 text-sm text-gray-600">
                        {condition.treatmentHighlights.slice(0, 2).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-blue-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={condition.primaryPath}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View treatment pathway →
                    </Link>
                    {condition.relatedResources?.slice(0, 2).map((resource) => (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="text-sm text-gray-500 underline-offset-2 hover:text-blue-700 hover:underline"
                      >
                        {resource.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m15.5 15.5-2.625-2.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
