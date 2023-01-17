import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperNavBtns from "../General/SwiperNavBtns";
import PropertyCard from "./PropertyCard";
import SectionHeader from "../General/Text/SectionHeader";

import type { Swiper as SwiperType } from "swiper/types";
import type { Property } from "../../env";

interface Props {
  header: string;
  properties: Property[];
}

export default function PropertySlider({ header, properties }: Props) {
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };

  return (
    <>
      <Swiper
        onLock={() => setIsStartOrEnd("lock")}
        onUnlock={() => setIsStartOrEnd("start")}
        slidesPerView={1.1}
        spaceBetween={30}
        onSlideChange={handleSlideChange}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="md:16 overflow-really-visible-mobile flex flex-col gap-8"
        onSwiper={handleSlideChange}
      >
        <div slot="container-start" className="flex justify-between">
          <SectionHeader>{header}</SectionHeader>
          <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
        </div>
        {properties.map(
          (
            {
              Address1,
              Address2,
              ID,
              PriceString,
              InternalLettingStatus,
              InternalSaleStatus,
            }: Property,
            index
          ) => (
            <SwiperSlide key={index}>
              <PropertyCard
                status={
                  InternalLettingStatus
                    ? InternalLettingStatus
                    : InternalSaleStatus
                }
                {...{ Address1, Address2, ID, PriceString }}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
}
