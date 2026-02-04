'use client';

import dynamic from 'next/dynamic';
import PatientEducationVideosSkeleton from '../skeletons/PatientEducationVideosSkeleton';

const PatientEducationVideos = dynamic(() => import('../PatientEducationVideos'), {
  ssr: false,
  loading: () => <PatientEducationVideosSkeleton />
});

export default function PatientEducationVideosWrapper() {
  return <PatientEducationVideos />;
}
