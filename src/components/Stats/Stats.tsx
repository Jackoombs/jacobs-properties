import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import CarouselNavBtn from "../General/CarouselNavBtns";
import SectionHeader from "../General/Text/SectionHeader";
import { useState } from "react";
import StatCard from "./StatCard";

interface Props {
  statType: "letting" | "selling";
}

export default function Stats({ statType }: Props) {
  const [slideStatus, setSlideStatus] = useState<
    "start" | "end" | "locked" | null
  >("start");
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  console.log(swiper?.isLocked);

  const handleSlideChange = (e: SwiperType) => {
    if (e.isLocked) setSlideStatus("locked");
    else if (e.isEnd) setSlideStatus("end");
    else if (e.isBeginning) setSlideStatus("start");
    else setSlideStatus(null);
  };

  const sellingStats = [
    {
      text: "Average of asking price achieved",
      value: 99,
      isPercent: true,
      isRounded: true,
      isPrice: false,
    },
    {
      text: "No of buyers looking",
      value: 8564,
      isPercent: false,
      isRounded: true,
      isPrice: false,
    },
    {
      text: "Average days to exchange vs industry average of circa 120",
      value: 92,
      isPercent: false,
      isRounded: true,
      isPrice: false,
    },
    {
      text: "Stars on google",
      value: 4.7,
      isPercent: false,
      isRounded: false,
      isPrice: false,
    },
  ];

  const lettingStats = [
    {
      text: "Average rent pcm",
      value: 1258,
      isPercent: false,
      isRounded: true,
      isPrice: true,
    },
    {
      text: "Increased rent vs last qtr",
      value: 3.5,
      isPercent: true,
      isRounded: false,
      isPrice: false,
    },
    {
      text: "Average yield",
      value: 5.8,
      isPercent: true,
      isRounded: false,
      isPrice: false,
    },
    {
      text: "Increase in rent vs last year",
      value: 11.2,
      isPercent: true,
      isRounded: false,
      isPrice: false,
    },
  ];

  const stats = statType === "selling" ? sellingStats : lettingStats;

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          setSwiper(swiper);
          handleSlideChange(swiper);
        }}
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
          <SectionHeader padding="misc">
            We're letting the numbers speak
          </SectionHeader>
        </div>
        <div slot="container-end">
          <CarouselNavBtn {...{ swiper, slideStatus }} />
        </div>

        {stats.map(({ text, value, isPercent, isRounded, isPrice }, index) => (
          <SwiperSlide key={index}>
            <StatCard {...{ value, isPercent, isRounded, isPrice }}>
              {text}
            </StatCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
