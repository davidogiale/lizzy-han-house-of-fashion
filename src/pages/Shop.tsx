
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Heart, Filter, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

const categories = [
  { id: 'Dresses', name: 'Dresses' },
  { id: 'Tops', name: 'Tops' },
  { id: 'Bottoms', name: 'Bottoms' },
  { id: 'Accessories', name: 'Accessories' },
];

const Shop: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const filteredProducts = products.filter(product => {
    // Filter by price range
    if (Number(product.price) < priceRange[0] || Number(product.price) > priceRange[1]) {
      return false;
    }
    
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Filter by status
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(product.status)) {
      return false;
    }
    
    return true;
  });

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading products</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-4xl font-playfair font-bold mb-8">Shop Collection</h1>
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 btn-outline py-2 px-4"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div 
            className={`
              lg:w-1/4 space-y-6 bg-white p-6 rounded-lg
              ${mobileFiltersOpen ? 'block' : 'hidden'} lg:block
              ${mobileFiltersOpen ? 'fixed inset-0 z-40 overflow-auto' : ''}
            `}
          >
            {mobileFiltersOpen && (
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-primary">
                  Close
                </button>
              </div>
            )}

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-4">Price Range</h3>
              <Slider 
                defaultValue={[0, 200]} 
                max={500} 
                step={10} 
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div className="flex items-center space-x-2" key={category.id}>
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Status Filter */}
            <div>
              <h3 className="font-semibold mb-4">Availability</h3>
              <div className="space-y-2">
                {['Active', 'Low Stock'].map(status => (
                  <div className="flex items-center space-x-2" key={status}>
                    <Checkbox 
                      id={`status-${status}`} 
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => toggleStatus(status)}
                    />
                    <label 
                      htmlFor={`status-${status}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {mobileFiltersOpen && (
              <div className="mt-6 lg:hidden">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full btn-primary py-2"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and Result Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-dark mb-2 sm:mb-0">
                Showing {filteredProducts.length} products
              </p>
              <select className="border border-gray-300 rounded p-2 bg-white">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white group">
                  <div className="relative overflow-hidden">
                    <a href={`/product/${product.id}`}>
                      <img 
                        src={product.image_url || '/placeholder.svg'} 
                        alt={product.name} 
                        className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                    <button 
                      className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-accent transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <button className="w-full bg-primary text-white py-2 hover:bg-primary/90 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <a href={`/product/${product.id}`} className="block">
                      <h3 className="font-inter font-semibold text-lg mb-1 hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </a>
                    <p className="text-dark font-semibold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-dark">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
