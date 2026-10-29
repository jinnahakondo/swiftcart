"use client";
import {
  ChevronLeft,
  CircleUser,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "../navlink/NavLink";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="border px-4  bg-muted text-muted-foreground">
      <div className="w-full max-w-7xl mx-auto py-5 flex items-center justify-between ">
        {/* logo */}
        <div className="flex items-center gap-0.5">
          <img
            src={"/logo.png"}
            alt="swiftcart logo"
            className="h-full w-10 md:w-14"
          />
          <span className="text-xl md:text-3xl font-semibold text-primary">
            Swiftcart
          </span>
        </div>
        {/* menu links */}
        <div className="hidden sm:flex items-center gap-4 text-muted">
          {navItems.map((item) => (
            <NavLink
              className="text-muted-foreground font-medium uppercase"
              key={item.href}
              href={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        {/* action icons */}
        <div className="flex items-center gap-4">
          <Search className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />
          <CircleUser className="cursor-pointer" />
          <Menu className="sm:hidden" onClick={() => setIsVisible(true)} />
        </div>
      </div>
      {/* sidebar menu for mobile */}
      <div
        className={`bg-background absolute top-0 right-0 bottom-0 overflow-hidden transition-all ${isVisible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-muted-foreground">
          <div
            onClick={() => setIsVisible(false)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <ChevronLeft />
            <span>Back</span>
          </div>

          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="border py-2 pl-3 uppercase cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
