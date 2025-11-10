"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/src/data/searchIndex";

export default function SiteSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFn, setSearchFn] = useState<
    ((term: string, limit?: number) => SearchItem[]) | null
  >(null);
  const searchModulePromiseRef =
    useRef<Promise<typeof import("@/src/data/searchIndex")> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const baseId = useId();
  const dialogId = `${baseId}-dialog`;
  const headingId = `${baseId}-heading`;
  const instructionsId = `${baseId}-instructions`;
  const listboxId = `${baseId}-listbox`;
  const statusId = `${baseId}-status`;

  const ensureSearchFn = useCallback(async () => {
    if (searchFn) {
      return searchFn;
    }

    if (!searchModulePromiseRef.current) {
      searchModulePromiseRef.current = import("@/src/data/searchIndex");
    }

    const mod = await searchModulePromiseRef.current;
    setSearchFn(() => mod.searchContent);
    return mod.searchContent;
  }, [searchFn]);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    setResults([]);
    setIsLoading(false);
  }, []);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      closeSearch();
      // Start navigation once the dialog closes to keep focus handling simple
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
    if (!results[activeIndex]) {
      return;
    }
    const optionId = `${listboxId}-option-${activeIndex}`;
    const active = document.getElementById(optionId);
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, listboxId, results]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!searchFn) {
      let isCurrent = true;
      setIsLoading(true);

      ensureSearchFn()
        .then((fn) => {
          if (!isCurrent) {
            return;
          }
          setResults(fn(query, 8));
          setIsLoading(false);
        })
        .catch(() => {
          if (isCurrent) {
            setIsLoading(false);
            setResults([]);
          }
        });

      return () => {
        isCurrent = false;
      };
    }

    setResults(searchFn(query, 8));
  }, [ensureSearchFn, isOpen, query, searchFn]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        void ensureSearchFn();
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
  }, [activeIndex, closeSearch, ensureSearchFn, handleSelect, isOpen, results, scrollActiveResultIntoView]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (results.length === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((prev) => Math.min(prev, results.length - 1));
  }, [results.length]);

  const prefetchSearch = useCallback(() => {
    void ensureSearchFn();
  }, [ensureSearchFn]);

  const activeOptionId =
    results.length > 0 && results[activeIndex]
      ? `${listboxId}-option-${activeIndex}`
      : undefined;
  const isListboxOpen = results.length > 0;
  const describedByIds =
    isLoading || query
      ? `${instructionsId} ${statusId}`
      : instructionsId;
  const liveStatusMessage = isLoading
    ? "Loading search suggestions"
    : results.length > 0
    ? `${results.length} result${results.length === 1 ? "" : "s"} available`
    : query
    ? `No results found for ${query}`
    : "Start typing to search the site";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        onMouseEnter={prefetchSearch}
        onFocus={prefetchSearch}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        aria-label="Search site (Cmd/Ctrl + K)"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
      >
        <SearchIcon />
        <span className="hidden sm:inline">Search</span>
        <span className="rounded border border-gray-200 bg-gray-50 px-1.5 text-xs text-gray-500 sm:inline">
          ⌘K
        </span>
      </button>

        {isOpen && (
          <div
            id={dialogId}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-16 backdrop-blur-sm sm:py-24"
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={describedByIds}
          >
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
              <h2 id={headingId} className="sr-only">
                Search the site
              </h2>
              <p id={instructionsId} className="sr-only">
                Type to search and use the up and down arrow keys to review results, then press Enter to open a page. Press Escape to close search.
              </p>
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
                  role="combobox"
                  aria-autocomplete="list"
                  aria-controls={listboxId}
                  aria-expanded={isListboxOpen}
                  aria-activedescendant={activeOptionId}
                  aria-describedby={describedByIds}
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
                className="max-h-80 overflow-y-auto px-2 py-3 sm:px-3"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <p className="px-4 py-8 text-center text-sm text-gray-500">
                    Loading search suggestions…
                  </p>
                ) : isListboxOpen ? (
                  <ul
                    id={listboxId}
                    role="listbox"
                    aria-label="Search suggestions"
                    className="space-y-2"
                  >
                    {results.map((item, index) => {
                      const isActive = index === activeIndex;
                      const optionId = `${listboxId}-option-${index}`;
                      return (
                        <li
                          key={`${item.href}-${index}`}
                          id={optionId}
                          role="option"
                          data-index={index}
                          aria-selected={isActive}
                          tabIndex={-1}
                          className={`group rounded-xl px-3 py-3 transition ${
                            isActive
                              ? "bg-blue-50 ring-1 ring-inset ring-blue-200"
                              : "hover:bg-gray-50"
                          }`}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            handleSelect(item);
                          }}
                          onMouseEnter={() => setActiveIndex(index)}
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
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="px-4 py-8 text-center text-sm text-gray-500">
                    No results found. Try a broader term like{" "}
                    <strong>spine</strong> or <strong>epilepsy</strong>.
                  </p>
                )}
              </div>
              <div id={statusId} role="status" aria-live="polite" className="sr-only">
                {liveStatusMessage}
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
