import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import { useRef, useState } from "react";
import ImageSliderNavBtn from "./ImageSliderNavBtn";
import clsx from "clsx";
import ImageIndexCount from "./ImageIndexCount";

interface Props {
  images: string[];
  description: string;
  ID: string;
}

export default function ImageSlider({ images, description, ID }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageW = useRef<null | HTMLDivElement>(null);

  const handleSwiper = (e: SwiperType) => {
    setSwiper(e);
    setCurrentIndex(getSlideDataIndex(e));
  };

  const getSlideDataIndex = (e: SwiperType) => {
    let activeIndex = e.activeIndex;
    let slidesLen = e.slides.length;
    if (e.params.loop) {
      switch (e.activeIndex) {
        case 0:
          activeIndex = slidesLen - 3;
          break;
        case slidesLen - 1:
          activeIndex = 0;
          break;
        default:
          --activeIndex;
      }
    }
    return activeIndex;
  };

  return (
    <div
      id="target"
      ref={imageW}
      className="relative flex w-full items-center self-stretch justify-self-end overflow-hidden rounded-big xl:order-1 xl:max-w-[58rem]"
    >
      <ImageSliderNavBtn swiper={swiper} isReverse={true} />
      <ImageSliderNavBtn swiper={swiper} isReverse={false} />
      <ImageIndexCount
        currentIndex={currentIndex}
        numberOfImages={images.length}
      />
      <Swiper loop={true} onSlideChange={handleSwiper} onSwiper={handleSwiper}>
        {images.map((image, index) => (
          <SwiperSlide className="overflow-hidden" key={index}>
            <img
              loading="lazy"
              src={`https://jacobs-server.onrender.com/images/${ID}/${index}.webp`}
              className={clsx(
                "z-10 aspect-property h-auto w-full bg-blue-100 object-cover object-center",
                `w-[${imageW.current?.style.width}px]`
              )}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
