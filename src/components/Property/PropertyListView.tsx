import { useState } from "react";
import type { Property } from "../../env";
import PropertyListCard from "./PropertyListCard";

interface Props {
  properties: Property[];
}
export default function PropertyListView({ properties }: Props) {
  const [maxProperties, setMaxProperties] = useState(10);

  return (
    <div className="mx-auto flex w-full max-w-container-lg flex-col gap-16">
      {properties
        .slice(0, maxProperties)
        .map(
          ({
            ID,
            Description,
            Address1,
            Address2,
            PriceString,
            TotalBedrooms,
            Bathrooms,
            InternalLettingStatus,
            InternalSaleStatus,
            Image,
          }) => (
            <PropertyListCard
              key={ID}
              {...{
                ID,
                Description,
                Address1,
                Address2,
                PriceString,
                TotalBedrooms,
                Bathrooms,
                Image,
              }}
              status={InternalLettingStatus || InternalSaleStatus}
            />
          )
        )}
      {maxProperties < properties.length && (
        <button
          className="mx-auto flex h-14 w-full items-center justify-center rounded-big bg-secondary-100 text-[0.875rem] font-semibold uppercase tracking-[1.4px] text-primary-100 duration-100 hover:brightness-110 md:w-auto md:min-w-[10rem]"
          onClick={() => setMaxProperties((value) => (value += 10))}
        >
          Load More
        </button>
      )}
    </div>
  );
}
