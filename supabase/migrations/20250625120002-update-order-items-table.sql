
-- Update the order_items table to match the required schema
-- Add the price column (renaming from price_at_time for consistency)
ALTER TABLE public.order_items 
  RENAME COLUMN price_at_time TO price;

-- The table already has all other required columns:
-- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
-- order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE
-- product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE  
-- quantity INTEGER NOT NULL DEFAULT 1
-- created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()

-- Update the RLS policies and indexes are already in place from the previous migration
