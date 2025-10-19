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
    <div className={`bg-blue-50 border-l-4 border-blue-400 p-4 my-6 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700 leading-relaxed">
            <strong>Medically reviewed by </strong>
            <Link
              href="/about"
              rel="author"
              className="font-semibold underline decoration-blue-300 hover:text-blue-900 transition-colors"
            >
              {reviewerName}
            </Link>
            <span className="block text-xs text-blue-600 mt-1">{reviewerTitle}</span>
            <span className="block text-xs text-blue-600 mt-1">
              Last reviewed {formattedDate}
            </span>
          </p>
          <p className="text-xs text-blue-600 mt-3">
            This information is for educational purposes only and should not replace professional medical advice. 
            Please consult with Dr. Sayuj for personalized medical guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
