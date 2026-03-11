import React from 'react';
import { Search, FileText, Calendar, MessageCircle } from 'lucide-react';

type EmptyIcon = 'search' | 'document' | 'calendar' | 'message';

interface EmptyStateProps {
  /** Empty state title */
  title?: string;
  /** Description */
  message?: string;
  /** Icon variant */
  icon?: EmptyIcon;
  /** Primary action */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Additional CSS classes */
  className?: string;
}

const iconMap: Record<EmptyIcon, React.FC<{ className?: string }>> = {
  search: Search,
  document: FileText,
  calendar: Calendar,
  message: MessageCircle,
};

/**
 * Empty state component for zero-data views.
 * Uses design tokens for consistent styling.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing here yet',
  message = 'No items to display at the moment.',
  icon = 'document',
  action,
  className = '',
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center mb-6">
        <IconComponent className="h-8 w-8 text-[var(--color-primary-500)]" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)] max-w-md mb-6">
        {message}
      </p>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
            aria-label={action.label}
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
            type="button"
            aria-label={action.label}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
