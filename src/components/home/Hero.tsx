
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[70vh] overflow-hidden pb-12 md:pb-0" style={{ backgroundColor: '#E8D5C4' }}>
      <div className="container-custom h-full flex items-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left side - Text content with logo (mobile only) */}
          <div className="text-center lg:text-left flex flex-col justify-center">
            {/* Logo - only visible on mobile */}
            <div className="flex justify-center lg:hidden mb-6">
              <img 
                src="/lovable-uploads/e31a658b-c8be-4ac9-a826-aa9eea4a9b70.png" 
                alt="Lizzy Han House of Fashion Logo" 
                className="w-32 h-32 object-contain"
              />
            </div>
            
            <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Effortless Style for Everyone
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-md mx-auto lg:mx-0">
              Discover your perfect look with our curated collection of fashion for both men and women.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/shop">
                <Button className="btn-accent px-8 py-3">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Single product image (hidden on tablet and mobile) */}
          <div className="hidden lg:flex justify-center lg:justify-end items-center">
            <img 
              src="/lovable-uploads/1e459818-c233-4d0f-90d3-00c12e848693.png" 
              alt="Featured Product" 
              className="w-full max-w-md h-auto object-contain hover-scale"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
