
import React from 'react';
import { Link } from 'react-router-dom';

interface Collection {
  id: string;
  name: string;
  image: string;
  link: string;
}

const collections: Collection[] = [
  {
    id: 'men',
    name: 'Men',
    image: '/placeholder.svg',
    link: '/shop/men'
  },
  {
    id: 'women',
    name: 'Women',
    image: '/placeholder.svg',
    link: '/shop/women'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/placeholder.svg',
    link: '/shop/accessories'
  }
];

const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Shop Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link 
              to={collection.link} 
              key={collection.id}
              className="group relative h-80 overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-500 group-hover:bg-opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
