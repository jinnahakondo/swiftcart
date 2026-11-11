import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { CartItemType } from "@/lib/types/cartType";

interface CartState {
  cart: CartItemType[];
  addToCart: (newItem: CartItemType) => void;
  quantityInc: (itemId: string) => void;
  quantityDec: (itemId: string) => void;
  removeItemToCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        // add item to cart
        addToCart: (newItem) => {
          console.log({newItem});
          const currentItems = get().cart;
          const isExistitem = currentItems.find(
            (item) =>
              item.product === newItem._id &&
              item.color === newItem.color &&
              item.size === newItem.size,
          );
          if (isExistitem) {
            const updateItem = currentItems.map((item) =>
              item.product === newItem._id &&
              item.color === newItem.color &&
              item.size === newItem.size
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
            set({ cart: updateItem });
          } else {
            set({ cart: [...currentItems, newItem] });
          }
        },
        // increment item quantity
        quantityInc: (itemId) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.product === itemId
                ? { ...item, quantity: item.quantity++ }
                : item,
            ),
          }));
        },
        // decrement item quantity
        quantityDec: (itemId) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.product === itemId
                ? { ...item, quantity: item.quantity-- }
                : item,
            ),
          }));
        },
        // remove a item form cart
        removeItemToCart: (itemId) => {
          set((state) => ({
            cart: state.cart.filter((item) => item.product !== itemId),
          }));
        },
        // clear cart
        clearCart: () => set({ cart: [] }),
      }),
      { name: "cart" },
    ),
  ),
);
