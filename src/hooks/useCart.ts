
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type CartItemRow = Database['public']['Tables']['cart_items']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
export interface CartItem extends Omit<CartItemRow, 'product_id'> {
  products: Product | null;
  product_id: string;
}

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

export const useCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = ['cart', user?.id];

  const { data: cartItems = [], isLoading: isLoadingCart, error: cartError } = useQuery({
    queryKey,
    queryFn: () => fetchCartItems(user?.id),
    enabled: !!user,
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      if (!user) throw new Error("You must be logged in to add items to your cart.");
      const { error } = await supabase.rpc('add_to_cart', {
        p_product_id: productId,
        p_quantity: quantity,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
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
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);
      if (error) throw error;
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
      queryClient.invalidateQueries({ queryKey });
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
