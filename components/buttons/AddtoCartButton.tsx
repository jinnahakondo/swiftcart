"use client";
import React from "react";
import { Button } from "../ui/button";
import { Handbag, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { ProductType } from "@/lib/types/productType";
import { CartItemType, CartItemKey } from "@/lib/types/cartType";
import { toast } from "sonner";

interface IProps {
  product: ProductType;
  size?: string;
  color?: string;
}

export default function AddtoCartButton({ product, size, color }: IProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const quantityInc = useCartStore((state) => state.quantityInc);
  const quantityDec = useCartStore((state) => state.quantityDec);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);

  const cartItem: CartItemType = {
    product: product._id,
    slug: product.slug,
    title: product.title,
    image: product.images[0],
    price: product.discountPrice,
    size: size ?? product.sizes[0],
    color: color ?? product.colors[0],
    quantity: 1,
  };

  const cartItemKey: CartItemKey = {
    product: cartItem.product,
    size: cartItem.size,
    color: cartItem.color,
  };

  // Selector returns a primitive, so the button re-renders when quantity changes.
  const itemQuantity = useCartStore((state) =>
    state.getItemQuantity(cartItemKey),
  );

  const isAtStockLimit = itemQuantity >= product.stock;

  const handleAddToCart = () => {
    if (!isAtStockLimit && product.stock > 0) {
      addToCart(cartItem);
      toast.success(
        `${product?.title?.substring(0, 12)}... added successfully!`,
      );
    } else {
      toast.error("Maximum available stock reached.");
    }
  };

  const handleIncrement = () => {
    if (isAtStockLimit) {
      toast.error("Maximum available stock reached.");
      return;
    }
    quantityInc(cartItemKey);
  };

  const handleDecrement = () => {
    if (itemQuantity <= 1) {
      removeItemFromCart(cartItemKey);
      return;
    }
    quantityDec(cartItemKey);
  };

  if (itemQuantity > 0) {
    return (
      <div className="flex w-full items-center justify-between rounded-lg border border-border">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          <Minus />
        </Button>
        <span
          aria-live="polite"
          className="text-sm font-semibold tabular-nums"
        >
          {itemQuantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleIncrement}
          disabled={isAtStockLimit}
          aria-label="Increase quantity"
        >
          <Plus />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
      className="w-full"
    >
      <Handbag /> Add to Cart
    </Button>
  );
}
