import { useState } from "react";
import ScreenModal from "@/components/common/ScreenModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getImageSrc } from "@/lib/property-utils";
import type { PropertyImage } from "@/lib/types";
import ProgressiveImage from "@/components/common/ProgressiveImage";
import ImageNavButton from "./ImageNavButton";

interface Props {
  images: PropertyImage[];
}

export default function PropertyGallery({ images }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleOpen = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid w-full gap-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {images.map((image, index) => (
          <button
            key={image.id ?? index}
            onClick={() => handleOpen(index)}
            className="w-full overflow-hidden rounded-[0.5rem]"
          >
            <ProgressiveImage
              src={getImageSrc(image, "medium")}
              alt={image.caption || ""}
              wrapperClassName="aspect-property"
              className="object-cover duration-300 hover:scale-110"
            />
          </button>
        ))}
      </div>

      <ScreenModal variant="primary-200" title="Property gallery" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="relative mx-auto flex w-full max-w-container-lg flex-1 items-center justify-center">
          <Carousel setApi={setApi} opts={{ startIndex, loop: true }} className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={image.id ?? index} className="flex items-center justify-center">
                  <ProgressiveImage
                    src={getImageSrc(image, "full")}
                    alt=""
                    fill={false}
                    className="mx-auto w-full sm:w-8/12"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <ImageNavButton variant="primary" direction="prev" onClick={() => api?.scrollPrev()} />
          <ImageNavButton variant="primary" direction="next" onClick={() => api?.scrollNext()} />
        </div>
      </ScreenModal>
    </>
  );
}
