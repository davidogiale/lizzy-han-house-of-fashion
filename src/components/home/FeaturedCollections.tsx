
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
    id: 'dresses',
    name: 'Dresses',
    image: '/placeholder.svg',
    link: '/shop/dresses'
  },
  {
    id: 'tops',
    name: 'Tops',
    image: '/placeholder.svg',
    link: '/shop/tops'
  },
  {
    id: 'bottoms',
    name: 'Bottoms',
    image: '/placeholder.svg',
    link: '/shop/bottoms'
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
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">Shop by Category</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link 
              to={collection.link} 
              key={collection.id}
              className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-500 group-hover:bg-opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center px-4">{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
