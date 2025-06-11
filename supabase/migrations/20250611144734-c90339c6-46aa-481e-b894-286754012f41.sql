
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Out of Stock', 'Low Stock')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for the products table
-- Products can be viewed by everyone (public access)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Only authenticated users can insert products (for admin functionality)
CREATE POLICY "Authenticated users can insert products" 
  ON public.products 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update products (for admin functionality)
CREATE POLICY "Authenticated users can update products" 
  ON public.products 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Only authenticated users can delete products (for admin functionality)
CREATE POLICY "Authenticated users can delete products" 
  ON public.products 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create an index on category for better query performance
CREATE INDEX idx_products_category ON public.products(category);

-- Create an index on status for better query performance
CREATE INDEX idx_products_status ON public.products(status);

-- Insert some sample data
INSERT INTO public.products (name, description, category, price, stock, status, image_url) VALUES
('Floral Maxi Dress', 'Beautiful floral pattern maxi dress perfect for summer occasions', 'Dresses', 89.99, 15, 'Active', '/placeholder.svg'),
('Silk Blouse', 'Elegant silk blouse suitable for both casual and formal wear', 'Tops', 65.50, 8, 'Active', '/placeholder.svg'),
('High-Waist Jeans', 'Comfortable high-waist jeans with a modern fit', 'Bottoms', 79.99, 0, 'Out of Stock', '/placeholder.svg'),
('Leather Handbag', 'Premium leather handbag with multiple compartments', 'Accessories', 125.00, 5, 'Low Stock', '/placeholder.svg'),
('Cashmere Sweater', 'Luxurious cashmere sweater for ultimate comfort', 'Tops', 156.99, 12, 'Active', '/placeholder.svg');
