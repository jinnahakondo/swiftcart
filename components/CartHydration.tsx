"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";

export function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
