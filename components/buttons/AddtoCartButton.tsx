"use client";
import React from "react";
import { Button } from "../ui/button";
import { Handbag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import type { ProductType } from "@/lib/types/productType";
import { CartItemType } from "@/lib/types/cartType";
import { toast } from "sonner";

interface IProps {
  product: ProductType;
  size?: string;
  color?: string;
}

export default function AddtoCartButton({ product, size, color }: IProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const cartItem: CartItemType = {
    product: product._id,
    slug: product.slug,
    title: product.title,
    image: product.images[0],
    price: product.discountPrice,
    size,
    color,
    quantity: 1,
  };

  const handleAddToCart = () => {
    addToCart(cartItem);
    toast.success("Item added to cart");
  };

  return (
    <Button onClick={handleAddToCart} className="w-full">
      <Handbag /> Add to Cart
    </Button>
  );
}
