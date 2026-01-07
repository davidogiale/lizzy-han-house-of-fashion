import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';

const HeroImageGrid: React.FC = () => {
  const { products, loading } = useProducts();

  // Filter products with images and take the first 6
  const gridProducts = React.useMemo(() => {
    const productsWithImages = products.filter(p => p.image_url);
    return productsWithImages.slice(0, 6);
  }, [products]);

  if (loading) {
    return (
      <div className="w-full py-12 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index} 
                className="aspect-[3/4] bg-gray-300 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gridProducts.length === 0) {
    return (
      <div className="w-full py-12 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container-custom">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-2">Welcome to Lizzy Han</h2>
            <p className="text-muted-foreground">House of Fashion</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-8 lg:py-12 bg-white">
      <div className="container-custom">
        {/* Grid Container - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {gridProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              {/* Product Image */}
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {/* Product Name */}
                  <h3 className="text-xl lg:text-2xl font-bold font-playfair mb-2">
                    {product.name}
                  </h3>
                  
                  {/* Product Category */}
                  {product.category && (
                    <p className="text-sm uppercase tracking-wider mb-3 text-white/90">
                      {product.category}
                    </p>
                  )}
                  
                  {/* Product Price */}
                  <p className="text-lg lg:text-xl font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                  
                  {/* Shop Now Text */}
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-white pb-1">
                    <span>Shop Now</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Quick View Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Quick View
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroImageGrid;
