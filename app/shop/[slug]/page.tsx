import { asset } from "@/app/asset/asset";
import ImageView from "@/components/product/ImageView";
import ProductOptions from "@/components/product/ProductExtraInfo";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignLeft, FileText, Info, Star, StarIcon } from "lucide-react";

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
              product={product}
            />
          )}
        </div>
      </div>
      <Tabs
        orientation="horizontal"
        className="pt-8 pb-10 border-t flex flex-col"
        defaultValue="description"
      >
        <div className="border-b">
          <TabsList variant="line" className="gap-8">
            <TabsTrigger
              value="description"
              className="gap-2 px-1 text-sm font-semibold tracking-wide !data-active:after:bg-primary"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="gap-2 px-1 text-sm font-semibold tracking-wide !data-active:after:bg-primary"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="description" className="w-full pt-6 max-w-3xl">
          <h3 className="text-base font-semibold mb-2">Product details</h3>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            {product?.description}
          </p>
        </TabsContent>

        <TabsContent value="reviews" className="w-full pt-6 max-w-3xl">
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold">
              {product?.rating ? product.rating.toFixed(1) : "—"}
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={14}
                    className={
                      product?.rating && index < Math.round(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/40"
                    }
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">out of 5</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No written reviews yet. Be the first to share your thoughts on this
            product.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
