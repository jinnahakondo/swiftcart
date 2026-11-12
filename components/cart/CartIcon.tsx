import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const totalItem = useCartStore((state) => state.cart.length);

  return (
    <div className="relative">
      <ShoppingCart className="cursor-pointer" />
      <span className=" absolute -top-1 -right-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full min-w-4 h-4 flex justify-center items-center border border-primary">
        {totalItem ?? 0}
      </span>
    </div>
  );
}
