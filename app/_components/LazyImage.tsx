'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  fill = false,
  style,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {!isInView && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.warn(`Failed to load image: ${src}`);
            setIsLoaded(true);
          }}
        />
      )}
    </div>
  );
}
