import {
  getImageFileNameFromUrl,
  getPropertyStatus,
  priceNumberToPriceString,
} from "../../utils";
import type { Property2 } from "../../env";
import ImagesComingSoon from "../../assets/images/images-coming-soon.webp";

interface Props {
  property: Property2;
}

export default function PropertyCard({ property }: Props) {
  const { id, type, status, address1, address2, images, price } = property;

  const priceString = priceNumberToPriceString(price);
  const imageFile =
    (images.length && getImageFileNameFromUrl(images[0].url, false)) || null;

  return (
    <a
      className="flex flex-col gap-4 text-primary-100"
      href={`/properties/${id}`}
    >
      <div className="overflow-hidden rounded-big">
        <img
          loading="lazy"
          className="aspect-property h-full w-full object-cover duration-200 ease-in-out hover:scale-110"
          src={
            imageFile
              ? `https://ik.imagekit.io/k6joqq39e/${id}/${imageFile}-sm.webp`
              : ImagesComingSoon.src
          }
          alt={address1 + address2}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-ellipsis pb-2 text-[1.25rem] font-semibold leading-[25px] line-clamp-2 lg:text-[1.5rem] lg:leading-[30px]">{`${address1}, ${address2}`}</h3>
          <div className="flex items-center gap-4">
            <p className="text-base font-semibold lg:text-[1.125rem] lg:font-normal">
              {priceString}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[2.4px]">
              Guide Price
            </p>
          </div>
        </div>
        <p className="mt-2 flex h-10 items-center justify-center self-start whitespace-nowrap rounded-lg bg-secondary-100 px-4 text-xs font-semibold uppercase tracking-[2.4px] lg:text-[0.875rem]">
          {getPropertyStatus(status, type)}
        </p>
      </div>
    </a>
  );
}
