"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchContent, type SearchItem } from "@/src/data/searchIndex";

export default function SiteSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchContent(query, 8), [query]);

  const openSearch = useCallback(() => setIsOpen(true), []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      closeSearch();
      router.push(item.href);
    },
    [closeSearch, router],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 75);

    return () => clearTimeout(timeout);
  }, [isOpen]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
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
  }, [activeIndex, closeSearch, handleSelect, isOpen, results, scrollActiveResultIntoView]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        aria-label="Search site (Cmd/Ctrl + K)"
      >
        <SearchIcon />
        <span className="hidden sm:inline">Search</span>
        <span className="rounded border border-gray-200 bg-gray-50 px-1.5 text-xs text-gray-500 sm:inline">
          ⌘K
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-16 backdrop-blur-sm sm:py-24"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
            <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
              <SearchIcon className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="search"
                placeholder="Search conditions, treatments, or resources"
                className="w-full border-none text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoCapitalize="none"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={closeSearch}
                className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
              >
                Esc
              </button>
            </div>

            <div
              ref={resultsRef}
              className="max-h-80 overflow-y-auto px-2 py-3 sm:px-3"
            >
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-500">
                  No results found. Try a broader term like{" "}
                  <strong>spine</strong> or <strong>epilepsy</strong>.
                </p>
              ) : (
                results.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={`${item.href}-${index}`}
                      data-index={index}
                      className={`group rounded-xl px-3 py-3 transition ${
                        isActive
                          ? "bg-blue-50 ring-1 ring-inset ring-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelect(item)}
                        className="flex w-full flex-col gap-1 text-left"
                      >
                        <span className="text-sm font-semibold text-gray-900">
                          {item.title}
                        </span>
                        <span className="text-xs uppercase tracking-wide text-blue-600">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.description}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
              <span>Press Enter to open the highlighted result</span>
              <span className="hidden sm:flex items-center gap-2">
                <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5">
                  ↑
                </kbd>
                <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5">
                  ↓
                </kbd>
                navigate
              </span>
            </div>
          </div>
        </div>
      )}
    </>
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
