
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ShopTheLook: React.FC = () => {
  return (
    <section className="py-16">
      <div className="relative h-96 bg-gradient-to-r from-slate-800 to-slate-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1551084804-4b60b3c10f9e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <blockquote className="text-white text-2xl md:text-3xl font-playfair italic mb-6">
              "Style is a way to say who you are without having to speak."
            </blockquote>
            <p className="text-white text-lg mb-8 opacity-90">
              Discover curated looks that express your unique personality
            </p>
            <Link to="/shop/looks">
              <Button className="btn-accent px-8 py-3 text-lg">
                Shop the Look
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopTheLook;
