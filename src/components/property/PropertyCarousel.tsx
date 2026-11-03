import { useEffect, useState } from "react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/common/Text";
import PropertyCard from "@/components/property/PropertyCard";
import type { Property } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  heading: string;
  properties: Property[];
}

/** The original's PropertySlider: heading with nav on the right, 1.1/2/3 up. */
export default function PropertyCarousel({ heading, properties }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!properties.length) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <SectionHeader>{heading}</SectionHeader>
        {/* Hidden when nothing scrolls, as the original's onLock did. */}
        <div
          className={cn(
            "flex shrink-0 gap-3 pl-4",
            !canScrollPrev && !canScrollNext && "hidden",
          )}
        >
          <button
            type="button"
            aria-label="Previous"
            onClick={() => api?.scrollPrev()}
            className={cn("duration-75", canScrollPrev ? "text-primary-100" : "text-secondary-100")}
          >
            <SliderChevron className="size-[1.875rem] rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => api?.scrollNext()}
            className={cn("duration-75", canScrollNext ? "text-primary-100" : "text-secondary-100")}
          >
            <SliderChevron className="size-[1.875rem]" />
          </button>
        </div>
      </div>
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        {/* 1.1 up on mobile so the next card peeks, then 2 and 3 with the
            gutter widening from 30px to 50px, as the original. */}
        <CarouselContent
          viewportClassName="overflow-visible md:overflow-hidden"
          className="-ml-[30px] xl:-ml-[50px]"
        >
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="basis-[90.9%] pl-[30px] md:basis-1/2 xl:basis-1/3 xl:pl-[50px]"
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
