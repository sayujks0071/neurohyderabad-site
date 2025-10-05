export default function ReviewedBy({ date, className = '' }: { date?: string; className?: string }) {
  const d = date ?? new Date().toISOString().slice(0, 10);
  return (
    <div className={`mt-6 rounded-lg bg-slate-50 p-3 text-sm ${className}`}>
      <strong>Reviewed by:</strong> Dr. Sayuj Krishnan, Consultant Neurosurgeon (Yashoda Hospital, Malakpet)
      <br />
      <strong>Last reviewed:</strong> {d}
    </div>
  );
}
