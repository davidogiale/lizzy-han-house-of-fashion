
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Heart, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  colors: string[];
  sizes: string[];
}

const products: Product[] = [
  {
    id: 'p1',
    name: 'Velvet Touch Button-Up',
    price: 120.99,
    category: 'shirts',
    image: '/placeholder.svg',
    colors: ['brown', 'black', 'white'],
    sizes: ['s', 'm', 'l', 'xl']
  },
  {
    id: 'p2',
    name: 'Classic Denim Jacket',
    price: 179.50,
    category: 'jackets',
    image: '/placeholder.svg',
    colors: ['blue', 'black'],
    sizes: ['m', 'l', 'xl']
  },
  {
    id: 'p3',
    name: 'Urban Slim Fit Pants',
    price: 89.99,
    category: 'pants',
    image: '/placeholder.svg',
    colors: ['black', 'gray', 'navy'],
    sizes: ['s', 'm', 'l', 'xl', 'xxl']
  },
  {
    id: 'p4',
    name: 'Premium Cotton Hoodie',
    price: 65.00,
    category: 'hoodies',
    image: '/placeholder.svg',
    colors: ['gray', 'black', 'green'],
    sizes: ['s', 'm', 'l', 'xl']
  },
  {
    id: 'p5',
    name: 'Modern Fit Oxford Shirt',
    price: 85.00,
    category: 'shirts',
    image: '/placeholder.svg',
    colors: ['white', 'blue', 'pink'],
    sizes: ['s', 'm', 'l', 'xl']
  },
  {
    id: 'p6',
    name: 'Essential T-Shirt',
    price: 29.99,
    category: 'shirts',
    image: '/placeholder.svg',
    colors: ['white', 'black', 'gray'],
    sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl']
  },
];

const categories = [
  { id: 'shirts', name: 'Shirts' },
  { id: 'pants', name: 'Pants' },
  { id: 'jackets', name: 'Jackets' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'accessories', name: 'Accessories' },
];

const sizes = [
  { id: 'xs', name: 'XS' },
  { id: 's', name: 'S' },
  { id: 'm', name: 'M' },
  { id: 'l', name: 'L' },
  { id: 'xl', name: 'XL' },
  { id: 'xxl', name: 'XXL' },
];

const colors = [
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'gray', name: 'Gray', color: '#808080' },
  { id: 'blue', name: 'Blue', color: '#0000FF' },
  { id: 'green', name: 'Green', color: '#008000' },
  { id: 'brown', name: 'Brown', color: '#A52A2A' },
  { id: 'navy', name: 'Navy', color: '#000080' },
  { id: 'pink', name: 'Pink', color: '#FFC0CB' },
];

const Shop: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const filteredProducts = products.filter(product => {
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    // Filter by size
    if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) {
      return false;
    }
    
    // Filter by color
    if (selectedColors.length > 0 && !selectedColors.some(color => product.colors.includes(color))) {
      return false;
    }
    
    return true;
  });

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

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
            
            {/* Sizes */}
            <div>
              <h3 className="font-semibold mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button 
                    key={size.id}
                    onClick={() => toggleSize(size.id)}
                    className={`
                      px-3 py-1 border border-gray-300 text-sm
                      ${selectedSizes.includes(size.id) 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-primary hover:bg-gray-100'}
                    `}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-4">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button 
                    key={color.id}
                    onClick={() => toggleColor(color.id)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${selectedColors.includes(color.id) ? 'ring-2 ring-accent ring-offset-2' : ''}
                    `}
                    style={{ backgroundColor: color.color }}
                    aria-label={`Filter by ${color.name}`}
                  >
                    {selectedColors.includes(color.id) && (
                      <span className={`text-xs ${['white', 'yellow'].includes(color.id) ? 'text-black' : 'text-white'}`}>✓</span>
                    )}
                  </button>
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
                        src={product.image} 
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
                    <p className="text-dark font-semibold">${product.price.toFixed(2)}</p>
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
