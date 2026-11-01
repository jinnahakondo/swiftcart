"use client";
import React, { useState } from "react";

export default function ImageView({ images }: { images: string[] }) {
  const [active, setActive] = useState(images[0]);
  return (
    <div>
      <div className="w-full min-h-90 max-h-125 rounded-md overflow-hidden aspect-square ">
        <img
          src={active}
          alt="Active preview"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-md"
        />
      </div>
      <div className="flex items-center gap-4 mt-8">
        {images.map((image) => (
          <img
            onClick={() => setActive(image)}
            key={image}
            src={image}
            className={`h-20 rounded-md aspect-square object-cover cursor-pointer ${
              active === image
                ? "ring-2 ring-primary opacity-100 scale-95"
                : "opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
