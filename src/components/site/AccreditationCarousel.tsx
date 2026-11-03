import { useEffect, useState } from "react";
import { SliderChevron } from "@/components/common/FilledIcons";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import Ombudsman from "@/assets/footer/ombudsman.webp";
import Tsi from "@/assets/footer/tsi.webp";
import Arla from "@/assets/footer/arla.webp";
import Tds from "@/assets/footer/tds.webp";
import Guild from "@/assets/footer/guild.webp";
import Rightmove from "@/assets/footer/rightmove.webp";
import Zoopla from "@/assets/footer/zoopla.webp";

const logos = [
  { src: Ombudsman.src, alt: "Ombudsman logo", ratio: 2.88 },
  { src: Tsi.src, alt: "Trading standards logo", ratio: 2 },
  { src: Guild.src, alt: "Property guild logo", ratio: 2.72 },
  { src: Tds.src, alt: "Tenancy Deposit Scheme logo", ratio: 2.35 },
  { src: Arla.src, alt: "Arla logo", ratio: 2.74 },
  { src: Rightmove.src, alt: "Rightmove logo", ratio: 4.91 },
  { src: Zoopla.src, alt: "Zoopla logo", ratio: 5.55 },
];

// On phones the logos sit in two rows that slide sideways together. The rows
// fill left to right, so the first column is logos 1 and 5, the second 2 and 6.
// Every card in a row is as tall as that row's tallest logo (the lowest aspect
// ratio) plus its 2.5rem of padding top and bottom, so the rows line up.
const columnCount = Math.ceil(logos.length / 2);
const rows = [logos.slice(0, columnCount), logos.slice(columnCount)];
const rowRatio = rows.map((row) => Math.min(...row.map((logo) => logo.ratio)));
const columns = Array.from({ length: columnCount }, (_, index) =>
  rows.flatMap((row, rowIndex) => (row[index] ? [{ logo: row[index], rowIndex }] : [])),
);

type Logo = (typeof logos)[number];

function LogoCard({ logo, minHeight }: { logo: Logo; minHeight?: string }) {
  return (
    <div
      className="flex h-full items-center justify-center rounded-big bg-[#1A3D66] py-10 lg:bg-transparent"
      style={{ minHeight }}
    >
      <img
        loading="lazy"
        src={logo.src}
        alt={logo.alt}
        className="w-[var(--logo-w)]"
        style={{ aspectRatio: `${logo.ratio} / 1` }}
      />
    </div>
  );
}

function NavButtons({ api, className }: { api: CarouselApi | undefined; className?: string }) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!api) return null;

  return (
    <div className={cn("flex gap-3", className)}>
      <button type="button" onClick={() => api.scrollPrev()} aria-label="Previous">
        <SliderChevron
          className={cn("size-[1.875rem] rotate-180 duration-75", canPrev ? "text-white" : "text-secondary-100")}
        />
      </button>
      <button type="button" onClick={() => api.scrollNext()} aria-label="Next">
        <SliderChevron className={cn("size-[1.875rem] duration-75", canNext ? "text-white" : "text-secondary-100")} />
      </button>
    </div>
  );
}

/**
 * The accreditation logos above the footer links, at the original's Swiper
 * breakpoints: two rows of 1.5 columns on phones, then 2.2, 3 and 4 across at
 * 768, 1024 and 1280px. The 16px gutter between slides disappears from 1024px.
 */
export default function AccreditationCarousel() {
  const [wideApi, setWideApi] = useState<CarouselApi>();
  const [narrowApi, setNarrowApi] = useState<CarouselApi>();

  return (
    <div className="[--logo-w:10rem] sm:[--logo-w:15rem]">
      <div className="md:hidden">
        <Carousel setApi={setNarrowApi} opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {columns.map((column) => (
              <CarouselItem key={column[0].logo.alt} className="basis-2/3 pl-4">
                <div className="flex h-full flex-col gap-4">
                  {column.map(({ logo, rowIndex }) => (
                    <LogoCard
                      key={logo.alt}
                      logo={logo}
                      minHeight={`calc(var(--logo-w) / ${rowRatio[rowIndex]} + 5rem)`}
                    />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <NavButtons api={narrowApi} className="py-6" />
      </div>

      <div className="hidden md:block">
        <NavButtons api={wideApi} className="hidden justify-end py-6 lg:flex" />
        <Carousel setApi={setWideApi} opts={{ align: "start" }}>
          <CarouselContent className="-ml-4 lg:ml-0">
            {logos.map((logo) => (
              <CarouselItem key={logo.alt} className="basis-[45.4545%] pl-4 lg:basis-1/3 lg:pl-0 xl:basis-1/4">
                <LogoCard logo={logo} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <NavButtons api={wideApi} className="py-6 lg:hidden" />
      </div>

      <hr className="border-t-2 border-[#e5e7eb]" />
    </div>
  );
}
