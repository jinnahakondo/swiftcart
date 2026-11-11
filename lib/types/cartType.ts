import type { ProductType } from "@/lib/types/productType";

export type CartItemType<P = string> = {
  _id?: string;
  product: P;
  slug: string;
  title: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PopulatedCartItemType = CartItemType<ProductType | null>;
export type CartItemKey = Pick<CartItemType, "product" | "size" | "color">;
