export default function PatientEducationVideosSkeleton() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div className="w-full max-w-2xl">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Button Placeholder */}
            <div className="h-12 w-48 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Image Placeholder (16:9 aspect ratio) */}
                <div className="aspect-video bg-gray-200 animate-pulse w-full relative">
                  {/* Play Button Icon Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 bg-white/50 rounded-full"></div>
                  </div>
                </div>

                {/* Content Placeholder */}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  {/* Meta (Focus • Duration) */}
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 flex-1 pt-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Footer (Source + Link) */}
                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
