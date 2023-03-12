import Background from "../../../assets/images/home/background.webp";
import Background2 from "../../../assets/images/home/background_2.webp";
import Background3 from "../../../assets/images/home/background_3.webp";
import Background4 from "../../../assets/images/home/background_4.webp";
import Background5 from "../../../assets/images/home/background_5.webp";
import InstantValuationButton from "../../Form/InstantValuation/Button";
import ExpertValuationButton from "../../Form/ExpertValuation/Button";
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
      backgroundSrc: Background2,
      objectFit: "68% 0",
    },
    {
      backgroundSrc: Background3,
      objectFit: "85% 0",
    },
    {
      backgroundSrc: Background4,
      objectFit: "78% 0",
    },
    {
      backgroundSrc: Background5,
      objectFit: "76% 0",
    },
  ];

  return (
    <section className="top-0 -z-10 grid h-[100svh] w-screen grid-rows-[1fr_auto_auto] lg:grid-rows-[1fr_auto_1fr]">
      <div className="row-start-2 mx-auto w-full max-w-container-lg self-center pb-11 lg:pb-0">
        <div className="mx-auto flex flex-col text-white md:mx-0 md:max-w-[40rem] xl:max-w-[48rem]">
          <PageHeader textColor="text-white" padding="hero">
            A people-first estate agent in Basingstoke & Surrounding Villages
          </PageHeader>
          <Copy
            size="lg"
            textColor="text-white"
            className="pb-8 md:max-w-xl"
            padding="hero-lg"
          >
            Jacobs Properties is a independent family-run estate and letting
            agency in Basingstoke, delivering exceptional results and providing
            solutions for all things property.
          </Copy>
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-start">
            <InstantValuationButton size="lg" variant="white">
              Instant Valuation
            </InstantValuationButton>
            <ExpertValuationButton size="lg" variant="secondary">
              Expert Valuation
            </ExpertValuationButton>
          </div>
        </div>
      </div>
      <BannerNav
        activeIndex={activeIndex}
        swiper={swiper}
        imageLength={backGrounds.length}
      />
      <div className="absolute top-0 right-0 -z-10 h-[100svh] w-screen">
        <Swiper
          onSwiper={(e) => setSwiper(e)}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 3000 }}
          speed={2000}
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
