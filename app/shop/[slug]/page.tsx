import { asset } from "@/app/asset/asset";
import AddtoCartButton from "@/components/buttons/AddtoCartButton";
import AddtoWishlistButton from "@/components/buttons/AddtoWishlistButton";
import ImageView from "@/components/product/ImageView";
import ProductOptions from "@/components/product/ProductOptions";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon } from "lucide-react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = asset.products.find((product) => product.slug === slug);
  const save =
    product?.price && Math.ceil(product?.price - product?.discountPrice);

  return (
    <div>
      <Breadcrumb className="p-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 ">
        {/*product image glary  */}
        <div>{product?.images && <ImageView images={product.images} />}</div>
        {/* product details  */}
        <div>
          <div className="space-y-2">
            <h2 className="text-lg md:text-3xl font-bold">{product?.title}</h2>
            <p className=" text-muted-foreground tracking-wide ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
              laborum labore nam repudiandae optio alias animi repellat minus,
              error et libero quia dolores iusto accusamus! Quisquam odit
              quaerat dignissimos debitis quo, sint perferendis saepe sed fugiat
              hic consectetur facere mollitia porro optio eum. Ab nihil quia
              non.
            </p>
            {/* rating  */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon size={14} key={index} className="text-primary" />
              ))}
              <span className="text-sm text-muted-foreground">
                {product?.rating ? product.rating : "No reviews yet"}
              </span>
            </div>
          </div>

          {/* price  */}
          <div className="flex items-center gap-1 border p-4 my-4">
            <p className="text-lg font-bold">৳{product?.discountPrice} </p>
            <p className="line-through text-muted-foreground text-lg ">
              ৳{product?.price}
            </p>
            {save && (
              <Badge variant={"success"}>Save {save}৳ on this item!</Badge>
            )}
          </div>

          {/* size & color options */}
          {product && (
            <ProductOptions
              key={product.slug}
              sizes={product.sizes}
              colors={product.colors}
            />
          )}

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
            <AddtoCartButton />
            <AddtoWishlistButton />
          </div>
        </div>
      </div>
      <Tabs
        orientation="horizontal"
        className="pt-10 flex flex-col"
        defaultValue="description"
      >
        <TabsList className=" ">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="w-full">
          {product?.description}
        </TabsContent>
      </Tabs>
    </div>
  );
}
