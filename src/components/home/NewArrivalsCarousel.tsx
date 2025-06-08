
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const newArrivals: Product[] = [
  {
    id: 'na1',
    name: 'Floral Wrap Dress',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'dresses'
  },
  {
    id: 'na2',
    name: 'Silk Blouse',
    price: 65.00,
    image: '/placeholder.svg',
    category: 'tops'
  },
  {
    id: 'na3',
    name: 'High-Waist Jeans',
    price: 79.99,
    image: '/placeholder.svg',
    category: 'bottoms'
  },
  {
    id: 'na4',
    name: 'Cashmere Sweater',
    price: 120.00,
    image: '/placeholder.svg',
    category: 'tops'
  },
  {
    id: 'na5',
    name: 'Midi Skirt',
    price: 55.99,
    image: '/placeholder.svg',
    category: 'bottoms'
  },
  {
    id: 'na6',
    name: 'Evening Gown',
    price: 199.99,
    image: '/placeholder.svg',
    category: 'dresses'
  }
];

const NewArrivalsCarousel: React.FC = () => {
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
            {newArrivals.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="bg-white group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
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
                    <p className="text-dark font-semibold">${product.price.toFixed(2)}</p>
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
