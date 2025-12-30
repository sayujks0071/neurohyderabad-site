'use client';

import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function Select({
  label,
  error,
  required,
  id,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 font-extrabold pl-1">*</span>}
      </label>
      <select
        id={id}
        className={`block w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
