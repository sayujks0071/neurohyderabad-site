'use client';

import Toast from "./Toast";
import type { ToastMessage } from "../ToastContext";

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

export default function ToastContainer({
  toasts,
  removeToast,
}: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] w-full max-w-xs space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}
