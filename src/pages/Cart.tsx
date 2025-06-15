import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, Loader2, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ShippingAddressForm, { ShippingAddress } from "@/components/checkout/ShippingAddressForm";

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivers in 3-5 business days',
    price: 1500,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivers in 1-2 business days',
    price: 3500,
  },
];

const Cart: React.FC = () => {
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0].id);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const { 
    cartItems, 
    isLoadingCart, 
    cartError, 
    updateQuantity, 
    removeItem 
  } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.products?.price ?? 0) * item.quantity), 0);
  const shippingFee = SHIPPING_OPTIONS.find(opt => opt.id === selectedShipping)?.price ?? 0;
  const total = subtotal + shippingFee;

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
          currency: 'NGN', // Ensure we're using Naira
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

  if (isLoadingCart) {
    return (
      <Layout>
        <div className="container-custom py-16 flex justify-center items-center h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (cartError) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading cart</h3>
          <p className="text-muted-foreground">{cartError.message}</p>
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
            {/* Cart Items & Shipping (order swapped) */}
            <div className="lg:col-span-2">
              {/* Cart Items Section - NOW ABOVE */}
              <div className="space-y-4 mb-8">
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
                            <div>
                              <h3 className="font-semibold text-lg">{item.products.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                                {item.products.color && (
                                  <span>Color: {item.products.color}</span>
                                )}
                                {item.products.size && (
                                  <span>Size: {item.products.size}</span>
                                )}
                              </div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500">
                              <X size={20} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => updateQuantity({ cartItemId: item.id, newQuantity: item.quantity - 1 })}>
                                <Minus size={16} />
                              </Button>
                              <span className="px-3 py-1 bg-muted rounded">
                                {item.quantity}
                              </span>
                              <Button variant="outline" size="sm" onClick={() => updateQuantity({ cartItemId: item.id, newQuantity: item.quantity + 1 })}>
                                <Plus size={16} />
                              </Button>
                            </div>
                            
                            <p className="font-semibold text-lg">
                              ₦{(item.products.price * item.quantity).toLocaleString("en-NG")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
              {/* Shipping Address Section - NOW BELOW */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <ShippingAddressForm
                  onSubmit={(address) => {
                    setShippingAddress(address);
                    toast({
                      title: "Shipping address saved",
                      description: "Your shipping address has been saved. Please confirm before checkout.",
                    });
                  }}
                  defaultValues={shippingAddress ?? undefined}
                  disabled={isCheckingOut}
                />
                {shippingAddress && (
                  <div className="bg-muted border rounded p-4 mt-2">
                    <div className="font-medium mb-1">Current Address:</div>
                    <div className="text-sm text-muted-foreground mb-1">{shippingAddress.fullName}, {shippingAddress.phone}</div>
                    <div className="text-sm">{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postalCode}</div>
                  </div>
                )}
              </section>
            </div>
            {/* Order Summary, right column */}
            <div className="bg-muted p-6 rounded-lg h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString("en-NG")}</span>
                </div>
                {/* SHIPPING SECTION */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-5 w-5 text-accent" />
                    <span className="font-medium">Shipping:</span>
                  </div>
                  <RadioGroup
                    value={selectedShipping}
                    onValueChange={setSelectedShipping}
                    className="gap-2"
                  >
                    {SHIPPING_OPTIONS.map(option => (
                      <label
                        key={option.id}
                        className={`flex items-start gap-4 cursor-pointer border rounded-lg p-3 mb-2 ${selectedShipping === option.id ? "border-primary bg-white" : "border-muted-foreground bg-transparent"} transition-colors`}
                      >
                        <RadioGroupItem value={option.id} className="mt-1" />
                        <div>
                          <div className="font-medium">{option.name}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                          <div className="font-medium">₦{option.price.toLocaleString("en-NG")}</div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₦{total.toLocaleString("en-NG")}</span>
                </div>
              </div>
              
              <Button 
                className="w-full btn-primary mb-3"
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
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
