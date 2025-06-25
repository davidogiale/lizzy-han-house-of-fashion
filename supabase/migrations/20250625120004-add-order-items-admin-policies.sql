
-- Ensure admins can view and manage all order items for the dashboard
-- These policies may already exist but let's ensure they're properly set up

-- Drop existing policies if they exist to recreate them
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can modify all order items" ON public.order_items;

-- Admins can view all order items
CREATE POLICY "Admins can view all order items"
  ON public.order_items
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Admins can modify all order items
CREATE POLICY "Admins can modify all order items"
  ON public.order_items
  FOR ALL
  USING (public.is_admin(auth.uid()));
