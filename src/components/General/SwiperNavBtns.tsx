import { MdOutlineArrowForwardIos } from "react-icons/md/index.js";
import { useSwiper } from "swiper/react";
import clsx from "clsx";

export default function SwiperNavBtn() {
  const swiper = useSwiper();

  return (
    <>
      {!swiper.isLocked && (
        <div className="flex gap-3 text-3xl">
          <button onClick={() => swiper.slidePrev()}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "rotate-180 duration-75",
                swiper.isBeginning ? "text-secondary-100" : "text-primary-100"
              )}
            />
          </button>
          <button onClick={() => swiper.slideNext()}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "duration-75",
                swiper.isEnd ? "text-secondary-100" : "text-primary-100"
              )}
            />
          </button>
        </div>
      )}
    </>
  );
}
