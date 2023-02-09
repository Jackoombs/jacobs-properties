import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import Ombudsman from "../../assets/images/footer/ombudsman.webp";
import PropertyMark from "../../assets/images/footer/propertymark.webp";
import Rightmove from "../../assets/images/footer/rightmove.webp";
import Zoopla from "../../assets/images/footer/zoopla.webp";
import { useState } from "react";
import CarouselNavBtns from "../General/CarouselNavBtns";

export default function AccrediationSlider() {
  const [slideStatus, setSlideStatus] = useState<
    "start" | "end" | "locked" | null
  >("start");
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const handleSlideChange = (e: SwiperType) => {
    if (e.isLocked) setSlideStatus("locked");
    else if (e.isBeginning) setSlideStatus("start");
    else if (e.isEnd) setSlideStatus("end");
    else setSlideStatus(null);
    console.log(e.isLocked);
  };

  return (
    <div>
      <CarouselNavBtns
        variant="secondary"
        swiper={swiper}
        slideStatus={slideStatus}
        className="hidden justify-end py-6 lg:flex"
      />
      <Swiper
        className="lg:pb-6"
        onSwiper={(swiper) => {
          setSwiper(swiper);
          handleSlideChange(swiper);
        }}
        onSlideChange={handleSlideChange}
        spaceBetween={16}
        modules={[Grid]}
        slidesPerView={1.5}
        grid={{ rows: 2, fill: "row" }}
        breakpoints={{
          768: {
            slidesPerView: 2.2,
            grid: {
              rows: 1,
            },
          },
          1024: {
            slidesPerView: 3,
            grid: {
              rows: 1,
            },
            spaceBetween: 0,
          },
          1280: {
            slidesPerView: 4,
            grid: {
              rows: 1,
            },
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide className="swiper-same-height flex h-auto w-full items-center justify-center rounded-big bg-[#1A3D66] py-10 lg:bg-transparent">
          <img
            loading="lazy"
            src={Ombudsman.src}
            alt="Ombudsman logo"
            className="aspect-[2.88/1] w-60"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-same-height flex h-auto w-full items-center justify-center rounded-big bg-[#1A3D66] py-10 lg:bg-transparent">
          <img
            loading="lazy"
            src={PropertyMark.src}
            alt="PropertyMark logo"
            className="aspect-[2.74/1] w-60"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-same-height flex h-auto w-full items-center justify-center rounded-big bg-[#1A3D66] py-10 lg:bg-transparent">
          <img
            loading="lazy"
            src={Rightmove.src}
            alt="rightmove logo"
            className="aspect-[4.91/1] w-60"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-same-height flex h-auto w-full items-center justify-center rounded-big bg-[#1A3D66] py-10 lg:bg-transparent">
          <img
            loading="lazy"
            src={Zoopla.src}
            alt="zoopla logo"
            className="aspect-[5.55/1] w-60"
          />
        </SwiperSlide>
      </Swiper>
      <CarouselNavBtns
        variant="secondary"
        swiper={swiper}
        slideStatus={slideStatus}
        className="py-6 lg:hidden"
      />
      <hr className="border-t-[2px]" />
    </div>
  );
}
