import { getImageSrc, priceNumberToPriceString } from "@/lib/property-utils";
import type { Property } from "@/lib/types";
import ImagesComingSoon from "@/assets/common/images-coming-soon.webp";
import ProgressiveImage from "@/components/common/ProgressiveImage";

export default function PropertyCard({ property }: { property: Property }) {
  const { id, statusLabel, address1, address2, publicAddress, images, price } = property;

  const priceString = priceNumberToPriceString(price);
  const displayAddress = address1 && address2 ? `${address1}, ${address2}` : publicAddress ?? "";
  const imageSrc = images.length ? getImageSrc(images[0], "small") : ImagesComingSoon.src;

  return (
    <a className="flex flex-col gap-4 text-primary-100" href={`/properties/${id}`}>
      <ProgressiveImage
        wrapperClassName="aspect-property rounded-big"
        // transform-gpu keeps the zoom on the compositor — without it, scaling
        // a full-bleed photo repaints and stutters.
        className="object-cover transform-gpu duration-200 ease-in-out hover:scale-110"
        src={imageSrc}
        alt={displayAddress}
      />
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="line-clamp-2 text-ellipsis pb-2 text-[1.25rem] font-semibold leading-[25px] lg:text-[1.5rem] lg:leading-[30px]">{displayAddress}</h3>
          <div className="flex items-center gap-4">
            <p className="text-base font-semibold leading-6 lg:text-[1.125rem] lg:font-normal">
              {priceString}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[2.4px]">Guide Price</p>
          </div>
        </div>
        {statusLabel && (
          <p className="mt-2 flex h-10 items-center justify-center self-start whitespace-nowrap rounded-[0.5rem] bg-secondary-100 px-4 text-xs font-semibold uppercase leading-4 tracking-[2.4px] lg:text-[0.875rem]">
            {statusLabel}
          </p>
        )}
      </div>
    </a>
  );
}
