
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ImageUpload } from './ImageUpload';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  mode: 'add' | 'edit';
  onSuccess?: () => void;
}

export function ProductFormDialog({ open, onOpenChange, product, mode, onSuccess }: ProductFormDialogProps) {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price?.toString() || '',
    stock: product?.stock || 0,
    status: product?.status || 'Active',
    description: product?.description || '',
    image_url: product?.image_url || '',
    color: product?.color || '',
    size: product?.size || '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        stock: product.stock || 0,
        status: product.status || 'Active',
        description: product.description || '',
        image_url: product.image_url || '',
        color: product.color || '',
        size: product.size || '',
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: 0,
        status: 'Active',
        description: '',
        image_url: '',
        color: '',
        size: '',
      });
    }
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to manage products.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: formData.stock,
        status: formData.status,
        description: formData.description,
        image_url: formData.image_url,
        color: formData.color,
        size: formData.size,
      };

      console.log('Submitting product data:', productData);
      console.log('User authenticated:', !!user);

      if (mode === 'add') {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }

        console.log('Product added successfully:', data);
        toast({
          title: "Product Added",
          description: `${formData.name} has been added successfully.`,
        });
      } else {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product?.id)
          .select();

        if (error) {
          console.error('Update error:', error);
          throw error;
        }

        console.log('Product updated successfully:', data);
        toast({
          title: "Product Updated",
          description: `${formData.name} has been updated successfully.`,
        });
      }

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to ${mode} product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleImageRemoved = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  if (authLoading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Product' : 'Edit Product'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Add a new product to your inventory.' : 'Make changes to the product details.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          
          <ImageUpload
            onImageUploaded={handleImageUploaded}
            currentImageUrl={formData.image_url}
            onImageRemoved={handleImageRemoved}
          />
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dresses">Dresses</SelectItem>
                <SelectItem value="Tops">Tops</SelectItem>
                <SelectItem value="Bottoms">Bottoms</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="e.g. Red, Blue, Black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XS">XS</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                  <SelectItem value="XXL">XXL</SelectItem>
                  <SelectItem value="One Size">One Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                type="number"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Product description..."
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !user}>
              {loading ? 'Saving...' : (mode === 'add' ? 'Add Product' : 'Save Changes')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
