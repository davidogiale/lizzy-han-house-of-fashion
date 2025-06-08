
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  badge?: string;
}

const favorites: Product[] = [
  {
    id: 'f1',
    name: 'Classic Trench Coat',
    price: 189.99,
    image: '/placeholder.svg',
    rating: 4.8,
    badge: 'Best Seller'
  },
  {
    id: 'f2',
    name: 'Little Black Dress',
    price: 95.00,
    image: '/placeholder.svg',
    rating: 4.9,
    badge: 'Customer Favorite'
  },
  {
    id: 'f3',
    name: 'Leather Ankle Boots',
    price: 145.99,
    image: '/placeholder.svg',
    rating: 4.7,
    badge: 'Best Seller'
  },
  {
    id: 'f4',
    name: 'Cashmere Scarf',
    price: 68.00,
    image: '/placeholder.svg',
    rating: 4.6
  },
  {
    id: 'f5',
    name: 'Wide-Leg Trousers',
    price: 79.99,
    image: '/placeholder.svg',
    rating: 4.5
  },
  {
    id: 'f6',
    name: 'Statement Earrings',
    price: 35.99,
    image: '/placeholder.svg',
    rating: 4.8,
    badge: 'Trending'
  }
];

const CustomerFavorites: React.FC = () => {
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
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-semibold z-10">
                    {product.badge}
                  </div>
                )}
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
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
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
                  </div>
                </div>
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-inter font-semibold text-lg mb-1 hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-dark font-semibold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFavorites;
