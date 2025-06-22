
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import ProductsGrid from '@/components/shop/ProductsGrid';
import { Loader2, SearchX, Search as SearchIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Product = Database['public']['Tables']['products']['Row'];

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchInput, setSearchInput] = useState(query || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchInput.trim();
    if (trimmedQuery) {
      setSearchParams({ q: trimmedQuery });
    }
  };

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

  if (error) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center pb-24 md:pb-16">
          <h3 className="text-lg font-semibold mb-2 text-destructive">Error searching for products</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 pb-24 md:pb-8">
        <h1 className="text-4xl font-playfair font-bold mb-6">Search</h1>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search for sweaters, cardigans..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </form>

        {!query ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Enter a search term to find products.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <SearchX size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-3xl font-playfair font-bold mb-4">No results for "{query}"</h2>
            <p className="text-dark text-lg mb-8">
              We couldn't find any products matching your search. Try searching for something else.
            </p>
            <Link to="/shop">
              <Button className="btn-primary">
                Browse Collection
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">Found {products.length} products for "{query}".</p>
            <ProductsGrid
              filteredProducts={sortedProducts}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Search;
