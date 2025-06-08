
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const wishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'Classic Trench Coat',
    price: 189.99,
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: '2',
    name: 'Little Black Dress',
    price: 95.00,
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: '3',
    name: 'Cashmere Scarf',
    price: 68.00,
    image: '/placeholder.svg',
    inStock: false
  }
];

const Wishlist: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-playfair font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlistItems.length} items</p>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to view them later
            </p>
            <Link to="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-red-50">
                    <X size={16} className="text-red-500" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-dark font-bold mb-4">${item.price.toFixed(2)}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 btn-primary"
                      disabled={!item.inStock}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
