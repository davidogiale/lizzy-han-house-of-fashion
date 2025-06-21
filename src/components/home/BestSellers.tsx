
import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

const BestSellers: React.FC = () => {
  const { products, loading, error } = useProducts();

  // Show first 4 products as best sellers
  const bestSellers = products.slice(0, 4);

  if (loading) {
    return (
      <section className="py-16 bg-muted">
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
      <section className="py-16 bg-muted">
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
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair font-bold">Best Sellers</h2>
          <Link to="/shop" className="text-primary hover:text-accent underline transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white group">
              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image_url || '/placeholder.svg'} 
                    alt={product.name} 
                    className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <button className="w-full bg-primary text-white py-2 hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-inter font-semibold text-lg mb-1 hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-dark font-semibold">₦{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
