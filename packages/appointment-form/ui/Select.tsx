'use client';

import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    required,
    id,
    className = "",
    children,
    ...props
  },
  ref
) {
  const errorId = error ? `${id}-error` : undefined;

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
        ref={ref}
        className={`block w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-slate-800 shadow-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
        aria-required={required}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
