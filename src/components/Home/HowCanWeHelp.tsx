import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import Image1 from "../../assets/images/how_help_1.jpg";
import SwiperNavBtns from "../General/SwiperNavBtns";
import SubHeader from "../General/SubHeader";
import { useState } from "react";

export default function HowCanWeHelp() {
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };

  const slides = [
    {
      title: "Buyers",
      bgSrc: Image1,
      imageAlt: "",
      link: "/",
    },
    {
      title: "Sellers",
      bgSrc: Image1,
      imageAlt: "",
      link: "/",
    },
    {
      title: "Landlords",
      bgSrc: Image1,
      imageAlt: "",
      link: "/",
    },
    {
      title: "Tenants",
      bgSrc: Image1,
      imageAlt: "",
      link: "/",
    },
    {
      title: "Developers",
      bgSrc: Image1,
      imageAlt: "",
      link: "/",
    },
  ];

  return (
    <>
      <Swiper
        className="overflow-really-visible flex flex-col gap-8 md:gap-16"
        slidesPerView={1.1}
        spaceBetween={20}
        onSlideChange={handleSlideChange}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          2000: {
            slidesPerView: 4,
          },
        }}
      >
        <div slot="container-start" className="flex justify-between">
          <SubHeader text="How can we help?" />
          <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
        </div>

        {slides.map(({ title, bgSrc, link }, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-80 overflow-hidden rounded-xl lg:h-96 ">
              <a
                href={link}
                style={{
                  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgSrc.src})`,
                }}
                className="block h-full w-full bg-cover bg-bottom duration-100 hover:scale-105"
              >
                <h4 className="absolute bottom-10 left-8 text-3xl font-semibold text-white">
                  {title}
                </h4>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
