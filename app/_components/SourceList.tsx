interface SourceListProps {
  sources: Array<{
    label: string;
    href: string;
  }>;
  heading?: string;
  className?: string;
}

export default function SourceList({
  sources,
  heading = "Sources & Evidence",
  className = "",
}: SourceListProps) {
  if (!sources.length) return null;

  return (
    <section className={`mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{heading}</h2>
      <ul className="space-y-3 text-sm leading-relaxed">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline decoration-blue-300 hover:text-blue-900 transition-colors"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-gray-500">
        External links are provided for transparency and do not represent sponsorships. Each source was accessed on 19 Oct 2025.
      </p>
    </section>
  );
}
