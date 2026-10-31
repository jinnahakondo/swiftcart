"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className }: IProps) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`${className} ${pathName.endsWith(href) && "text-primary"} cursor-pointer`}
    >
      {children}
    </Link>
  );
}
