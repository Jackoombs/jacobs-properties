import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Image2 } from "../../env";
import { getImageFileNameFromUrl } from "../../utils";
import ScreenModal from "../Layout/ScreenModal";
import type { Swiper as SwiperType } from "swiper/types";
import { EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import ImageSliderNavBtn from "../ImageCarousel/ImageSliderNavBtn";

interface Props {
  images: Image2[];
  id: string;
}

export default function Gallery({ images, id }: Props) {
  const imageFilenames = images.map((image) =>
    getImageFileNameFromUrl(image.url, false)
  );
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index: number) => {
    setIsOpen(true);
    setActiveIndex(index);
  };

  return (
    <>
      <div className="grid w-max max-w-full gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {imageFilenames.map((imageFile, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="overflow-hidden rounded-lg"
          >
            <img
              src={`https://ik.imagekit.io/k6joqq39e/${id}/${imageFile}-lg.webp`}
              alt=""
              className="duration-300 hover:scale-110"
            />
          </button>
        ))}
      </div>

      <ScreenModal
        variant="primary-200"
        className="flex flex-col"
        {...{ isOpen, setIsOpen }}
      >
        <div className="relative mx-auto flex w-full max-w-container-lg flex-1 items-center justify-center">
          <Swiper
            initialSlide={activeIndex}
            onSwiper={(e) => setSwiper(e)}
            onSlideChange={(e) => setActiveIndex(e.activeIndex)}
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
            speed={200}
            navigation
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.url} className="mx-auto w-full sm:w-8/12" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute left-0 flex h-full w-full items-center justify-between">
            <ImageSliderNavBtn variant="primary" swiper={swiper} isReverse />
            <ImageSliderNavBtn
              variant="primary"
              swiper={swiper}
              isReverse={false}
            />
          </div>
        </div>
      </ScreenModal>
    </>
  );
}
