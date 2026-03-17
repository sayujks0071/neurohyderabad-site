import { CheckCircle } from "lucide-react";
import Button from "@/app/_components/Button";

interface FormSuccessProps {
  title?: string;
  message: string;
  onReset?: () => void;
  resetLabel?: string;
}

export default function FormSuccess({
  title = "Request Received!",
  message,
  onReset,
  resetLabel = "Send another request"
}: FormSuccessProps) {
  return (
    <div className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-3xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed max-w-lg mx-auto mb-8 whitespace-pre-wrap">{message}</p>
      {onReset && (
        <Button onClick={onReset}>
          {resetLabel}
        </Button>
      )}
    </div>
  );
}
