import Link from 'next/link';

/**
 * ServiceCard Component - Modern Clean Enhancement
 * Implements the Glassmorphism Pattern with Tailwind CSS
 * Features:
 * - Glass card container
 * - Tactile hover effects
 * - Responsive grid layout
 * - Modern color palette
 */

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  excerpt: string;
  href: string;
  className?: string;
}

export default function ServiceCard({
  icon,
  title,
  excerpt,
  href,
  className = '',
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`group block relative bg-[var(--color-surface)]/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
      aria-label={`Learn more about ${title}`}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-[var(--color-success)] group-hover:text-[var(--color-primary-500)] transition-colors">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary-500)] transition-colors">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">
        {excerpt}
      </p>

      {/* Action */}
      <span className="inline-flex items-center text-[var(--color-primary-500)] font-medium group-hover:text-[var(--color-primary-800)] transition-colors">
        Learn More
        <svg
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </Link>
  );
}
