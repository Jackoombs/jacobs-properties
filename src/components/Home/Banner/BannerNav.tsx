import clsx from "clsx";
import type { Swiper as SwiperType } from "swiper/types";

interface Props {
  swiper: SwiperType | null;
  imageLength: number;
  activeIndex: number;
}

export default function BannerNav({ swiper, imageLength, activeIndex }: Props) {
  return (
    <div className="row-start-3 mx-auto hidden w-full max-w-container-lg self-end pb-[5%] md:block">
      <div className="flex">
        {[...Array(imageLength).keys()].map((e, index) => (
          <button
            onClick={() => swiper?.slideTo(index)}
            className="p-2"
            key={index}
          >
            <div
              className={clsx(
                "h-[14px] w-[14px] rounded-full duration-[800ms]",
                index === activeIndex ? "bg-white" : "bg-[#797875]"
              )}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
}
