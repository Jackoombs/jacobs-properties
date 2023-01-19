import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import CarouselNavBtns from "../General/CarouselNavBtns";
import SectionHeader from "../General/Text/SectionHeader";
import { useState } from "react";
import TeamCard from "./TeamCard";
import Jon from "../../assets/images/jon-coombs.png";

export type TeamCardType = {
  name: string;
  role: string;
  imagePath: string;
  linkedInLink?: string;
};

export default function TeamSlider() {
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

  const teamTemplate: TeamCardType[] = [
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
    {
      name: "Jon Coombs",
      role: "Managing Director",
      imagePath: Jon.src,
      linkedInLink: "",
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <SectionHeader padding="misc">
          The team behind Jacobs Property
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
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {teamTemplate.map(({ name, role, imagePath, linkedInLink }, index) => (
          <SwiperSlide key={index}>
            <TeamCard {...{ name, role, imagePath, linkedInLink }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
