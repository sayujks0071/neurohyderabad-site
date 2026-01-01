'use client';

import Image from 'next/image';
import { useState, useMemo, CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  style?: CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  loading,
  decoding,
  fetchPriority,
  style
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = useMemo(() => {
    if (blurDataURL) return blurDataURL;

    const svg = `
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui">Loading...</text>
      </svg>
    `;

    // btoa is available globally in Node.js 16+ and all modern browsers.
    // We avoid Buffer to prevent including the node polyfill in the client bundle.
    const toBase64 = (str: string) =>
      typeof window === 'undefined' ? btoa(str) : window.btoa(str);

    return `data:image/svg+xml;base64,${toBase64(svg)}`;
  }, [blurDataURL, width, height]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={fill ? {} : { width, height }}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={fill ? {} : { width, height }}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        // Advanced optimization props
        loading={loading || (priority ? 'eager' : 'lazy')}
        decoding={decoding || 'async'}
        fetchPriority={fetchPriority || (priority ? 'high' : 'auto')}
      />
    </div>
  );
}
