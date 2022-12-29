import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import Image1 from "../../assets/images/how_help_1.webp";
import SwiperNavBtns from "../General/SwiperNavBtns";
import SectionHeader from "./Text/SectionHeader";
import { useState } from "react";
import StatCard from "./StatCard";

export default function Stats() {
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };

  const stats = [
    { text: "Local market share", value: 50, isPercent: true },
    { text: "Success rate", value: 73, isPercent: true },
    { text: "Average days to sell", value: 34, isPercent: false },
    { text: "Sale price achieved", value: 97, isPercent: true },
    { text: "Number of gangster employers", value: 0, isPercent: false },
  ];

  return (
    <>
      <Swiper
        className="flex flex-col"
        slidesPerView={1}
        spaceBetween={20}
        onSlideChange={handleSlideChange}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 55,
          },
          // 2000: {
          //   slidesPerView: 4,
          // },
        }}
      >
        <div
          slot="container-start"
          className="flex items-start justify-between"
        >
          <SectionHeader
            padding="misc"
            text="We're letting the numbers speak"
          />
        </div>
        <div slot="container-end">
          <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
        </div>

        {stats.map(({ text, value, isPercent }, index) => (
          <SwiperSlide key={index}>
            <StatCard {...{ index, text, value, isPercent }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
