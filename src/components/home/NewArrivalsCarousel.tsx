
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

const NewArrivalsCarousel: React.FC = () => {
  const { products, loading, error } = useProducts();
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
      console.error("Failed to add to cart:", e);
    } finally {
      setIsAdding(null);
    }
  };

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
          <h2 className="text-3xl font-playfair font-bold">New Arrivals</h2>
          <Link to="/shop" className="text-primary hover:text-accent underline transition-colors">
            View All
          </Link>
        </div>
        
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image_url || '/placeholder.svg'} 
                        alt={product.name} 
                        className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <button 
                      className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-accent transition-colors shadow-sm"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={isAdding === product.id}
                        >
                          {isAdding === product.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <ShoppingCart size={14} />
                          )}
                          {isAdding === product.id ? 'Adding...' : 'Add to Cart'}
                        </Button>
                        <Link to={`/product/${product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View
                          </Button>
                        </Link>
                      </div>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
    </section>
  );
};

export default NewArrivalsCarousel;
