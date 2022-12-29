import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import Image1 from "../../assets/images/how_help_1.webp";
import SwiperNavBtns from "../General/SwiperNavBtns";
import SectionHeader from "../General/Text/SectionHeader";
import SectionSubHeader from "../General/Text/SectionSubHeader";
import { useState } from "react";
import ProcessCard from "../ProcessCard";

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
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1700: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          2000: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        <div slot="container-start" className="flex justify-between">
          <SectionHeader text={header} padding="misc" />
          <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
        </div>
        {slides.map(({ title, text }, index) => (
          <SwiperSlide key={index}>
            <ProcessCard {...{ title, text, index }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
