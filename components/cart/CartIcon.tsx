import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const cart = useCartStore((state) => state.cart);
  const totaCartItem = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className="cursor-pointer" />
      <span className=" absolute -top-1 -right-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full min-w-4 h-4 flex justify-center items-center border border-primary">
        {totaCartItem}
      </span>
    </div>
  );
}
