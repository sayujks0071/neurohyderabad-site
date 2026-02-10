import Link from "next/link";

interface ReviewedByProps {
  lastReviewed?: string;
  reviewerName?: string;
  reviewerTitle?: string;
  className?: string;
}

const DEFAULT_NAME = "Dr. Sayuj Krishnan";
const DEFAULT_TITLE = "Consultant Neurosurgeon, Yashoda Hospital Malakpet";

export default function ReviewedBy({
  lastReviewed = "2025-10-19",
  reviewerName = DEFAULT_NAME,
  reviewerTitle = DEFAULT_TITLE,
  className = "",
}: ReviewedByProps) {
  const formattedDate = new Date(lastReviewed).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`relative bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 my-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-blue-100/50 p-2 rounded-xl">
          <svg className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-base text-gray-800 leading-relaxed">
            <strong>Medically reviewed by </strong>
            <Link
              href="/about"
              rel="author"
              className="font-semibold text-blue-700 underline decoration-blue-300 hover:text-blue-900 transition-colors"
            >
              {reviewerName}
            </Link>
            <span className="block text-sm text-slate-600 mt-1">{reviewerTitle}</span>
            <span className="block text-sm text-slate-500 mt-1">
              Last reviewed {formattedDate}
            </span>
          </p>
          <p className="text-xs text-slate-500 mt-3 border-t border-slate-100 pt-3">
            This information is for educational purposes only and should not replace professional medical advice. 
            Please consult with Dr. Sayuj for personalized medical guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
