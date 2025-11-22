import type { ReactNode } from 'react';

interface StatCardProps {
  icon?: string | ReactNode;
  title: string;
  value?: string | number;
  description?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * StatCard primitive - displays metrics, stats, or key information with hover effect
 *
 * Usage:
 * <StatCard
 *   icon="🎓"
 *   title="Experience"
 *   value="9+"
 *   description="Years of neurosurgical practice"
 * />
 */
export default function StatCard({
  icon,
  title,
  value,
  description,
  children,
  className = ''
}: StatCardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-8 text-center
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        ${className}
      `}
    >
      {icon && (
        <div className="text-4xl mb-4">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        {title}
      </h3>
      {value && (
        <p className="text-3xl font-bold text-blue-900 mb-2">
          {value}
        </p>
      )}
      {description && (
        <p className="text-gray-700">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
