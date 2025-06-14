
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Classic Trench Coat',
    price: 189.99,
    image: '/placeholder.svg',
    size: 'M',
    color: 'Beige',
    quantity: 1
  },
  {
    id: '2',
    name: 'Little Black Dress',
    price: 95.00,
    image: '/placeholder.svg',
    size: 'S',
    color: 'Black',
    quantity: 2
  }
];

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
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
                  <div key={item.id} className="bg-white border rounded-lg p-4">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <button className="text-muted-foreground hover:text-red-500">
                            <X size={20} />
                          </button>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Minus size={16} />
                            </Button>
                            <span className="px-3 py-1 bg-muted rounded">
                              {item.quantity}
                            </span>
                            <Button variant="outline" size="sm">
                              <Plus size={16} />
                            </Button>
                          </div>
                          
                          <p className="font-semibold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
