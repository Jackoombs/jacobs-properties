import { useEffect, useRef, useState } from "react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/common/Text";
import { priceNumberToPriceString } from "@/lib/property-utils";
import { cn } from "@/lib/utils";

interface Stat {
  text: string;
  value: number;
  isPercent: boolean;
  isRounded: boolean;
  isPrice: boolean;
}

// Hardcoded in the original too — these aren't CMS-managed.
const SELLING_STATS: Stat[] = [
  { text: "Average of asking price achieved", value: 99, isPercent: true, isRounded: true, isPrice: false },
  { text: "No of buyers looking", value: 8564, isPercent: false, isRounded: true, isPrice: false },
  {
    text: "Average days to exchange vs industry average of circa 120",
    value: 92,
    isPercent: false,
    isRounded: true,
    isPrice: false,
  },
  { text: "Stars on google", value: 4.7, isPercent: false, isRounded: false, isPrice: false },
];

const LETTING_STATS: Stat[] = [
  { text: "Average rent pcm", value: 1258, isPercent: false, isRounded: true, isPrice: true },
  { text: "Increased rent vs last qtr", value: 3.5, isPercent: true, isRounded: false, isPrice: false },
  { text: "Average yield", value: 5.8, isPercent: true, isRounded: false, isPrice: false },
  { text: "Increase in rent vs last year", value: 11.2, isPercent: true, isRounded: false, isPrice: false },
];

function format({ isPercent, isRounded, isPrice }: Stat, current: number) {
  const rounded = isRounded ? Math.round(current) : Math.round(current * 10) / 10;
  const text = isPrice ? priceNumberToPriceString(rounded) : rounded.toLocaleString("en-US");
  return isPercent ? `${text}%` : text;
}

function StatCard({ stat }: { stat: Stat }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Count up once, when the card first scrolls into view — the original
  // started on mount, which meant it had usually finished before you saw it.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 2000;
        const interval = 100;
        const steps = duration / interval;
        const id = setInterval(() => setCurrent((old) => old + stat.value / steps), interval);
        setTimeout(() => {
          clearInterval(id);
          setCurrent(stat.value);
        }, duration);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div ref={ref} className="flex flex-col justify-between rounded-[0.5rem] pb-12 text-primary-100">
      <div className="flex h-full flex-col justify-center gap-10">
        <p className="text-[6.25rem] font-bold leading-[6rem]">{format(stat, current)}</p>
        <p className="max-w-xs font-harm text-[1.25rem] font-medium">{stat.text}</p>
      </div>
    </div>
  );
}

interface Props {
  statType: "selling" | "letting";
}

export default function Stats({ statType }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const stats = statType === "selling" ? SELLING_STATS : LETTING_STATS;

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
        <SectionHeader padding="misc">We&rsquo;re letting the numbers speak</SectionHeader>
      </div>
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        {/* 1 / 2 / 3 / 4 across with a 20px gutter widening to 55px, as the
            original Swiper breakpoints (768, 1024, 1280). */}
        <CarouselContent className="-ml-5 xl:-ml-[55px]">
          {stats.map((stat) => (
            <CarouselItem
              key={stat.text}
              className="basis-full pl-5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 xl:pl-[55px]"
            >
              <StatCard stat={stat} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Nav sits below the track here, and keeps the original's inversion:
          the arrow you can't use goes lime. Hidden entirely when every stat
          already fits, matching Swiper's locked state. */}
      <div className={cn("flex gap-3", !canScrollPrev && !canScrollNext && "hidden")}>
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
  );
}
