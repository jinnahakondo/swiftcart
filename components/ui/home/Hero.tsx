"use client";
import { asset } from "@/app/asset/asset";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

export default function Hero() {
  return (
    <div>
      <Carousel plugins={[Autoplay({ delay: 3000 })]}>
        <CarouselContent>
          {asset.slides.map((slide, i) => (
            <CarouselItem key={i}>
              <Image
                src={slide}
                priority={i === 0}
                alt="hero slide "
                className="h-full max-h-100 w-full  "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0!" />
        <CarouselNext className="right-0!" />
      </Carousel>
    </div>
  );
}
