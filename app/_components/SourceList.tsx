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
    <section className={`mt-12 relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">{heading}</h2>
      <ul className="space-y-3 text-sm leading-relaxed">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium underline decoration-blue-200 hover:text-blue-800 hover:decoration-blue-400 transition-all duration-300"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-slate-500 border-t border-slate-200/60 pt-4">
        External links are provided for transparency and do not represent sponsorships. Each source was accessed on 19 Oct 2025.
      </p>
    </section>
  );
}
