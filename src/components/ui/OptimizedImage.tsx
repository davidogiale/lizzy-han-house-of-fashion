import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // If priority is true, we want to load it immediately
  // Otherwise, we use native lazy loading
  const loadingStrategy = priority ? "eager" : "lazy";

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", containerClassName)}>
      <img
        src={src}
        alt={alt}
        loading={loadingStrategy}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "transition-all duration-700 ease-in-out",
          !isLoaded ? "scale-105 blur-sm grayscale" : "scale-100 blur-0 grayscale-0",
          error && "opacity-0",
          className
        )}
        {...props}
      />
      
      {/* Skeleton/Placeholder overlay */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-muted/10 animate-pulse" aria-hidden="true" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs text-center p-2">
          Image failed to load
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
