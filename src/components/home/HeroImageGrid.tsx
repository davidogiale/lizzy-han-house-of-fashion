import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const HeroImageGrid: React.FC = () => {
  const { products, loading } = useProducts();

  const gridProducts = React.useMemo(() => {
    // Filter products with images and take the first 6
    // We intentionally don't shuffle to keep a stable grid, or we could shuffle if "freshness" is desired.
    // For a "Hero" usually newer is better. useProducts sorts by created_at desc.
    return products
      .filter(p => p.image_url)
      .slice(0, 6);
  }, [products]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (gridProducts.length === 0) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-gray-50">
        <p className="text-muted-foreground">No products available for display.</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white p-4">
      {/* 
         Mobile: 1 column
         Tablet: 2 columns
         Desktop: 3 columns
         
         We want a 3x2 grid on desktop, so we need exactly 6 items. 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {gridProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="group relative block w-full h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden"
          >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
               <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content Reveal on Hover */}
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between opacity-0 group-hover:opacity-100">
              <div>
                <p className="text-white/80 text-xs font-medium tracking-wider uppercase mb-1">
                  {product.category || 'Collection'}
                </p>
                <h3 className="text-white text-xl font-playfair font-medium">
                  {product.name}
                </h3>
              </div>
              <div className="bg-white text-black rounded-full p-2 transform rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <ArrowUpRight size={20} />
              </div>
            </div>
            
            {/* Darken overlay on hover slightly for text readability if needed, but gradient handles it */}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroImageGrid;
