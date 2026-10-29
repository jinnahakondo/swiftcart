import { CircleUser, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <div className="flex flex-col items-center border">
      <div className="w-full max-w-7xl py-5 flex items-center justify-between ">
        <div className="flex items-center gap-0.5">
          <img
            src={"/logo.png"}
            alt="swiftcart logo"
            className="h-full w-10 md:w-14"
          />
          <span className="text-xl md:text-3xl font-semibold text-muted-foreground">
            Swiftcart
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a>Home</a>
          <a>Shop</a>
          <a>About</a>
          <a>Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <ShoppingCart />
          <CircleUser />
        </div>
      </div>
    </div>
  );
}
