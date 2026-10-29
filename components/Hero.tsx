import { asset } from "@/app/asset/asset";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div>
      <div>
        <Image
          src={asset.hero}
          priority
          alt="hero slide "
          className="h-full max-h-100 w-full  "
        />
      </div>
    </div>
  );
}
