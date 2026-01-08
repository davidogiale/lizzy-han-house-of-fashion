
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductsGridProps {
  filteredProducts: Product[];
  sortBy: string;
  setSortBy: (value: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  filteredProducts,
  sortBy,
  setSortBy
}) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    setIsAdding(productId);
    try {
      await addToCart({ productId, quantity: 1 });
    } catch (e) {
      // Error is handled by the mutation's onError callback
      console.error("Failed to add to cart:", e);
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="w-full">
      {/* Sort and Result Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <p className="text-dark mb-2 sm:mb-0">
          Showing {filteredProducts.length} products
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
              <a href={`/product/${product.id}`} className="block w-full h-full">
                <img 
                  src={product.image_url || '/placeholder.svg'} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </a>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <button
                  className="w-full bg-white text-black py-3 shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm uppercase tracking-widest font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product.id);
                  }}
                  disabled={isAdding === product.id}
                >
                  {isAdding === product.id ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Visual Carousel Indicators */}
            <div className="grid grid-cols-4 gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-[2px] w-full bg-black"></div>
              <div className="h-[2px] w-full bg-gray-200"></div>
              <div className="h-[2px] w-full bg-gray-200"></div>
              <div className="h-[2px] w-full bg-gray-200"></div>
            </div>

            <div className="space-y-1">
              <a href={`/product/${product.id}`} className="block">
                <h3 className="font-normal text-base text-gray-800">
                  {product.name}
                </h3>
              </a>
              <p className="font-bold text-lg text-black">
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(Number(product.price))}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-dark">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}

      {/* Authentication Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              You must be logged in to add items to your cart.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button onClick={() => window.location.href = '/account'} className="w-full">
              Go to Login
            </Button>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)} className="w-full">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsGrid;
