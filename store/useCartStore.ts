"use client";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { CartItemKey, CartItemType } from "@/lib/types/cartType";
import axios from "axios";

interface CartState {
  cart: CartItemType[];
  isAuthenticated:boolean;
  isSyncing:boolean;

  setAuthStatus:(status:boolean)=>void;
  addToCart: (newItem: CartItemType) => Promise<void>;
  quantityInc: (cartItemKey: CartItemKey) => Promise<void>;
  quantityDec: (cartItemKey: CartItemKey) => Promise<void>;
  removeItemFromCart: (cartItemKey: CartItemKey) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemQuantity: (cartItemKey: CartItemKey) => number;

  mergeGuestCartWithDB:()=>Promise<void>
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
      (set, get) => ({
        cart: [],
        isSyncing:false,
        isAuthenticated:false,
        setAuthStatus:(status)=>{
          set({isAuthenticated:status})
          console.log(get().isAuthenticated)
        },

        // add item to cart
        addToCart: async (newItem) => {
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
          if(get().isAuthenticated){
            try {
              await axios.post("/api/cart", newItem);
            } catch (error) {
              console.error("Failed to sync cart with server:", error);
            }
          }
        },
        // increment item quantity
        quantityInc: async (cartItemKey) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              isSameCartItem(item, cartItemKey)
                ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                : item,
            ),
          }));
          if(get().isAuthenticated){
            try {
              await axios.patch("/api/cart/quantity-inc", cartItemKey);
        }catch (error) {
              console.error("Failed to sync cart with server:", error);
            }
          }
        },
        // decrement item quantity
        quantityDec: async (cartItemKey) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              isSameCartItem(item, cartItemKey)
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item,
            ),
          }))
          if(get().isAuthenticated){
            try {
              await axios.patch("/api/cart/quantity-dec", cartItemKey);
            } catch (error) {
              console.error("Failed to sync cart with server:", error);
            }
          }
        },
        // remove a item form cart
        removeItemFromCart: async (cartItemKey) => {
          set((state) => ({
            cart: state.cart.filter(
              (item) => !isSameCartItem(item, cartItemKey),
            ),
          }));
          if(get().isAuthenticated){
            try {
              await axios.delete("/api/cart", { data: cartItemKey });
            } catch (error) {
              console.error("Failed to sync cart with server:", error);
            }
          }
        },
        // clear cart
        clearCart: async () => {
          set({ cart: [] });
          if(get().isAuthenticated){
            try {
              await axios.delete("/api/cart/clear-cart");
            } catch (error) {
              console.error("Failed to sync cart with server:", error);
            }
          }
        },
        // get total quantity of a product
        getItemQuantity: (cartItemKey) => {
          const item = get().cart.find((item) =>
            isSameCartItem(item, cartItemKey),
          );
          return item?.quantity ?? 0;
        },
        // merge guest cart with db 
        mergeGuestCartWithDB:()=>{
          if(get().isAuthenticated){
            
          }
          return ;
        }
      }),
      {
        name: "swiftcart-cart",
        skipHydration: true,
        version: 1,
      },
    ),
  ),
);
