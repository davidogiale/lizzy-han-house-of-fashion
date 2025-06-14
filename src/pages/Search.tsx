
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import ProductsGrid from '@/components/shop/ProductsGrid';
import { Loader2, SearchX } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Product = Database['public']['Tables']['products']['Row'];

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('products')
          .select('*')
          .ilike('name', `%${query}%`);

        if (dbError) throw dbError;

        if (data) {
          if (data.length === 1) {
            navigate(`/product/${data[0].id}`, { replace: true });
            return;
          }
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, navigate]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return Number(a.price) - Number(b.price);
      case 'price-high':
        return Number(b.price) - Number(a.price);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 flex justify-center items-center h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  if (!query) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Search for products</h1>
            <p className="text-muted-foreground">Enter a term in the search bar to find what you're looking for.</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h3 className="text-lg font-semibold mb-2 text-destructive">Error searching for products</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Layout>
    );
  }

  if (products.length === 0) {
    return (
        <Layout>
            <div className="container-custom py-16 text-center">
                <SearchX size={64} className="mx-auto text-muted-foreground mb-4" />
                <h1 className="text-3xl font-playfair font-bold mb-4">No results for "{query}"</h1>
                <p className="text-dark text-lg mb-8">
                    We couldn't find any products matching your search. Try searching for something else.
                </p>
                <Link to="/shop">
                    <Button className="btn-primary">
                        Browse Collection
                    </Button>
                </Link>
            </div>
        </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-4xl font-playfair font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">Found {products.length} products for "{query}".</p>

        <ProductsGrid
          filteredProducts={sortedProducts}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </Layout>
  );
};

export default Search;
