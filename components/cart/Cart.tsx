"use client";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "../ui/button";
import Link from "next/link";
import CartItem from "./CartItem";
import { CartItemType } from "@/lib/types/cartType";
import Swal from "sweetalert2";
import ClearCart from "./ClearCart";

function rowKey(item: CartItemType) {
  return `${item.product}-${item.size ?? ""}-${item.color ?? ""}`;
}

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      {cart.length === 0 ? (
        <div className="py-16 text-center">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Items you add will show up here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
            </h1>
            <ClearCart />
          </div>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {cart.map((item) => (
              <CartItem item={item} key={rowKey(item)} />
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold tabular-nums">৳{total}</p>
          </div>
        </div>
      )}
    </>
  );
}
