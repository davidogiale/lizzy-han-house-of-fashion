
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';
import { useState, useEffect } from 'react';

type CartItemRow = Database['public']['Tables']['cart_items']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
export interface CartItem extends Omit<CartItemRow, 'product_id'> {
  products: Product | null;
  product_id: string;
}

interface GuestCartItem {
  id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

const GUEST_CART_KEY = 'guest_cart';

const getGuestCart = (): GuestCartItem[] => {
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const setGuestCart = (cart: GuestCartItem[]) => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
};

const fetchCartItems = async (userId: string | undefined): Promise<CartItem[]> => {
  if (!userId) return [];
  
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return (data as CartItem[]) || [];
};

const fetchGuestCartItems = async (guestCart: GuestCartItem[]): Promise<CartItem[]> => {
  if (guestCart.length === 0) return [];
  
  const productIds = guestCart.map(item => item.product_id);
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

  if (error) throw new Error(error.message);
  
  return guestCart.map(item => ({
    ...item,
    user_id: 'guest',
    updated_at: item.created_at,
    products: data?.find(p => p.id === item.product_id) || null,
  })) as CartItem[];
};

export const useCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [guestCart, setGuestCartState] = useState<GuestCartItem[]>(getGuestCart());
  const queryKey = ['cart', user?.id];

  // Authenticated user cart
  const { data: authCartItems = [], isLoading: isLoadingAuthCart, error: cartError } = useQuery({
    queryKey,
    queryFn: () => fetchCartItems(user?.id),
    enabled: !!user,
  });

  // Guest cart
  const { data: guestCartItems = [], isLoading: isLoadingGuestCart } = useQuery({
    queryKey: ['guestCart'],
    queryFn: () => fetchGuestCartItems(guestCart),
    enabled: !user && guestCart.length > 0,
  });

  const cartItems = user ? authCartItems : guestCartItems;
  const isLoadingCart = user ? isLoadingAuthCart : isLoadingGuestCart;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      if (user) {
        const { error } = await supabase.rpc('add_to_cart', {
          p_product_id: productId,
          p_quantity: quantity,
        });
        if (error) throw error;
      } else {
        // Guest cart
        const currentCart = getGuestCart();
        const existingItem = currentCart.find(item => item.product_id === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          currentCart.push({
            id: `guest-${Date.now()}-${productId}`,
            product_id: productId,
            quantity,
            created_at: new Date().toISOString(),
          });
        }
        
        setGuestCart(currentCart);
        setGuestCartState(currentCart);
      }
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey });
      } else {
        queryClient.invalidateQueries({ queryKey: ['guestCart'] });
      }
      toast({ title: "Success!", description: "Product added to cart." });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Could not add product to cart.",
        variant: "destructive",
      });
    }
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ cartItemId, newQuantity }: { cartItemId: string; newQuantity: number }) => {
      if (user) {
        if (newQuantity < 1) {
          const { error } = await supabase.from('cart_items').delete().eq('id', cartItemId);
          if (error) {
              toast({ title: "Item removed" });
              throw error
          };
        } else {
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
            .eq('id', cartItemId);
          if (error) throw error;
        }
      } else {
        // Guest cart
        const currentCart = getGuestCart();
        if (newQuantity < 1) {
          const updatedCart = currentCart.filter(item => item.id !== cartItemId);
          setGuestCart(updatedCart);
          setGuestCartState(updatedCart);
        } else {
          const item = currentCart.find(i => i.id === cartItemId);
          if (item) {
            item.quantity = newQuantity;
            setGuestCart(currentCart);
            setGuestCartState(currentCart);
          }
        }
      }
    },
    onMutate: async ({ cartItemId, newQuantity }) => {
        await queryClient.cancelQueries({ queryKey });
        const previousCart = queryClient.getQueryData<CartItem[]>(queryKey);
        
        queryClient.setQueryData<CartItem[]>(queryKey, old => {
            if (!old) return [];
            if (newQuantity < 1) {
                return old.filter(item => item.id !== cartItemId);
            }
            return old.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            );
        });
        
        return { previousCart };
    },
    onError: (err, _, context) => {
        if(context?.previousCart) {
            queryClient.setQueryData<CartItem[]>(queryKey, context.previousCart);
        }
        toast({ title: "Error", description: "Could not update item quantity.", variant: "destructive" });
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey });
      } else {
        queryClient.invalidateQueries({ queryKey: ['guestCart'] });
      }
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', cartItemId);
        if (error) throw error;
      } else {
        // Guest cart
        const currentCart = getGuestCart();
        const updatedCart = currentCart.filter(item => item.id !== cartItemId);
        setGuestCart(updatedCart);
        setGuestCartState(updatedCart);
      }
    },
    onMutate: async (cartItemId) => {
        await queryClient.cancelQueries({ queryKey });
        const previousCart = queryClient.getQueryData<CartItem[]>(queryKey);
        
        queryClient.setQueryData<CartItem[]>(queryKey, old =>
            old ? old.filter(item => item.id !== cartItemId) : []
        );

        return { previousCart };
    },
    onSuccess: () => {
        toast({ title: "Item removed" });
    },
    onError: (err, _, context) => {
        if(context?.previousCart) {
            queryClient.setQueryData<CartItem[]>(queryKey, context.previousCart);
        }
        toast({ title: "Error removing item", variant: "destructive" });
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey });
      } else {
        queryClient.invalidateQueries({ queryKey: ['guestCart'] });
      }
    },
  });

  return { 
    cartItems, 
    isLoadingCart, 
    cartError, 
    cartCount, 
    addToCart: addToCartMutation.mutateAsync, 
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate
  };
};
