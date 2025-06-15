import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Minus, Plus, Heart, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BestSellers from '@/components/home/BestSellers';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type Product = Database['public']['Tables']['products']['Row'];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        setError("No product ID provided.");
        return;
      }

      setLoading(true);
      try {
        const { data, error: dbError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (dbError) {
          throw new Error(dbError.message);
        }

        if (data) {
          setProduct(data);
        } else {
          throw new Error("Product not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const handleAddToCart = async () => {
    if (!product) return;

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingToCart(true);
    try {
      const { error: rpcError } = await supabase.rpc('add_to_cart', {
        p_product_id: product.id,
        p_quantity: quantity,
      });

      if (rpcError) {
        throw rpcError;
      }

      toast({
        title: "Added to cart!",
        description: `${product.name} x ${quantity} has been added to your cart.`,
      });
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: error.message || "Could not add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const handleAddToWishlist = () => {
    if (!product) return;
    toast({
      title: "Added to wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-8 flex justify-center items-center h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container-custom py-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/shop">
            <Button variant="outline">Go back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm mb-8">
          <Link to="/" className="text-dark hover:text-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">•</span>
          <Link to="/shop" className="text-dark hover:text-accent transition-colors">
            Shop
          </Link>
          <span className="mx-2">•</span>
          <span className="text-dark/60">
            {product.name}
          </span>
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden mb-4">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name} 
                className="w-full h-auto aspect-[4/5] object-cover object-center rounded-lg"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-playfair font-bold mb-4">{product.name}</h1>
            
            <p className="text-2xl font-bold mb-6">
              ₦{Number(product.price).toLocaleString("en-NG")}
            </p>
            
            {/* Color and Size Information */}
            <div className="flex flex-wrap gap-4 mb-6">
              {product.color && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Color: </span>
                  <span className="text-sm font-semibold">{product.color}</span>
                </div>
              )}
              {product.size && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Size: </span>
                  <span className="text-sm font-semibold">{product.size}</span>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-dark">{product.description || 'No description available.'}</p>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l-md hover:bg-muted"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center bg-muted">
                  {quantity}
                </span>
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r-md hover:bg-muted"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart} 
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ShoppingCart size={16} />
                )}
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              <Button onClick={handleAddToWishlist} variant="outline" className="btn-outline flex items-center justify-center gap-2">
                <Heart size={16} />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-playfair font-bold text-center mb-8">You May Also Like</h2>
          <BestSellers />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
