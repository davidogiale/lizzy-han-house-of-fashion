
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { Database } from '@/integrations/supabase/types';
import ShopFiltersSidebar from '@/components/shop/ShopFiltersSidebar';
import ProductsGrid from '@/components/shop/ProductsGrid';

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
  const [sortBy, setSortBy] = useState<string>('newest');
  
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
            {/* Filter icon and text */}
            <span>
              <svg height="16" width="16" fill="none" viewBox="0 0 16 16"><path d="M3 5h10M5 8h6M7 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>Filters</span>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <ShopFiltersSidebar
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedStatuses={selectedStatuses}
            toggleStatus={toggleStatus}
          />
          <ProductsGrid
            filteredProducts={filteredProducts}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
