
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  image: string;
}

interface ProductViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductViewDialog({ open, onOpenChange, product }: ProductViewDialogProps) {
  if (!product) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Out of Stock':
        return 'destructive';
      case 'Low Stock':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            View complete product information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => console.log('Image clicked for editing')}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.id}</p>
              <Badge variant={getStatusColor(product.status)} className="mt-1">
                {product.status}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <p className="text-sm">{product.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Price</label>
              <p className="text-sm font-semibold">{product.price}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Stock</label>
              <p className="text-sm">{product.stock} units</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-sm">{product.status}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
