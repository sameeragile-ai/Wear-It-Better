import React, { useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'tall';
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  aspectRatio = 'portrait',
  className = '',
  imgClassName = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    tall: 'aspect-[3/4]',
  }[aspectRatio];

  // Helper to create clean srcset for Unsplash images
  const generateSrcSet = (url: string) => {
    if (!url.includes('images.unsplash.com')) return undefined;
    const base = url.split('?')[0];
    return `${base}?w=400&q=80&auto=format 400w, ${base}?w=800&q=80&auto=format 800w, ${base}?w=1200&q=80&auto=format 1200w, ${base}?w=1600&q=80&auto=format 1600w`;
  };

  const srcSet = generateSrcSet(src);

  return (
    <div
      className={`relative overflow-hidden bg-[#F3EDE3] ${aspectClasses} ${className}`}
    >
      {/* Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-shimmer" />
      )}

      {hasError ? (
        // Light Champagne Gradient Fallback with Thin Gold Monogram
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-grad-champagne">
          <div className="w-12 h-12 rounded-full border border-[#B08A3E]/60 flex items-center justify-center shadow-sm mb-2 bg-white/60 backdrop-blur-sm">
            <span className="font-serif text-[#8A6A2B] text-xl font-semibold tracking-wider">W</span>
          </div>
          <span className="text-[11px] font-medium tracking-widest uppercase text-[#7A6F63] max-w-[140px] truncate">
            {alt || 'Wear It Better'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
          } ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
};
