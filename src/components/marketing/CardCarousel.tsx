import { Children, useEffect, useState } from "react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/common/Text";
import { cn } from "@/lib/utils";

interface Props {
  heading: string;
  /** Slide width per breakpoint, e.g. "basis-[90.9%] min-[786px]:basis-1/2 xl:basis-1/3". */
  itemClassName: string;
  /** Extra classes for the sliding track, e.g. a wider gutter at large widths. */
  contentClassName?: string;
  /** Replaces the clipping viewport's classes, e.g. "overflow-visible" to let the next card bleed. */
  viewportClassName?: string;
  children: React.ReactNode;
}

/**
 * The original's team and news sliders: heading with prev/next arrows on the
 * right, cards beneath. Slides peek at 1.1 up on mobile, and the gutter widens
 * from 20px to 40px at xl. Unlike ProcessSteps the next card doesn't bleed past
 * the container — the original's Swiper clipped these.
 */
export default function CardCarousel({
  heading,
  itemClassName,
  contentClassName,
  viewportClassName,
  children,
}: Props) {
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

  return (
    <div>
      <div className="flex items-start justify-between">
        <SectionHeader padding="misc">{heading}</SectionHeader>
        {/* Hidden when every card already fits, so there is no dead arrow. */}
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
        <CarouselContent
          viewportClassName={viewportClassName}
          className={cn("-ml-5 xl:-ml-10", contentClassName)}
        >
          {Children.map(children, (child) => (
            <CarouselItem className={cn("pl-5 xl:pl-10", itemClassName)}>{child}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
