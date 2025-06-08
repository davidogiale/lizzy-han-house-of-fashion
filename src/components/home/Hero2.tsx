import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero2: React.FC = () => {
  const items = [
    { label: 'JACKET', image: '/images/jacket.jpg' },
    { label: 'SHIRT', image: '/images/shirt.jpg' },
    { label: 'HOODIE', image: '/images/hoodie.jpg' },
  ];

  return (
    <section className="flex flex-col md:flex-row w-full h-[600px]">
      {/* Category Panels */}
      {items.map((item, index) => (
        <div
          key={index}
          className="relative flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <span className="absolute left-2 bottom-4 transform -rotate-90 origin-bottom-left text-white font-bold text-xl tracking-wider">
            {item.label}
          </span>
        </div>
      ))}

      {/* Call-to-Action Panel */}
      <div
        className="relative flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(/images/sweater.jpg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-start p-6">
          <div className="text-white max-w-xs">
            <h2 className="text-3xl font-extrabold mb-2">Vogue Sweaters</h2>
            <p className="mb-4">Explore our premium collection</p>
            <Link to="/shop">
              <Button className="px-8 py-3">Shop</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
