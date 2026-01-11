export default function SearchPlaceholder() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      aria-label="Search site (Loading...)"
    >
      <svg
        className="h-4 w-4"
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
      <span className="hidden sm:inline">Search</span>
      <span className="rounded border border-gray-200 bg-gray-50 px-1.5 text-xs text-gray-500 sm:inline">
        ⌘K
      </span>
    </button>
  );
}
