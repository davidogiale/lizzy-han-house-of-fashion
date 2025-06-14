
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];
type CartItemRow = Database['public']['Tables']['cart_items']['Row'];
interface CartItem extends Omit<CartItemRow, 'product_id'> {
  products: Product | null;
  product_id: string;
}

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const fetchCartItems = async () => {
    if (!user) {
      setLoadingCart(false);
      return;
    }
    setLoadingCart(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) setCartItems(data as CartItem[]);

    } catch (error: any) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Could not fetch your cart. Please try refreshing.",
        variant: "destructive",
      });
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(cartItemId);
      return;
    }

    const originalCartItems = [...cartItems];
    setCartItems(currentItems => 
      currentItems.map(item => 
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq('id', cartItemId);
      if (error) throw error;
    } catch (error: any) {
      setCartItems(originalCartItems);
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Could not update item quantity.",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (cartItemId: string) => {
    const originalCartItems = [...cartItems];
    setCartItems(currentItems => currentItems.filter(item => item.id !== cartItemId));
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);
      if (error) throw error;
      toast({ title: "Item removed" });
    } catch (error: any) {
      setCartItems(originalCartItems);
      console.error('Error removing item:', error);
      toast({ title: "Error removing item", variant: "destructive" });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.products?.price ?? 0) * item.quantity), 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with your order.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke('paystack-initialize', {
        body: { 
          amount: total, 
          email: user.email,
          currency: 'USD',
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      if (data && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        console.error("Paystack response did not contain authorization_url", data);
        throw new Error('Could not retrieve payment authorization URL.');
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loadingCart) {
    return (
      <Layout>
        <div className="container-custom py-16 flex justify-center items-center h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Log in to view your cart</h2>
            <p className="text-muted-foreground mb-6">
              Please log in to see your saved items.
            </p>
            <Link to="/account">
              <Button className="btn-primary">Log In / Sign Up</Button>
            </Link>
          </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl font-playfair font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to get started
            </p>
            <Link to="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  item.products && (
                    <div key={item.id} className="bg-white border rounded-lg p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.products.image_url || '/placeholder.svg'} 
                          alt={item.products.name} 
                          className="w-24 h-24 object-cover rounded"
                        />
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{item.products.name}</h3>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500">
                              <X size={20} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus size={16} />
                              </Button>
                              <span className="px-3 py-1 bg-muted rounded">
                                {item.quantity}
                              </span>
                              <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus size={16} />
                              </Button>
                            </div>
                            
                            <p className="font-semibold text-lg">
                              ${(item.products.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-muted p-6 rounded-lg h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full btn-primary mb-3"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
              
              <Link to="/shop">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
