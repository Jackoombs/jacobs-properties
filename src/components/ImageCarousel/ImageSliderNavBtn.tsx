import clsx from "clsx";
import { IoArrowForwardOutline } from "react-icons/io5/index.js";
import type { Swiper as SwiperType } from "swiper/types";

interface Props {
  swiper: SwiperType | null;
  isReverse: boolean;
  variant?: "white" | "primary";
}

export default function ImageSliderNavBtn({
  swiper,
  isReverse,
  variant = "white",
}: Props) {
  const handleClick = () => {
    isReverse ? swiper?.slidePrev() : swiper?.slideNext();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "absolute z-10 flex h-8 w-8 scale-75 items-center justify-center rounded-full  duration-100 hover:bg-secondary-100 md:scale-100",
        isReverse ? "left-2 rotate-180 lg:left-7" : "right-2 lg:right-7",
        variant === "white" && "bg-white",
        variant === "primary" && "bg-primary-100"
      )}
    >
      <IoArrowForwardOutline
        className={clsx(
          "text-lg",
          variant === "white" && "text-primary-100",
          variant === "primary" && "text-white"
        )}
      />
    </button>
  );
}
