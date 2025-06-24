
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden" style={{ backgroundColor: '#D4B895' }}>
      <div className="container-custom h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
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

          {/* Right side - Large floating logo in flower shape */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="animate-bounce">
              <div 
                className="w-80 h-80 animate-pulse flex items-center justify-center"
                style={{
                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                }}
              >
                <img 
                  src="/lovable-uploads/fc31f651-1643-45e6-bd2e-80cbc9b673f4.png" 
                  alt="Lizzy Hans Logo" 
                  className="w-full h-full object-cover opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile image section */}
      <div className="lg:hidden mt-8 px-4 flex justify-center">
        <div className="animate-bounce">
          <div 
            className="w-40 h-40 animate-pulse flex items-center justify-center"
            style={{
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
            }}
          >
            <img 
              src="/lovable-uploads/fc31f651-1643-45e6-bd2e-80cbc9b673f4.png" 
              alt="Lizzy Hans Logo" 
              className="w-full h-full object-cover opacity-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
