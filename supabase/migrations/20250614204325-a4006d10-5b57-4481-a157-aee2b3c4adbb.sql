
-- Create a table for cart items
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.cart_items IS 'Stores items in user shopping carts.';
COMMENT ON COLUMN public.cart_items.user_id IS 'The user who owns this cart item.';
COMMENT ON COLUMN public.cart_items.product_id IS 'The product in the cart.';
COMMENT ON COLUMN public.cart_items.quantity IS 'The quantity of the product.';

-- Enable Row Level Security (RLS) to protect user data
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- RLS policy to allow users to view their own cart items
CREATE POLICY "Users can view their own cart items"
  ON public.cart_items FOR SELECT
  USING (auth.uid() = user_id);

-- RLS policy to allow users to add items to their own cart
CREATE POLICY "Users can insert their own cart items"
  ON public.cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS policy to allow users to update items in their own cart
CREATE POLICY "Users can update their own cart items"
  ON public.cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS policy to allow users to remove items from their own cart
CREATE POLICY "Users can delete their own cart items"
  ON public.cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create a function to add items to the cart or update quantity if item already exists
CREATE OR REPLACE FUNCTION add_to_cart(
  p_product_id uuid,
  p_quantity int
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'You must be logged in to add items to your cart.';
  END IF;

  INSERT INTO public.cart_items (user_id, product_id, quantity)
  VALUES (auth.uid(), p_product_id, p_quantity)
  ON CONFLICT (user_id, product_id)
  DO UPDATE SET
    quantity = cart_items.quantity + EXCLUDED.quantity,
    updated_at = now();
END;
$$;
