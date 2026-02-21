'use client';

import React from 'react';
import { Control, useWatch, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface PainScoreSliderProps<T extends FieldValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  error?: string;
  required?: boolean;
}

export function PainScoreSlider<T extends FieldValues>({
  control,
  register,
  name,
  label = "Pain Score (1-10)",
  error,
  required,
}: PainScoreSliderProps<T>) {
  const painScoreValue = useWatch({
    control,
    name,
  });

  const value = Number(painScoreValue) || 5;

  return (
    <div>
      <label
        htmlFor={`${String(name)}-slider`}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 font-extrabold pl-1">*</span>}
      </label>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <span className="block text-sm font-bold text-slate-400" aria-hidden="true">1</span>
          <span className="block text-xs text-slate-400">No Pain</span>
        </div>
        <input
          id={`${String(name)}-slider`}
          type="range"
          min="1"
          max="10"
          step="1"
          className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            value <= 3
              ? "accent-green-600 focus:ring-green-500"
              : value <= 7
              ? "accent-yellow-500 focus:ring-yellow-500"
              : "accent-red-600 focus:ring-red-500"
          }`}
          aria-valuetext={painScoreValue ? `Score: ${value}${value >= 8 ? ' (Severe)' : value <= 3 ? ' (Mild)' : ''}` : "Score: 5"}
          title={`Pain Score: ${value}`}
          {...register(name)}
        />
        <div className="text-center">
          <span className="block text-sm font-bold text-slate-400" aria-hidden="true">10</span>
          <span className="block text-xs text-slate-400">Severe</span>
        </div>
      </div>
      <div className="text-center mt-2">
        <span
            className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
              value <= 3
                ? "bg-green-100 text-green-700"
                : value <= 7
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            Score: {value}
            {value >= 8 && " (Severe)"}
            {value <= 3 && " (Mild)"}
        </span>
      </div>
      {error && (
        <p className="mt-1 text-sm text-center text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
