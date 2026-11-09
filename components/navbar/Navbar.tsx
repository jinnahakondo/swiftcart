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
import Image from "next/image";
import { asset } from "@/app/asset/asset";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  const { status, data } = useSession();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="border px-4 text-muted-foreground">
      <div className="w-full max-w-7xl mx-auto py-5 flex items-center justify-between ">
        {/* logo */}
        <div className="flex items-center gap-0.5">
          <Image
            priority
            src={asset.logo}
            width={40}
            alt="swiftcart logo"
            className="h-full w-10 md:w-14"
          />
          <span className="text-xl md:text-3xl font-semibold text-primary">
            SwiftCart
          </span>
        </div>
        {/* menu links */}
        <div className="hidden sm:flex items-center gap-4 text-muted">
          {navItems.map((item) => (
            <NavLink
              className="text-muted-foreground font-medium uppercase hover:text-primary"
              key={item.href}
              href={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <p className="text-black">{data?.user.role}</p>
        {/* action icons */}
        <div className="flex items-center gap-4">
          <Search className="cursor-pointer" />
          <div className="relative">
            <ShoppingCart className="cursor-pointer" />
            <span className=" absolute -top-1 -right-2 bg-accent text-accent-foreground text-xs font-semibold rounded-full min-w-5 h-5 flex justify-center items-center ">
              10
            </span>
          </div>
          {status === "authenticated" ? (
            <Button onClick={() => signOut()}>LogOut</Button>
          ) : (
            <Link href={"/login"}>
              <CircleUser />
            </Link>
          )}
          <Menu className="sm:hidden" onClick={() => setIsVisible(true)} />
        </div>
      </div>
      {/* sidebar menu for mobile */}
      <div
        className={`bg-background absolute top-0 right-0 bottom-0 overflow-hidden transition-all ${isVisible ? "w-full" : "w-0"} z-50`}
      >
        <div className="flex flex-col text-muted-foreground">
          <div
            onClick={() => setIsVisible(false)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft />
            <span>Back</span>
          </div>

          {navItems.map((item, i) => (
            <Link
              onClick={() => setIsVisible(false)}
              key={i}
              href={item.href}
              className="border py-3 pl-3 uppercase cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
