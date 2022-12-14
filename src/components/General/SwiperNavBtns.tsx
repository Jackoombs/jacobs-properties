import { MdOutlineArrowForwardIos } from "react-icons/md/index.js";
import { useSwiper } from "swiper/react";
import clsx from "clsx";

interface Props {
  isStartOrEnd: string;
}

export default function SwiperNavBtn({ isStartOrEnd }: Props) {
  const swiper = useSwiper();

  return (
    <>
      {isStartOrEnd !== "lock" && (
        <div className="flex gap-3 text-3xl">
          <button onClick={() => swiper.slidePrev()}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "rotate-180 duration-75",
                isStartOrEnd === "start"
                  ? "text-secondary-100"
                  : "text-primary-100"
              )}
            />
          </button>
          <button onClick={() => swiper.slideNext()}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "duration-75",
                isStartOrEnd === "end"
                  ? "text-secondary-100"
                  : "text-primary-100"
              )}
            />
          </button>
        </div>
      )}
    </>
  );
}
