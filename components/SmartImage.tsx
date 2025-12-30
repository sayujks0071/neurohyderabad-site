import Image, { ImageProps } from 'next/image';

interface SmartImageProps extends Omit<ImageProps, 'loading' | 'sizes'> {
  alt: string;
  priority?: boolean;
}

export default function SmartImage({ alt, priority = false, quality, ...props }: SmartImageProps) {
  return (
    <Image
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
      quality={quality ?? 80}
      alt={alt}
      {...props}
    />
  );
}
