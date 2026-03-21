'use client';

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    required,
    id,
    className = "",
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
        {required && <span className="text-red-500 font-extrabold pl-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        ref={ref}
        className={`apple-style-input-field block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition-all duration-300 focus:bg-white focus:border-clinical-blue focus:ring-4 focus:ring-clinical-blue/20 focus:outline-none placeholder:text-slate-400 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
