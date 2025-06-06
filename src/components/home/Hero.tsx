
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Vogue Sweaters",
    subtitle: "Explore our premium collection",
    image: "/placeholder.svg",
    ctaText: "Shop Now",
    ctaLink: "/shop/men"
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "Lightweight fabrics for hot days",
    image: "/placeholder.svg",
    ctaText: "Explore Collection",
    ctaLink: "/shop/women"
  },
  {
    id: 3,
    title: "Accessories",
    subtitle: "Complete your look with our accessories",
    image: "/placeholder.svg",
    ctaText: "Discover More",
    ctaLink: "/shop/accessories"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container-custom h-full flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-md">
              {slide.subtitle}
            </p>
            <Link to={slide.ctaLink}>
              <Button className="btn-accent">
                {slide.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
