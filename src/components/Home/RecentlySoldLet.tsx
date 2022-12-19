import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperNavBtns from "../General/SwiperNavBtns";
import PropertyCard from "../General/PropertyCard";
import SoldLetToggle from "../General/SoldLetToggle";

import type { Swiper as SwiperType } from "swiper/types";
import type { Property } from "../../env";

export default function RecentlySoldLet() {
  const [recentlySold, setRecentlySold] = useState<Property[]>([]);
  const [recentlyLet, setRecentlyLet] = useState<Property[]>([]);
  const [isStartOrEnd, setIsStartOrEnd] = useState("start");
  const [toggle, setToggle] = useState("SOLD");

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setIsStartOrEnd("start");
    else if (e.isEnd) setIsStartOrEnd("end");
    else setIsStartOrEnd("");
  };

  useEffect(() => {
    const fetchProperties = async (
      category: string,
      setState: React.Dispatch<React.SetStateAction<Property[]>>
    ) => {
      const res = await fetch(
        `https://jacobs-server.onrender.com/properties/${category}`
      );
      const data = await res.json();
      setState(
        data
          .filter(
            (property: Property) =>
              property.InternalSaleStatus !== "For Sale - Available" &&
              property.InternalLettingStatus !== "To Let - Available"
          )
          .sort(function (a: Property, b: Property) {
            return (
              (new Date(b.TimeAmended) as any) -
              (new Date(a.TimeAmended) as any)
            );
          })
      );
    };
    fetchProperties("sales", setRecentlySold);
    fetchProperties("lettings", setRecentlyLet);
  }, []);

  return (
    <>
      {recentlySold.length > 0 && (
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
            <h3 className="flex items-center gap-1 text-2xl font-semibold text-primary-100 md:gap-6 lg:text-3xl">
              Recently {<SoldLetToggle {...{ toggle, setToggle }} />}
              <p className="hidden md:inline">Properties</p>
            </h3>
            <SwiperNavBtns isStartOrEnd={isStartOrEnd} />
          </div>
          {[...(toggle === "SOLD" ? recentlySold : recentlyLet)].map(
            ({ Address1, Address2, ID, PriceString }: Property, index) => (
              <SwiperSlide key={index}>
                <PropertyCard
                  {...{ toggle, Address1, Address2, ID, PriceString }}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}
    </>
  );
}
