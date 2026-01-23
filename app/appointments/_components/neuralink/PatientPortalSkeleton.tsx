export default function PatientPortalSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-10 animate-pulse">
      {/* Header */}
      <div className="mb-12">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      </div>

      {/* Step 1: Reason for Visit */}
      <div className="space-y-6">
        <div className="flex items-center">
           <div className="w-8 h-8 rounded-full bg-slate-200 mr-3"></div>
           <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Step 2: Select Date */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <div className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-slate-200 mr-3"></div>
             <div className="h-6 bg-slate-200 rounded w-1/4"></div>
           </div>
           <div className="h-8 bg-slate-200 rounded-full w-40"></div>
        </div>
        <div className="h-24 bg-slate-200 rounded-2xl"></div>
      </div>

      {/* Step 3: Available Time */}
      <div className="space-y-6">
        <div className="flex items-center">
           <div className="w-8 h-8 rounded-full bg-slate-200 mr-3"></div>
           <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="h-10 bg-slate-200 rounded-xl"></div>
           ))}
        </div>
      </div>
    </div>
  );
}
