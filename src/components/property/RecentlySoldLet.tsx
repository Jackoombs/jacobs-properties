import { useEffect, useState } from "react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import PropertyCard from "@/components/property/PropertyCard";
import SoldLetToggle, { type SoldLet } from "@/components/property/SoldLetToggle";
import type { Property } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  soldProperties: Property[];
  letProperties: Property[];
}

export default function RecentlySoldLet({ soldProperties, letProperties }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [toggle, setToggle] = useState<SoldLet>("SOLD");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // With nothing let recently there's no second tab to offer, so the heading
  // goes back to plain text — same as the old site.
  const hasLettings = letProperties.length > 0;
  const properties = toggle === "SOLD" ? soldProperties : letProperties;

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

  // Swapping tabs changes the slide count, so send the carousel back to the
  // start rather than leaving it scrolled past the new end.
  useEffect(() => {
    api?.scrollTo(0);
  }, [api, toggle]);

  if (!soldProperties.length && !hasLettings) return null;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 pb-8">
        {hasLettings ? (
          <h3 className="flex items-center gap-1 text-2xl font-semibold text-primary-100 md:gap-6 lg:text-3xl">
            Recently
            <SoldLetToggle toggle={toggle} setToggle={setToggle} />
            <span className="hidden md:inline">Properties</span>
          </h3>
        ) : (
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-primary-100 lg:text-3xl">
            Recently Sold Properties
          </h3>
        )}

        <div className={cn("flex shrink-0 gap-3 pl-4", !canScrollPrev && !canScrollNext && "hidden")}>
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
        <CarouselContent
          viewportClassName="overflow-visible md:overflow-hidden"
          className="-ml-[30px] xl:-ml-[50px]"
        >
          {properties.map((property) => (
            // 1.1-up on mobile so the next card peeks (a lone card fills the
            // width), then 2 and 3 across with the gutter widening at xl.
            <CarouselItem
              key={property.id}
              className={cn(
                "pl-[30px] md:basis-1/2 xl:basis-1/3 xl:pl-[50px]",
                properties.length > 1 ? "basis-[90.9%]" : "basis-full",
              )}
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
