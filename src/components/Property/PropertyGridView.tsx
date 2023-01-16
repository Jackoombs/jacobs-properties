import { useState } from "react";
import type { Property } from "../../env";
import PropertyCard from "./PropertyCard";

interface Props {
  properties: Property[];
}
export default function PropertyGridView({ properties }: Props) {
  const [maxProperties, setMaxProperties] = useState(12);

  return (
    <div className="mx-auto grid w-full max-w-container-lg grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-16">
      {properties
        .splice(0, maxProperties)
        .map(
          ({
            ID,
            Address1,
            Address2,
            PriceString,
            InternalLettingStatus,
            InternalSaleStatus,
          }) => (
            <PropertyCard
              key={ID}
              {...{ ID, Address1, Address2, PriceString }}
              status={InternalLettingStatus || InternalSaleStatus}
            />
          )
        )}
      {maxProperties < properties.length && (
        <button
          className="col-span-full mx-auto flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-auto md:min-w-[10rem]"
          onClick={() => setMaxProperties((value) => (value += 12))}
        >
          Load More
        </button>
      )}
    </div>
  );
}
