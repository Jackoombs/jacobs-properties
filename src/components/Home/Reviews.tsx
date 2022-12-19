import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { Controller } from "swiper";
import Review from "./Review";
import ReviewNavBtn from "./ReviewNavBtn";

export default function Reviews() {
  const [swiper, setSwiper] = useState<any>(null);
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };
  return (
    <div className="flex items-center gap-4 rounded bg-primary-100 py-8 px-4 md:rounded-lg md:py-section lg:px-[4.5rem]">
      <ReviewNavBtn
        isStartOrEnd={isStartOrEnd}
        swiper={swiper}
        isReverse={true}
      />
      <Swiper
        onSwiper={setSwiper}
        className="flex flex-col lg:flex-row"
        slidesPerView={1}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <Review
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor lorem, eleifend pharetra nibh ut, blandit placerat massa."
            author="Example name"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Review
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor lorem, eleifend pharetra nibh ut, blandit placerat massa."
            author="Example name"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Review
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor lorem, eleifend pharetra nibh ut, blandit placerat massa."
            author="Example name"
          />
        </SwiperSlide>
      </Swiper>
      <ReviewNavBtn
        isStartOrEnd={isStartOrEnd}
        swiper={swiper}
        isReverse={false}
      />
    </div>
  );
}
