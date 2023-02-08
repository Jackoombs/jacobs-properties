import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import CarouselNavBtns from "../General/CarouselNavBtns";
import SectionHeader from "../General/Text/SectionHeader";
import { useState } from "react";
import Jon from "../../assets/images/jon-coombs.png";
import NewsCard from "./NewsCard";

export type newsCardType = {
  title: string;
  category: string;
  date: string;
  image: string;
};

interface Props {
  newsTemplate: newsCardType[];
}

export default function newsSlider({ newsTemplate }: Props) {
  const [slideStatus, setSlideStatus] = useState<
    "start" | "end" | "locked" | null
  >("start");
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setSlideStatus("start");
    else if (e.isEnd) setSlideStatus("end");
    else if (e.isLocked) setSlideStatus("locked");
    else setSlideStatus(null);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <SectionHeader padding="misc">
          Read the latest property news
        </SectionHeader>
        <CarouselNavBtns swiper={swiper} slideStatus={slideStatus} />
      </div>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
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
        {newsTemplate.map(({ title, category, image, date }) => (
          <SwiperSlide key={title}>
            <NewsCard {...{ title, category, image, date }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
