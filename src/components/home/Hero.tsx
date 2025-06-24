
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden" style={{ backgroundColor: '#CFBBB0' }}>
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

          {/* Right side - Image grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4 h-96">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Fashion style 1" 
                  className="w-full h-40 object-cover rounded-lg hover-scale"
                />
                <img 
                  src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nfGVufDB8fDB8fHww" 
                  alt="Fashion style 2" 
                  className="w-full h-32 object-cover rounded-lg hover-scale"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNsb3RoaW5nfGVufDB8fDB8fHww" 
                  alt="Fashion style 3" 
                  className="w-full h-32 object-cover rounded-lg hover-scale"
                />
                <img 
                  src="https://images.unsplash.com/photo-1578681994506-b8f463449011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNsb3RoaW5nfGVufDB8fDB8fHww" 
                  alt="Fashion style 4" 
                  className="w-full h-40 object-cover rounded-lg hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile image section */}
      <div className="lg:hidden mt-8 px-4">
        <div className="grid grid-cols-2 gap-3">
          <img 
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Fashion style 1" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoaW5nfGVufDB8fDB8fHww" 
            alt="Fashion style 2" 
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
