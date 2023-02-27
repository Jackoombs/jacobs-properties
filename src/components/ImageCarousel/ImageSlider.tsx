import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import { useState } from "react";
import ImageSliderNavBtn from "./ImageSliderNavBtn";
import clsx from "clsx";
import ImageIndexCount from "./ImageIndexCount";
import type { Image2 } from "../../env";
import { getImageFileNameFromUrl } from "../../utils";

interface Props {
  images: Image2[];
  id: string;
}

export default function ImageSlider({ images, id }: Props) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageFilenames = images.map((image) =>
    getImageFileNameFromUrl(image.url, false)
  );

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
    <div className="relative flex h-min w-full items-center justify-self-start overflow-hidden rounded-big xl:order-1 xl:max-w-[58rem]">
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
        {imageFilenames.map((imageFile, index) => (
          <SwiperSlide className="overflow-hidden" key={index}>
            <img
              src={`https://ik.imagekit.io/k6joqq39e/${id}/${imageFile}-lg.webp`}
              className={clsx(
                "z-10 aspect-property h-full w-full bg-secondary-100 object-cover object-center text-primary-100"
              )}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
