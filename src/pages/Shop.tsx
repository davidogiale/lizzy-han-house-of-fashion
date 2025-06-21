import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { Database } from '@/integrations/supabase/types';
import ShopFiltersSidebar from '@/components/shop/ShopFiltersSidebar';
import ProductsGrid from '@/components/shop/ProductsGrid';

type Product = Database['public']['Tables']['products']['Row'];


const Shop: React.FC = () => {
  const { products, loading, error } = useProducts();
  
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
        <div className="flex flex-col lg:flex-row gap-8">
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
