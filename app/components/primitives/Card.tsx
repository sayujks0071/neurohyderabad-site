import type { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  hover?: boolean;
}

/**
 * Card primitive - flexible card component with optional hover effects
 *
 * Usage:
 * <Card variant="elevated" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 *
 * Or with link:
 * <Card href="/services" hover>
 *   <h3>Service Name</h3>
 * </Card>
 */
export default function Card({
  children,
  href,
  className = '',
  variant = 'default',
  hover = true
}: CardProps) {
  const variantClasses = {
    default: 'bg-white shadow-md',
    bordered: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg'
  };

  const hoverClasses = hover
    ? 'transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1'
    : '';

  const cardClasses = `
    ${variantClasses[variant]}
    ${hoverClasses}
    rounded-lg p-6
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={`block ${cardClasses}`}>
        {children}
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}
