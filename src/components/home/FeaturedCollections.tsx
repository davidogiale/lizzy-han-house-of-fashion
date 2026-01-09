import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';

const FeaturedCollections: React.FC = () => {
  const { products, loading } = useProducts();

  // Filter products that have images
  const productsWithImages = React.useMemo(() => {
    return products.filter(product => product.image_url);
  }, [products]);

  const collections = [
    {
      name: 'All Dress',
      image: productsWithImages[0]?.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1566&auto=format&fit=crop',
      link: '/shop'
    },
    {
      name: 'Maxi Dress',
      image: productsWithImages[1]?.image_url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1440&auto=format&fit=crop',
      link: '/shop?category=maxi'
    },
    {
      name: 'Mini dress',
      image: productsWithImages[2]?.image_url || 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1492&auto=format&fit=crop',
      link: '/shop?category=mini'
    }
  ];

  if (loading) {
    return <div className="py-20 text-center">Loading collections...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-xl md:text-2xl font-helvetica font-bold mb-8 uppercase tracking-wide text-left">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {collections.map((collection, index) => (
            <Link 
              to={collection.link} 
              key={index}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-center font-medium text-lg text-gray-900 font-helvetica">{collection.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
