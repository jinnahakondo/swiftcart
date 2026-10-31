import ImageView from "@/components/product/ImageView";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-10 ">
      <ImageView />
      <p> details</p>
    </div>
  );
}
