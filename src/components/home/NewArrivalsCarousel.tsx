
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Maximize2, Loader2 } from 'lucide-react';
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
import NewArrivalsCarouselSkeleton from './skeletons/NewArrivalsCarouselSkeleton';

const NewArrivalsCarousel: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
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
    return <NewArrivalsCarouselSkeleton />;
  }

  if (error) {
    return (
      <section className="py-16" style={{ backgroundColor: '#E8D5C4' }}>
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
    <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-helvetica font-bold mb-8 uppercase tracking-wide text-left">New Arrivals</h2>
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
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img 
                        src={product.image_url || '/placeholder.svg'} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button 
                        className="bg-white hover:bg-black hover:text-white text-gray-800 p-2.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center transform hover:scale-110"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Added to Wishlist",
                            description: "This feature is coming soon!",
                          });
                        }}
                      >
                        <Heart size={18} />
                      </button>
                      <button
                        className="bg-white hover:bg-black hover:text-white text-gray-800 p-2.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center transform hover:scale-110 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-800"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product.id);
                        }}
                        disabled={isAdding === product.id}
                      >
                        {isAdding === product.id ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <ShoppingBag size={18} />
                        )}
                      </button>
                      <button 
                        className="bg-white hover:bg-black hover:text-white text-gray-800 p-2.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center transform hover:scale-110"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <Maximize2 size={18} />
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
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-normal text-base text-gray-800">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-bold text-lg text-black">
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(Number(product.price))}
                    </p>
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
