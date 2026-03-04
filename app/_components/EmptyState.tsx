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
      className={`flex flex-col items-center justify-center text-center py-[var(--space-16)] px-[var(--space-4)] ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center mb-[var(--space-6)]">
        <IconComponent className="h-8 w-8 text-[var(--color-primary-500)]" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--color-text-secondary)] max-w-md mb-[var(--space-6)]">
        {message}
      </p>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-3 focus-ring no-underline"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-3 focus-ring"
            type="button"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
