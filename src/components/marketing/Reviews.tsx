import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Review {
  author: string;
  quote: string;
}

interface Props {
  reviews: Review[];
  variant?: "standard" | "alt";
}

export default function Reviews({ reviews, variant = "standard" }: Props) {
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

  const isAlt = variant === "alt";

  /**
   * Round arrows either side of the quote, desktop only. Enabled reads as a
   * lime disc with a navy arrow; at either end the disc drops away and only
   * the arrow remains.
   */
  const NavButton = ({ direction }: { direction: "prev" | "next" }) => {
    const enabled = direction === "prev" ? canScrollPrev : canScrollNext;
    return (
      <button
        type="button"
        aria-label={direction === "prev" ? "Previous review" : "Next review"}
        onClick={() => (direction === "prev" ? api?.scrollPrev() : api?.scrollNext())}
        disabled={!enabled}
        className={cn(
          "hidden min-h-[3.5rem] min-w-[3.5rem] shrink-0 items-center justify-center rounded-full duration-150 md:flex",
          direction === "prev" && "rotate-180",
          enabled ? "bg-secondary-100" : "cursor-default",
        )}
      >
        <ArrowRight
          className={cn(
            "size-6 duration-150",
            enabled || isAlt ? "text-primary-100" : "text-white",
          )}
        />
      </button>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 rounded px-4 py-8 md:rounded-[0.5rem] md:py-28 lg:px-[4.5rem]",
        isAlt ? "bg-primary-200" : "bg-primary-100",
      )}
    >
      <div className="flex h-full w-full items-center gap-4">
        <NavButton direction="prev" />

        <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full min-w-0">
          {/* The original's Swiper used spaceBetween={30}; the carousel's
              default 16px gutter would show as a tighter gap mid-swipe. */}
          <CarouselContent className="-ml-[1.875rem]">
            {reviews.map((review) => (
              <CarouselItem key={review.author} className="flex justify-center pl-[1.875rem]">
                <div
                  className={cn(
                    "flex max-w-3xl flex-col gap-6 md:items-center",
                    isAlt ? "text-primary-100" : "text-white",
                  )}
                >
                  <div className="flex gap-1 text-secondary-100">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="size-[1.125rem]" fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="text-xl font-medium md:max-w-[51.25rem] md:text-center md:leading-10 lg:text-[2rem]">
                    {review.quote}
                  </p>
                  {/* Tailwind 3's text-base pinned line-height to 1.5rem; in 4 it is a
                      ratio, so without leading-6 the name grows to 30px at lg. */}
                  <p className="font-harm text-base leading-6 lg:text-[1.25rem]">{review.author}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <NavButton direction="next" />
      </div>

      {/* Mobile gets plain chevrons underneath instead of the flanking discs. */}
      <div className="flex gap-3 pt-2 md:hidden">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
        >
          <SliderChevron
            className={cn(
              "size-[1.875rem] rotate-180 duration-75",
              !canScrollPrev ? "text-secondary-100" : isAlt ? "text-primary-100" : "text-white",
            )}
          />
        </button>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
        >
          <SliderChevron
            className={cn(
              "size-[1.875rem] duration-75",
              !canScrollNext ? "text-secondary-100" : isAlt ? "text-primary-100" : "text-white",
            )}
          />
        </button>
      </div>
    </div>
  );
}
