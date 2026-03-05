"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/src/data/searchIndex";

interface SiteSearchModalProps {
  onClose: () => void;
}

export default function SiteSearchModal({ onClose }: SiteSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      onClose();
      // Start navigation once the dialog closes
      router.push(item.href);
    },
    [onClose, router],
  );

  // Auto-focus input on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  const scrollActiveResultIntoView = useCallback(() => {
    const container = resultsRef.current;
    if (!container) return;

    const active = container.querySelector<HTMLDivElement>(
      `[data-index="${activeIndex}"]`,
    );
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Perform search with debounce
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch('/api/ai/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query.trim(), limit: 8 }),
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        } else {
          console.error('Search failed:', response.status);
          setResults([]);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Keyboard navigation within modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1));
        scrollActiveResultIntoView();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          prev === 0 ? Math.max(results.length - 1, 0) : prev - 1,
        );
        scrollActiveResultIntoView();
      }

      if (event.key === "Enter" && results[activeIndex]) {
        event.preventDefault();
        handleSelect(results[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleSelect, onClose, results, scrollActiveResultIntoView]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Ensure active index is within bounds when results change
  useEffect(() => {
    if (results.length === 0) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((prev) => Math.min(prev, results.length - 1));
  }, [results.length]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-16 backdrop-blur-sm sm:py-24"
      role="dialog"
      aria-modal="true"
      aria-label="Site Search"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-[var(--color-surface)] shadow-2xl ring-1 ring-black/10">
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4">
          <SearchIcon className="h-5 w-5 text-[var(--color-text-secondary)]" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={results.length > 0}
            aria-controls="search-results-listbox"
            aria-activedescendant={
              results.length > 0 ? `result-option-${activeIndex}` : undefined
            }
            placeholder="Search conditions, treatments, or resources..."
            className="w-full border-none text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoCapitalize="none"
            spellCheck={false}
          />
          {isLoading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-blue-600" />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-text-secondary)] transition hover:border-[var(--color-border)] hover:text-[var(--color-text-secondary)]"
          >
            Esc
          </button>
        </div>

        {/* Visually hidden assertive live region for screen readers */}
        <div className="sr-only" role="status" aria-live="polite">
          {query.trim() === ""
            ? "Type to search."
            : isLoading && results.length === 0
            ? "Thinking..."
            : results.length === 0
            ? "No results found."
            : `${results.length} result${results.length === 1 ? "" : "s"} found.`}
        </div>

        <div
          ref={resultsRef}
          id="search-results-listbox"
          role="listbox"
          aria-label="Search results"
          className="max-h-80 overflow-y-auto px-2 py-3 sm:px-3"
        >
          {query.trim() === "" ? (
            <div className="px-4 py-8 text-center">
               <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Ask me anything about neurosurgery, symptoms, or treatments.
              </p>
              <p className="text-xs text-[var(--color-primary-500)] font-medium bg-[var(--color-primary-50)] inline-block px-3 py-1 rounded-full">
                ✨ Powered by AI Semantic Search
              </p>
            </div>
          ) : isLoading && results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-secondary)]">
              <p>Thinking...</p>
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[var(--color-text-secondary)]">
              No results found. Try describing your symptoms or using different keywords.
            </p>
          ) : (
            results.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`${item.href}-${index}`}
                  id={`result-option-${index}`}
                  role="option"
                  aria-selected={isActive}
                  data-index={index}
                  className={`group rounded-xl px-3 py-3 transition ${
                    isActive
                      ? "bg-[var(--color-primary-50)] ring-1 ring-inset ring-[var(--color-primary-200)]"
                      : "hover:bg-[var(--color-background)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="flex w-full flex-col gap-1 text-left"
                  >
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-[var(--color-primary-500)]">
                      {item.category}
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                      {item.description}
                    </span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3 text-xs text-[var(--color-text-secondary)]">
          <span>Press Enter to open the highlighted result</span>
          <span className="hidden sm:flex items-center gap-2">
            <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-1.5 py-0.5">
              ↑
            </kbd>
            <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-background)] px-1.5 py-0.5">
              ↓
            </kbd>
            navigate
          </span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
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
