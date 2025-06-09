
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            {products.length} total products
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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
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
                    <Badge variant={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
