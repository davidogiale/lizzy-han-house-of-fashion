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
import CartItemsList from "@/components/cart/CartItemsList";
import CartShippingAddressSection from "@/components/cart/CartShippingAddressSection";
import CartOrderSummary from "@/components/cart/CartOrderSummary";

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
        title: "Create an Account",
        description: "Please create an account or log in to complete your purchase.",
        variant: "destructive",
      });
      // Optionally redirect to account page
      window.location.href = '/account';
      return;
    }

    if (!shippingAddress) {
      toast({
        title: "Shipping Address Required",
        description: "Please fill out and save your shipping address before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);
    try {
      // Insert new order
      const { data: orderData, error: orderError } = await supabase.from('orders').insert({
        user_id: user.id,
        total,
        shipping_address_full_name: shippingAddress.fullName,
        shipping_address_phone: shippingAddress.phone,
        shipping_address_line: shippingAddress.address,
        shipping_address_city: shippingAddress.city,
        shipping_address_state: shippingAddress.state,
        shipping_address_postal_code: shippingAddress.postalCode,
        shipping_method: selectedShipping,
      }).select().single();

      if (orderError) {
        throw new Error("Order creation failed: " + orderError.message);
      }

      // Insert order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products?.price ?? 0,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw new Error("Failed to save order items: " + itemsError.message);
      }

      // Clear cart after successful order
      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) {
        console.warn("Failed to clear cart:", clearCartError);
      }

      // Initialize Paystack with order ID as reference
      const { data, error } = await supabase.functions.invoke('paystack-initialize', {
        body: { 
          amount: total, 
          email: user.email,
          currency: 'NGN',
          reference: orderData.id, // Use order ID as Paystack reference
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
        <div className="container-custom py-16 flex justify-center items-center h-[60vh] pb-24 md:pb-16">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (cartError) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center pb-24 md:pb-16">
          <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading cart</h3>
          <p className="text-muted-foreground">{cartError.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 pb-24 md:pb-16">
        <h1 className="text-3xl font-playfair font-bold mb-8">Shopping Cart</h1>
        
        {!user && cartItems.length > 0 && (
          <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Shopping as a guest?</strong> You'll need to create an account or log in to complete your purchase.
              <Link to="/account" className="ml-2 underline font-semibold hover:text-accent">
                Create Account
              </Link>
            </p>
          </div>
        )}
        
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
            <div className="lg:col-span-2">
              <CartItemsList
                cartItems={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
              <CartShippingAddressSection
                shippingAddress={shippingAddress}
                setShippingAddress={(address) => {
                  setShippingAddress(address);
                  toast({
                    title: "Shipping address saved",
                    description: "Your shipping address has been saved. Please confirm before checkout.",
                  });
                }}
                isCheckingOut={isCheckingOut}
              />
            </div>
            <CartOrderSummary
              subtotal={subtotal}
              shippingOptions={SHIPPING_OPTIONS}
              selectedShipping={selectedShipping}
              setSelectedShipping={setSelectedShipping}
              total={total}
              isCheckingOut={isCheckingOut}
              cartItemsCount={cartItems.length}
              shippingAddressFilled={!!shippingAddress}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
