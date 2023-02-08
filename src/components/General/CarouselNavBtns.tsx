import { MdOutlineArrowForwardIos } from "react-icons/md/index.js";
import clsx from "clsx";
import type { Swiper } from "swiper/types";

interface Props {
  slideStatus: "start" | "end" | "locked" | null;
  swiper: Swiper | null;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CarouselNavBtn({
  slideStatus,
  swiper,
  variant = "primary",
  className,
}: Props) {
  const handleClick = (direction: "prev" | "next") => {
    direction === "prev" ? swiper?.slidePrev() : swiper?.slideNext();
  };

  const buttonColor = variant === "primary" ? "text-primary-100" : "text-white";

  return (
    <>
      {slideStatus !== "locked" && (
        <div className={clsx("flex gap-3 text-3xl", className)}>
          <button onClick={() => handleClick("prev")}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "rotate-180 duration-75",
                slideStatus === "start" ? "text-secondary-100" : buttonColor
              )}
            />
          </button>
          <button onClick={() => handleClick("next")}>
            <MdOutlineArrowForwardIos
              className={clsx(
                "duration-75",
                slideStatus === "end" ? "text-secondary-100" : buttonColor
              )}
            />
          </button>
        </div>
      )}
    </>
  );
}
