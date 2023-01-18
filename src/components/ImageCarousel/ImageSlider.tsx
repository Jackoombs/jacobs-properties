import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import { useState } from "react";
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
      className="relative flex h-min w-full items-center justify-self-end overflow-hidden rounded-big xl:order-1 xl:max-w-[58rem]"
    >
      <ImageSliderNavBtn swiper={swiper} isReverse={true} />
      <ImageSliderNavBtn swiper={swiper} isReverse={false} />
      <ImageIndexCount
        currentIndex={currentIndex}
        numberOfImages={images.length}
      />
      <Swiper
        spaceBetween={2}
        onSlideChange={handleSwiper}
        onSwiper={handleSwiper}
      >
        {images.map((image, index) => (
          <SwiperSlide className="overflow-hidden" key={index}>
            <img
              src={`https://ik.imagekit.io/wd8wdr96s/tr:w-825,h-550/${ID}/${index}.webp`}
              className={clsx(
                "z-10 aspect-property h-full w-full bg-secondary-100 object-cover object-center text-primary-100 hover:brightness-110"
              )}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
