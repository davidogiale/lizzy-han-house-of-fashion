
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProducts } from '@/hooks/useProducts';

const NewArrivalsCarousel: React.FC = () => {
  const { products, loading, error } = useProducts();

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
          <Link to="/shop/new-arrivals" className="text-primary hover:text-accent underline transition-colors">
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
                        <Button size="sm" className="flex-1">
                          <ShoppingCart size={14} className="mr-1" />
                          Add to Cart
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
                    <p className="text-dark font-semibold">${product.price}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
