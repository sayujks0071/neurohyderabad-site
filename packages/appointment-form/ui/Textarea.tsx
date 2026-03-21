'use client';

import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
      <textarea
        id={id}
        ref={ref}
        rows={4}
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

Textarea.displayName = "Textarea";

export default Textarea;
