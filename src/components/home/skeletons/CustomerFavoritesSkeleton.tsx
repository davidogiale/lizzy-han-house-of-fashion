
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CustomerFavoritesSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-20" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[3/4] mb-3">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFavoritesSkeleton;
