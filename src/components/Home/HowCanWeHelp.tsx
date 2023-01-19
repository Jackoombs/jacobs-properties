import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import Image1 from "../../assets/images/how_help_1.webp";
import CarouselNavBtns from "../General/CarouselNavBtns";
import SectionHeader from "../General/Text/SectionHeader";
import SectionSubHeader from "../General/Text/SectionSubHeader";
import { useState } from "react";

export default function HowCanWeHelp() {
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
      <div className="flex items-start justify-between">
        <SectionHeader padding="misc">The latest property news</SectionHeader>
        <CarouselNavBtns swiper={swiper} slideStatus={slideStatus} />
      </div>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
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
                  textColor="text-white"
                  className="absolute bottom-10 left-8"
                >
                  {title}
                </SectionSubHeader>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
