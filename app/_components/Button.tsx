import React from 'react';
import Link from 'next/link';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  className = '',
  children,
  target,
  rel,
  isLoading = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)] shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary: 'bg-[var(--color-secondary-500)] text-white hover:bg-[var(--color-secondary-700)] focus:ring-[var(--color-secondary-500)] shadow-sm hover:shadow-md hover:-translate-y-0.5',
    ghost: 'bg-transparent text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]',
    outline: 'bg-transparent border-2 border-[var(--color-primary-500)] text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm min-h-[44px]',
    lg: 'px-8 py-4 text-base min-h-[52px]',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href && !isLoading) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        aria-label={props['aria-label']}
        target={target}
        rel={rel}
        onClick={onClick}
        style={props.style}
      >
        {children}
      </Link>
    );
  }

  // If loading, render as button even if href is present (to disable it)
  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={props.disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
