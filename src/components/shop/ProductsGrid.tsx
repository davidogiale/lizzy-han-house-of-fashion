
import React from 'react';
import { Heart } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Product = {
  id: string;
  name: string;
  price: number | string;
  image_url?: string | null;
  category: string;
  status: string;
};

interface ProductsGridProps {
  filteredProducts: Product[];
  sortBy: string;
  setSortBy: (value: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  filteredProducts,
  sortBy,
  setSortBy
}) => (
  <div className="w-full">
    {/* Sort and Result Count */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <p className="text-dark mb-2 sm:mb-0">
        Showing {filteredProducts.length} products
      </p>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
        </SelectContent>
      </Select>
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
);

export default ProductsGrid;
