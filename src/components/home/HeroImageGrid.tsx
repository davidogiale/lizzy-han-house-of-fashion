import React, { useEffect, useState, useCallback } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Database } from '@/integrations/supabase/types';
import type { EmblaCarouselType } from 'embla-carousel-react';

type Product = Database['public']['Tables']['products']['Row'];

const HeroImageGrid: React.FC = () => {
  const { products, loading } = useProducts();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Auto-scroll functionality
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  const gridProducts = React.useMemo(() => {
    // Filter products with images and take the first 6
    // We intentionally don't shuffle to keep a stable grid
    return products
      .filter(p => p.image_url)
      .slice(0, 6);
  }, [products]);



  const ProductCard = ({ product, className }: { product: Product, className?: string }) => (
    <Link
      to={`/product/${product.id}`}
      className={`group relative block overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content Reveal on Hover - Always visible on mobile? Or keep hover behavior? 
          Touch devices don't hover well. Maybe we should make it always visible or visible on active?
          For now obeying the existing design (hover). Mobile users might tap-hold or see it on tap.
          Actually, for a carousel, having the title visible is nice.
          But I will stick to the existing styling logic unless obvious.
          Wait, existing styling is `opacity-0 group-hover:opacity-100`.
          On mobile, this means they see nothing but image until they interaction?
          I will keep it as is to avoid scope creep, or maybe add a "mobile-visible" tweak if it looks bad.
          Let's stick to the exact code refactoring first.
      */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-between opacity-0 group-hover:opacity-100">
        <div>
          <p className="text-white/80 text-xs font-medium tracking-wider uppercase mb-1">
            {product.category || 'Collection'}
          </p>
          <h3 className="text-white text-xl font-playfair font-medium">
            {product.name}
          </h3>
        </div>
        <div className="bg-white text-black rounded-full p-2 transform rotate-45 group-hover:rotate-0 transition-transform duration-300">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="w-full h-[80vh] bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (gridProducts.length === 0) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-gray-50">
        <p className="text-muted-foreground">No products available for display.</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white p-4">
      {/* 
         Mobile: Carousel (< md)
         Desktop: Grid (>= md)
      */}
      
      {/* Mobile Carousel */}
      {/* Mobile Carousel */}
      <div className="block md:hidden relative group h-[500px]">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex touch-pan-y h-full"> 
            {gridProducts.map((product) => (
              <div className="flex-[0_0_100%] min-w-0 relative h-full" key={product.id}>
                 <div className="absolute inset-0">
                    <img 
                      src={product.image_url || '/placeholder.svg'} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                 </div>
                 
                 {/* Text Content Overlay */}
                 <div className="absolute inset-0 flex flex-col justify-center px-8 text-white z-10">
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 text-white/90">
                      Make a statement
                    </p>
                    <h2 className="text-4xl font-playfair font-bold leading-[1.15] mb-4 text-white drop-shadow-sm">
                      Discover fashion <br/> that sets you apart
                    </h2>
                    <p className="text-sm text-white/80 font-medium mb-6">
                      {product.name}
                    </p>
                    <Link 
                      to="/shop"
                      className="inline-flex items-center text-lg font-medium hover:opacity-80 transition-opacity"
                    >
                      Shop {product.category === 'Dresses' ? 'Dress' : 'Now'} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'bg-white scale-110' : 'bg-white/40'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-0"> {/* Re-added gap-0 just in case, or default */}
        {gridProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="w-full h-[400px] md:h-[500px] lg:h-[500px]"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroImageGrid;
