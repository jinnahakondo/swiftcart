"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export default function CartIcon() {
  // Counts distinct cart rows (product/size/color), not summed quantities.
  const itemCount = useCartStore((state) => state.cart.length);
  const itemLabel = itemCount === 1 ? "item" : "items";

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/cart" aria-label={`Cart, ${itemCount} ${itemLabel}`}>
          <ShoppingCart className="size-6" aria-hidden />
        </Link>
      </Button>
      {itemCount > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-muted-foreground bg-muted px-1 text-xs leading-none font-semibold text-muted-foreground tabular-nums"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
      <span aria-live="polite" className="sr-only">
        {itemCount > 0 ? `${itemCount} ${itemLabel} in cart` : ""}
      </span>
    </div>
  );
}
