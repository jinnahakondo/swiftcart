"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import AddtoCartButton from "../buttons/AddtoCartButton";
import { ProductType } from "@/lib/types/productType";
import AddtoWishlistButton from "../buttons/AddtoWishlistButton";

const COLOR_SWATCHES: Record<string, string> = {
  white: "#ffffff",
  black: "#111111",
  navy: "#1e293b",
  "dark blue": "#1e3a8a",
  "light wash": "#93c5fd",
  olive: "#556b2f",
  charcoal: "#374151",
  orange: "#f97316",
  "matte black": "#1f2937",
  silver: "#c0c0c0",
  steel: "#71717a",
  teal: "#0d9488",
  brown: "#7c4a2d",
  tan: "#d2b48c",
  blue: "#2563eb",
  grey: "#9ca3af",
  gray: "#9ca3af",
  neon: "#bef264",
  maroon: "#800000",
  "heather grey": "#9ca3af",
  "forest green": "#228b22",
  "rose gold": "#b76e79",
  "space grey": "#4b5563",
  "tortoise shell": "#8b5a2b",
};

const FALLBACK_SWATCH = "#9ca3af";

function colorFor(name: string) {
  const normalized = name.toLowerCase();
  const key = Object.keys(COLOR_SWATCHES)
    .sort((a, b) => b.length - a.length)
    .find((swatch) => normalized.includes(swatch));

  return key ? COLOR_SWATCHES[key] : FALLBACK_SWATCH;
}

function swatchFor(name: string) {
  const parts = name.split("/").map((part) => part.trim());
  const [first, second] = parts;

  if (parts.length === 2 && first && second) {
    return `linear-gradient(135deg, ${colorFor(first)} 50%, ${colorFor(second)} 50%)`;
  }

  return colorFor(name);
}

export default function ProductExtraInfo({
  product,
  sizes,
  colors,
}: {
  product: ProductType;
  sizes: string[];
  colors: string[];
}) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  if (sizes.length === 0 && colors.length === 0) return null;

  return (
    <div>
      <div
        className={cn(
          "flex flex-col justify-between gap-5 border p-4 mb-4",
          colors.length > 0 && sizes.length > 0 && "lg:flex-row",
        )}
      >
        {colors.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Color:</span>{" "}
              <span className="font-medium">{selectedColor}</span>
            </p>
            <div
              role="group"
              aria-label="Select color"
              className="flex flex-wrap items-center gap-3"
            >
              {colors.map((color) => {
                const isSelected = color === selectedColor;

                return (
                  <button
                    key={color}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "relative size-8 rounded-full border border-border outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50",
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "hover:scale-105",
                    )}
                    style={{ background: swatchFor(color) }}
                  >
                    {isSelected && (
                      <Check
                        size={16}
                        strokeWidth={3}
                        className="absolute inset-0 m-auto text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {sizes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Size:</span>{" "}
              <span className="font-medium">{selectedSize}</span>
            </p>
            <div
              role="group"
              aria-label="Select size"
              className="flex flex-wrap items-center gap-2"
            >
              {sizes.map((size) => {
                const isSelected = size === selectedSize;

                return (
                  <Button
                    key={size}
                    type="button"
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-12"
                  >
                    {size}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* additional  */}
      <div className="pb-4 space-y-2">
        <div className="flex items-center justify-between">
          <p>Brand</p>
          <p className="font-semibold">{product?.brand}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Category</p>
          <p className="font-semibold">{product?.category}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Stock</p>
          <p className="font-semibold">Available</p>
        </div>
      </div>
      {/* action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddtoCartButton
          product={product}
          size={selectedSize}
          color={selectedColor}
        />
        <AddtoWishlistButton />
      </div>
    </div>
  );
}
