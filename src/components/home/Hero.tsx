import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden bg-background">
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
          <div className="hidden lg:grid grid-cols-2 gap-4 h-96">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg h-32 flex items-center justify-center">
                <img 
                  src="https://fg-image.fashiongo.net/Vendors/hvghazox0w/ProductImage/large/DB35CB1F1F74EDF76ADDD1796CE3E91E/21159802_ce59f5fb-72ef-45df-b7ae-c83f5c52b4d8.jpg" 
                  alt="Women's Outfit" 
                  className="w-full h-full object-cover object-[90%] rounded-lg"
                />
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg h-56 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Men's Jacket" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg h-56 flex items-center justify-center">
                <img 
                  src="https://fg-image.fashiongo.net/Vendors/hvghazox0w/ProductImage/large/44E761E6AF3B0E59A26BAF60243D6286/21846599_3ecb1cd6-a445-4338-9cbe-c05aa5d8713f.jpg" 
                  alt="Women's Dress" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg h-32 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1675877879221-871aa9f7c314?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Men's Streetwear" 
                  className="w-full h-full object-cover object-[90%] rounded-lg"
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
            src="https://images.unsplash.com/photo-1536766768597-16839e7e7d0e" 
            alt="Men's Style" 
            className="w-full h-32 object-cover rounded-lg"
          />
          <img 
            src="https://images.unsplash.com/photo-1542060748-10c28b62716f" 
            alt="Women's Style" 
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

