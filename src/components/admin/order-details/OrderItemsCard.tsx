
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    id: string;
    name: string;
    image_url: string | null;
    category: string;
    color: string | null;
    size: string | null;
  };
};

interface OrderItemsCardProps {
  orderItems: OrderItem[] | undefined;
  itemsError: boolean;
}

export function OrderItemsCard({ orderItems, itemsError }: OrderItemsCardProps) {
  if (itemsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-destructive">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Failed to load order items</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Order Items</CardTitle>
      </CardHeader>
      <CardContent>
        {!orderItems || orderItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items found for this order</p>
        ) : (
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img
                  src={item.products.image_url || "/placeholder.svg"}
                  alt={item.products.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.products.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {item.products.category}
                    </Badge>
                    {item.products.color && (
                      <Badge variant="outline" className="text-xs">
                        {item.products.color}
                      </Badge>
                    )}
                    {item.products.size && (
                      <Badge variant="outline" className="text-xs">
                        {item.products.size}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₦{item.price.toLocaleString("en-NG")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    Total: ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Items Total:</span>
                <span className="font-semibold text-lg">
                  ₦{orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString("en-NG")}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
