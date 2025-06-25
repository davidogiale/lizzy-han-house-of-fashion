
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type Order = {
  id: string;
  user_id: string;
  status: string;
  total: number;
  shipping_address_full_name: string;
  shipping_address_phone: string;
  shipping_address_line: string;
  shipping_address_city: string;
  shipping_address_state: string;
  shipping_address_postal_code: string;
  shipping_method: string;
  created_at: string;
  updated_at: string;
};

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    id: string;
    name: string;
    image_url: string | null;
    category: string;
    color: string | null;
    size: string | null;
  };
};

async function fetchOrder(orderId: string): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();
  if (error) throw error;
  return data as Order;
}

async function fetchOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabase.rpc('get_order_items_with_products' as any, {
    order_id_param: orderId
  });
  
  if (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
  
  return (data as OrderItem[]) || [];
}

export const useOrderQuery = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId!),
    enabled: !!orderId,
  });
};

export const useOrderItemsQuery = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order-items", orderId],
    queryFn: () => fetchOrderItems(orderId!),
    enabled: !!orderId,
  });
};
