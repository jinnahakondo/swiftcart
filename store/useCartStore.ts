"use client";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { CartItemKey, CartItemType } from "@/lib/types/cartType";

interface CartState {
  cart: CartItemType[];
  addToCart: (newItem: CartItemType) => void;
  quantityInc: (cartItemKey: CartItemKey) => void;
  quantityDec: (cartItemKey: CartItemKey) => void;
  removeItemFromCart: (cartItemKey: CartItemKey) => void;
  clearCart: () => void;
}

function isSameCartItem(a: CartItemKey, b: CartItemKey) {
  return (
    a.product === b.product &&
    (a.size ?? "")?.trim() === (b.size ?? "").trim() &&
    (a.color ?? "").trim() === (b.color ?? "").trim()
  );
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        // add item to cart
        addToCart: (newItem) => {
          set((state) => {
            const cart = state.cart;
            const isExistitem = cart.find((item) =>
              isSameCartItem(item, newItem),
            );
            if (isExistitem) {
              const updateCart = cart.map((item) =>
                isSameCartItem(item, newItem)
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + (newItem.quantity ?? 1),
                        99,
                      ),
                    }
                  : item,
              );
              return { cart: updateCart };
            } else {
              return { cart: [...cart, newItem] };
            }
          });
        },
        // increment item quantity
        quantityInc: (cartItemKey) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              isSameCartItem(item, cartItemKey)
                ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                : item,
            ),
          }));
        },
        // decrement item quantity
        quantityDec: (cartItemKey) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              isSameCartItem(item, cartItemKey)
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item,
            ),
          }));
        },
        // remove a item form cart
        removeItemFromCart: (cartItemKey) => {
          set((state) => ({
            cart: state.cart.filter(
              (item) => !isSameCartItem(item, cartItemKey),
            ),
          }));
        },
        // clear cart
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: "swiftcart-cart",
        skipHydration: true,
        version: 1,
      },
    ),
  ),
);
