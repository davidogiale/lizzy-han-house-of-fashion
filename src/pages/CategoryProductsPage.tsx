
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import ProductsGrid from '@/components/shop/ProductsGrid';

const readableCategory = (slug: string) => {
  // Make slug capitalized (e.g., dresses -> Dresses)
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word[0]?.toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryProductsPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products, loading, error } = useProducts();

  const filteredProducts = categorySlug
    ? products.filter(product => product.category.toLowerCase() === readableCategory(categorySlug).toLowerCase())
    : [];

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-4xl font-playfair font-bold mb-8">
          {readableCategory(categorySlug || '')}
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading products</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <ProductsGrid
            filteredProducts={filteredProducts}
            sortBy="newest"
            setSortBy={() => {}}
          />
        )}
        {(!loading && filteredProducts.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-dark">There are currently no products in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProductsPage;
