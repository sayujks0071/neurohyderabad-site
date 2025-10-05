import Image, { ImageProps } from 'next/image'

interface SmartImageProps extends Omit<ImageProps, 'loading' | 'sizes'> {
  alt: string
  priority?: boolean
}

export default function SmartImage({ alt, priority = false, ...props }: SmartImageProps) {
  return (
    <Image 
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, 800px"
      alt={alt}
      {...props}
    />
  )
}
