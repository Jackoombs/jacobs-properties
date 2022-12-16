import clsx from "clsx";
import { IoArrowForwardOutline } from "react-icons/io5";
import type { Swiper } from "swiper/types";

interface Props {
  isReverse: boolean;
  swiper: any;
  isStartOrEnd: string;
}

export default function ReviewNavBtn({
  isReverse,
  swiper,
  isStartOrEnd,
}: Props) {
  const handleClick = () => {
    isReverse ? swiper.slidePrev() : swiper.slideNext();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "hidden min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full duration-150 md:flex",
        isReverse && "rotate-180",
        (isStartOrEnd === "start" && isReverse) ||
          (isStartOrEnd === "end" && !isReverse)
          ? "cursor-default"
          : "bg-secondary-100"
      )}
    >
      <IoArrowForwardOutline
        className={clsx(
          "text-2xl text-primary-100 duration-150",
          isStartOrEnd === "start" && isReverse
            ? "text-white"
            : "text-primary-100",
          isStartOrEnd === "end" && !isReverse
            ? " text-white "
            : "text-primary-100"
        )}
      />
    </button>
  );
}
