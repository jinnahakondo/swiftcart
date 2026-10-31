import Hero from "@/components/ui/home/Hero";
import { asset } from "./asset/asset";
import { ProductCard } from "@/components/ui/home/ProductCard";

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />
      <div className="grid grid-cols-4 gap-3">
        {asset.products.map((product) => (
          <ProductCard product={product} key={product._id}/>
        ))}
      </div>
    </div>
  );
}
