import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdOutlineArrowForwardIos } from "react-icons/md/index.js";
import Image1 from "../../assets/images/how_help_1.jpg";
import clsx from "clsx";

export default function HowCanWeHelp() {
  const sliderRef = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slideNext();
  }, []);

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
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold text-primary-100 lg:text-3xl">
          How can we help?
        </h3>
        <div className={clsx("gap-4 text-3xl", isLocked ? "hidden" : "flex")}>
          <button onClick={handlePrev}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "rotate-180 duration-75",
                currentIndex > 0 ? "text-primary-100" : "text-secondary-100"
              )}
            />
          </button>
          <button
            className={clsx(
              "duration-75",
              sliderRef.current?.swiper.isEnd
                ? "text-secondary-100"
                : "text-primary-100"
            )}
            onClick={handleNext}
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>
      <div>
        <div className="relative">
          <Swiper
            ref={sliderRef}
            slidesPerView={1.1}
            spaceBetween={20}
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
            onSwiper={(swiper) =>
              swiper.isLocked ? setIsLocked(true) : undefined
            }
            onSlideChange={(e) => setCurrentIndex(e.activeIndex)}
          >
            {slides.map(({ title, bgSrc, link }, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-80 overflow-hidden rounded-xl lg:h-96 ">
                  <a
                    href={link}
                    style={{
                      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgSrc})`,
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
        </div>
      </div>
    </>
  );
}
