import { useEffect, useState } from "react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { SectionHeader, SectionSubHeader } from "@/components/common/Text";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  text: string;
}

interface Props {
  heading: string;
  steps: Step[];
}

export default function ProcessSteps({ heading, steps }: Props) {
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
      <div className="flex justify-between">
        <SectionHeader padding="misc">{heading}</SectionHeader>
        {/* The original greys nothing out — the arrow you can't use turns lime
            and the usable one stays navy. Keeping that inversion on purpose. */}
        <div className="flex shrink-0 gap-3 pl-4">
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
        {/* 1.1 / 2 / 3 slides with 20px then 40px gutters, at the original
            Swiper breakpoints (786px, then 1280 -> xl). */}
        {/* The original let the next card bleed past the container edge
            (Swiper's overflow-really-visible); the section clips the page. */}
        <CarouselContent viewportClassName="overflow-visible" className="-ml-5 xl:-ml-10">
          {steps.map((step, index) => (
            <CarouselItem
              key={step.title}
              className="basis-[90.9%] pl-5 min-[786px]:basis-1/2 xl:basis-1/3 xl:pl-10"
            >
              <div className="flex h-full flex-col gap-4 rounded-big bg-primary-100 px-4 py-8 md:px-8 lg:p-12">
                <p className="text-[0.875rem] font-semibold uppercase leading-[1.1] tracking-[2.8px] text-secondary-100">
                  {`step ${index + 1}`}
                </p>
                <SectionSubHeader size="lg" textColor="text-white" className="font-bold">
                  {step.title}
                </SectionSubHeader>
                <p className="text-base leading-5 text-white">{step.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
