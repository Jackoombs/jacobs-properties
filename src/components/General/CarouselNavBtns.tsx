import { MdOutlineArrowForwardIos } from "react-icons/md/index.js";
import clsx from "clsx";
import type { Swiper } from "swiper/types";

interface Props {
  slideStatus: "start" | "end" | "locked" | null;
  swiper: Swiper | null;
}

export default function CarouselNavBtn({ slideStatus, swiper }: Props) {
  const handleClick = (direction: "prev" | "next") => {
    console.log("jssss");
    direction === "prev" ? swiper?.slidePrev() : swiper?.slideNext();
  };

  return (
    <>
      {slideStatus !== "locked" && (
        <div className="flex gap-3 text-3xl">
          <button onClick={() => handleClick("prev")}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "rotate-180 duration-75",
                slideStatus === "start"
                  ? "text-secondary-100"
                  : "text-primary-100"
              )}
            />
          </button>
          <button onClick={() => handleClick("next")}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "duration-75",
                slideStatus === "end"
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
