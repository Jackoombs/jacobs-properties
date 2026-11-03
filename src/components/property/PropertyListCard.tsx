import { SectionHeader } from "@/components/common/Text";
import Copy from "@/components/common/Copy";
import Link from "@/components/common/Link";
import { priceNumberToPriceString } from "@/lib/property-utils";
import type { Property } from "@/lib/types";
import ImageCarousel from "./ImageCarousel";
import { BedsBaths, StatusBadge } from "./PropertyFacts";

export default function PropertyListCard({ property }: { property: Property }) {
  const { id, statusLabel, description, address1, address2, publicAddress, bedrooms, bathrooms, images, price } =
    property;

  const priceString = priceNumberToPriceString(price);
  const displayAddress = address1 && address2 ? `${address1}, ${address2}` : publicAddress ?? "";

  return (
    <div className="grid w-full grid-cols-2 items-center justify-between gap-6 xl:gap-16 2xl:grid-cols-[5fr_3fr]">
      <ImageCarousel images={images} />
      <div className="order-2 flex flex-col gap-2 xl:gap-5">
        <StatusBadge label={statusLabel} />
        <BedsBaths bedrooms={bedrooms} bathrooms={bathrooms} />
        <div className="pb-4 lg:pb-0">
          <SectionHeader className="lg:pb-2">{displayAddress}</SectionHeader>
          <div className="flex items-center gap-4">
            <SectionHeader as="p">{priceString}</SectionHeader>
            <p className="text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100">
              Guide Price
            </p>
          </div>
        </div>
        {description && (
          <Copy className="hidden text-ellipsis lg:line-clamp-2" size="lg">
            {description}
          </Copy>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link size="lg" link={`/properties/${id}`} type="primary">
            View Property
          </Link>
        </div>
      </div>
    </div>
  );
}
