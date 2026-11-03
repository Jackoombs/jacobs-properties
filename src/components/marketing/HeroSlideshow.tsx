import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt?: string;
  /** CSS object-position, e.g. "68% 0" to anchor the crop to the top. */
  focalPosition?: string;
}

interface Props {
  slides: HeroSlide[];
}

/**
 * The rotating background behind the home page hero, with its dots. The hero
 * copy is a static Astro sibling on top; the dots take the section's last grid
 * row (this island renders no wrapper element, so they are grid children).
 */
export default function HeroSlideshow({ slides }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, watchDrag: false },
    // Matches the original site's timing: 3s hold, long crossfade.
    [Autoplay({ delay: 3000, stopOnInteraction: false }), Fade()],
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={slide.src}>
              <img
                src={slide.src}
                alt={slide.alt ?? ""}
                // The first slide is the LCP image, so it loads eagerly while
                // the rest wait — they aren't visible for 3s anyway.
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.focalPosition || "center" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* The flat 25% darkening the original laid over every slide. */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      {slides.length > 1 && (
        <div className="relative row-start-3 mx-auto hidden w-full max-w-container-lg self-end pb-10 md:block xl:pb-20">
          <div className="flex">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                onClick={() => scrollTo(index)}
                className="p-2"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === selected}
              >
                <div
                  className={cn(
                    "size-[14px] rounded-full duration-[800ms]",
                    index === selected ? "bg-white" : "bg-[#797875]",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
