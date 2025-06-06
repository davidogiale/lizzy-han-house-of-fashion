
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 'p1',
    name: 'Velvet Touch Button-Up',
    price: 120.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=600',
    category: 'shirts'
  },
  {
    id: 'p2',
    name: 'Classic Denim Jacket',
    price: 179.50,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    category: 'jackets'
  },
  {
    id: 'p3',
    name: 'Urban Slim Fit Pants',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=600',
    category: 'pants'
  },
  {
    id: 'p4',
    name: 'Premium Cotton Hoodie',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=600',
    category: 'hoodies'
  }
];

const BestSellers: React.FC = () => {
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
          {products.map((product) => (
            <div key={product.id} className="bg-white group">
              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-accent transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} />
                </button>
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
                <p className="text-dark font-semibold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
