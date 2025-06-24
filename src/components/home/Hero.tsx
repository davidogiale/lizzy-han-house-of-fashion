
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden" style={{ backgroundColor: '#E8D5C4' }}>
      <div className="container-custom h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full lg:pt-16">
          {/* Left side - Text content with logo */}
          <div className="text-center lg:text-left">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start mb-10">
              <img 
                src="/lovable-uploads/e31a658b-c8be-4ac9-a826-aa9eea4a9b70.png" 
                alt="Lizzy Hans House of Fashion Logo" 
                className="w-24 h-24 object-contain"
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
          <div className="hidden lg:flex justify-center lg:justify-end">
            <img 
              src="/lovable-uploads/a57170ea-7321-47af-b1a7-dc64f6d7ee3d.png" 
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
