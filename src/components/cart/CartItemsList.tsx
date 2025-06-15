
import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@/hooks/useCart";

interface CartItemsListProps {
  cartItems: CartItem[];
  updateQuantity: (params: { cartItemId: string; newQuantity: number }) => void;
  removeItem: (id: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  cartItems,
  updateQuantity,
  removeItem,
}) => {
  if (cartItems.length === 0) {
    return null;
  }
  return (
    <div className="space-y-4 mb-8" data-testid="cart-items-list">
      {cartItems.map((item) =>
        item.products ? (
          <div key={item.id} className="bg-white border rounded-lg p-4">
            <div className="flex gap-4">
              <img
                src={item.products.image_url || "/placeholder.svg"}
                alt={item.products.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.products.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                      {item.products.color && (
                        <span>Color: {item.products.color}</span>
                      )}
                      {item.products.size && (
                        <span>Size: {item.products.size}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity({
                          cartItemId: item.id,
                          newQuantity: item.quantity - 1,
                        })
                      }
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="px-3 py-1 bg-muted rounded">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity({
                          cartItemId: item.id,
                          newQuantity: item.quantity + 1,
                        })
                      }
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <p className="font-semibold text-lg">
                    ₦{(item.products.price * item.quantity).toLocaleString("en-NG")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default CartItemsList;
