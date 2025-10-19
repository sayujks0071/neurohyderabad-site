'use client';

import Spinner from "./ui/Spinner";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({
  isLoading,
  message = "Processing...",
}: LoadingOverlayProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex flex-col justify-center items-center backdrop-blur-sm transition-opacity duration-300">
      <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-lg shadow-2xl">
        <Spinner className="w-8 h-8 text-cyan-600" />
        <p className="text-lg font-medium text-slate-700">{message}</p>
      </div>
    </div>
  );
}
