import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getImageSrc } from "@/lib/property-utils";
import type { PropertyImage } from "@/lib/types";
import ProgressiveImage from "@/components/common/ProgressiveImage";
import { CameraIcon } from "@/components/common/FilledIcons";
import ImageNavButton from "./ImageNavButton";

interface Props {
  images: PropertyImage[];
}

export default function ImageCarousel({ images }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="relative flex h-min w-full items-center justify-self-start overflow-hidden rounded-big xl:order-1 xl:max-w-[58rem]">
      {images.length > 1 && (
        <>
          <ImageNavButton direction="prev" onClick={() => api?.scrollPrev()} />
          <ImageNavButton direction="next" onClick={() => api?.scrollNext()} />
        </>
      )}
      {images.length > 0 && (
        <div className="absolute bottom-2 right-2 z-10 flex h-8 w-24 items-center justify-between rounded bg-white px-3 font-medium text-primary-100 md:bottom-6 md:right-6">
          <CameraIcon className="size-[1.125rem] text-secondary-100" />
          <p className="text-sm tracking-[2.8px]">
            <span className="sr-only">Image </span>
            {currentIndex + 1}/{images.length}
          </p>
        </div>
      )}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-0.5">
          {images.map((image, index) => (
            <CarouselItem key={image.id ?? index} className="pl-0.5">
              <ProgressiveImage
                src={getImageSrc(image, "hero")}
                alt={image.caption || ""}
                wrapperClassName="aspect-property"
                className="object-cover object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
