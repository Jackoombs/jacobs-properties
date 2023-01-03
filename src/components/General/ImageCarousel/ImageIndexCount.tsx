import type { Swiper as SwiperType } from "swiper/types";
import { BsFillCameraFill } from "react-icons/bs/index.js";

interface Props {
  currentIndex: number;
  numberOfImages: number;
}

export default function ImageIndexCount({
  currentIndex,
  numberOfImages,
}: Props) {
  return (
    <div className="absolute bottom-2 right-2 z-10 flex h-8 w-20 items-center justify-center gap-2 rounded bg-white font-medium text-primary-100 md:bottom-6 md:right-6 md:w-24">
      <BsFillCameraFill className="text-lg text-secondary-100" />
      <p className="text-sm tracking-[2.8px]">{`${
        currentIndex + 1
      }/${numberOfImages}`}</p>
    </div>
  );
}
