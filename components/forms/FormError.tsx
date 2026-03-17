interface FormErrorProps {
  message: string | null;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm focus:ring-2 focus:ring-red-500 focus:ring-offset-2 outline-none"
    >
      <div className="font-semibold mb-1">Error</div>
      {message}
      <div className="mt-2 text-xs opacity-90">
        If this persists, please contact us directly at +91 9778280044.
      </div>
    </div>
  );
}
