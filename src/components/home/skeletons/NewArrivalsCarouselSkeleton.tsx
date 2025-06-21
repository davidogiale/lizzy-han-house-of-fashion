
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const NewArrivalsCarouselSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
        
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm min-w-0 flex-shrink-0 w-64">
                <Skeleton className="w-full h-64" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute -left-12 top-1/2 -translate-y-1/2">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarouselSkeleton;
