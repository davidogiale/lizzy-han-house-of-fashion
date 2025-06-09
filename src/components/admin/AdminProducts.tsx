
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ProductFormDialog } from './ProductFormDialog';
import { ProductViewDialog } from './ProductViewDialog';
import { DeleteProductDialog } from './DeleteProductDialog';
import { useToast } from "@/hooks/use-toast";

const products = [
  {
    id: "PROD-001",
    name: "Floral Maxi Dress",
    category: "Dresses",
    price: "$89.99",
    stock: 15,
    status: "Active",
    image: "/placeholder.svg",
  },
  {
    id: "PROD-002",
    name: "Silk Blouse",
    category: "Tops",
    price: "$65.50",
    stock: 8,
    status: "Active",
    image: "/placeholder.svg",
  },
  {
    id: "PROD-003",
    name: "High-Waist Jeans",
    category: "Bottoms",
    price: "$79.99",
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg",
  },
  {
    id: "PROD-004",
    name: "Leather Handbag",
    category: "Accessories",
    price: "$125.00",
    stock: 5,
    status: "Low Stock",
    image: "/placeholder.svg",
  },
  {
    id: "PROD-005",
    name: "Cashmere Sweater",
    category: "Tops",
    price: "$156.99",
    stock: 12,
    status: "Active",
    image: "/placeholder.svg",
  },
];

export function AdminProducts() {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
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

  const handleImageClick = (product: typeof products[0]) => {
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

        <Card>
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
                              src={product.image} 
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
                    <TableCell>{product.price}</TableCell>
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

        <ProductFormDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          mode="add"
        />

        <ProductFormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          product={selectedProduct}
          mode="edit"
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
          />
        )}
      </div>
    </TooltipProvider>
  );
}
