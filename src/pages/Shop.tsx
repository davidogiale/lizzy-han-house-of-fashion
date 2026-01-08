import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { Database } from '@/integrations/supabase/types';
import ShopFiltersSidebar from '@/components/shop/ShopFiltersSidebar';
import PriceFilter from '@/components/shop/PriceFilter';
import ProductsGrid from '@/components/shop/ProductsGrid';

type Product = Database['public']['Tables']['products']['Row'];

const Shop: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [sortBy, setSortBy] = useState('newest');
  
  // Price filtering state
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<number[]>([0, 1000000]);

  // Calculate min and max prices from products
  const { minPrice, maxPrice } = React.useMemo(() => {
    if (!products || products.length === 0) return { minPrice: 0, maxPrice: 1000000 };
    const prices = products.map(p => Number(p.price));
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, [products]);

  // Initialize filter range when products load
  React.useEffect(() => {
    if (products && products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
      setAppliedPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice, products]);

  const handleFilter = () => {
    setAppliedPriceRange(priceRange);
  };
  
  // Apply sorting to products
  const sortedProducts = React.useMemo(() => {
    if (!products) return [];
    
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-high':
        return sorted.sort((a, b) => Number(b.price) - Number(a.price));
      case 'popular':
        // For now, just use newest since we don't have popularity data
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [products, sortBy]);

  // Filter products based on price
  const filteredProducts = React.useMemo(() => {
    let filtered = sortedProducts;
    
    // Apply price filter
    filtered = filtered.filter(p => {
      const price = Number(p.price);
      return price >= appliedPriceRange[0] && price <= appliedPriceRange[1];
    });
    
    return filtered;
  }, [sortedProducts, appliedPriceRange]);
  
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
      <div className="container-custom py-8 pb-24 md:pb-8">
        <h1 className="text-4xl font-playfair font-bold mb-8">Shop Collection</h1>
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-1/4">
             <PriceFilter
                min={minPrice}
                max={maxPrice}
                currentMin={priceRange[0]}
                currentMax={priceRange[1]}
                onPriceChange={setPriceRange}
                onFilter={handleFilter}
             />
          </div>
          <div className="w-full lg:w-3/4">
            <ProductsGrid
              filteredProducts={filteredProducts}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
