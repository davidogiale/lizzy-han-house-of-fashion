
-- Create a function to get order items with product details
CREATE OR REPLACE FUNCTION public.get_order_items_with_products(order_id_param UUID)
RETURNS TABLE (
  id UUID,
  order_id UUID,
  product_id UUID,
  quantity INTEGER,
  price_at_time NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  products JSON
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    oi.id,
    oi.order_id,
    oi.product_id,
    oi.quantity,
    oi.price_at_time,
    oi.created_at,
    oi.updated_at,
    json_build_object(
      'id', p.id,
      'name', p.name,
      'image_url', p.image_url,
      'category', p.category,
      'color', p.color,
      'size', p.size
    ) as products
  FROM public.order_items oi
  JOIN public.products p ON oi.product_id = p.id
  WHERE oi.order_id = order_id_param;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_order_items_with_products(UUID) TO authenticated;
