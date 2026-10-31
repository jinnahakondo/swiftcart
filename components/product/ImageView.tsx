"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function ImageView() {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
  ];

  const [active, setActive] = useState(images[0]);
  return (
    <div>
      <div className="w-full h-full min-h-80 max-h-125 rounded-md aspect-square overflow-hidden">
        <img
          src={active}
          className="w-full h-full  transition-all  hover:scale-125"
        />
      </div>
      <div className="flex items-center gap-4 mt-8">
        {images.map((image) => (
          <img
            onClick={() => setActive(image)}
            key={image}
            src={image}
            className="h-20 rounded-md aspect-square cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
