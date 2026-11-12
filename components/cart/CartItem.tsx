import Link from "next/link";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CartItemKey, CartItemType } from "@/lib/types/cartType";

export default function CartItem({ item }: { item: CartItemType }) {
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const quantityInc = useCartStore((state) => state.quantityInc);
  const quantityDec = useCartStore((state) => state.quantityDec);
  const key: CartItemKey = {
    product: item.product,
    color: item.color,
    size: item.size,
  };

  return (
    <li className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center justify-between">
      <div className="flex flex-row gap-4">
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
      </div>

      <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() =>
            item.quantity <= 1 ? removeItemFromCart(key) : quantityDec(key)
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
          ৳{(item.price * item.quantity).toFixed(2)}
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
      </div>
    </li>
  );
}
