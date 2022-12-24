import Background from "../../../assets/images/background.webp";
import Background2 from "../../../assets/images/background_2.webp";
import Home1 from "../../../assets/images/home_1.webp";
import Home2 from "../../../assets/images/home_2.webp";
import Link from "../../General/Link";
import Copy from "../../General/Text/Copy";
import PageHeader from "../../General/Text/PageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import type { Swiper as SwiperType } from "swiper/types";
import BackgroundSlide from "./BackgroundSlide";

import "swiper/css";
import "swiper/css/effect-fade";
import { useState } from "react";
import BannerNav from "./BannerNav";

export default function Banner() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  interface Background {
    backgroundSrc: ImageMetadata;
    objectFit: string;
  }
  const backGrounds: Background[] = [
    {
      backgroundSrc: Background,
      objectFit: "center",
    },
    {
      backgroundSrc: Background2,
      objectFit: "80% 0%",
    },
  ];

  return (
    <section className="top-0 -z-10 grid h-screen w-screen grid-rows-[1fr_auto_auto] lg:grid-rows-[1fr_auto_1fr]">
      <div className="row-start-2 mx-auto w-full max-w-container-lg self-center pb-11 lg:pb-0">
        <div className="mx-auto flex flex-col gap-8 text-white md:mx-0 lg:max-w-[44rem]">
          <PageHeader
            text="A people-first estate agent in Basingstoke"
            textColor="text-white"
          />

          <Copy
            text="Jacobs Properties is a family-run estate and letting agency in Basingstoke, helping people in and around the area with all things property."
            size="lg"
            textColor="text-white"
          />
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-start">
            <Link link="/" text="Instant Valuation" type="white" size="lg" />
            <Link link="/" text="Expert Valuation" type="secondary" size="lg" />
          </div>
        </div>
      </div>
      <BannerNav
        activeIndex={activeIndex}
        swiper={swiper}
        imageLength={backGrounds.length}
      />
      <div className="absolute top-0  right-0 -z-10 h-screen w-screen">
        <Swiper
          onSwiper={(e) => setSwiper(e)}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 3000 }}
          speed={800}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
        >
          {backGrounds.map((background, index) => (
            <SwiperSlide key={index}>
              <BackgroundSlide
                objectFit={background.objectFit}
                backgroundSrc={background.backgroundSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
