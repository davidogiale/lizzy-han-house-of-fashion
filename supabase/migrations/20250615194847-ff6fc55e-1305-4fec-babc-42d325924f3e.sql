
-- Create the orders table with relevant columns
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  total NUMERIC NOT NULL,
  shipping_address_full_name TEXT NOT NULL,
  shipping_address_phone TEXT NOT NULL,
  shipping_address_line TEXT NOT NULL,
  shipping_address_city TEXT NOT NULL,
  shipping_address_state TEXT NOT NULL,
  shipping_address_postal_code TEXT NOT NULL,
  shipping_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can create their own orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update their own orders"
  ON public.orders
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own orders
CREATE POLICY "Users can delete their own orders"
  ON public.orders
  FOR DELETE
  USING (auth.uid() = user_id);
