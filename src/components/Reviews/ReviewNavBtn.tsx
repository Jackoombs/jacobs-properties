import clsx from "clsx";
import { IoArrowForwardOutline } from "react-icons/io5/index.js";

interface Props {
  isReverse: boolean;
  swiper: any;
  slideStatus: "start" | "end" | "locked" | null;
  color?: "standard" | "alt";
}

export default function ReviewNavBtn({
  isReverse,
  swiper,
  slideStatus,
  color = "standard",
}: Props) {
  const handleClick = () => {
    isReverse ? swiper.slidePrev() : swiper.slideNext();
  };

  const buttonColor = () => {
    if (color === "alt") return "text-primary-100";
    if (
      (slideStatus === "start" && isReverse) ||
      (slideStatus === "end" && !isReverse)
    ) {
      return "text-white";
    } else {
      return "text-primary-100";
    }
  };

  return (
    <>
      {slideStatus !== "locked" && (
        <button
          onClick={handleClick}
          className={clsx(
            "hidden min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full duration-150 md:flex",
            isReverse && "rotate-180",
            (slideStatus === "start" && isReverse) ||
              (slideStatus === "end" && !isReverse)
              ? "cursor-default"
              : "bg-secondary-100"
          )}
        >
          <IoArrowForwardOutline
            className={clsx(
              "text-2xl text-primary-100 duration-150",
              buttonColor()
            )}
          />
        </button>
      )}
    </>
  );
}
