
-- Add color and size columns to the products table
ALTER TABLE public.products 
ADD COLUMN color TEXT,
ADD COLUMN size TEXT;

-- Update the existing sample data to include some color and size information
UPDATE public.products 
SET 
  color = CASE 
    WHEN name = 'Floral Maxi Dress' THEN 'Navy Blue'
    WHEN name = 'Silk Blouse' THEN 'Cream'
    WHEN name = 'High-Waist Jeans' THEN 'Dark Blue'
    WHEN name = 'Leather Handbag' THEN 'Black'
    WHEN name = 'Cashmere Sweater' THEN 'Beige'
    ELSE 'Multi-Color'
  END,
  size = CASE 
    WHEN name = 'Floral Maxi Dress' THEN 'M'
    WHEN name = 'Silk Blouse' THEN 'S'
    WHEN name = 'High-Waist Jeans' THEN 'L'
    WHEN name = 'Leather Handbag' THEN 'One Size'
    WHEN name = 'Cashmere Sweater' THEN 'M'
    ELSE 'One Size'
  END;
