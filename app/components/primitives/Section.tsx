import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gray' | 'blue' | 'red';
  spacing?: 'tight' | 'normal' | 'relaxed';
  id?: string;
}

/**
 * Section primitive - standardized section wrapper with consistent spacing
 *
 * Usage:
 * <Section variant="gray" spacing="normal">
 *   <h2>Your content</h2>
 * </Section>
 */
export default function Section({
  children,
  className = '',
  variant = 'default',
  spacing = 'normal',
  id
}: SectionProps) {
  const variantClasses = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50',
    red: 'bg-red-50'
  };

  const spacingClasses = {
    tight: 'py-12',
    normal: 'py-16',
    relaxed: 'py-20'
  };

  return (
    <section
      id={id}
      className={`${variantClasses[variant]} ${spacingClasses[spacing]} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
