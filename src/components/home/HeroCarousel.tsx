import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

const HeroCarousel: React.FC = () => {
  const { products, loading } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Filter products with images and select random ones
  const carouselProducts = React.useMemo(() => {
    const productsWithImages = products.filter(p => p.image_url);
    // Shuffle and take up to 5 products
    const shuffled = [...productsWithImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [products]);

  // Auto-scroll functionality
  const nextSlide = useCallback(() => {
    if (carouselProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  }, [carouselProducts.length]);

  const prevSlide = useCallback(() => {
    if (carouselProducts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  }, [carouselProducts.length]);

  // Auto-scroll every 3 seconds when not hovered
  useEffect(() => {
    if (!isHovered && carouselProducts.length > 0) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, nextSlide, carouselProducts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get tagline based on product category
  const getTagline = (product: Product) => {
    const category = product.category?.toLowerCase() || '';
    const taglines: Record<string, string> = {
      'men': 'MAKE A STATEMENT IN STYLE',
      'women': 'MAKE A STATEMENT IN RED',
      'accessories': 'COMPLETE YOUR LOOK',
      'shoes': 'STEP INTO ELEGANCE',
    };
    return taglines[category] || 'DISCOVER FASHION';
  };

  // Get headline based on product category
  const getHeadline = (product: Product) => {
    const category = product.category?.toLowerCase() || '';
    const headlines: Record<string, string> = {
      'men': 'Discover style that sets you apart',
      'women': 'Discover fashion that sets you apart',
      'accessories': 'Accessories that make a statement',
      'shoes': 'Footwear that defines elegance',
    };
    return headlines[category] || 'Discover fashion that sets you apart';
  };

  if (loading) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (carouselProducts.length === 0) {
    return (
      <div className="relative w-full h-screen" style={{ backgroundColor: '#E8D5C4' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome to Lizzy Han</h2>
            <p className="text-muted-foreground">House of Fashion</p>
          </div>
        </div>
      </div>
    );
  }

  const currentProduct = carouselProducts[currentIndex];

  return (
    <div 
      className="relative w-full h-screen lg:h-[2000px] overflow-hidden group bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Items */}
      <div className="relative w-full h-full">
        {carouselProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Responsive Margins */}
            <div className="absolute inset-0 mx-2 my-2 sm:mx-4 sm:my-3 lg:mx-[36px] lg:my-[12px]">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Dark Translucent Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 sm:from-black/50 sm:via-black/30 sm:to-transparent"></div>
            </div>

            {/* Content Overlay - Responsive */}
            <div className="relative h-full flex items-end sm:items-center pb-20 sm:pb-0">
              <div className="container-custom w-full">
                <div className="max-w-xl">
                  {/* Animated Text */}
                  <div className="space-y-3 sm:space-y-6 animate-fade-in">
                    {/* Tagline */}
                    <p className="text-white text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                      {getTagline(product)}
                    </p>

                    {/* Main Headline - Responsive Sizes */}
                    <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight">
                      {getHeadline(product)}
                    </h1>

                    {/* Product Name */}
                    <p className="text-white text-sm sm:text-base md:text-lg font-light">
                      {product.name}
                    </p>

                    {/* Shop Button */}
                    <div className="pt-2 sm:pt-2">
                      <Link 
                        to={`/product/${product.id}`}
                        className="inline-flex items-center gap-2 text-white text-xs sm:text-sm md:text-base font-semibold hover:gap-4 transition-all duration-300 group/link"
                      >
                        <span>Shop Dress</span>
                        <ArrowRight size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on Mobile */}
      <button
        type="button"
        onClick={prevSlide}
        className="hidden sm:block absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 lg:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="lg:w-7 lg:h-7" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="hidden sm:block absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 lg:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="lg:w-7 lg:h-7" />
      </button>

      {/* Dot Indicators - Repositioned for Mobile */}
      <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {carouselProducts.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 sm:w-12 h-2 sm:h-3 bg-white'
                : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
