"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import type { CartItemType } from "@/lib/types/cartType";

function rowKey(item: CartItemType) {
  return `${item.product}-${item.size ?? ""}-${item.color ?? ""}`;
}

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const quantityInc = useCartStore((state) => state.quantityInc);
  const quantityDec = useCartStore((state) => state.quantityDec);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Items you add will show up here.
        </p>
        <Button asChild className="mt-6">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h1>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Clear cart
        </Button>
      </div>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        {cart.map((item) => {
          const key = {
            product: item.product,
            size: item.size,
            color: item.color,
          };

          return (
            <li
              key={rowKey(item)}
              className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-medium hover:text-primary"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[item.size, item.color].filter(Boolean).join(" / ")}
                </p>
                <p className="mt-1 text-sm">৳{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    item.quantity <= 1
                      ? removeItemFromCart(key)
                      : quantityDec(key)
                  }
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  <Minus />
                </Button>
                <span
                  aria-live="polite"
                  className="min-w-6 text-center text-sm font-semibold tabular-nums"
                >
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => quantityInc(key)}
                  disabled={item.quantity >= 99}
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  <Plus />
                </Button>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <p className="text-sm font-semibold tabular-nums">
                  ৳{item.price * item.quantity}
                </p>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeItemFromCart(key)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold tabular-nums">৳{total}</p>
      </div>
    </div>
  );
}
