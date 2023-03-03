import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper/types";
import Review from "./Review";
import ReviewNavBtn from "./ReviewNavBtn";
import clsx from "clsx";
import CarouselNavBtns from "../General/CarouselNavBtns";

interface Props {
  color?: "standard" | "alt";
}

export default function Reviews({ color = "standard" }: Props) {
  const [slideStatus, setSlideStatus] = useState<
    "start" | "end" | "locked" | null
  >("start");
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const handleSlideChange = (e: SwiperType) => {
    if (e.isBeginning) setSlideStatus("start");
    else if (e.isEnd) setSlideStatus("end");
    else if (e.isLocked) setSlideStatus("locked");
    else setSlideStatus(null);
  };
  return (
    <div
      className={clsx(
        "flex flex-col justify-center gap-4 rounded py-8 px-4 md:rounded-lg md:py-28 lg:px-[4.5rem]",
        color === "standard" ? "bg-primary-100" : "bg-primary-200"
      )}
    >
      <div className="flex h-full w-full items-center gap-4">
        <ReviewNavBtn {...{ swiper, color, slideStatus }} isReverse={true} />

        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide className="flex justify-center">
            <Review color={color} author="Leigh Elcock">
              Jacobs Properties found us the right tenant very quickly. The
              whole process was handled smoothly and communication between
              Jacobs/tenant/ourselves was very good and in a timely manner. I
              would recommend anyone who is thinking of renting out a property
              to use their services.
            </Review>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <Review color={color} author="Andrew Brackenridge">
              Ashlea was amazing in her support when going through the stresses
              of moving home.. She provided information and guidance throughout
              the process and I would highly recommend both her and Jacobs.
            </Review>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <Review color={color} author="Rachel Roberts">
              I can't recommend Jacobs highly enough. They're very friendly and
              professional. The sale was extremely quick thanks to the knowledge
              and hard work put in by all involved. If you want to sell your
              property, contact Jacobs.
            </Review>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <Review color={color} author="Susanna Davies">
              Ashlea was extremely helpful from start to finish of our house
              buying experience. We would definitely recommend using Jacobs!
            </Review>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <Review color={color} author="Sharon">
              I would highly recommend Jacobs Properties for their professional
              service. Communication was excellent and I was fully informed on
              the progress of the sale. Particular recognition and thanks to
              Ashlea for her diligence and outstanding work which facilitated
              the completion of the sale.
            </Review>
          </SwiperSlide>
        </Swiper>

        <ReviewNavBtn {...{ swiper, color, slideStatus }} isReverse={false} />
      </div>
      <CarouselNavBtns
        variant={color === "standard" ? "secondary" : "primary"}
        swiper={swiper}
        slideStatus={slideStatus}
        className="pt-2 md:hidden"
      />
    </div>
  );
}
