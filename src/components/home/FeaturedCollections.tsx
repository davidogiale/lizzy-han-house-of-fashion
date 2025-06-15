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
    image: 'https://images.unsplash.com/photo-1703704018905-c00a86754cc9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop/category/dresses'
  },
  {
    id: 'tops',
    name: 'Tops',
    image: 'https://images.unsplash.com/photo-1629737168222-baad8ecacebe?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop/category/tops'
  },
  {
    id: 'bottoms',
    name: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1549575810-b9b7abc51d9e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop/category/bottoms'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1687253946687-a3713aa25b2f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/shop/category/accessories'
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
