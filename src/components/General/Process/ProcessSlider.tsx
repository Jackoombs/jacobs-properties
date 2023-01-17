import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import SwiperNavBtns from "../../General/SwiperNavBtns";
import SectionHeader from "../../General/Text/SectionHeader";
import { useState } from "react";
import ProcessCard from "./ProcessCard";

interface Props {
  header: string;
  slides: {
    title: string;
    text: string;
  }[];
}

export default function ProcessSlider({ header, slides }: Props) {
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };

  return (
    <>
      <Swiper
        className="overflow-really-visible"
        slidesPerView={1.1}
        spaceBetween={20}
        onSlideChange={handleSlideChange}
        breakpoints={{
          786: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        <div slot="container-start" className="flex justify-between">
          <SectionHeader padding="misc">{header}</SectionHeader>
          <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
        </div>
        {slides.map(({ title, text }, index) => (
          <SwiperSlide className="swiper-same-height" key={index}>
            <ProcessCard {...{ title, text, index }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
