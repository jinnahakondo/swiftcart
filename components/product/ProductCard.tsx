import { Handbag, Heart, Star } from "lucide-react";

import { ProductType } from "@/types/productType";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function ProductCard({ product }: { product: ProductType }) {
  const save = product.price - product.discountPrice;
  return (
    <Card className="mx-auto w-full max-w-sm pt-0 rounded-none shadow-none  hover:shadow-2xl relative">
      <Badge className="absolute top-6 left-6 z-10">
        {" "}
        ৳ {Math.round(save)}
      </Badge>
      <Heart size={20} className="absolute top-6 right-6 z-10" />
      <Link href={`/shop/${product.slug}`}>
        <div className=" h-50 overflow-hidden m-4">
          <img
            height={100}
            src={product.images[0]}
            alt="Event cover"
            className=" w-full h-full object-cover hover:scale-110 transition-all"
          />
        </div>
      </Link>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between font-medium">
          <p className="flex items-center gap-1 text-sm">
            <Star size={16} className="text-primary" />
            {product.rating}
          </p>
          <p className="text-sm">{product.soldCount} sold</p>
        </div>

        <div className="flex items-start justify-between gap-1">
          <p className="text-base font-medium">{product.title}</p>
          <div>
            <p className="text-lg font-semibold">৳{product.discountPrice}</p>
            <p className="text-sm text-muted-foreground line-through">
              ৳{product.price}
            </p>
          </div>
        </div>
      </CardContent>
      <div className="px-4 mt-auto">
        <Button className="w-full mt-auto flex items-center gap-2">
          <Handbag /> Add to Cart
        </Button>
      </div>
    </Card>
  );
}
