'use client';

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800 focus:ring-cyan-500",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 focus:ring-slate-500",
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseClasses = [
    "w-full sm:w-auto inline-flex items-center justify-center",
    "rounded-md px-6 py-3 text-base font-semibold shadow-md",
    "transition-all duration-150 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "transform hover:-translate-y-0.5 hover:shadow-lg",
    "active:scale-95 active:shadow-md",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "disabled:shadow-none disabled:transform-none",
    VARIANT_CLASSES[variant],
    className,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
