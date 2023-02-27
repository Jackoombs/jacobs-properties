import type { Image, Property2 } from "../../env";
import ImageSlider from "../ImageCarousel/ImageSlider";
import SectionHeader from "../General/Text/SectionHeader";
import Copy from "../General/Text/Copy";
import Link from "../General/Link";
import { priceNumberToPriceString, getPropertyStatus } from "../../utils";

interface Props {
  property: Property2;
}

export default function PropertyListCard({ property }: Props) {
  const {
    id,
    type,
    status,
    description,
    address1,
    address2,
    bedrooms,
    bathrooms,
    receptions,
    images,
    price,
  } = property;

  const priceString = priceNumberToPriceString(price);
  const propertyStatus = getPropertyStatus(status, type);

  return (
    <div className="grid w-full grid-cols-2 items-center justify-between gap-6 xl:gap-16 2xl:grid-cols-[5fr_3fr]">
      <ImageSlider images={images} {...{ id }} />
      <div className="order-2 flex flex-col gap-2 xl:gap-5">
        <p className="mb-2 flex h-10 w-max items-center justify-center rounded-md bg-secondary-100 px-7 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 lg:h-14">
          {propertyStatus}
        </p>
        <ul className="flex gap-7 text-primary-100">
          <li className="text-[0.875rem] font-semibold uppercase tracking-[1.4px]">
            {`${bedrooms} Bed`}
          </li>
          <div className="h-3 self-center border-l-2 border-secondary-100"></div>
          <li className="text-[0.875rem] font-semibold uppercase tracking-[1.4px]">
            {`${bathrooms} Bath`}
          </li>
        </ul>
        <div className="pb-4 lg:pb-0">
          <SectionHeader
            className={"lg:pb-2"}
          >{`${address1}, ${address2}`}</SectionHeader>
          <span className="flex items-center gap-4">
            <SectionHeader>{priceString}</SectionHeader>
            <p className="text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100">
              Guide Price
            </p>
          </span>
        </div>
        {description && (
          <Copy className="hidden text-ellipsis lg:line-clamp-2" size="lg">
            {description}
          </Copy>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link size="lg" link={`properties/${id}`} type="primary">
            View Property
          </Link>
        </div>
      </div>
    </div>
  );
}
