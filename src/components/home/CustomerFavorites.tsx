
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

const CustomerFavorites: React.FC = () => {
  const { products, loading, error } = useProducts();

  // Show products 2-7 as customer favorites (different from best sellers)
  const favorites = products.slice(1, 7);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Unable to load products</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4">Customer Favorites</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the pieces our customers can't stop raving about
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white group relative">
              <div className="relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Customer Favorite
                </div>
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image_url || '/placeholder.svg'} 
                    alt={product.name} 
                    className="w-full h-64 lg:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-accent transition-colors shadow-sm"
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">(4.5)</span>
                  </div>
                </div>
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-inter font-semibold text-lg mb-1 hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-dark font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFavorites;
