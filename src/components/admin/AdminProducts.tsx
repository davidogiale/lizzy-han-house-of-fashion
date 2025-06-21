import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { ProductFormDialog } from './ProductFormDialog';
import { ProductViewDialog } from './ProductViewDialog';
import { DeleteProductDialog } from './DeleteProductDialog';
import { useToast } from "@/hooks/use-toast";
import { useProducts } from '@/hooks/useProducts';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

export function AdminProducts() {
  const { toast } = useToast();
  const { products, loading, error, refetch } = useProducts();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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

  const handleImageClick = (product: Product) => {
    console.log('Image clicked for product:', product.id);
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleStatusBadgeClick = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
    toast({
      title: "Filter Applied",
      description: statusFilter === status ? "Filter cleared" : `Showing ${status} products`,
    });
  };

  const filteredProducts = statusFilter 
    ? products.filter(product => product.status === statusFilter)
    : products;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2 text-destructive">Error loading products</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={refetch}>Try Again</Button>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-muted-foreground">Manage your product catalog and inventory</p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="overflow-x-auto w-full max-w-full">
          <Card className="min-w-[900px] md:min-w-0">
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                {filteredProducts.length} {statusFilter ? `${statusFilter.toLowerCase()} ` : ''}products
                {statusFilter && (
                  <Button 
                    variant="link" 
                    className="h-auto p-0 ml-2 text-xs"
                    onClick={() => setStatusFilter(null)}
                  >
                    Clear filter
                  </Button>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img 
                                src={product.image_url || '/placeholder.svg'} 
                                alt={product.name}
                                className="w-10 h-10 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => handleImageClick(product)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to view product details</p>
                            </TooltipContent>
                          </Tooltip>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₦{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge 
                              variant={getStatusColor(product.status)}
                              className="cursor-pointer hover:opacity-80"
                              onClick={() => handleStatusBadgeClick(product.status)}
                            >
                              {product.status}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to filter by {product.status}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View product details</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit product</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete product</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <ProductFormDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          mode="add"
          onSuccess={refetch}
        />

        <ProductFormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          product={selectedProduct}
          mode="edit"
          onSuccess={refetch}
        />

        <ProductViewDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          product={selectedProduct}
        />

        {selectedProduct && (
          <DeleteProductDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            productName={selectedProduct.name}
            productId={selectedProduct.id}
            onSuccess={refetch}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
