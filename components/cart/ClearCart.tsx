import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";

export default function ClearCart() {
  const clearCart = useCartStore((s) => s.clearCart);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Clear Cart</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg">
            Want to clear your cart?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            All items will be permanently removed from your cart
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clearCart} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
