interface MedicalReviewNoticeProps {
  lastReviewed?: string;
  className?: string;
}

export default function MedicalReviewNotice({ 
  lastReviewed = "October 1, 2025",
  className = ""
}: MedicalReviewNoticeProps) {
  return (
    <div className={`bg-blue-50 p-4 rounded-lg mb-8 ${className}`}>
      <p className="text-sm text-gray-700">
        <strong>Medically reviewed by Dr Sayuj Krishnan</strong> — MBBS, DNB Neurosurgery (Direct 6 years), Fellowship in Minimally Invasive and Advanced Spine Surgery<br/>
        <strong>Last reviewed:</strong> {lastReviewed}
      </p>
    </div>
  );
}
