import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * PageHeader primitive - consistent section headers with optional subtitle
 *
 * Usage:
 * <PageHeader
 *   title="Our Services"
 *   subtitle="Comprehensive neurosurgical care"
 *   align="center"
 * />
 */
export default function PageHeader({
  title,
  subtitle,
  align = 'center',
  className = ''
}: PageHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center'
  };

  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
