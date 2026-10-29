import { asset } from "@/app/asset/asset";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function Hero() {
  return (
    <div>
      {
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Image
                src={asset.hero}
                priority
                alt="hero slide "
                className="h-full max-h-100 w-full  "
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={asset.hero1}
                priority
                alt="hero slide "
                className="h-full max-h-100 w-full  "
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-0!" />
          <CarouselNext className="right-0!" />
        </Carousel>
      }
    </div>
  );
}
