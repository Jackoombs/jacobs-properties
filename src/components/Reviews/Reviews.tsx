import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper/types";
import Review from "./Review";
import ReviewNavBtn from "./ReviewNavBtn";
import clsx from "clsx";

interface Props {
  color?: "standard" | "alt";
}

export default function Reviews({ color = "standard" }: Props) {
  const [swiper, setSwiper] = useState<any>(null);
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };
  return (
    <div
      className={clsx(
        "flex items-center gap-4 rounded py-8 px-4 md:rounded-lg md:py-28 lg:px-[4.5rem]",
        color === "standard" ? "bg-primary-100" : "bg-primary-200"
      )}
    >
      <ReviewNavBtn
        isStartOrEnd={isStartOrEnd}
        swiper={swiper}
        isReverse={true}
        color={color}
      />
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className="flex justify-center">
          <Review color={color} author="Example name">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor
            lorem, eleifend pharetra nibh ut, blandit placerat massa.
          </Review>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <Review color={color} author="Example name">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor
            lorem, eleifend pharetra nibh ut, blandit placerat massa.
          </Review>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <Review color={color} author="Example name">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dolor
            lorem, eleifend pharetra nibh ut, blandit placerat massa.
          </Review>
        </SwiperSlide>
      </Swiper>
      <ReviewNavBtn
        color={color}
        isStartOrEnd={isStartOrEnd}
        swiper={swiper}
        isReverse={false}
      />
    </div>
  );
}
