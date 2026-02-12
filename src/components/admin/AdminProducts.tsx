import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Edit, Trash2, Eye, Loader2, Search, Filter } from 'lucide-react';
import { ProductFormDialog } from './ProductFormDialog';
import { ProductViewDialog } from './ProductViewDialog';
import { DeleteProductDialog } from './DeleteProductDialog';
import { useToast } from "@/hooks/use-toast";
import { useProducts } from '@/hooks/useProducts';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

export function AdminProducts() {
  const { toast } = useToast();
  const { products, loading, error, refetch } = useProducts();
  const isMobile = useIsMobile();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    setEditDialogOpen(true);
  };

  const handleStatusBadgeClick = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
    toast({
      title: "Filter Applied",
      description: statusFilter === status ? "Filter cleared" : `Showing ${status} products`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSearch = searchTerm 
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-muted-foreground">Manage your product catalog and inventory</p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, ID or category..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <Select 
              value={statusFilter || 'all'} 
              onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <Filter className="h-3 w-3 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={categoryFilter || 'all'} 
              onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {searchTerm || statusFilter || categoryFilter ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 text-xs text-muted-foreground"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter(null);
                  setCategoryFilter(null);
                }}
              >
                Clear
              </Button>
            ) : null}
          </div>
        </div>
        {isMobile ? (
          <div className="grid gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex items-start p-4 gap-4">
                    <img 
                      src={product.image_url || '/placeholder.svg'} 
                      alt={product.name}
                      className="w-20 h-20 rounded-md object-cover flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setViewDialogOpen(true);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold truncate pr-2">{product.name}</h3>
                        <Badge variant={getStatusColor(product.status)} className="text-[10px] px-1.5 py-0">
                          {product.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{product.category}</p>
                      <p className="font-bold mt-1">₦{product.price.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <span>Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t divide-x">
                    <Button 
                      variant="ghost" 
                      className="flex-1 rounded-none h-10 text-xs"
                      onClick={() => {
                        setSelectedProduct(product);
                        setViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="flex-1 rounded-none h-10 text-xs text-blue-600"
                      onClick={() => {
                        setSelectedProduct(product);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="flex-1 rounded-none h-10 text-xs text-destructive"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">No products found matching your search</p>
                {searchTerm && (
                  <Button 
                    variant="link" 
                    onClick={() => setSearchTerm('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
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
                                <p>Click to edit product</p>
                              </TooltipContent>
                            </Tooltip>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-[150px]">{product.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₦{product.price.toLocaleString()}</TableCell>
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
        )}
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
