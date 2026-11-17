import Hero from "@/components/ui/home/Hero";
import { Suspense } from "react";
import PopularProducts from "@/components/ui/home/PopularProducts";


export default async function Home() {

  return (
    <div className="space-y-10">
      <Hero />
      <Suspense fallback={<p className="text-center w-full text-2xl">Loading...</p>}>
        <PopularProducts />
      </Suspense>
    </div>
  );
}
