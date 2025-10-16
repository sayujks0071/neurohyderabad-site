/**
 * Image Optimization Utilities
 * Provides optimized image loading strategies
 */

export const IMAGE_OPTIMIZATION_CONFIG = {
  // Default quality for images
  quality: 85,
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
  
  // Image formats priority
  formats: ['image/avif', 'image/webp', 'image/jpeg'],
  
  // Lazy loading configuration
  lazyLoading: {
    rootMargin: '50px',
    threshold: 0.1,
  },
  
  // Critical images that should load immediately
  criticalImages: [
    '/images/logo-optimized.png',
    '/images/hero-bg.jpg',
    '/images/og-default.jpg'
  ]
};

export function getOptimizedImageProps(src: string, isCritical = false) {
  return {
    src,
    quality: IMAGE_OPTIMIZATION_CONFIG.quality,
    priority: isCritical || IMAGE_OPTIMIZATION_CONFIG.criticalImages.includes(src),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  };
}

export function preloadCriticalImages() {
  if (typeof window === 'undefined') return;
  
  IMAGE_OPTIMIZATION_CONFIG.criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}