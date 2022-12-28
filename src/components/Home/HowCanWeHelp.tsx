import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import Image1 from "../../assets/images/how_help_1.webp";
import SwiperNavBtns from "../General/SwiperNavBtns";
import SectionHeader from "../General/Text/SectionHeader";
import SectionSubHeader from "../General/Text/SectionSubHeader";
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
        className="overflow-really-visible flex flex-col gap-9 lg:gap-[4.5rem]"
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
            spaceBetween: 64,
          },
          2000: {
            slidesPerView: 4,
            spaceBetween: 64,
          },
        }}
      >
        <div slot="container-start" className="flex justify-between">
          <SectionHeader text="How can we help?" />
          <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
        </div>

        {slides.map(({ title, bgSrc, link }, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-[1.17/1] overflow-hidden rounded-big">
              <a
                href={link}
                style={{
                  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgSrc.src})`,
                }}
                className="block h-full w-full bg-cover bg-bottom duration-100 hover:scale-105"
              >
                <SectionSubHeader
                  size="lg"
                  text={title}
                  textColor="text-white"
                  addClasses="absolute bottom-10 left-8"
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
