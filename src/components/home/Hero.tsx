
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden bg-gradient-to-r from-slate-800 to-slate-600">
      <div className="container-custom h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Vogue Sweaters
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-md mx-auto lg:mx-0">
              Explore our premium collection
            </p>
            <Link to="/shop">
              <Button className="btn-accent">
                Shop Now
              </Button>
            </Link>
          </div>
          
          {/* Right side - Image grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4 h-96">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg h-32 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Fashion Model 1" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg h-56 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Fashion Model 2" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg h-56 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Fashion Model 3" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg h-32 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Fashion Model 4" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile image section */}
      <div className="lg:hidden mt-8 px-4">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <img 
            src="/placeholder.svg" 
            alt="Fashion Collection" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <img 
            src="/placeholder.svg" 
            alt="Fashion Collection" 
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
