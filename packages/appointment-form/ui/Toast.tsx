'use client';

import { useEffect, useState, type ReactElement } from "react";
import type { ToastMessage } from "../ToastContext";

interface ToastProps extends ToastMessage {
  onClose: () => void;
}

const ICONS = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
} satisfies Record<ToastMessage["type"], ReactElement>;

const STYLES = {
  success: {
    bg: "bg-green-50",
    iconColor: "text-green-500",
    textColor: "text-green-800",
    close: "text-green-500 hover:bg-green-100 focus:ring-green-600",
  },
  error: {
    bg: "bg-red-50",
    iconColor: "text-red-500",
    textColor: "text-red-800",
    close: "text-red-500 hover:bg-red-100 focus:ring-red-600",
  },
  info: {
    bg: "bg-blue-50",
    iconColor: "text-blue-500",
    textColor: "text-blue-800",
    close: "text-blue-500 hover:bg-blue-100 focus:ring-blue-600",
  },
} as const;

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, 4700);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const styles = STYLES[type];

  return (
    <div
      role="alert"
      className={`w-full p-4 rounded-lg shadow-lg flex items-start gap-3 ${styles.bg} transition-all duration-300 ease-in-out ${
        isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
      }`}
    >
      <div className={`flex-shrink-0 ${styles.iconColor}`}>{ICONS[type]}</div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${styles.textColor}`}>{message}</p>
      </div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(onClose, 300);
        }}
        aria-label="Dismiss notification"
        className={`p-1 rounded-md -m-1 ${styles.close} focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
