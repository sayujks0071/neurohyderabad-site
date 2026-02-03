'use client';

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 focus:ring-blue-500",
  secondary:
    "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-500",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = [
    "w-full sm:w-auto inline-flex items-center justify-center",
    "rounded-xl px-6 py-3 text-base font-semibold",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "hover:scale-[1.02] active:scale-[0.98]",
    "disabled:opacity-70 disabled:cursor-not-allowed",
    "disabled:shadow-none disabled:transform-none disabled:hover:scale-100",
    "relative overflow-hidden",
    VARIANT_CLASSES[variant],
    className,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      className={baseClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/10 animate-pulse" />
      )}
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
