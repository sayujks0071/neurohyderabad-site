import dynamic from 'next/dynamic';

const DoctorCard = dynamic(() => import('./DoctorCard'), {
  ssr: true,
  loading: () => (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center">
        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded mx-auto mb-2 w-48 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mx-auto mb-3 w-32 animate-pulse" />
      </div>
    </div>
  ),
});

export default function DoctorCardLazy() {
  return <DoctorCard />;
}
