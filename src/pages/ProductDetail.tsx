import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Minus, Plus, Heart, ShoppingCart, Loader2, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  const [selectedSize, setSelectedSize] = useState<string>("");
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

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = `Hello, I'm interested in ordering: ${product.name}\nPrice: ₦${Number(product.price).toLocaleString("en-NG")}\nSize: ${selectedSize || 'Not specified'}\nQuantity: ${quantity}\nLink: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2348123456789?text=${encodedMessage}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The product link has been copied to your clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-8 flex justify-center items-center h-[60vh] pb-24 md:pb-8">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container-custom py-8 text-center pb-24 md:pb-8">
          <h2 className="text-2xl font-bold mb-4 text-destructive">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/shop">
            <Button variant="outline" className="rounded-none">Go back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 pb-24 md:pb-8">
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
            <div className="relative group overflow-hidden">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name} 
                className="w-full h-auto aspect-[4/5] object-cover object-center"
              />
              <button className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 rounded-none flex items-center justify-center shadow-md hover:bg-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-sans font-bold mb-2">{product.name}</h1>
            
            <p className="text-2xl mb-4 text-[#1A1A1A]">
              ₦{Number(product.price).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            <p className="text-muted-foreground mb-8 text-sm">
              {product.description || 'No description available.'}
            </p>
            
            {/* Size Selector */}
            <div className="mb-8 max-w-md">
              <label className="block text-xs uppercase tracking-wider mb-2 font-medium">size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full rounded-none border-gray-300 h-10">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  {product.size ? (
                    product.size.split(',').map((s) => (
                      <SelectItem key={s.trim()} value={s.trim()}>
                        {s.trim()}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="S">Small</SelectItem>
                      <SelectItem value="M">Medium</SelectItem>
                      <SelectItem value="L">Large</SelectItem>
                      <SelectItem value="XL">Extra Large</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {/* Quantity and Add to Cart Row */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center border border-gray-300">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-11 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 h-11 flex items-center justify-center font-medium">
                  {quantity}
                </span>
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-11 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 rounded-none bg-[#808080] hover:bg-[#666666] text-white h-11 font-medium"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {isAddingToCart ? 'Adding...' : 'Add to cart'}
              </Button>
            </div>

            {/* Buy Now Button */}
            <Button 
              className="w-full rounded-none bg-[#EBEBEB] hover:bg-[#DEDEDE] text-black h-11 mb-4 font-medium"
            >
              Buy Now
            </Button>

            {/* Order on WhatsApp Button */}
            <Button 
              onClick={handleWhatsAppOrder}
              className="w-full rounded-none bg-black hover:bg-gray-900 text-white h-11 flex items-center justify-center gap-2 mb-8 font-medium"
            >
              Order on WhatsApp
            </Button>

            {/* Actions: Wishlist and Share */}
            <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
              <button 
                onClick={handleAddToWishlist}
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Heart size={16} />
                <span>Add to Wishlist</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Share2 size={16} />
                <span>Share this Product</span>
              </button>
            </div>

            <Separator className="mb-8" />

            {/* Product Meta Info */}
            <div className="space-y-1 text-sm">
              <div className="flex gap-1">
                <span className="text-gray-500">SKU:</span>
                <span className="text-gray-500 uppercase">N/A</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-500 uppercase">Categories:</span>
                <span className="font-bold uppercase">{product.category || 'ALL DRESS, MAXI DRESS'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-helvetica font-bold text-center mb-8">You May Also Like</h2>
          <BestSellers />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
