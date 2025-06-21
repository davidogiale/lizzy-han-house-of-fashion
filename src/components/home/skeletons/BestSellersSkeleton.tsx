
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BestSellersSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white">
              <Skeleton className="w-full h-80" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSkeleton;
