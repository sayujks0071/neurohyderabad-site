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
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] border border-transparent focus:ring-blue-500',
    secondary: 'bg-white border border-slate-200 text-slate-600 font-medium hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-sm focus:ring-slate-400',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-800 focus:ring-blue-500',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
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
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;
