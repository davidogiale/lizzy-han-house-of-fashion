
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Countdown } from '../ui/Countdown';

const SaleSection: React.FC = () => {
  // Set the sale end date to 5 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 5);
  
  return (
    <section 
      className="py-24 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/placeholder.svg')"
      }}
    >
      <div className="container-custom text-center">
        <span className="inline-block bg-accent px-4 py-1 text-primary font-semibold mb-4">Limited Time Offer</span>
        <h2 className="text-white text-4xl md:text-5xl font-playfair font-bold mb-6">
          Summer Sale Up to 50% Off
        </h2>
        <p className="text-white text-lg mb-8 max-w-xl mx-auto">
          Don't miss out on our biggest sale of the season. Stock up on wardrobe essentials and statement pieces.
        </p>
        
        <div className="mb-10">
          <Countdown targetDate={endDate} />
        </div>
        
        <Link to="/shop/sale">
          <Button className="btn-accent">
            Shop the Sale
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SaleSection;
