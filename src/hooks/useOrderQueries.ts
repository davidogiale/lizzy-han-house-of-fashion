
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
  created_at: string;
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
  console.log('Fetching order items for order:', orderId);
  
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      id,
      order_id,
      product_id,
      quantity,
      price,
      created_at,
      products (
        id,
        name,
        image_url,
        category,
        color,
        size
      )
    `)
    .eq('order_id', orderId);
  
  if (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
  
  console.log('Fetched order items:', data);
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
