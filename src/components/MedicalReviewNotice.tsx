import ReviewedBy from '@/app/_components/ReviewedBy';

interface MedicalReviewNoticeProps {
  lastReviewed?: string;
  className?: string;
}

export default function MedicalReviewNotice({
  lastReviewed = 'October 1, 2025',
  className = '',
}: MedicalReviewNoticeProps) {
  return <ReviewedBy lastReviewed={lastReviewed} className={`mb-8 ${className}`} />;
}
