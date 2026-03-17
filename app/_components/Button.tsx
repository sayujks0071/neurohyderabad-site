import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

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
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] focus:ring-blue-500',
    secondary: 'bg-white border border-slate-200 text-slate-600 font-medium transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-400',
    ghost: 'bg-transparent text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)]',
    outline: 'bg-transparent border-2 border-[var(--color-primary-500)] text-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] focus:ring-[var(--color-primary-500)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-3 text-sm min-h-[44px]',
    lg: 'px-8 py-4 text-base min-h-[52px]',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  const ariaLabel = props['aria-label'] || (typeof children === 'string' ? children : undefined);

  if (href && !isLoading) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        onClick={onClick as any}
        aria-label={ariaLabel}
        {...(props as any)}
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
      aria-label={ariaLabel}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;
