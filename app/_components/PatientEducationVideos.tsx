'use client';

import Image from 'next/image';
import { useState } from 'react';

type VideoItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  focus: string;
  source: string;
};

const videos: VideoItem[] = [
  {
    id: 'vqqAHzwZPYw',
    title: 'Endoscopic Spine Surgery with Dr. Sayuj Krishnan',
    description:
      'Dr. Sayuj Krishnan demonstrates the full endoscopic discectomy procedure, patient positioning, and post-operative mobilization protocol used at Yashoda Hospital, Malakpet.',
    duration: '4:12',
    focus: 'Minimally invasive spine surgery',
    source: 'Dr. Sayuj Krishnan - Neurosurgeon'
  },
  {
    id: 'dwQOFaVyYu8',
    title: 'Brain Tumor Surgery & Awake Craniotomy',
    description:
      'Advanced brain tumor surgery techniques including neuronavigation and awake craniotomy procedures performed by Dr. Sayuj Krishnan in Hyderabad.',
    duration: '5:06',
    focus: 'Brain tumor surgery',
    source: 'Dr. Sayuj Krishnan - Neurosurgeon'
  },
  {
    id: '1H25BsAg9Ho',
    title: 'Patient Recovery Journey After Endoscopic Spine Surgery',
    description:
      'A patient chronicles their recovery milestones from day zero to six weeks, highlighting the rehabilitation plan and real-world activity goals after endoscopic spine surgery.',
    duration: '3:48',
    focus: 'Patient recovery journey',
    source: 'Dr. Sayuj Krishnan - Neurosurgeon'
  }
];

export default function PatientEducationVideos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                Video Library
              </span>
              <h2 className="text-3xl font-bold text-blue-900 mt-2">
                Watch How We Plan & Deliver Neurosurgical Care
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Short, evidence-based explainers curated from global centres of excellence. Learn what to expect
                before, during, and after your procedure.
              </p>
            </div>
            <a
              href="https://www.youtube.com/results?search_query=endoscopic+spine+surgery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Explore More Videos
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {videos.map((video) => {
              const isActive = activeVideo === video.id;
              return (
                <article
                  key={video.id}
                  className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative aspect-video bg-gray-200">
                    {isActive ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&autoplay=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                        className="absolute inset-0 h-full w-full rounded-t-2xl"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <Image
                          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          fill
                          className="object-cover rounded-t-2xl"
                          sizes="(min-width: 1024px) 360px, (min-width: 768px) 33vw, 100vw"
                          priority={false}
                        />
                        <button
                          type="button"
                          onClick={() => setActiveVideo(video.id)}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 text-white"
                          aria-label={`Play ${video.title}`}
                        >
                          <span className="inline-flex items-center justify-center h-16 w-16 bg-white/90 text-blue-600 rounded-full shadow-xl">
                            ▶
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-sm text-blue-600 font-medium mb-2">
                      <span>{video.focus}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span>{video.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 mt-3 flex-1">{video.description}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>Source: {video.source}</span>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Watch on YouTube →
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
